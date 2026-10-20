import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  formatMinorUnits,
  mergeEvents,
  paymentUrl,
  readSettings,
} from "./utils/widget";
import "./App.css";

const copy = {
  ru: {
    title: "Поддержать стрим",
    scan: "Наведите камеру телефона",
    incoming: "Получен перевод",
    connected: "Уведомления подключены",
    retry: "Восстанавливаем соединение",
    qr: "QR для получения",
    setup: "Подключите виджет в Heth",
    hint: "Создайте отдельный доступ OBS в настройках Heth и добавьте полученную ссылку как браузерный источник.",
    open: "Открыть настройки Heth",
    invalid: "Проверьте настройки виджета",
    expired: "Доступ виджета отключён. Подключите его заново в Heth.",
    legacy:
      "Старое подключение с API-ключом больше не используется. Создайте доступ OBS в Heth.",
    pending: "Сумма уточняется",
    preview: "Предпросмотр · пример",
    test: "Тестовый контур",
    waiting: "Подключаем уведомления",
  },
  en: {
    title: "Support the stream",
    scan: "Scan with your phone camera",
    incoming: "Transfer received",
    connected: "Alerts connected",
    retry: "Reconnecting",
    qr: "Receiving QR",
    setup: "Connect this widget in Heth",
    hint: "Create separate OBS access in Heth settings, then add the resulting URL as a browser source.",
    open: "Open Heth settings",
    invalid: "Check widget settings",
    expired: "Widget access was disabled. Reconnect it in Heth.",
    legacy:
      "The old API-key connection is no longer used. Create OBS access in Heth.",
    pending: "Amount unavailable",
    preview: "Preview · sample",
    test: "Test environment",
    waiting: "Connecting alerts",
  },
};

