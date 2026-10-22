# Heth.me OBS widget

[Public source and forks](https://github.com/Heth-me/obs-widget) · [Report an issue](https://github.com/Heth-me/obs-widget/issues)

A transparent receiving QR and incoming-payment overlay for an OBS Studio **Browser source**. It does not control OBS scenes or streaming and needs no native plugin.

The updated connection requires coordinated backend, Heth PWA and widget releases. It has not been accepted in production. The connection guide will be published in [Heth documentation](https://docs.heth.me/) with the service release. You can customize the widget now using preview mode; live alerts require the restricted backend API.

## Connect after release

Open Heth → Settings → OBS Studio. Choose an available currency/network, appearance and language. Approve separate OBS access, copy its URL and paste it into an OBS Browser source (start at 900 × 500). Keep the URL private. Revoke access in Heth when finished.

Use only the `obs`-scoped access created by Heth. The old `api_key=` URL and general account keys are not supported. The secret is in the URL fragment `#token=...`, never in the displayed receiving QR. No token is needed for `?preview=1&lang=en`; its QR contains a non-payment preview string.

## Local development

```sh
npm ci
npm test
npm run lint
npm run build
npm run dev
```

The app is mounted at `/widget/donations`. Vite proxies `/api` to `https://app.heth.me` by default; an operator can set `OBS_API_TARGET` for an isolated fixture API. Do not use real account keys in examples or fixture logs. Production uses the existing same-origin nginx `/widget/` alias.

## API and exact amounts

The restricted widget reads `/api/v1/obs/widget` and `/api/v1/obs/events`, with an explicit env. It does not request profiles or general transaction history. Receiving identity comes from the authenticated backend. Amounts are exact minor-unit strings plus stored decimals; missing decimals remain unknown. QR explicitly includes recipient, currency, network and environment.

Events are incoming charged transfers, not automatically author/platform donations. Read all cursor pages, deduplicate IDs and retain a bounded seen set. A bounded display queue applies back pressure to polling; up to three alerts remain visible for ten seconds. A fresh stream begins at the current second; a saved cursor can resume within 24 hours. This is not an immutable event log; verify final receipt in Heth history. Appearance refreshes within about 30 seconds. Revoked/unauthorized access stops polling.

## AI integration

The planned remote Heth MCP integration includes `get_obs_widget`, `list_obs_events`, `prepare_obs_connection` and `update_obs_widget`, subject to consent/current account permissions. Ordinary appearance changes require AI-client approval; creating/revoking access requires Heth approval. The assistant gets a Heth review link and never receives the private Browser source URL. MCP does not connect to OBS WebSocket or control OBS itself. HTTP/OAuth release integration is tracked separately; the presence of these tools in source is not a public endpoint announcement.

## Verification limits

Pure tests cover precision, URL fields, validation, duplicates and non-payment previews. Backend tests check owner/env isolation and pagination; PWA tests check explicit permission creation and private URL generation. Local browser fixtures use synthetic events. Native OBS/CEF and live authorized payment acceptance remain release checks.

## Custom layouts and AI assistance

No source access is needed for the supported Heth appearance settings. For arbitrary layouts, modify and host a fork of this frontend. Start with [AI_GUIDE.md](AI_GUIDE.md), [AGENTS.md](AGENTS.md), [customization](docs/CUSTOMIZATION.md) and [custom hosting](docs/HOSTING.md). A coding assistant can work on preview data; it never needs your private OBS URL. The Heth MCP connection manages supported account settings and does not edit or deploy a fork. No built-in HTML/CSS editor is planned for this release.

## Support

If you find this widget useful, you can support its development through Heth:

- [gavinrabor](https://app.heth.me/d/donate/@gavinrabor)
- [spiridonovmv](https://app.heth.me/d/donate/@spiridonovmv)

Donations are optional.

## License

Source code is licensed under [MIT](LICENSE). Third-party dependencies retain their own licenses; bundled notices are in [THIRD_PARTY_NOTICES.txt](public/THIRD_PARTY_NOTICES.txt).
