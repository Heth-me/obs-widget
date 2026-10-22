# Host your custom OBS widget

The standard Heth widget is hosted for you: use the URL created in **Heth → Settings → OBS Studio**. Follow this guide when you want to use your own layout from a fork.

## Build and mount

Use Node.js 24 and the locked npm dependencies:

```sh
npm ci
npm run check:docs
npm test
npm run lint
npm run build
```

Serve `dist/` over HTTPS under `/widget/`. The Browser-source entry is `/widget/donations`; the Vite base and React router use the `/widget/` mount. Route this entry to the built `index.html` and serve its assets from the same mount. Preserve the transparent background.

For local design work, run `npm run dev` and open `http://localhost:5174/widget/donations?preview=1&lang=en` (or `lang=ru`). Vite proxies `/api` to `https://app.heth.me`; `OBS_API_TARGET` is a server-controlled override for that upstream, not a widget URL option.

## Provide the widget API on your host

The overlay makes same-origin requests to these two endpoints:

- `GET /api/v1/obs/widget`: the connected account's receiving identifier and saved settings.
- `GET /api/v1/obs/events`: the incoming event feed, with `cursor` and `has_more` for pagination.

Configure an HTTPS reverse proxy from those exact paths to `https://app.heth.me`. Preserve the complete query string and `x-api-key` header, set upstream Host/SNI to `app.heth.me`, and allow only GET/HEAD. Keep responses uncached. Do not forward cookies or Authorization, expand the proxy to the full account API, or log the key header.

Your hosting service sees the restricted OBS key while forwarding requests. Use a host you control or trust and the separate `obs` key Heth creates. Do not substitute a general account key or disable browser security to work around CORS.

If another PWA uses the same host, exclude `/widget/` and these API routes from its navigation fallback so its service worker cannot replace widget or API responses with the PWA shell.

## GitHub Pages

GitHub stores the source and instructions for your fork. GitHub Pages serves static files and does not supply the same-origin API reverse proxy required for connected alerts. Host a connected custom build on a service that serves both the widget and the two proxy routes above. To use Heth's standard hosted widget, copy its Heth-generated URL directly into OBS.

## Connect your account

1. In Heth → **Settings → OBS Studio**, save the appearance and create OBS access.
2. Copy the private URL yourself. For a custom build, replace only its origin (scheme and host) with your trusted host. Keep `/widget/donations`, the complete query string and the fragment unchanged.
3. Paste the resulting URL into an OBS Browser source. Start with **900 × 500** pixels.
4. Scan the receiving QR and check the recipient, currency, network and suggested amount in Heth. Check received payments in Heth history.
5. Revoke the connection in Heth when it is no longer needed or its URL has been exposed.

The fragment after `#` contains the OBS token. Add that URL directly in OBS; do not put it into a repository, issue, screenshot or AI prompt. For layout work, use preview without credentials.
