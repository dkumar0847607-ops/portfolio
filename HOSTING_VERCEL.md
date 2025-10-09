## Host the Portfolio Templates on Vercel

This repository contains multiple standalone HTML/CSS/JS portfolio templates. You can deploy any (or all) of them to Vercel without a build step.

### Option A — Deploy via GitHub Import (recommended)
1. Push this repository to GitHub.
2. In Vercel:
   - Click "New Project" → "Import Git Repository" → select your GitHub repo.
   - Create one Vercel Project per template you want to host:
     - Click "Import" again and select the same repository.
     - In "Root Directory", choose the folder to deploy:
       - `akshat-portfolio`
       - `portfolio`
       - `portfoilio website` (typo kept as-is)
       - `p1`
       - `Portfolio-tutorial`
     - Framework preset: "Other".
     - Build Command: leave empty.
     - Output Directory: leave empty.
     - Deploy.
3. Repeat for each folder you want live. Each gets its own URL.

### Option B — Deploy via Vercel CLI (per folder)
```bash
npm i -g vercel
cd akshat-portfolio && vercel && vercel --prod
cd ../portfolio && vercel && vercel --prod
cd "../portfoilio website" && vercel && vercel --prod
cd ../p1 && vercel && vercel --prod
cd ../Portfolio-tutorial && vercel && vercel --prod
```

### Required code checks/changes before hosting
- General
  - Keep asset paths relative (e.g., `./styles.css`, `./script.js`, `./projects.json`, images in `./img/...`).
  - Avoid `file://` URLs.

- `akshat-portfolio`
  - `projects.json` must sit in the same folder as `index.html`.
  - Fetch path `./projects.json` is correct for Vercel.

- `portfolio`
  - Uses CDN for Boxicons and Typed.js via `<script>` in `index.html`. No changes typically needed.

- `portfoilio website` (folder name has a typo; optional to rename to `portfolio-website` in Git, then select that directory on Vercel)
  - Ensure these dependencies are loaded in `index.html` before `./script.js`:
    ```html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    <script src="./script.js"></script>
    ```
  - Ensure the HTML contains the elements used by the script: `.scroll-up-btn`, `.carousel`, `.navbar`, `.menu`, `.menu-btn`, `.typing`, `.typing-2` or remove the related JS blocks.

- `p1` (bug fixes recommended)
  - In `index.html`, update the image source from `NKM.` to `NKM.png` (matches the file present).
  - In `script.js`, fix typos and logic so animations run in production:
    - `lettter` → `letter`
    - `word.textContent=="";` → `word.textContent = "";`
    - Use one index name: `currentWordIndex` consistently.
    - `Style` → `style`
    - Use one function name: `changeText` and call that.
    - Use template literals for points:
      ```js
      points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
      ```

- `Portfolio-tutorial`
  - No required changes. The hamburger toggle works with the provided `toggleMenu()`.

### After deploy
- Open the live URL(s) and check the Console/Network tabs for missing files or undefined globals (e.g., jQuery/Typed).
- Verify JSON and images load and animations behave as expected on mobile and desktop.


