# Generates public/audio/<id>.mp3 (sign name / text answer) and <id>-q.mp3 (text question) with Piper TTS (offline, Turkish).
# Also <id>-a/-aN/-h clips for the Yeni Öğren mode. Skips files that already exist; delete one to regenerate. Run via `make audio`.
import json, pathlib, subprocess, urllib.request, wave
from piper import PiperVoice

VOICE = "tr_TR-dfki-medium"  # only Turkish Piper voice; license CC BY-NC-SA 4.0 (non-commercial, attribute)
BASE = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/tr/tr_TR/dfki/medium/{VOICE}"
cache = pathlib.Path(".cache/piper"); cache.mkdir(parents=True, exist_ok=True)
for ext in (".onnx", ".onnx.json"):
    f = cache / (VOICE + ext)
    if not f.exists():
        urllib.request.urlretrieve(BASE + ext, f)

voice = PiperVoice.load(str(cache / (VOICE + ".onnx")))
out = pathlib.Path("public/audio"); out.mkdir(parents=True, exist_ok=True)
def render(text, mp3):
    if mp3.exists():
        return
    wav = cache / "tmp.wav"
    with wave.open(str(wav), "wb") as w:
        voice.synthesize_wav(text, w)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "48k", mp3], check=True)
    print("✓", mp3)

for q in json.load(open("src/data/questions.json")):
    if q["type"] == "image":  # sign: its name is read
        render(q["name"], out / f"{q['id']}.mp3")
    else:  # text: question is read before the answer
        render(q["q"], out / f"{q['id']}-q.mp3")
        render(q["a"], out / f"{q['id']}.mp3")
# Coach mode clips (<id>-a, -aN, -h) from src/speech-text.ts
for c in json.loads(subprocess.check_output(["node", "scripts/clips.ts"])):
    render(c["text"], out / c["file"])
