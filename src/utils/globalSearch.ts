import { clients, clientFullName, getClientById } from "../data/clients";
import { contracts } from "../data/contracts";
import { claims } from "../data/claims";

export type SearchResultKind = "client" | "contract" | "claim";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  label: string;
  sublabel: string;
  href: string;
}

export function globalSearch(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const c of clients) {
    const name = clientFullName(c).toLowerCase();
    if (name.includes(q) || c.city.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) {
      results.push({
        id: c.id,
        kind: "client",
        label: clientFullName(c),
        sublabel: `${c.city} · ${c.segment}`,
        href: `/clients/${c.id}`,
      });
    }
  }

  for (const ct of contracts) {
    if (ct.reference.toLowerCase().includes(q) || ct.type.toLowerCase().includes(q)) {
      const client = getClientById(ct.clientId);
      results.push({
        id: ct.id,
        kind: "contract",
        label: ct.reference,
        sublabel: `${ct.type}${client ? ` · ${clientFullName(client)}` : ""}`,
        href: `/clients/${ct.clientId}`,
      });
    }
  }

  for (const cl of claims) {
    if (cl.reference.toLowerCase().includes(q) || cl.type.toLowerCase().includes(q)) {
      const client = getClientById(cl.clientId);
      results.push({
        id: cl.id,
        kind: "claim",
        label: cl.reference,
        sublabel: `${cl.type}${client ? ` · ${clientFullName(client)}` : ""}`,
        href: `/sinistres/${cl.id}`,
      });
    }
  }

  return results.slice(0, limit);
}
