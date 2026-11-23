PORTFOLIO SITE: flat HTML, CSS and JavaScript (no build step)

UPLOAD
Upload everything in this folder to your web root (usually public_html or www) over FTP,
keeping the folder structure:

  index.html
  css/styles.css
  js/content.js
  js/main.js
  images/headshot.jpg

EDITING
- All text lives in js/content.js. SITE.name controls the name shown across the site.
- The email and LinkedIn URL are in the same file.
- To swap the headshot, overwrite images/headshot.jpg (tall crop, roughly 2:3).
- Once live, change the og:image tag in index.html to a full URL, e.g. https://yourdomain.com/images/headshot.jpg
  so link previews show the portrait.

CONTACT
- Both "Get in touch" buttons open an email to the address in SITE.contact.email (js/content.js).

NOTES
- Fonts (Cormorant Garamond, Inter) load from Google Fonts; system serif/sans fallbacks apply if blocked.
- Test locally by opening index.html in a browser; no server needed.
