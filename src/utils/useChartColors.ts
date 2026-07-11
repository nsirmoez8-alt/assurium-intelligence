import { useTheme } from "../context/ThemeContext";

export function useChartColors() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    grid: dark ? "rgba(255,255,255,0.08)" : "#E7E9EE",
    tick: dark ? "rgba(255,255,255,0.5)" : "#5C7096",
    tooltipCursor: dark ? "rgba(255,255,255,0.12)" : "#F3F1EC",
    tooltipStroke: dark ? "rgba(255,255,255,0.2)" : "#D6DAE2",
  };
}
