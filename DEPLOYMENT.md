# Portfolio setup and deployment

## Contact form

The form uses Formspree and works only after it has a configured endpoint.

1. Create a form in Formspree and copy its form endpoint.
2. In Vercel, open the existing project and go to **Settings → Environment Variables**.
3. Add `VITE_FORMSPREE_ENDPOINT` with the endpoint value for **Production**, and add it to Preview/Development if needed.
4. Redeploy after saving the variable. The endpoint is intended to be public; do not put private API keys in `VITE_` variables.

Without this setting, form validation still works and the page displays a clear setup message; the direct email link remains available.

## Profile photo

Photo uploads are previewed, cropped, compressed to JPEG, and saved in the current browser. Browser storage cannot publish a change to other visitors.

To publish a photo:

1. Use **Download photo to publish for everyone** after saving your photo.
2. Add the downloaded file to `public/profile-photo.jpg` in the repository.
3. In `src/App.tsx`, set `profile.photoUrl` to `'/profile-photo.jpg'` and `profile.photoPosition` to the crop percentages shown by the crop sliders (for example, `'50% 50%'`).
4. Commit and deploy the change. The deployed image will then be available to every visitor. The image file is public; do not use a private photo.

## Resume

The **Download resume** button downloads `public/resume.pdf`. Replace that file with an updated PDF when needed; the button filename is configured in `src/App.tsx`.

The published copy omits the residential-location line and character-reference contact details from the supplied document. Keep public resume files free of private addresses and other people’s personal contact information.

## Social preview

The social preview asset is `public/social-preview.svg`. Social platforms commonly expect an absolute image URL, so after confirming the existing Vercel deployment URL, update the `og:image` and `twitter:image` values in `index.html` to `https://<your-existing-vercel-url>/social-preview.svg`. The custom domain is optional.

## Deploy to the existing Vercel project

1. Keep the existing Vercel project and repository connection.
2. Commit and push the changes to the branch connected to Vercel. For example:

   ```sh
   git add src/App.tsx src/index.css index.html public/favicon.svg public/social-preview.svg public/resume.pdf .env.example DEPLOYMENT.md dist/
   git commit -m "Improve student portfolio"
   git push origin main
   ```

3. Check the existing project's **Deployments** page for the build result. Open the production deployment and verify the hero, theme switch, photo flow, QR code, contact downloads, and contact form.
4. If `main` is not the production branch, push to the branch configured in the project's Vercel settings instead.

The site does not require a custom domain. Any existing Vercel URL and custom-domain configuration remain unchanged.
