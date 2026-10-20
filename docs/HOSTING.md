# Host a custom OBS build

The updated restricted API and Heth connection screen require a coordinated service release. A public source repository alone does not make those backend endpoints available. Use preview mode until the release is announced in the Heth documentation.

## Build and mount

```sh
npm ci
npm test
npm run lint
npm run build
```

Serve `dist/` under `/widget/`; the entry route is `/widget/donations`. The Vite base and React router basename both expect this path. Preserve transparent background support and use HTTPS for a production custom host.

For local development, `OBS_API_TARGET` selects the trusted upstream for the Vite `/api` proxy. Production needs a reverse proxy for the two restricted read endpoints. Static GitHub Pages by itself is insufficient for incoming alerts: it does not provide this same-origin API proxy. Public source and hosting are separate things.

## A narrow API proxy

Forward only GET/HEAD `/api/v1/obs/widget` and `/api/v1/obs/events` to `https://app.heth.me`, preserving the env/cursor query and `x-api-key` header. Set the upstream Host/SNI to app.heth.me. Do not forward cookies or Authorization; do not turn this into a proxy for the general account API. Keep API responses uncached and do not log the private key header.

The custom host necessarily sees the OBS key when proxying its requests. Use a host you control or explicitly trust. The key must be the separate `obs` scope issued in Heth; never substitute a full/general read-only account key. Do not disable browser security to work around CORS.

When mounting alongside another PWA, exclude `/widget/` from that PWA's navigation fallback. Otherwise its service worker can substitute its own shell and show a misleading 404 even while the server returns widget files.

## Connect your own account

1. After release, open Heth → Settings → OBS Studio and create restricted OBS access.
2. Copy the private Browser-source URL yourself. Replace only its origin with your trusted custom host; retain `/widget/donations`, env and the token fragment.
3. Paste the resulting URL into OBS. Start with 900 × 500 pixels, then adjust your scene.
4. Check the receiving QR's details in Heth. Verify actual receipt in history.
5. Revoke the connection in Heth when finished or if its URL was exposed.

The secret stays in the fragment after `#`, not the query or the QR. A layout assistant does not need it. Do not put the live URL in your repository, issue, screenshot or AI prompt.
