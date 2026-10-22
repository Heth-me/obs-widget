# Heth.me OBS widget

[Setup guide](https://docs.heth.me/user/obs) · [Руководство на русском](QUICKSTART_RU.md) · [Customize with AI](AI_GUIDE.md) · [Report an issue](https://github.com/Heth-me/obs-widget/issues)

Show a receiving QR and incoming Heth payment alerts on your stream. Add the widget as an OBS Studio **Browser source**. Its background is transparent; no native plugin is needed.

## Connect to Heth

1. Open Heth → **Settings → OBS Studio**.
2. Choose an available currency/network, caption, theme, optional suggested amount and language. Save the appearance.
3. Approve and create the separate OBS connection, then copy its private URL.
4. In OBS, add a **Browser** source, paste the URL and start with **900 × 500** pixels. Adjust the source to your scene.
5. Scan the receiving QR and check the recipient, currency, network and suggested amount in Heth.

Heth creates the restricted OBS key for you. You do not need a key from the business settings or a webhook server. The connection URL contains the OBS token after `#`; keep it private. The QR displayed to viewers contains receiving details, not the token. Revoke unused or exposed connections in Heth.

## Change the appearance

In Heth, you can change the caption, theme, available currency/network, optional suggested amount and RU/EN language. The connected widget refreshes its saved settings in about 30 seconds.

For arbitrary layout, fonts, colors, animations or alert placement, fork this project and follow [customization](docs/CUSTOMIZATION.md), the [AI guide](AI_GUIDE.md) and [hosting instructions](docs/HOSTING.md). A custom build must be hosted; keeping a fork on GitHub does not serve the widget to OBS.

## Develop and preview

Use Node.js 24 and npm, matching the repository's CI configuration.

```sh
npm ci
npm run check:docs
npm test
npm run lint
npm run build
npm run dev
```

Open [English preview](http://localhost:5174/widget/donations?preview=1&lang=en) or [Russian preview](http://localhost:5174/widget/donations?preview=1&lang=ru). Preview uses sample data without API requests or account credentials; its QR cannot open a payment. Use it to check layout at your intended OBS dimensions.

Vite serves the app at `/widget/donations`. [Host your build](docs/HOSTING.md) to use it as your own OBS source.

## Receiving and alerts

The receiving account comes from the authenticated Heth API. Changing the caption does not change the recipient. The restricted OBS connection can read its receiving identifier, appearance and incoming event feed; it cannot read balances/full history, change settings or send money.

The feed contains incoming transfers marked `charged`. It does not provide donor names or messages. A transfer is not automatically an attributed donation to a particular author or platform. Check receipt in Heth history.

The widget displays at most three alerts, each for ten seconds, and keeps a bounded queue. It follows cursor pages and deduplicates repeated events. A fresh source starts with new events; a saved cursor can resume within 24 hours. Revoked access stops polling.

Amounts arrive as exact integer strings with their recorded decimal precision. `formatMinorUnits` preserves every digit; if precision is unavailable, the amount remains unknown. Do not use floating-point conversion or relabel a token as another currency.

## Use Heth MCP

Connect your assistant through [Heth MCP](https://docs.heth.me/ai/mcp) and approve the needed OBS permissions in Heth.

| Tool | What it does |
| --- | --- |
| `get_obs_widget` | Reads your receiving identifier and saved appearance; no OBS token is returned. |
| `list_obs_events` | Reads the limited incoming event feed. |
| `prepare_obs_connection` | Returns a Heth link to review proposed settings; it creates no access key. |
| `update_obs_widget` | Changes caption, theme, suggested amount or language after confirmation in the AI client. |

Choose currency/network and approve access in Heth. OBS access and MCP permissions are separate and are revoked separately. MCP handles account settings; a coding assistant with access to your fork handles arbitrary HTML/React/CSS changes. MCP does not edit a repository, deploy your custom build or control OBS scenes and streaming. A layout assistant does not need your private connection URL.

## Support

If you find this widget useful, you can support its development through Heth:

- [gavinrabor](https://app.heth.me/d/donate/@gavinrabor)
- [spiridonovmv](https://app.heth.me/d/donate/@spiridonovmv)

Donations are optional.

## License

Source code is licensed under [MIT](LICENSE). Third-party dependencies retain their own licenses; bundled notices are in [THIRD_PARTY_NOTICES.txt](public/THIRD_PARTY_NOTICES.txt).
