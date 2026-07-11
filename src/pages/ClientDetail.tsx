import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  FileWarning,
  FileText,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { Tabs } from "../components/ui/Tabs";
import { ClientStatusPill, ContractStatusPill, ClaimStatusPill, RiskPill } from "../components/ui/StatusPill";
import { ProgressBar } from "../components/ui/ProgressBar";
import { RiskGauge } from "../components/ui/RiskGauge";
import { EmptyState } from "../components/ui/EmptyState";
import { getClientById, clientFullName } from "../data/clients";
import { getContractsByClient } from "../data/contracts";
import { getClaimsByClient } from "../data/claims";
import { formatCurrency, formatDate, formatDateLong, initials } from "../utils/format";

const tabs = [
  { id: "apercu", label: "Vue d'ensemble" },
  { id: "contrats", label: "Contrats" },
  { id: "sinistres", label: "Sinistres" },
  { id: "documents", label: "Documents" },
];

export function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const client = id ? getClientById(id) : undefined;
  const [tab, setTab] = useState("apercu");

  const contracts = useMemo(() => (client ? getContractsByClient(client.id) : []), [client]);
  const claims = useMemo(() => (client ? getClaimsByClient(client.id) : []), [client]);

  if (!client) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Client introuvable"
        description="Ce client n'existe pas ou a été supprimé du portefeuille."
        action={
          <Link to="/clients" className="text-sm font-medium text-signal-600 hover:text-signal-700 dark:text-signal-400">
            Retour à la liste des clients
          </Link>
        }
      />
    );
  }

  const activePremium = contracts.filter((c) => c.status === "Actif").reduce((s, c) => s + c.premium, 0);
  const openClaimsCount = claims.filter((c) => c.status !== "Clôturé" && c.status !== "Refusé").length;

  return (
    <div>
      <Link to="/clients" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-ink-700 dark:text-ink-300/60 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour aux clients
      </Link>

      <div className="mb-6 flex flex-col gap-5 rounded-2xl border border-mist bg-white p-6 shadow-card dark:border-white/[0.08] dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={initials(client.firstName, client.lastName)} color={client.avatarColor} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white">{clientFullName(client)}</h1>
              <ClientStatusPill status={client.status} />
            </div>
            <p className="mt-1 text-sm text-ink-400 dark:text-ink-300/60">
              {client.segment} · Client depuis {formatDate(client.clientSince)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:flex sm:items-center">
          <div className="flex items-center gap-2 text-ink-500 dark:text-ink-200/70">
            <Mail className="h-4 w-4 text-ink-300 dark:text-ink-300/50" /> {client.email}
          </div>
          <div className="flex items-center gap-2 text-ink-500 dark:text-ink-200/70">
            <Phone className="h-4 w-4 text-ink-300 dark:text-ink-300/50" /> {client.phone}
          </div>
          <div className="flex items-center gap-2 text-ink-500 dark:text-ink-200/70">
            <MapPin className="h-4 w-4 text-ink-300 dark:text-ink-300/50" /> {client.city} ({client.postalCode})
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="!p-4">
          <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Contrats actifs</p>
          <p className="mt-1.5 font-tabular font-display text-xl font-bold text-ink-900 dark:text-white">
            {contracts.filter((c) => c.status === "Actif").length}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Prime annuelle</p>
          <p className="mt-1.5 font-tabular font-display text-xl font-bold text-ink-900 dark:text-white">{formatCurrency(activePremium)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Sinistres ouverts</p>
          <p className="mt-1.5 font-tabular font-display text-xl font-bold text-ink-900 dark:text-white">{openClaimsCount}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-300/60">Satisfaction</p>
          <p className="mt-1.5 font-tabular font-display text-xl font-bold text-ink-900 dark:text-white">{client.satisfaction}%</p>
        </Card>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="mt-6">
        {tab === "apercu" && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader eyebrow="Profil" title="Informations client" />
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-ink-400 dark:text-ink-300/60">Segment</dt>
                  <dd className="mt-1 text-sm font-medium text-ink-900 dark:text-white">{client.segment}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-400 dark:text-ink-300/60">Conseiller</dt>
                  <dd className="mt-1 text-sm font-medium text-ink-900 dark:text-white">{client.advisor}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-400 dark:text-ink-300/60">Profil de risque</dt>
                  <dd className="mt-1"><RiskGauge level={client.riskProfile} /></dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-400 dark:text-ink-300/60">Client depuis</dt>
                  <dd className="mt-1 text-sm font-medium text-ink-900 dark:text-white">{formatDateLong(client.clientSince)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-ink-400 dark:text-ink-300/60">Score de satisfaction</dt>
                  <span className="font-tabular text-sm font-semibold text-ink-900 dark:text-white">{client.satisfaction}%</span>
                </div>
                <ProgressBar value={client.satisfaction} className="mt-2" tone={client.satisfaction >= 80 ? "signal" : client.satisfaction >= 65 ? "amber" : "rose"} />
              </div>
            </Card>

            <Card>
              <CardHeader eyebrow="Activité" title="Résumé" />
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-ink-600 dark:text-ink-200/80">
                    <span className="font-medium text-ink-900 dark:text-white">{contracts.length} contrats</span> souscrits depuis {formatDate(client.clientSince)}
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-ink-600 dark:text-ink-200/80">
                    <span className="font-medium text-ink-900 dark:text-white">{claims.length} sinistres</span> déclarés au total
                  </p>
                </li>
                {client.missingDocuments.length > 0 ? (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <FileWarning className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm text-ink-600 dark:text-ink-200/80">
                      <span className="font-medium text-ink-900 dark:text-white">{client.missingDocuments.length} document(s)</span> en attente de réception
                    </p>
                  </li>
                ) : (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal-50 text-signal-600 dark:bg-signal-500/10 dark:text-signal-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm text-ink-600 dark:text-ink-200/80">Dossier documentaire complet</p>
                  </li>
                )}
              </ul>
            </Card>
          </div>
        )}

        {tab === "contrats" && (
          <div className="space-y-3">
            {contracts.length === 0 ? (
              <EmptyState icon={FileText} title="Aucun contrat" description="Ce client n'a souscrit aucun contrat pour le moment." />
            ) : (
              contracts.map((contract) => (
                <Card key={contract.id} hoverable className="!p-4 sm:!p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-600 dark:bg-white/[0.06] dark:text-ink-100">
                        <FileText className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900 dark:text-white">{contract.type}</p>
                        <p className="font-tabular text-xs text-ink-400 dark:text-ink-300/60">{contract.reference}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Prime</p>
                        <p className="font-tabular text-sm font-semibold text-ink-900 dark:text-white">{formatCurrency(contract.premium)}</p>
                      </div>
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Échéance</p>
                        <p className="font-tabular text-sm text-ink-700 dark:text-ink-100">{formatDate(contract.endDate)}</p>
                      </div>
                      <RiskPill level={contract.riskLevel} />
                      <ContractStatusPill status={contract.status} />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {tab === "sinistres" && (
          <div className="space-y-3">
            {claims.length === 0 ? (
              <EmptyState icon={ShieldAlert} title="Aucun sinistre" description="Ce client n'a déclaré aucun sinistre." />
            ) : (
              claims.map((claim) => (
                <Link key={claim.id} to={`/sinistres/${claim.id}`} className="block">
                  <Card hoverable className="!p-4 sm:!p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink-900 dark:text-white">{claim.type}</p>
                          <ClaimStatusPill status={claim.status} />
                        </div>
                        <p className="font-tabular mt-1 text-xs text-ink-400 dark:text-ink-300/60">{claim.reference} · déclaré le {formatDate(claim.declaredDate)}</p>
                        <p className="mt-2 max-w-lg text-sm text-ink-500 dark:text-ink-200/70">{claim.description}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xs uppercase tracking-wide text-ink-300 dark:text-ink-300/50">Montant estimé</p>
                        <p className="font-tabular text-sm font-semibold text-ink-900 dark:text-white">{formatCurrency(claim.estimatedAmount)}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}

        {tab === "documents" && (
          <Card>
            <CardHeader eyebrow="Dossier" title="Documents" subtitle="Statut des pièces justificatives" />
            {client.missingDocuments.length === 0 ? (
              <div className="flex items-center gap-3 rounded-xl bg-signal-50 px-4 py-3.5 text-sm text-signal-700 dark:bg-signal-500/10 dark:text-signal-400">
                <CheckCircle2 className="h-4.5 w-4.5" /> Tous les documents requis ont été reçus.
              </div>
            ) : (
              <ul className="divide-y divide-mist dark:divide-white/[0.06]">
                {client.missingDocuments.map((doc) => (
                  <li key={doc} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <FileWarning className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-ink-700 dark:text-ink-100">{doc}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <CalendarDays className="h-3 w-3" /> En attente
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
