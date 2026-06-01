import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

interface Toast { id: number; message: string; type: "success" | "error" | "info"; }
interface ToastCtx { notify: (message: string, type?: Toast["type"]) => void; }

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return (
    <Ctx.Provider value={{ notify }}>
      {children}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-card border border-border shadow-lg rounded-sm px-4 py-3 flex items-center gap-3 min-w-[260px] animate-fade-up"
          >
            {t.type === "success" && <CheckCircle2 className="size-5 text-green-600" />}
            {t.type === "error" && <XCircle className="size-5 text-destructive" />}
            {t.type === "info" && <Info className="size-5 text-navy" />}
            <span className="text-sm flex-1">{t.message}</span>
            <button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} aria-label="Cerrar"><X className="size-4 text-muted-foreground" /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useToast within ToastProvider");
  return c;
}
