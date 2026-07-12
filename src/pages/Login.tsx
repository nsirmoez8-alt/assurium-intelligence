import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Shield, Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { DEMO_CREDENTIALS } from "../data/auth";

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    const from = (location.state as { from?: string } | null)?.from ?? "/";
    return <Navigate to={from} replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    const from = (location.state as { from?: string } | null)?.from ?? "/";
    navigate(from, { replace: true });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-4 dark:bg-ink-975">
      <div className="pointer-events-none absolute inset-0 bg-aurora dark:bg-aurora-dark" aria-hidden="true" />

      <div className="glass relative w-full max-w-sm rounded-2xl p-8 shadow-popover">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-signal shadow-glow">
            <Shield className="h-5.5 w-5.5 text-white" strokeWidth={2.25} />
          </span>
          <div className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">Assurium</span>
            <span className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-iris-500 dark:text-iris-300">
              <Sparkles className="h-2.5 w-2.5" /> Intelligence
            </span>
          </div>
        </div>

        <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white">Connexion conseiller</h1>
        <p className="mt-1.5 text-sm text-ink-400 dark:text-ink-300/60">Accédez à votre portefeuille clients.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300 dark:text-ink-300/50" />
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@assurium.tn"
                className="w-full rounded-xl border border-mist bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-iris-400 focus:outline-none focus:ring-2 focus:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-300/50 dark:focus:border-iris-400 dark:focus:ring-iris-500/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300 dark:text-ink-300/50" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full rounded-xl border border-mist bg-white py-2.5 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-iris-400 focus:outline-none focus:ring-2 focus:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-300/50 dark:focus:border-iris-400 dark:focus:ring-iris-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 dark:text-ink-300/50 dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              Email ou mot de passe incorrect.
            </div>
          )}

          <Button type="submit" variant="gradient" className="w-full">
            Se connecter
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-mist bg-paper-dim/60 p-3.5 text-xs text-ink-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-ink-200/70">
          <p className="font-semibold text-ink-700 dark:text-ink-100">Accès de démonstration</p>
          <p className="mt-1 font-tabular">{DEMO_CREDENTIALS.email}</p>
          <p className="font-tabular">{DEMO_CREDENTIALS.password}</p>
        </div>
      </div>
    </div>
  );
}
