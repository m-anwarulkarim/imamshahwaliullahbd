import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PdfReaderProps {
  url: string;
  title: string;
}

type PdfDoc = { numPages: number; getPage: (n: number) => Promise<any> };

/** E-book style reader (pdf.js): single page on phones, two-page spread on wide screens. Read-only, no download. */
export function MagazinePdfReader({ url, title }: PdfReaderProps) {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);
  const docRef = useRef<PdfDoc | null>(null);
  const tasks = useRef<Array<{ cancel: () => void }>>([]);
  const touchX = useRef<number | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1); // first page shown
  const [spread, setSpread] = useState(false);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [full, setFull] = useState(false);
  const [flip, setFlip] = useState<"next" | "prev" | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // @ts-expect-error legacy build ships no types; runtime API matches pdfjs-dist
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.min.mjs");
        const workerUrl = (await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        const doc = await pdfjs.getDocument({ url }).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) { setError(true); setLoading(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  // Two-page spread on wide screens
  useEffect(() => {
    const check = () => setSpread((stageRef.current?.clientWidth ?? window.innerWidth) >= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [full]);

  // Pages visible: cover alone, then pairs (2-3, 4-5 ...)
  const pagesShown = useCallback((p: number): number[] => {
    if (!spread || p === 1) return [p];
    const start = p % 2 === 0 ? p : p - 1;
    return start + 1 <= numPages ? [start, start + 1] : [start];
  }, [spread, numPages]);

  const shown = pagesShown(page);

  useEffect(() => {
    const doc = docRef.current;
    const stage = stageRef.current;
    if (!doc || !stage || loading) return;
    let cancelled = false;
    tasks.current.forEach((x) => x.cancel());
    tasks.current = [];

    (async () => {
      const canvases = [leftRef.current, rightRef.current];
      const availW = stage.clientWidth - 16;
      const availH = (full ? window.innerHeight - 120 : window.innerHeight * 0.78);
      for (let i = 0; i < 2; i++) {
        const canvas = canvases[i];
        if (!canvas) continue;
        const n = shown[i];
        if (!n) { canvas.style.display = "none"; continue; }
        canvas.style.display = "block";
        const pg = await doc.getPage(n);
        if (cancelled) return;
        const base = pg.getViewport({ scale: 1 });
        const fit = Math.min(availW / shown.length / base.width, availH / base.height);
        const vp = pg.getViewport({ scale: fit * scale });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = vp.width * dpr;
        canvas.height = vp.height * dpr;
        canvas.style.width = `${vp.width}px`;
        canvas.style.height = `${vp.height}px`;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const task = pg.render({ canvasContext: ctx, viewport: vp });
        tasks.current.push(task);
        try { await task.promise; } catch { /* cancelled */ }
      }
    })();
    return () => { cancelled = true; tasks.current.forEach((x) => x.cancel()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, spread, scale, loading, full, numPages]);

  const go = useCallback((dir: 1 | -1) => {
    setPage((p) => {
      const cur = pagesShown(p);
      const next = dir === 1 ? (cur[cur.length - 1] ?? p) + 1 : (cur[0] ?? p) - 1;
      if (next < 1 || next > numPages) return p;
      setFlip(dir === 1 ? "next" : "prev");
      setTimeout(() => setFlip(null), 350);
      return next;
    });
  }, [pagesShown, numPages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void wrapRef.current?.requestFullscreen?.();
  };

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl border border-primary/10 bg-muted p-6 text-center text-muted-foreground">
        {t({ en: "The reader could not load this issue. Please refresh and try again.", bn: "রিডার এই সংখ্যাটি লোড করতে পারেনি। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।", ar: "تعذر تحميل هذا العدد. يرجى تحديث الصفحة والمحاولة مرة أخرى." })}
      </div>
    );
  }

  const first = shown[0] ?? 1;
  const last = shown[shown.length - 1] ?? first;
  const atStart = first <= 1;
  const atEnd = last >= numPages;
  const label = shown.length === 2 ? `${shown[0]}–${shown[1]}` : `${shown[0]}`;
  const btn = "rounded-lg p-2 text-primary transition-colors hover:bg-primary/10 disabled:opacity-30";

  return (
    <div
      ref={wrapRef}
      className={cn("overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 shadow-xl select-none", full && "flex flex-col rounded-none bg-background")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary/10 bg-card/90 px-3 py-2 backdrop-blur">
        <p className="hidden truncate text-sm font-semibold text-primary md:block md:max-w-[40%]">{title}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => go(-1)} disabled={atStart} aria-label={t({ en: "Previous page", bn: "আগের পৃষ্ঠা", ar: "الصفحة السابقة" })} className={btn}><ChevronLeft className="h-5 w-5" /></button>
          <span className="min-w-24 text-center text-sm font-medium">{loading ? "…" : `${label} / ${numPages}`}</span>
          <button onClick={() => go(1)} disabled={!numPages || atEnd} aria-label={t({ en: "Next page", bn: "পরের পৃষ্ঠা", ar: "الصفحة التالية" })} className={btn}><ChevronRight className="h-5 w-5" /></button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(1)))} aria-label={t({ en: "Zoom out", bn: "ছোট করুন", ar: "تصغير" })} className={btn}><ZoomOut className="h-5 w-5" /></button>
          <button onClick={() => setScale((s) => Math.min(3, +(s + 0.2).toFixed(1)))} aria-label={t({ en: "Zoom in", bn: "বড় করুন", ar: "تكبير" })} className={btn}><ZoomIn className="h-5 w-5" /></button>
          <button onClick={toggleFull} aria-label={t({ en: "Full screen", bn: "পূর্ণ পর্দা", ar: "ملء الشاشة" })} className={btn}>{full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}</button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={cn("relative flex min-h-[60vh] items-center justify-center overflow-auto p-2 md:p-6", full && "flex-1")}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          if (touchX.current == null || scale > 1) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{t({ en: "Opening the magazine…", bn: "ম্যাগাজিন খোলা হচ্ছে…", ar: "جاري فتح المجلة…" })}</p>
          </div>
        )}
        {/* Click zones for page turning */}
        {!loading && scale <= 1 && (
          <>
            <button aria-label={t({ en: "Previous page", bn: "আগের পৃষ্ঠা", ar: "الصفحة السابقة" })} onClick={() => go(-1)} className="absolute inset-y-0 left-0 z-10 w-[15%] cursor-w-resize" />
            <button aria-label={t({ en: "Next page", bn: "পরের পৃষ্ঠা", ar: "الصفحة التالية" })} onClick={() => go(1)} className="absolute inset-y-0 right-0 z-10 w-[15%] cursor-e-resize" />
          </>
        )}
        <div
          className={cn(
            "flex items-stretch shadow-2xl transition-all duration-300 ease-out",
            loading && "invisible",
            flip === "next" && "opacity-60 [transform:perspective(1600px)_rotateY(-8deg)]",
            flip === "prev" && "opacity-60 [transform:perspective(1600px)_rotateY(8deg)]",
          )}
          dir="ltr"
        >
          <canvas ref={leftRef} aria-label={title} className={cn("bg-card", shown.length === 2 && "rounded-l-md border-r border-primary/20")} />
          <canvas ref={rightRef} aria-label={title} className="rounded-r-md bg-card" />
        </div>
      </div>

      {!loading && numPages > 1 && (
        <div className="border-t border-primary/10 bg-card/90 px-4 py-3">
          <input
            type="range"
            min={1}
            max={numPages}
            value={first}
            onChange={(e) => setPage(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label={t({ en: "Page", bn: "পৃষ্ঠা", ar: "الصفحة" })}
          />
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {t({ en: "Swipe, tap the page edges, or use arrow keys to turn pages", bn: "পৃষ্ঠা উল্টাতে সোয়াইপ করুন, পৃষ্ঠার কিনারায় ট্যাপ করুন বা অ্যারো কী ব্যবহার করুন", ar: "اسحب أو انقر على حافة الصفحة أو استخدم مفاتيح الأسهم لتقليب الصفحات" })}
          </p>
        </div>
      )}
    </div>
  );
}
