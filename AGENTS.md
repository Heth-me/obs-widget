# Work on the Heth OBS widget with an AI assistant

This repository is the browser overlay. Read [README.md](README.md), [AI_GUIDE.md](AI_GUIDE.md), [customization](docs/CUSTOMIZATION.md) and [hosting](docs/HOSTING.md) before changing it. Heth MCP manages supported account settings; arbitrary layouts are implemented in a fork by a coding assistant.

## Start with preview

Use the locked dependencies, Node.js 24 and the commands in README.md. Use `/widget/donations?preview=1&lang=en` or `lang=ru` for visual work. Preview uses sample data, makes no account API requests and displays a non-payment QR. Never request account credentials for layout work.

After changes, run `npm run check:docs`, `npm test`, `npm run lint` and `npm run build`. Inspect the overlay at the requested OBS source dimensions. If a dependency installation is unnecessary or the user has prohibited it, use the existing dependencies.

## File map

- `src/DonationWidget.jsx`: React layout, RU/EN copy, QR, alert rendering and polling.
- `src/App.css`: layout, colors, typography, themes, responsive behavior and reduced motion.
- `src/utils/widget.js`: settings validation, receiving URL, exact amounts and event deduplication.
- `test/widget.test.js`: amount precision, URL fields, credential placement, deduplication and preview behavior.
- `vite.config.js`: `/widget/` mount and development API proxy.
- `docs/HOSTING.md`: custom hosting and the narrow same-origin API proxy.
- `scripts/check-docs.mjs`: public documentation checks and local link validation.

For visual requests, work on rendering and styles with sample data. Preserve other contributors' edits. Keep account access and payment destinations unchanged unless the user explicitly requests those changes.

## Preserve the contract

- Use an OBS **Browser source** with a transparent background unless the user requests a different background.
- Render money with `formatMinorUnits` using the API's exact integer string and recorded precision. Never use Number/parseFloat, guess precision, invent conversion rates or round nonzero amounts to zero.
- Preserve the complete Heth-generated receiving URL and request parameters. Keep a high-contrast QR with a clear quiet zone. Verify readability after changing size or contrast.
- Obtain the receiving identity from the authenticated backend. A caption never selects an account or changes a payment destination.
- Use the separate `obs` key created in Heth. Keep its complete value in the connection fragment, request header and necessary runtime memory only. Do not persist it, put it into query parameters or QR codes, or include it in source, screenshots, fixtures or logs.
- The widget reads only `/api/v1/obs/widget` and `/api/v1/obs/events`. Preserve charged/incoming filtering, cursor pagination, deduplication, bounded queues, retry cleanup and revocation handling.
- Treat event IDs as deduplication metadata, not labels for the viewer. Do not invent donor names, messages or transaction finality.
- Saved appearance refreshes from Heth. Reuse existing theme identifiers for custom styling; new saved settings require a matching API contract.

## Heth MCP and a coding assistant

`get_obs_widget` and `list_obs_events` read the limited OBS data. `update_obs_widget` changes caption, theme, suggested amount and language after confirmation in the AI client. Currency/network changes, access creation and revocation are handled in Heth. `prepare_obs_connection` supplies a Heth review link; it does not grant access. Keep MCP permissions separate from the OBS key and never return that key to the assistant.

A coding assistant can edit and build the fork using preview. Hosting and access to a fork are separate from Heth MCP. Ask the user to add their private OBS URL directly in OBS after the layout is ready.

## Documentation and public files

Write public guides for available Heth behavior and concrete setup steps. Keep internal workflow progress, roadmap promises and service operating modes out of documentation, examples and generated public files. Preserve the credential-free layout preview and ordinary automated checks.

Never commit account keys, private Browser-source URLs, signing material or private deployment configuration. Use unmistakable sample data and do not initiate payments to check a design. Report checks actually performed to the user; do not turn assumptions into claims about a working deployment.
