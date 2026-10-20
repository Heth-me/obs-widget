# What you can customize

Heth offers ordinary account settings for the caption, existing theme, language, currency/network and optional suggested amount after the updated connection flow is released. Those settings require no access to source code. Heth MCP can manage the same supported appearance fields with user approval in the AI client; separate account access is approved in Heth.

For a completely custom layout, use a fork of this frontend. You can change the HTML/React structure, CSS, colors, spacing, fonts, animation and notification presentation. Public source does not give you access to anybody else's Heth account.

## Design map

| Goal | Where to work |
| --- | --- |
| Rearrange QR, headings and alerts | `src/DonationWidget.jsx` |
| Colors, spacing, sizes, typography, responsive layout | `src/App.css` |
| Text labels/translations | `copy` in `src/DonationWidget.jsx` |
| Render exact monetary values | `formatMinorUnits` in `src/utils/widget.js` |
| Receiving QR fields | `paymentUrl` in `src/utils/widget.js` |
| Supported URL fields and theme IDs | `readSettings` / `THEMES` in `src/utils/widget.js` |
| Validate the design without money or credentials | `preview=1&lang=en` or `preview=1&lang=ru` |

The backend periodically refreshes account appearance. Prefer changing the implementation of an existing theme rather than inventing a server-stored identifier that the backend will reject. Local CSS-only additions do not require a Heth backend release; new saved fields or data feeds do.

## Presentation and delivery are separate

The API provides completed incoming transfer events, exact amounts/precision, currency/network, IDs and timestamps. It does not provide an OBS remote-control API or automatically attribute every transfer as a donation to a particular author/platform. Do not invent sender names or message fields.

The default presentation shows three alerts for ten seconds and uses a bounded queue with back pressure. You can change presentation behavior in your fork, but preserve pagination/deduplication and keep queues/timers bounded. Use synthetic bursts to verify a changed layout instead of making real payments.

Do not make a design depend on hiding, rounding or converting minor units with floating-point numbers. Preserve readable errors and the distinction between test and production. Keep the QR's white quiet zone unobstructed; theme styling belongs around it.

See [AI_GUIDE.md](../AI_GUIDE.md) for prompts and [HOSTING.md](HOSTING.md) for deployment.
