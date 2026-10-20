import test from "node:test";
import assert from "node:assert/strict";
import {
  formatMinorUnits,
  paymentUrl,
  readSettings,
  mergeEvents,
} from "../src/utils/widget.js";
test("exact fractions, small and large amounts, no guessed decimals", () => {
  assert.equal(formatMinorUnits("1250000", 6, "en"), "1.25");
  assert.equal(formatMinorUnits("1", 18, "en"), "0.000000000000000001");
  assert.equal(
    formatMinorUnits("9007199254740993123456", 6, "en"),
    "9,007,199,254,740,993.123456",
  );
  assert.equal(formatMinorUnits("1", null), null);
  assert.equal(formatMinorUnits("bad", 6), null);
});
test("QR preserves explicit asset, network, environment and amount", () => {
  const settings = readSettings(
    "https://example.com/widget/donations?currency=USDT&network=TRX&env=test&amount=1.25",
  );
  const url = new URL(paymentUrl(settings, "own-account"));
  assert.equal(url.searchParams.get("network"), "TRX");
  assert.equal(url.searchParams.get("currency"), "USDT");
  assert.equal(url.searchParams.get("env"), "test");
  assert.equal(url.searchParams.get("amount"), "1.25");
  assert.equal(url.searchParams.get("address"), "own-account");
});
test("token lives in fragment; invalid settings fail before requests", () => {
  const settings = readSettings(
    "https://example.com/widget/donations#token=fixture",
  );
  assert.equal(settings.token, "fixture");
  assert.equal(settings.env, "prod");
  for (const query of [
    "env=unknown",
    "amount=0",
    "amount=-1",
    "amount=1e6",
    "network=WRONG",
  ])
    assert.throws(() =>
      readSettings("https://example.com/widget/donations?" + query),
    );
  assert.equal(
    readSettings("https://example.com/widget/donations?api_key=old").legacyKey,
    true,
  );
});
test("retry/page duplicates are not displayed twice; only charged events count", () => {
  const seen = new Set();
  assert.equal(
    mergeEvents(seen, [
      { id: "1", status: "pending" },
      { id: "2", status: "charged" },
    ]).length,
    1,
  );
  assert.equal(
    mergeEvents(seen, [
      { id: "2", status: "charged" },
      { id: "3", status: "charged" },
    ]).length,
    1,
  );
});
test("preview QR cannot initiate a real payment", () => {
  assert.equal(
    paymentUrl(
      readSettings("https://example.com/widget/donations?preview=1"),
      "recipient",
    ),
    "Heth widget preview — not a payment",
  );
});
