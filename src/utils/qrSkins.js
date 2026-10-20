/**
 * Конфигурации скинов для QR кодов
 * Используются все возможности react-qrcode-logo для кастомизации
 *
 * Базовые параметры (ecLevel, size, quietZone) заданы в компоненте
 * Здесь только визуальная кастомизация: цвета, стили, логотипы
 */

export const QR_SKINS = {
  // Классический черно-белый с логотипом
  default: {
    bgColor: "#ffffff",
    fgColor: "#000000",
    logoImage: "/widget/logo.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
  },

  // Неоновый зеленый (как в терминале)
  neon: {
    bgColor: "#000000",
    fgColor: "#00ff41",
    logoImage: "/widget/logo-neon.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeRadius: [
      [10, 10, 0, 10], // top-left eye
      [10, 10, 10, 0], // top-right eye
      [10, 0, 10, 10], // bottom-left eye
    ],
  },

  // Градиент фиолетовый
  purple: {
    bgColor: "#ffffff",
    fgColor: "#8b5cf6",
    logoImage: "/widget/logo-purple.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeRadius: [
      [15, 15, 0, 15],
      [15, 15, 15, 0],
      [15, 0, 15, 15],
    ],
    qrStyle: "dots",
  },

  // Синий корпоративный (логотип как водяной знак)
  corporate: {
    bgColor: "#ffffff",
    fgColor: "#0f172a",
    logoImage: "/widget/logo-corporate.svg",
    logoWidth: 270, // 90% от 300px размера QR
    logoHeight: 270,
    removeQrCodeBehindLogo: false, // Логотип НА ФОНЕ, не вырезая код
    logoPaddingStyle: "square",
    qrStyle: "fluid",
    logoPadding: 0,
    logoOpacity: 1, // Прозрачность уже в SVG (0.08)
    eyeRadius: 3,
  },

  // Красный энергичный
  energy: {
    bgColor: "#1a1a1a",
    fgColor: "#ef4444",
    logoImage: "/widget/logo-red.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeColor: [
      {
        outer: "#ef4444",
        inner: "#dc2626",
      },
      {
        outer: "#ef4444",
        inner: "#dc2626",
      },
      {
        outer: "#ef4444",
        inner: "#dc2626",
      },
    ],
  },

  // Золотой премиум
  gold: {
    bgColor: "#000000",
    fgColor: "#fbbf24",
    logoImage: "/widget/logo-gold.svg",
    logoWidth: 65,
    logoHeight: 65,
    removeQrCodeBehindLogo: true,
    qrStyle: "dots",
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeRadius: [
      [10, 10, 0, 10],
      [10, 10, 10, 0],
      [10, 0, 10, 10],
    ],
  },

  // Голубой минималистичный
  minimal: {
    bgColor: "#ffffff",
    fgColor: "#3b82f6",
    logoImage: "/widget/logo-blue.svg",
    logoWidth: 50,
    logoHeight: 50,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 0.9,
  },

  // Темный с точками
  dark: {
    bgColor: "#18181b",
    fgColor: "#e4e4e7",
    logoImage: "/widget/logo-light.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    qrStyle: "dots",
    eyeRadius: 8,
  },

  // Розовый игровой
  gaming: {
    bgColor: "#1e1b4b",
    fgColor: "#ec4899",
    logoImage: "/widget/logo-gaming.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeColor: [
      {
        outer: "#ec4899",
        inner: "#db2777",
      },
      {
        outer: "#a855f7",
        inner: "#9333ea",
      },
      {
        outer: "#06b6d4",
        inner: "#0891b2",
      },
    ],
    eyeRadius: [
      [15, 15, 0, 15],
      [15, 15, 15, 0],
      [15, 0, 15, 15],
    ],
  },

  // Оранжевый креативный
  creative: {
    bgColor: "#fffbeb",
    fgColor: "#f97316",
    logoImage: "/widget/logo-orange.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    qrStyle: "dots",
    eyeRadius: [
      [20, 20, 0, 20],
      [20, 20, 20, 0],
      [20, 0, 20, 20],
    ],
  },

  // Без логотипа - простой
  simple: {
    bgColor: "#ffffff",
    fgColor: "#000000",
    qrStyle: "squares",
  },

  // Киберпанк
  cyberpunk: {
    bgColor: "#0a0a0a",
    fgColor: "#00ffff",
    logoImage: "/widget/logo-cyber.svg",
    logoWidth: 60,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    logoPaddingStyle: "circle",
    logoOpacity: 1,
    eyeColor: [
      {
        outer: "#00ffff",
        inner: "#ff00ff",
      },
      {
        outer: "#ff00ff",
        inner: "#00ffff",
      },
      {
        outer: "#00ff00",
        inner: "#ffff00",
      },
    ],
    eyeRadius: 5,
    qrStyle: "dots",
  },
};

