# Customize the widget with an AI assistant

Use a coding assistant to change the layout in your own copy of this repository. Use [Heth MCP](https://docs.heth.me/ai/mcp) to manage supported settings of your Heth account. These are different workflows.

## Change ordinary Heth settings

For caption, an existing theme, suggested amount or RU/EN language, ask your connected assistant to read the widget settings and propose the change. Confirm the appearance update in the AI client. Choose currency/network, create OBS access or revoke a connection in Heth.

For example: “Use an English caption and the minimal theme for my OBS widget”. MCP permissions and OBS access are approved and revoked separately. The assistant does not receive your OBS key or control OBS Studio.

## Build your own layout

1. Fork or download this repository and open it in your coding assistant.
2. Ask it to read [AGENTS.md](AGENTS.md), [customization](docs/CUSTOMIZATION.md) and [hosting](docs/HOSTING.md).
3. Describe the source dimensions, layout, colors, fonts and language. Use the credential-free preview for design work.
4. Review the rendered result at the intended source size. Run `npm run check:docs`, `npm test`, `npm run lint` and `npm run build`.
5. Host the build using the same-origin API proxy described in the hosting guide.
6. Create OBS access in Heth and add the private URL directly in OBS yourself, using your trusted host for a custom build.

A private connection URL is not needed to edit the design. Do not paste it into a public issue or an AI prompt.

## Example prompts

> Read AGENTS.md. Make a 900 × 500 overlay for a dark gaming stream. Place the receiving QR on the left and three compact incoming-payment alerts on the right. Use a transparent background, white text and lime accents. Keep the QR high contrast and preserve exact amounts. Show the English preview and run the documented checks. Use sample data without credentials.

> Прочитай AGENTS.md. Сделай вертикальный виджет шириной 320 пикселей: QR сверху, уведомления ниже, белый текст и фиолетовые акценты. Покажи русский предпросмотр. Сохрани получателя, валюту, сеть и логику доступа. Проверь точность сумм, читаемость QR и сборку.

> Restyle the existing minimal theme with large amount text, rounded alert cards and reduced motion. Keep the existing saved theme identifier. Use sample amounts 1.250001 USDT and 0.000000000000000001 ETH to verify precision and wrapping. Do not request an account key.

## Data and display

The default feed includes exact amounts and precision, currency/network, status, timestamp and an event identifier for deduplication. It does not include donor names or messages. The assistant should work from those fields rather than inventing data or treating every incoming transfer as an attributed donation.

For custom fonts, sounds or external images, describe the desired assets and their usage rights. The coding assistant can add presentation behavior in the fork; any new backend data or saved account setting needs an actual supported API.

Preview QR codes cannot initiate a payment. After connecting your account, scan the receiving QR and check its recipient, currency, network and suggested amount in Heth. Verify receipt in Heth history.
