# Krunker KlapAyan Launcher

## Features
- **3 tabs:** Switch / Launch • Build Packs • Help
- **Portable:** run `KlapAyan Launcher.exe` from the extracted folder
- **First run:** auto-creates `Assets/` and `Final Scripts/` beside the EXE
- **Builder:** group 6 ZIPs, must have matching names (for example `mystbloom_1_kill.zip`, `mystbloom_2_kill.zip...`, extracts to `Assets/<PackName>/`, auto creates `<PackName>.js` in **Final Scripts** (optionally copies to your Game Scripts), and (again optionally) can auto delete the ZIP groups in order to declutter. All are toggleable, of course.
- **Switcher:** activate any `.js` from **Final Scripts** into your **Game Scripts** folder (uses the `Active filename`, default `active_soundpack.js`) This `active_soundpack.js` can be changed to anything, but it MUST be a constant name, this is due to the way the program clears the soundpack when you pick a different one. 
- **Launch Client:** set your game client EXE and launch directly from the launcher.

## Quick Start
1. **Download & extract** `launcher.zip` anywhere you have write permissions.
2. Open `KlapAyan Launcher.exe` **(IT WILL GIVE A WARNING, THIS IS BECAUSE IT IS AN UNSIGNED AUTHOR!!)**
3. On first run the app creates  **Assets/** and **Final Scripts/** next to the EXE. These will be preloaded with 31 soundpacks from VALORANT that Klap, Araf, and I personally liked the most. You're free to pick any more from the link below :)

## Build Packs (create your own)
1. Place your **six ZIP files** next to the EXE. Name them so they share the same **prefix** before the first `_` (e.g., `Valorant_1.zip`, …, `Valorant_6.zip`).  
2. Go to **Build Packs** -> set **Final Scripts dest** (defaults to the local `Final Scripts/`).  
3. (Optional) Check **After build: also copy to Game Scripts** and pick your **Game Scripts** folder; keep **Delete ZIPs after build** checked if you want the zips removed.  
4. Click **Build from Zips**. You’ll get `Final Scripts/<PackName>.js` and extracted media in `Assets/<PackName>/`.

> Template: The builder uses `Assets/template.js` if present; otherwise a built-in template is used.

## Switch / Launch (use a script)
1. Set **Final Scripts** (the folder with your ``.js` files) and **Game Scripts** (where your game reads scripts).  
2. Choose **Active filename** (default `active_soundpack.js`).  
3. Select a script in the list and click **Activate** (or **Activate & Launch** if you set a client EXE).

## Folder Layout (after first run)
    KlapAyan Launcher/

        _internal / internal files, don't need to touch these ever
  
        KlapAyan Launcher.exe <- this is what you click to execute the program, you can create a shortcut here to your taskbar or desktop
  
        Assets / all cached soundpack info +  template.js
  
        Final Scripts / generated .js files you can activate
  
        klap_config.json <- app settings (created automatically, don't need to touch this file but you can if you'd like to change paths from out of the GUI)

## Credits
Credits to: 
Ghosty, Maks, Asterea, mkyiin, Klap

This is obviously not monetized at all; standard disclaimer: don't pay for this, it's free and OSS. Please open an issue on GitHub or DM me with any issue/question. 