/**
 * Получить конфигурацию скина по идентификатору
 * @param {string} skinId - Идентификатор скина
 * @returns {object} Конфигурация скина или default
 */
export const getQRSkin = (skinId) => {
  return QR_SKINS[skinId] || QR_SKINS.default;
};

/**
 * Получить тему для уведомлений на основе скина QR кода
 * @param {string} skinId - Идентификатор скина
 * @returns {object} Конфигурация темы уведомления
 */
export const getNotificationTheme = (skinId) => {
  const themes = {
    default: {
      background: "rgba(255, 255, 255, 0.95)",
      borderColor: "#000000",
      textColor: "#000000",
      accentColor: "#000000",
      titleColor: "#000000",
    },
    neon: {
      background: "rgba(0, 0, 0, 0.95)",
      borderColor: "#00ff41",
      textColor: "#00ff41",
      accentColor: "#00ff41",
      titleColor: "#00ff41",
      glow: "0 0 10px rgba(0, 255, 65, 0.5)",
    },
    purple: {
      background: "rgba(255, 255, 255, 0.95)",
      borderColor: "#8b5cf6",
      textColor: "#1f2937",
      accentColor: "#8b5cf6",
      titleColor: "#8b5cf6",
    },
    corporate: {
      background: "rgba(248, 250, 252, 0.98)",
      borderColor: "#0f172a",
      textColor: "#0f172a",
      accentColor: "#0f172a",
      titleColor: "#0f172a",
    },
    energy: {
      background: "rgba(26, 26, 26, 0.95)",
      borderColor: "#ef4444",
      textColor: "#ffffff",
      accentColor: "#ef4444",
      titleColor: "#ef4444",
    },
    gold: {
      background: "rgba(0, 0, 0, 0.95)",
      borderColor: "#fbbf24",
      textColor: "#fbbf24",
      accentColor: "#fbbf24",
      titleColor: "#fbbf24",
      glow: "0 0 15px rgba(251, 191, 36, 0.4)",
    },
    minimal: {
      background: "rgba(255, 255, 255, 0.98)",
      borderColor: "#3b82f6",
      textColor: "#1f2937",
      accentColor: "#3b82f6",
      titleColor: "#3b82f6",
    },
    dark: {
      background: "rgba(24, 24, 27, 0.95)",
      borderColor: "#e4e4e7",
      textColor: "#e4e4e7",
      accentColor: "#a1a1aa",
      titleColor: "#e4e4e7",
    },
    gaming: {
      background: "rgba(30, 27, 75, 0.95)",
      borderColor: "#ec4899",
      textColor: "#ffffff",
      accentColor: "#ec4899",
      titleColor: "#ec4899",
      glow: "0 0 20px rgba(236, 72, 153, 0.5)",
    },
    creative: {
      background: "rgba(255, 251, 235, 0.95)",
      borderColor: "#f97316",
      textColor: "#1f2937",
      accentColor: "#f97316",
      titleColor: "#f97316",
    },
    simple: {
      background: "rgba(255, 255, 255, 0.95)",
      borderColor: "#000000",
      textColor: "#000000",
      accentColor: "#000000",
      titleColor: "#000000",
    },
    cyberpunk: {
      background: "rgba(10, 10, 10, 0.95)",
      borderColor: "#00ffff",
      textColor: "#00ffff",
      accentColor: "#ff00ff",
      titleColor: "#00ffff",
      glow: "0 0 15px rgba(0, 255, 255, 0.6)",
    },
  };

  return themes[skinId] || themes.default;
};

/**
 * Получить список всех доступных скинов
 * @returns {Array<{id: string, name: string, description: string}>}
 */
export const getAvailableSkins = () => {
  return [
    {
      id: "default",
      name: "Классический",
      description: "Черно-белый с логотипом",
    },
    { id: "neon", name: "Неоновый", description: "Зеленый терминальный стиль" },
    {
      id: "purple",
      name: "Фиолетовый",
      description: "Элегантный фиолетовый с точками",
    },
    {
      id: "corporate",
      name: "Корпоративный",
      description: "Строгий синий стиль",
    },
    { id: "energy", name: "Энергичный", description: "Красный динамичный" },
    { id: "gold", name: "Золотой", description: "Премиум золотой на черном" },
    { id: "minimal", name: "Минимализм", description: "Простой голубой" },
    { id: "dark", name: "Темный", description: "Темная тема с точками" },
    { id: "gaming", name: "Игровой", description: "Яркий розово-фиолетовый" },
    {
      id: "creative",
      name: "Креативный",
      description: "Оранжевый с округлыми углами",
    },
    {
      id: "simple",
      name: "Простой",
      description: "Без логотипа, минимум настроек",
    },
    {
      id: "cyberpunk",
      name: "Киберпанк",
      description: "Неоновый многоцветный",
    },
  ];
};
