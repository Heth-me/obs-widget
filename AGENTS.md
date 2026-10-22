# Working on the Heth OBS widget with an AI assistant

This repository contains the browser overlay, not the wallet, payment backend or MCP server. A user can change its layout freely in a fork and host their own build. Ordinary Heth account settings can also be changed through Heth MCP; MCP does not edit this repository or deploy custom code.

## Start here

1. Read README.md, AI_GUIDE.md and docs/CUSTOMIZATION.md.
2. Install the locked dependencies with `npm ci`.
3. Use `/widget/donations?preview=1&lang=en` (or `lang=ru`) for visual work. Preview uses a sample event and a **non-payment QR**. No account credential is necessary.
4. After a change, run `npm test`, `npm run lint` and `npm run build`. Inspect the resulting screen at the intended OBS source size.

## File ownership and design changes

- `src/DonationWidget.jsx`: layout, RU/EN labels, QR and notification presentation; polling stays separate from rendering.
- `src/App.css`: layout, colors, typography, theme accents, responsive behavior and reduced-motion support.
- `src/utils/widget.js`: URL validation, receiving URL, exact formatting and event deduplication.
- `test/widget.test.js`: precise amounts, URL fields, credential placement, deduplication and preview behavior.
- `vite.config.js`: `/widget/` mount and operator-selected development API proxy.
- `docs/HOSTING.md`: custom hosting with a narrow same-origin API proxy.

For an appearance request, edit rendering/styles and use synthetic data. Do not change account access, payment destinations or authentication as a side effect. Explain which visible settings changed and how the preview was checked.

## Contracts that a design must preserve

- This is an OBS **Browser source**, not a native plugin. Keep a transparent background unless the user requests otherwise.
- Money from the API is an exact integer **string plus stored decimals**. Use `formatMinorUnits`. Never use Number/parseFloat or guess 18 decimals. Unknown precision must remain unknown.
- The receiving QR includes recipient, currency, network and env. It must never contain the OBS token, session, private key or recovery phrase. Preserve the quiet zone and test scan readability after changing size/contrast.
- Receiving identity comes from the authenticated backend. A caption is not a recipient selector.
- The key is a restricted `obs` key issued in Heth. It exists only in the Browser-source URL fragment and the `x-api-key` request header. Do not move it to query parameters, storage, source, screenshots, fixtures, logs or reports.
- The source reads only `/api/v1/obs/widget` and `/api/v1/obs/events`. It cannot read balances/full history, mutate permissions or send money.
- Keep explicit test/prod selection, charged/incoming filtering, cursor pagination, ID deduplication, bounded queues, retry cleanup and revocation handling.
- A transfer is not automatically an attributed author/platform donation. Do not invent donor names, messages or payment finality.
- Widget appearance refreshes from Heth. A custom build can reinterpret its theme IDs; adding a new *server-stored* setting is a separate backend/MCP/API change, not a CSS-only feature.

## Public repository hygiene

Never commit real keys or private Browser-source URLs, even to a branch. Examples must use preview mode or unmistakable synthetic values. Do not run real payment calls to validate a design. Keep private deployment workflows and server credentials outside this public repository. Changes by other contributors must be preserved.

No deployment or release is implied by a passing local build. Report separately: source checks, browser preview, native OBS acceptance and production release status.
