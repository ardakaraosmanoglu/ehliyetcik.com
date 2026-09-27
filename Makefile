.PHONY: install dev build preview clean audio

install: node_modules
node_modules: package.json
	npm install
	@touch node_modules

dev: node_modules
	npx vite

build: node_modules
	npx vite build

preview: build
	npx vite preview

clean:
	rm -rf node_modules dist

# Generate Piper TTS mp3s for new questions (needs uv + ffmpeg)
audio:
	uv run --with piper-tts python scripts/tts.py
