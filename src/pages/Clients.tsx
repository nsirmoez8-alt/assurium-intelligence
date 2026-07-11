import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Users, FileWarning, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { SearchInput } from "../components/ui/SearchInput";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { ClientStatusPill } from "../components/ui/StatusPill";
import { EmptyState } from "../components/ui/EmptyState";
import { clients, clientFullName } from "../data/clients";
import { getContractsByClient } from "../data/contracts";
import { formatCurrency, initials } from "../utils/format";

const segmentOptions = [
  { value: "Tous", label: "Tous les segments" },
  { value: "Particulier", label: "Particulier" },
  { value: "Professionnel", label: "Professionnel" },
  { value: "Patrimonial", label: "Patrimonial" },
];

const statusOptions = [
  { value: "Tous", label: "Tous les statuts" },
  { value: "Actif", label: "Actif" },
  { value: "Inactif", label: "Inactif" },
  { value: "Prospect", label: "Prospect" },
];

export function Clients() {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("Tous");
  const [status, setStatus] = useState("Tous");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      const matchesQuery =
        !q ||
        clientFullName(c).toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q);
      const matchesSegment = segment === "Tous" || c.segment === segment;
      const matchesStatus = status === "Tous" || c.status === status;
      return matchesQuery && matchesSegment && matchesStatus;
    });
  }, [query, segment, status]);

  return (
    <div>
      <PageHeader
        eyebrow="Portefeuille"
        title="Clients"
        description={`${clients.length} clients — ${filtered.length} affichés`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <SearchInput value={query} onChange={setQuery} placeholder="Rechercher par nom, email ou ville..." className="sm:max-w-sm" />
        <Select value={segment} onChange={setSegment} options={segmentOptions} className="sm:w-52" />
        <Select value={status} onChange={setStatus} options={statusOptions} className="sm:w-44" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun client trouvé"
          description="Ajustez votre recherche ou vos filtres pour voir davantage de résultats."
        />
      ) : (
        <Card padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead>
                <tr className="border-b border-mist text-2xs font-semibold uppercase tracking-wider text-ink-400 dark:border-white/[0.08] dark:text-ink-300/60">
                  <th className="px-5 py-3.5 sm:px-6">Client</th>
                  <th className="px-4 py-3.5">Segment</th>
                  <th className="px-4 py-3.5">Statut</th>
                  <th className="px-4 py-3.5">Ville</th>
                  <th className="px-4 py-3.5">Contrats</th>
                  <th className="px-4 py-3.5">Prime totale</th>
                  <th className="px-4 py-3.5">Satisfaction</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => {
                  const clientContracts = getContractsByClient(client.id).filter((c) => c.status === "Actif");
                  const totalPremium = clientContracts.reduce((s, c) => s + c.premium, 0);
                  return (
                    <tr key={client.id} className="group border-b border-mist last:border-0 hover:bg-paper-dim/50 dark:border-white/[0.06] dark:hover:bg-white/[0.03]">
                      <td className="px-5 py-3.5 sm:px-6">
                        <Link to={`/clients/${client.id}`} className="flex items-center gap-3">
                          <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink-900 dark:text-white">
                              {clientFullName(client)}
                              {client.missingDocuments.length > 0 && (
                                <FileWarning className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-label="Documents manquants" />
                              )}
                            </p>
                            <p className="truncate text-xs text-ink-400 dark:text-ink-300/60">{client.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-ink-600 dark:text-ink-200/80">{client.segment}</td>
                      <td className="px-4 py-3.5"><ClientStatusPill status={client.status} /></td>
                      <td className="px-4 py-3.5 text-sm text-ink-600 dark:text-ink-200/80">{client.city}</td>
                      <td className="px-4 py-3.5 font-tabular text-sm text-ink-600 dark:text-ink-200/80">{clientContracts.length}</td>
                      <td className="px-4 py-3.5 font-tabular text-sm font-medium text-ink-900 dark:text-white">{formatCurrency(totalPremium)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-mist dark:bg-white/[0.08]">
                            <div
                              className="h-full rounded-full bg-signal-500"
                              style={{ width: `${client.satisfaction}%` }}
                            />
                          </div>
                          <span className="font-tabular text-xs text-ink-400 dark:text-ink-300/60">{client.satisfaction}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Link
                          to={`/clients/${client.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-300 transition-colors group-hover:bg-white group-hover:text-ink-600 dark:text-ink-300/50 dark:group-hover:bg-white/[0.08] dark:group-hover:text-white"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
