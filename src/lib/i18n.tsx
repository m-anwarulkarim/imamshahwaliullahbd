import * as React from "react";

export type Lang = "en" | "bn" | "ar";

export type LocalizedText = { en: string; bn: string; ar: string };

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "bn", label: "Bangla", nativeLabel: "বাংলা", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
];

const STORAGE_KEY = "iswdri-lang";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  /** Pick the string for the current language. Accepts a {en,bn,ar} object. */
  t: (text: LocalizedText) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "bn" || value === "ar";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with "en" on both server and client to keep hydration stable,
  // then switch to the stored preference after mount.
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    html.setAttribute("data-lang", lang);
  }, [lang, dir]);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = React.useCallback(
    (text: LocalizedText) => text[lang] || text.en,
    [lang],
  );

  const value = React.useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback (e.g. admin area rendered outside the provider)
    return {
      lang: "en",
      dir: "ltr",
      setLang: () => {},
      t: (text) => text.en,
    };
  }
  return ctx;
}

/** Convenience: render localized text inline. */
export function T({ en, bn, ar }: LocalizedText) {
  const { t } = useLanguage();
  return <>{t({ en, bn, ar })}</>;
}
