export const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "tr", name: "Türkçe" },
    { code: "ar", name: "العربية" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
    { code: "ko", name: "한국어" },
    { code: "nl", name: "Nederlands" },
    { code: "ru", name: "Русский" },
] as const;

export type LanguageCode = typeof languages[number]['code'];
