import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { SearchInput } from "../components/ui/SearchInput";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { ContractStatusPill, RiskPill } from "../components/ui/StatusPill";
import { EmptyState } from "../components/ui/EmptyState";
import { contracts } from "../data/contracts";
import { getClientById, clientFullName } from "../data/clients";
import { formatCurrency, formatDate, initials } from "../utils/format";
import type { ContractStatus, ContractType } from "../types";

const typeOptions: { value: ContractType | "Tous"; label: string }[] = [
  { value: "Tous", label: "Toutes les couvertures" },
  { value: "Auto", label: "Auto" },
  { value: "Habitation", label: "Habitation" },
  { value: "Santé", label: "Santé" },
  { value: "Vie", label: "Vie" },
  { value: "Prévoyance", label: "Prévoyance" },
  { value: "Responsabilité Civile Pro", label: "Responsabilité Civile Pro" },
  { value: "Multirisque Professionnelle", label: "Multirisque Professionnelle" },
  { value: "Emprunteur", label: "Emprunteur" },
];

const statusOptions: { value: ContractStatus | "Tous"; label: string }[] = [
  { value: "Tous", label: "Tous les statuts" },
  { value: "Actif", label: "Actif" },
  { value: "En attente", label: "En attente" },
  { value: "Suspendu", label: "Suspendu" },
  { value: "Résilié", label: "Résilié" },
  { value: "Expiré", label: "Expiré" },
];

export function Contracts() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("Tous");
  const [status, setStatus] = useState<string>("Tous");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contracts.filter((c) => {
      const client = getClientById(c.clientId);
      const matchesQuery =
        !q ||
        c.reference.toLowerCase().includes(q) ||
        (client && clientFullName(client).toLowerCase().includes(q));
      const matchesType = type === "Tous" || c.type === type;
      const matchesStatus = status === "Tous" || c.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [query, type, status]);

  const totalPremium = filtered.filter((c) => c.status === "Actif").reduce((s, c) => s + c.premium, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Portefeuille"
        title="Contrats"
        description={`${contracts.length} contrats — ${formatCurrency(totalPremium)} de primes actives affichées`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <SearchInput value={query} onChange={setQuery} placeholder="Rechercher par référence ou client..." className="sm:max-w-sm" />
        <Select value={type} onChange={setType} options={typeOptions} className="sm:w-64" />
        <Select value={status} onChange={setStatus} options={statusOptions} className="sm:w-44" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="Aucun contrat trouvé" description="Ajustez votre recherche ou vos filtres." />
      ) : (
        <Card padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead>
                <tr className="border-b border-mist text-2xs font-semibold uppercase tracking-wider text-ink-400 dark:border-white/[0.08] dark:text-ink-300/60">
                  <th className="px-5 py-3.5 sm:px-6">Référence</th>
                  <th className="px-4 py-3.5">Client</th>
                  <th className="px-4 py-3.5">Couverture</th>
                  <th className="px-4 py-3.5">Statut</th>
                  <th className="px-4 py-3.5">Prime</th>
                  <th className="px-4 py-3.5">Échéance</th>
                  <th className="px-4 py-3.5">Risque</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contract) => {
                  const client = getClientById(contract.clientId);
                  return (
                    <tr key={contract.id} className="group border-b border-mist last:border-0 hover:bg-paper-dim/50 dark:border-white/[0.06] dark:hover:bg-white/[0.03]">
                      <td className="px-5 py-3.5 font-tabular text-sm text-ink-500 dark:text-ink-300/70 sm:px-6">{contract.reference}</td>
                      <td className="px-4 py-3.5">
                        {client && (
                          <Link to={`/clients/${client.id}`} className="flex items-center gap-2.5">
                            <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="sm" />
                            <span className="truncate text-sm font-medium text-ink-900 dark:text-white">{clientFullName(client)}</span>
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-ink-600 dark:text-ink-200/80">{contract.type}</td>
                      <td className="px-4 py-3.5"><ContractStatusPill status={contract.status} /></td>
                      <td className="px-4 py-3.5 font-tabular text-sm font-medium text-ink-900 dark:text-white">{formatCurrency(contract.premium)}</td>
                      <td className="px-4 py-3.5 font-tabular text-sm text-ink-600 dark:text-ink-200/80">{formatDate(contract.endDate)}</td>
                      <td className="px-4 py-3.5"><RiskPill level={contract.riskLevel} /></td>
                      <td className="px-4 py-3.5 text-right">
                        {client && (
                          <Link
                            to={`/clients/${client.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-300 transition-colors group-hover:bg-white group-hover:text-ink-600 dark:text-ink-300/50 dark:group-hover:bg-white/[0.08] dark:group-hover:text-white"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        )}
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
