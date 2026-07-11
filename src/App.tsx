import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { PeriodProvider } from "./context/PeriodContext";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { Clients } from "./pages/Clients";
import { ClientDetail } from "./pages/ClientDetail";
import { Contracts } from "./pages/Contracts";
import { Claims } from "./pages/Claims";
import { ClaimDetail } from "./pages/ClaimDetail";
import { Notifications } from "./pages/Notifications";
import { Analytics } from "./pages/Analytics";
import { Portfolio } from "./pages/Portfolio";
import { Opportunities } from "./pages/Opportunities";

function App() {
  return (
    <ThemeProvider>
      <PeriodProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/:id" element={<ClientDetail />} />
              <Route path="contrats" element={<Contracts />} />
              <Route path="sinistres" element={<Claims />} />
              <Route path="sinistres/:id" element={<ClaimDetail />} />
              <Route path="portefeuille" element={<Portfolio />} />
              <Route path="opportunites" element={<Opportunities />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="analyse" element={<Analytics />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PeriodProvider>
    </ThemeProvider>
  );
}

export default App;
