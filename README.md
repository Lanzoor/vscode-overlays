# 🎨✨ Welcome to VSCode Overlays! ✨🎨

Hey hey!! 👋 Ready to _supercharge_ your VSCode with **beautiful effects, animations, and overlays** that’ll make your editor come alive? Let’s get your VSCode looking absolutely aesthetic. Follow along! 🚀 It gets a bit manual, but I promise; it will be worth it!

**Make sure to read this till the end, because there are lot's of FAQs you might need to consider!**

---

## 🧩 Step 1 — Install the Custom CSS Extension

We’ll need **be5invis.vscode-custom-css** to load our styles!

**Option 1 (the easy way):**

-   Open the **Extensions** sidebar in VSCode
-   Search for `be5invis.vscode-custom-css`
-   Click **Install** ✅

**Option 2 (the hacker way 💻):**

```sh
code --install-extension be5invis.vscode-custom-css
```

Boom! You’re done with Step 1 🎯

---

## 📦 Step 2 — Download the VSCode Overlays

### 🐧 On Linux:

```sh
cd ~/Downloads
git clone https://github.com/Lanzoor/vscode-overlays.git
```

### 🪟 On Windows:

Head to 👉 [https://github.com/Lanzoor/vscode-overlays](https://github.com/Lanzoor/vscode-overlays) Then click **"<> Code ▼" → "🗂️ Download ZIP"** Unzip it somewhere comfy — like your Downloads folder! 📂

---

## ⚙️ Step 3 — Add the Tweaks to Your `settings.json`

Add the following entries to your `settings.json` file, to tell the system where the magic lives!

### 🐧 Linux:

```json
{
    "vscode_custom_css.imports": ["file:///home/{YOUR USERNAME}/vscode-overlays/styles.css", "file:///home/{YOUR USERNAME}/vscode-overlays/overlays.js", "file:///home/{YOUR USERNAME}/vscode-overlays/modals.js", "file:///home/{YOUR USERNAME}/vscode-overlays/mouseeffects.js"]
}
```

### 🪟 Windows:

```json
{
    "vscode_custom_css.imports": ["file:///C:/Users/{YOUR USERNAME}/Downloads/vscode-overlays/styles.css", "file:///C:/Users/{YOUR USERNAME}/Downloads/vscode-overlays/overlays.js", "file:///C:/Users/{YOUR USERNAME}/Downloads/vscode-overlays/modals.js", "file:///C:/Users/{YOUR USERNAME}/Downloads/vscode-overlays/mouseeffects.js"]
}
```

> 💡 **Tip:** If you’ve got _other themes or scripts_ messing with VSCode visuals, consider disabling them first! Mixing too many visuals may result in weird results and visuals.

---

## 🔄 Step 4 — Restart and Activate

1. Hit **Ctrl+Shift+P**
2. Type **Enable Custom CSS and JS**
3. Click it!
4. VSCode will say “yo, wanna restart?” — click **Restart Visual Studio Code** 🌀

And just like that, you can enjoy the new experience!

---

## 🧠 Notes & Troubleshooting

### ⚠️ Linux Permissions

If VSCode complains about permissions, run this:

```sh
sudo chown -R $USER ${readlink -f $(which code)}
```

### 🔁 After Updates

VSCode sometimes breaks these tweaks after updates (thanks, Microsoft 😩). If that happens:

-   Re-run the `Ctrl+Shift+P` → `Enable Custom CSS and JS` command
-   Restart VSCode again
-   If you’re on Linux, maybe re-run the chown command too

### 🚨 “VSCode installation is corrupted” warning

Don’t panic - it’s totally normal. You can **safely ignore it**. You can click the small cog icon (⚙️), and click **Don't Show Again**. Bye-bye!

### How to Update vscode-overlays

On Linux;

```sh
cd ~/Downloads/vscode-overlays
git pull
```

On Windows, you might have to download the files manually on GitHub 😭 Head to 👉 [https://github.com/Lanzoor/vscode-overlays](https://github.com/Lanzoor/vscode-overlays) Then click **"<> Code ▼" → "🗂️ Download ZIP"** Unzip it, and replace the old files.

By the way, until I make an automatic update system, you still might want to check frequently for updates. Sorry!

---

🎉 **And that’s it!** You now have a supercharged, stylish, animated VSCode setup!