export default function DonationWidget() {
  const parsed = useMemo(() => {
    try {
      return { settings: readSettings(window.location.href) };
    } catch {
      return { error: true };
    }
  }, []);
  const settings = parsed.settings;
  const t = copy[settings?.locale || "ru"];
  const [appearance, setAppearance] = useState(settings);
  const [recipient, setRecipient] = useState(settings?.recipient || "");
  const [status, setStatus] = useState(settings?.token ? "waiting" : "qr");
  const [events, setEvents] = useState([]);
  const pendingEvents = useRef([]);
  const visibleEvents = useRef([]);

  useEffect(() => {
    if (!settings?.token || settings.legacyKey || settings.preview) return;
    pendingEvents.current = [];
    let closed = false;
    let timer;
    let controller;
    let cursor = null;
    let initialized = false;
    let configurationReadAt = 0;
    const seen = new Set();
    const storageKey = `heth.obs.cursor:${settings.env}:${settings.token.slice(-8)}`;
    try {
      cursor = sessionStorage.getItem(storageKey);
    } catch {
      /* Storage may be disabled in OBS. */
    }
    async function get(path) {
      controller = new AbortController();
      const response = await fetch(path, {
        headers: { "x-api-key": settings.token },
        signal: controller.signal,
        redirect: "error",
        cache: "no-store",
      });
      if (!response.ok) {
        const error = new Error("request_failed");
        error.status = response.status;
        throw error;
      }
      return response.json();
    }
    async function poll() {
      let delay = 2000;
      // Back pressure: retain fetched events until shown before requesting more pages.
      if (pendingEvents.current.length >= 100) {
        timer = setTimeout(poll, delay);
        return;
      }
      try {
        if (!initialized || Date.now() - configurationReadAt > 30000) {
          const config = await get(`/api/v1/obs/widget?env=${settings.env}`);
          if (closed) return;
          if (
            typeof config.recipient !== "string" ||
            !config.recipient ||
            (settings.recipient && config.recipient !== settings.recipient)
          )
            throw new Error("recipient_mismatch");
          setRecipient(config.recipient);
          if (config.settings) {
            const options = new URLSearchParams({
              env: settings.env,
              currency: config.settings.currency,
              network: config.settings.network,
              text1: config.settings.caption || "",
              qr_skin: config.settings.theme,
              amount: config.settings.amount || "",
              lang: config.settings.locale,
            });
            setAppearance(
              readSettings("https://app.heth.me/widget/donations?" + options),
            );
          }
          initialized = true;
          configurationReadAt = Date.now();
        }
        const query = new URLSearchParams({ env: settings.env });
        if (cursor) query.set("cursor", cursor);
        const page = await get(`/api/v1/obs/events?${query}`);
        if (closed) return;
        if (!Array.isArray(page.data) || typeof page.cursor !== "string")
          throw new Error("invalid_response");
        pendingEvents.current.push(...mergeEvents(seen, page.data));
        cursor = page.cursor;
        try {
          sessionStorage.setItem(storageKey, cursor);
        } catch {
          /* In-memory cursor still works. */
        }
        setStatus("connected");
        if (page.has_more) delay = 150;
      } catch (error) {
        if (closed || error.name === "AbortError") return;
        if (
          [401, 403].includes(error.status) ||
          error.message === "recipient_mismatch"
        ) {
          setStatus("expired");
          return;
        }
        if (error.status === 422) {
          cursor = null;
          try {
            sessionStorage.removeItem(storageKey);
          } catch {
            /* Optional persistence. */
          }
        }
        setStatus("retry");
        delay = 5000;
      }
      if (!closed) timer = setTimeout(poll, delay);
    }
    poll();
    return () => {
      closed = true;
      clearTimeout(timer);
      controller?.abort();
    };
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      const previous = visibleEvents.current;
      const visible = previous.filter(
        (row) => Date.now() - row.displayedAt < 10000,
      );
      const additions = pendingEvents.current.splice(
        0,
        Math.max(0, 3 - visible.length),
      );
      if (visible.length === previous.length && !additions.length) return;
      const next = [
        ...visible,
        ...additions.map((row) => ({ ...row, displayedAt: Date.now() })),
      ];
      visibleEvents.current = next;
      setEvents(next);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  if (
    !settings ||
    settings.legacyKey ||
    (!recipient && !settings.token && !settings.preview)
  )
    return (
      <main className="widget-setup">
        <img src="/widget/logo.svg" alt="Heth" />
        <h1>{parsed.error ? t.invalid : t.setup}</h1>
        <p>{settings?.legacyKey ? t.legacy : t.hint}</p>
        <a href="https://app.heth.me/settings/obs">{t.open}</a>
      </main>
    );
  const visual = appearance || settings;
  const labels = copy[visual.locale];
  const demo = settings.preview
    ? [
        {
          id: "preview",
          amount: "1250000",
          decimals: 6,
          currency: "USDT",
          network: settings.network,
        },
      ]
    : events;
  return (
    <main className={`overlay theme-${visual.theme}`} aria-label="Heth OBS">
      <section className="receive-card">
        <header>
          <img src="/widget/logo.svg" alt="Heth" />
          <span>
            Heth<span className="brand-dot">.</span>me
          </span>
          <span className="network-badge">{visual.network}</span>
        </header>
        <h1>{visual.caption || labels.title}</h1>
        <div className="qr-paper">
          {recipient || settings.preview ? (
            <QRCodeSVG
              value={paymentUrl(
                { ...visual, preview: settings.preview },
                recipient,
              )}
              size={192}
              level="M"
              marginSize={4}
              bgColor="#fff"
              fgColor="#111"
              title={labels.scan}
            />
          ) : (
            <div className="qr-placeholder">{labels.waiting}</div>
          )}
        </div>
        <div className="payment-amount">
          {visual.amount
            ? `${visual.amount} ${visual.currency}`
            : visual.currency}
        </div>
        <p className="scan-hint">
          {settings.preview ? labels.preview : labels.scan}
        </p>
        <footer>
          <i className={status === "connected" ? "connected" : ""} />
          {settings.preview
            ? labels.preview
            : settings.env === "test"
              ? labels.test
              : labels[status]}
        </footer>
        {status === "expired" && (
          <p className="connection-error">{labels.expired}</p>
        )}
      </section>
      <section
        className="event-stack"
        aria-live="polite"
        aria-label={labels.incoming}
      >
        {demo.map((row) => (
          <article key={row.id} className="transfer-alert">
            <span className="alert-icon" aria-hidden="true">
              ↙
            </span>
            <div>
              <p>{settings.preview ? labels.preview : labels.incoming}</p>
              <strong>
                {formatMinorUnits(row.amount, row.decimals, visual.locale) ??
                  labels.pending}
                <small> {row.currency}</small>
              </strong>
              <span className="alert-network">{row.network}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
