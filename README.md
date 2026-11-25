# MD MONIRUL ISLAM (SsaR ShishiR) — Portfolio

Plain HTML + CSS + JavaScript. No build step, no dependencies.
Pages: Home, About, Certification, Book, Contact. Dark/light theme toggle in the navbar (remembers the choice).

## Run locally
Open `index.html` in a browser, or run a tiny server in this folder:

    python3 -m http.server 8000
    # then open http://localhost:8000

## Deploy free on Vercel
1. Put this folder on GitHub (new repository, upload all files).
2. Go to vercel.com → Add New → Project → import the repository.
3. Framework preset: **Other**. Leave build command and output directory empty. Click Deploy.
(Or drag-and-drop the folder on app.netlify.com/drop for Netlify.)
You get a free `https://your-name.vercel.app` link. Later you can add your own domain in Project → Settings → Domains.

## Where to edit things
Everything personal is in **`assets/js/data.js`**: name, intro, education, emails, phone, social links, projects, certificates, book, announcement bar, contact form mode.

### Add a new certificate
1. Put the certificate image (JPG/PNG, about 1400px wide) in `assets/img/certs/` and the PDF in `assets/certs/`.
2. Open `assets/js/data.js`, copy one block inside `window.CERTIFICATES`, paste it at the top and change the fields:

       {
         title: "Certificate name",
         issuer: "Issuing organization",
         date: "01 Jan 2027",
         credentialId: "ABC-123",
         image: "assets/img/certs/my-cert.jpg",
         pdf: "assets/certs/my-cert.pdf",
         verifyUrl: "https://verification-link",   // "" if none
         description: "One or two honest sentences."
       },
3. Save and redeploy. The card (and the number on the Home page) updates automatically.

### Replace the book / add a cover
Replace `assets/book/cybersecurity-zero-to-expert-bangla.pdf`, or change `BOOK.pdf`. To use a real cover image, put it in `assets/img/` and set `BOOK.cover`. Set `BOOK.pdf` to `""` to show a "coming soon" state.

### Add social links or projects
In `data.js`, fill `socials: [{ label: "GitHub", url: "https://github.com/you" }]` and `projects: [{ name, description, link }]`. They appear automatically.

### Contact form
By default the form opens the visitor's email app (works on any host). For real submissions, create a free form at formspree.io and paste its id into `formspreeId`.

## Privacy note
Your phone number and emails are public on the site. To hide the phone, delete `phone`/`phoneDisplay` usage or ask to remove it.
