# Customize the widget with an AI assistant

You do not need to be a developer to describe a design, but a custom build still needs to be built and hosted. A coding assistant with access to your fork can do that work with you. The Heth MCP connection manages account settings; it does not give an assistant access to your source files or a hosting account.

## A practical workflow

1. Fork or download this repository and open it in your coding assistant.
2. Ask the assistant to read `AGENTS.md` and `docs/CUSTOMIZATION.md` first.
3. Describe the layout, source dimensions, language and style. Use preview mode instead of a real connection URL.
4. Review the rendered result and ask for adjustments. Run the tests/lint/build before hosting.
5. Host your build following `docs/HOSTING.md`. Create restricted OBS access in Heth, then use your private connection URL with the trusted host you control.

**Never paste your private OBS connection URL into a public issue or AI prompt.** An assistant can make the entire layout using the preview. Add the connection secret yourself when configuring the OBS source.

## Example prompts

> Read AGENTS.md. Make a 900 × 500 overlay for a dark gaming stream. Place the receiving QR on the left and three compact incoming-payment alerts on the right. Use a transparent background and lime accents. Keep the QR high contrast, preserve exact amounts and show the result in English preview mode. Run tests, lint and build. Do not use real credentials.

> Прочитай AGENTS.md. Сделай компактную вертикальную вёрстку для источника OBS шириной 320 пикселей: QR сверху, уведомления ниже, белый текст и фиолетовые акценты. Используй русский предпросмотр. Не меняй получателя, валюту, сеть и логику доступа. Покажи результат и проверь сборку.

> Add a custom presentation for the existing `minimal` theme: large amount text, rounded alert cards and no entrance animation. Do not create a new backend theme identifier. Use synthetic events containing 1.250001 USDT and 0.000000000000000001 ETH to check precision and wrapping.

## Useful information to give the assistant

- Browser-source dimensions and where it sits in the scene.
- Horizontal/vertical layout; QR and alert positions.
- Colors, font preferences and text sizes.
- Language and caption; whether motion should be reduced.
- A screenshot or description of your stream layout, with private URLs and keys removed.

A donor name/message, custom sound, external image feed or arbitrary new account setting is not automatically available just because the layout can render it. The assistant should identify the real data contract before promising such a feature.

## Before you use the build

Check the preview in your actual OBS scene. Scan the *live receiving QR* only after connecting the real account yourself, and review its recipient, currency, network and suggested amount in Heth before accepting any payment. Preview QR codes deliberately cannot initiate a payment. Receipt must still be verified in Heth history.
