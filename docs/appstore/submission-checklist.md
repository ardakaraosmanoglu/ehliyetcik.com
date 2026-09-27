# App Store submission checklist

Done in the repo:
- [x] Bundle ID `com.ehliyetcik.app`, version 1.0.0 (build 1), iPhone only, portrait only
- [x] `ITSAppUsesNonExemptEncryption = false`, `UIRequiredDeviceCapabilities = arm64`
- [x] App-level `ios/App/App/PrivacyInfo.xcprivacy` (no tracking, no collected data, no required-reason APIs); Capacitor 8 ships its own empty manifest too
- [x] Bundled Piper audio for every question (`public/audio`, 311 mp3)
- [x] Icon, 6.9" screenshots, metadata (`docs/appstore/metadata.md`), privacy/support pages (`site/`)

In Xcode (after `make ios`):
- [ ] Run on a real iPhone: Öğren audio plays (also with the silent switch on), swipe, Sınav, retry wrong answers, About links
- [ ] Product > Archive, then Validate App in the Organizer
- [ ] Organizer > Generate Privacy Report: should list no collected data and no required-reason APIs
- [ ] Distribute App > App Store Connect

In App Store Connect:
- [ ] App Information: category Education, content rights ("Does your app contain third-party content?" answer honestly, see `docs/appstore/metadata.md`)
- [ ] Age Rating: answer the questionnaire, including the new social media / user-generated content questions (all "No"), expected 4+
- [ ] App Privacy: "Data Not Collected"
- [ ] Privacy Policy URL and Support URL: https://ardakaraosmanoglu.github.io/ehliyetcik.com/ (check pages are live, repo must be public or on a paid plan)
- [ ] Pricing: Free (the Piper voice is CC BY-NC-SA 4.0, non-commercial only)
- [ ] Paste description, keywords, review notes from `docs/appstore/metadata.md`, upload screenshots, select the build, submit
