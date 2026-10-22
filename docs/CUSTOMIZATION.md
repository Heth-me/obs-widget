# Customize the Heth OBS widget

Choose the workflow that matches the change:

| Change | Where to do it |
| --- | --- |
| Caption, saved theme, suggested amount, RU/EN language | Heth settings or Heth MCP with confirmation in the AI client |
| Available currency/network, creating or revoking OBS access | Heth → Settings → OBS Studio |
| Arbitrary layout, fonts, colors, alert presentation or animation | Your fork of this frontend |

The standard settings do not require source access. A custom build is created in a fork and [hosted separately](HOSTING.md). The Heth MCP connection does not edit or deploy the fork.

## File map

| Goal | File |
| --- | --- |
| Rearrange QR, caption and alerts | `src/DonationWidget.jsx` |
| Colors, spacing, fonts, animation and responsive layout | `src/App.css` |
| RU/EN text | `copy` in `src/DonationWidget.jsx` |
| Render exact amounts | `formatMinorUnits` in `src/utils/widget.js` |
| Preserve the receiving QR | `paymentUrl` in `src/utils/widget.js` |
| Validate URL settings and theme IDs | `readSettings` / `THEMES` in `src/utils/widget.js` |

Use `preview=1&lang=en` or `preview=1&lang=ru` while changing a design. Preview makes no account API requests and does not need a key; its QR cannot open a payment.

## Saved appearance

Heth stores caption, theme, currency, network, suggested amount and language. The connected widget refreshes saved settings about every 30 seconds. Theme IDs are:

`default`, `neon`, `purple`, `corporate`, `energy`, `gold`, `minimal`, `dark`, `gaming`, `creative`, `simple`, `cyberpunk`.

Restyle an existing theme in a custom build rather than creating an identifier Heth cannot save. The caption is up to 140 characters. The suggested amount is an exact positive decimal string, or empty to let the payer choose. Receiving identity comes from the authenticated account, not from the caption.

## Incoming alerts

The feed contains incoming `charged` events with exact amount, saved precision, currency/network, timestamp and an ID used to deduplicate repeats. Do not display that ID as a donor name or add sender/message fields the API does not return. Check receipt in Heth history.

The default overlay displays up to three alerts for ten seconds each. When changing that behavior, preserve bounded queues, back pressure, pagination, deduplication, retry cleanup and revocation handling. Use sample event bursts to check the layout without making payments.

Render money with the stored precision and preserve nonzero small amounts. Do not use floating-point conversion or invent an amount when precision is unavailable. Preserve receiving parameters and the QR's high contrast and quiet zone. Keep the background transparent unless a different background is requested.

See the [AI guide](../AI_GUIDE.md) for prompts and the [hosting guide](HOSTING.md) for connecting your custom build.
