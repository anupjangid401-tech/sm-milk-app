# 📱 Android Mobile Me App Kaise Install Karein (Complete Guide)

Aap is app ko apne Android mobile me **2 Aasaan Tareekon** se install kar sakte hain:

---

## 🌟 TAREEKA 1: Direct PWA Install (Sabse Aasaan - 30 Seconds!)

Aapko phone me koi software ya Android Studio install nahi karna padega:

1. **Apne Computer aur Mobile ko ek hi Wi-Fi / Hotspot se connect karein.**
2. Computer ke PowerShell / Command Prompt me yeh command chalayein:
   ```bash
   npx next dev -H 0.0.0.0
   ```
3. Computer ka IP Address dekhein (e.g., `http://192.168.31.173:3000`).
4. Apne **Android Phone me Chrome Browser** kholein aur wahi IP address enter karein:
   `http://192.168.31.173:3000`
5. Chrome me uper **3 Dots ⋮** par tap karein aur **"Add to Home Screen"** par click karein.
6. 🎉 **SM MILK** App aapke phone ki home screen par install ho jayegi aur bilkul asli Android App ki tarah fullscreen chalegi!

---

## 📦 TAREEKA 2: Direct `.apk` File Package Banana

Agar aap direct `.apk` file chahte hain jise WhatsApp par bhej kar kisi bhi phone me install kiya ja sake:

1. **Next.js static export build karein**:
   ```bash
   npm run build
   ```
2. **Capacitor Android package install karein**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "SM MILK" "com.vdc.smmilk" --web-dir out
   npx cap add android
   npx cap open android
   ```
3. Android Studio me **Build > Build Bundle(s) / APK(s) > Build APK(s)** par click karein.
4. `.apk` file tayar ho jayegi jise aap apne Android phone me install kar sakte hain!
