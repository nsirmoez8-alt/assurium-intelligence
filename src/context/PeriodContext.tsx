import { createContext, useContext, useState, type ReactNode } from "react";

export type Period = "7j" | "30j" | "trimestre" | "annee";

export const periodLabels: Record<Period, string> = {
  "7j": "7 derniers jours",
  "30j": "30 derniers jours",
  trimestre: "Ce trimestre",
  annee: "Cette année",
};

export const periodMonthsWindow: Record<Period, number> = {
  "7j": 3,
  "30j": 4,
  trimestre: 6,
  annee: 12,
};

interface PeriodContextValue {
  period: Period;
  setPeriod: (p: Period) => void;
}

const PeriodContext = createContext<PeriodContextValue | null>(null);

export function PeriodProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<Period>("30j");
  return <PeriodContext.Provider value={{ period, setPeriod }}>{children}</PeriodContext.Provider>;
}

export function usePeriod() {
  const ctx = useContext(PeriodContext);
  if (!ctx) throw new Error("usePeriod must be used within PeriodProvider");
  return ctx;
}
