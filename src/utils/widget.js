export const THEMES = [
  "default",
  "neon",
  "purple",
  "corporate",
  "energy",
  "gold",
  "minimal",
  "dark",
  "gaming",
  "creative",
  "simple",
  "cyberpunk",
];
export function readSettings(href) {
  const url = new URL(href);
  const p = url.searchParams;
  const hash = new URLSearchParams(url.hash.slice(1));
  const env = p.get("env") || "prod";
  const network = (p.get("network") || "ETH").toUpperCase();
  const currency = (p.get("currency") || "USDT").toUpperCase();
  const amount = p.get("amount") || "";
  const recipient = p.get("recipient") || "";
  const theme = p.get("qr_skin") || "default";
  if (
    !["prod", "test"].includes(env) ||
    !["ETH", "TRX", "BASE"].includes(network) ||
    !/^[A-Z0-9_]{2,16}$/.test(currency)
  )
    throw new Error("invalid_settings");
  if (
    amount &&
    (!/^(?:0|[1-9]\d{0,30})(?:\.\d{1,36})?$/.test(amount) ||
      /^0(?:\.0+)?$/.test(amount))
  )
    throw new Error("invalid_amount");
  if (
    recipient.length > 255 ||
    Array.from(recipient).some(
      (char) => /\s/.test(char) || char.codePointAt(0) < 32,
    )
  )
    throw new Error("invalid_recipient");
  return {
    env,
    network,
    currency,
    amount,
    recipient,
    theme: THEMES.includes(theme) ? theme : "default",
    caption: (p.get("text1") || "").slice(0, 140),
    token: hash.get("token") || "",
    legacyKey: p.has("api_key"),
    preview: p.get("preview") === "1",
    locale: p.get("lang") === "en" ? "en" : "ru",
  };
}
export function paymentUrl(settings, recipient) {
  if (!recipient || settings.preview)
    return "Heth widget preview — not a payment";
  const url = new URL("https://app.heth.me/qr-payment");
  for (const [key, value] of Object.entries({
    address: recipient,
    currency: settings.currency,
    network: settings.network,
    env: settings.env,
    amount: settings.amount,
  }))
    if (value) url.searchParams.set(key, value);
  return url.href;
}
export function formatMinorUnits(amount, decimals, locale = "ru") {
  if (
    typeof amount !== "string" ||
    !/^\d{1,100}$/.test(amount) ||
    !Number.isInteger(decimals) ||
    decimals < 0 ||
    decimals > 36
  )
    return null;
  const digits = amount.padStart(decimals + 1, "0");
  const integer = decimals ? digits.slice(0, -decimals) : digits;
  const fraction = decimals ? digits.slice(-decimals).replace(/0+$/, "") : "";
  return (
    BigInt(integer).toLocaleString(locale === "en" ? "en-US" : "ru-RU") +
    (fraction ? (locale === "en" ? "." : ",") + fraction : "")
  );
}
export function mergeEvents(seen, rows) {
  const fresh = [];
  for (const row of rows) {
    if (
      !row ||
      typeof row.id !== "string" ||
      row.status !== "charged" ||
      seen.has(row.id)
    )
      continue;
    seen.add(row.id);
    fresh.push(row);
  }
  while (seen.size > 1000) seen.delete(seen.values().next().value);
  return fresh;
}
