import type { Contract } from "../types";

export const contracts: Contract[] = [
  // Amira Trabelsi — c01
  { id: "ct01", reference: "VIE-2018-4471", clientId: "c01", type: "Vie", status: "Actif", premium: 8400, paymentFrequency: "Annuelle", startDate: "2018-03-12", endDate: "2038-03-12", riskLevel: "Faible", deductible: 0, coverageAmount: 250000 },
  { id: "ct02", reference: "HAB-2023-1182", clientId: "c01", type: "Habitation", status: "Actif", premium: 640, paymentFrequency: "Annuelle", startDate: "2023-07-20", endDate: "2026-07-20", riskLevel: "Faible", deductible: 300, coverageAmount: 480000 },
  { id: "ct03", reference: "EMP-2021-0932", clientId: "c01", type: "Emprunteur", status: "Actif", premium: 1120, paymentFrequency: "Annuelle", startDate: "2021-05-02", endDate: "2036-05-02", riskLevel: "Faible", deductible: 0, coverageAmount: 320000 },

  // Mehdi Ben Salah — c02
  { id: "ct04", reference: "RCP-2020-2210", clientId: "c02", type: "Responsabilité Civile Pro", status: "Actif", premium: 2350, paymentFrequency: "Annuelle", startDate: "2020-09-01", endDate: "2026-09-01", riskLevel: "Modéré", deductible: 800, coverageAmount: 1000000 },
  { id: "ct05", reference: "MRP-2020-2211", clientId: "c02", type: "Multirisque Professionnelle", status: "Actif", premium: 3120, paymentFrequency: "Trimestrielle", startDate: "2020-09-01", endDate: "2026-09-01", riskLevel: "Modéré", deductible: 1000, coverageAmount: 600000 },
  { id: "ct06", reference: "AUT-2024-5502", clientId: "c02", type: "Auto", status: "Actif", premium: 1890, paymentFrequency: "Annuelle", startDate: "2024-02-11", endDate: "2026-08-02", riskLevel: "Modéré", deductible: 500, coverageAmount: 45000 },

  // Sarra Gharbi — c03
  { id: "ct07", reference: "AUT-2022-3390", clientId: "c03", type: "Auto", status: "Actif", premium: 720, paymentFrequency: "Mensuelle", startDate: "2022-01-20", endDate: "2026-07-25", riskLevel: "Faible", deductible: 350, coverageAmount: 22000 },
  { id: "ct08", reference: "HAB-2022-3391", clientId: "c03", type: "Habitation", status: "Actif", premium: 410, paymentFrequency: "Annuelle", startDate: "2022-01-20", endDate: "2027-01-20", riskLevel: "Faible", deductible: 250, coverageAmount: 210000 },

  // Anis Cherni — c04
  { id: "ct09", reference: "AUT-2016-0087", clientId: "c04", type: "Auto", status: "Résilié", premium: 980, paymentFrequency: "Annuelle", startDate: "2016-06-05", endDate: "2025-06-05", riskLevel: "Élevé", deductible: 600, coverageAmount: 18000 },
  { id: "ct10", reference: "HAB-2016-0088", clientId: "c04", type: "Habitation", status: "Expiré", premium: 380, paymentFrequency: "Annuelle", startDate: "2016-06-05", endDate: "2026-06-05", riskLevel: "Élevé", deductible: 300, coverageAmount: 150000 },

  // Ines Mejri — c05
  { id: "ct11", reference: "RCP-2019-1904", clientId: "c05", type: "Responsabilité Civile Pro", status: "Actif", premium: 4200, paymentFrequency: "Annuelle", startDate: "2019-11-14", endDate: "2026-11-14", riskLevel: "Modéré", deductible: 1200, coverageAmount: 1500000 },
  { id: "ct12", reference: "MRP-2019-1905", clientId: "c05", type: "Multirisque Professionnelle", status: "Actif", premium: 2680, paymentFrequency: "Trimestrielle", startDate: "2019-11-14", endDate: "2026-11-14", riskLevel: "Faible", deductible: 900, coverageAmount: 500000 },

  // Walid Bouazizi — c06
  { id: "ct13", reference: "AUT-2023-6610", clientId: "c06", type: "Auto", status: "En attente", premium: 860, paymentFrequency: "Mensuelle", startDate: "2026-07-28", endDate: "2027-07-28", riskLevel: "Modéré", deductible: 450, coverageAmount: 25000 },
  { id: "ct14", reference: "SAN-2023-6611", clientId: "c06", type: "Santé", status: "Actif", premium: 1440, paymentFrequency: "Mensuelle", startDate: "2023-05-30", endDate: "2026-07-30", riskLevel: "Modéré", deductible: 0, coverageAmount: 100000 },

  // Rania Khemiri — c07
  { id: "ct15", reference: "VIE-2015-0219", clientId: "c07", type: "Vie", status: "Actif", premium: 12600, paymentFrequency: "Annuelle", startDate: "2015-02-18", endDate: "2040-02-18", riskLevel: "Faible", deductible: 0, coverageAmount: 400000 },
  { id: "ct16", reference: "HAB-2015-0220", clientId: "c07", type: "Habitation", status: "Actif", premium: 890, paymentFrequency: "Annuelle", startDate: "2015-02-18", endDate: "2027-02-18", riskLevel: "Faible", deductible: 400, coverageAmount: 620000 },
  { id: "ct17", reference: "PRE-2019-4482", clientId: "c07", type: "Prévoyance", status: "Actif", premium: 1980, paymentFrequency: "Annuelle", startDate: "2019-03-01", endDate: "2029-03-01", riskLevel: "Faible", deductible: 0, coverageAmount: 200000 },

  // Karim Haddad — c08
  { id: "ct18", reference: "RCP-2021-7734", clientId: "c08", type: "Responsabilité Civile Pro", status: "Actif", premium: 5600, paymentFrequency: "Annuelle", startDate: "2021-07-22", endDate: "2026-07-22", riskLevel: "Élevé", deductible: 1500, coverageAmount: 2000000 },
  { id: "ct19", reference: "MRP-2021-7735", clientId: "c08", type: "Multirisque Professionnelle", status: "Actif", premium: 4340, paymentFrequency: "Trimestrielle", startDate: "2021-07-22", endDate: "2026-07-22", riskLevel: "Élevé", deductible: 1500, coverageAmount: 850000 },
  { id: "ct20", reference: "AUT-2021-7736", clientId: "c08", type: "Auto", status: "Actif", premium: 3900, paymentFrequency: "Annuelle", startDate: "2021-07-22", endDate: "2026-07-22", riskLevel: "Élevé", deductible: 800, coverageAmount: 120000 },

  // Yasmine Zouari — c09
  { id: "ct21", reference: "HAB-2020-2287", clientId: "c09", type: "Habitation", status: "Actif", premium: 520, paymentFrequency: "Annuelle", startDate: "2020-04-09", endDate: "2027-04-09", riskLevel: "Faible", deductible: 250, coverageAmount: 280000 },
  { id: "ct22", reference: "SAN-2020-2288", clientId: "c09", type: "Santé", status: "Actif", premium: 1080, paymentFrequency: "Mensuelle", startDate: "2020-04-09", endDate: "2026-08-05", riskLevel: "Faible", deductible: 0, coverageAmount: 80000 },

  // Sami Abidi — c10 (prospect)
  { id: "ct23", reference: "AUT-2026-9001", clientId: "c10", type: "Auto", status: "En attente", premium: 690, paymentFrequency: "Mensuelle", startDate: "2026-07-15", endDate: "2027-07-15", riskLevel: "Modéré", deductible: 400, coverageAmount: 20000 },

  // Emna Riahi — c11
  { id: "ct24", reference: "RCP-2017-0654", clientId: "c11", type: "Responsabilité Civile Pro", status: "Actif", premium: 1980, paymentFrequency: "Annuelle", startDate: "2017-10-11", endDate: "2026-10-11", riskLevel: "Faible", deductible: 700, coverageAmount: 900000 },
  { id: "ct25", reference: "MRP-2017-0655", clientId: "c11", type: "Multirisque Professionnelle", status: "Actif", premium: 1340, paymentFrequency: "Annuelle", startDate: "2017-10-11", endDate: "2026-10-11", riskLevel: "Faible", deductible: 600, coverageAmount: 400000 },

  // Bilel Chaabane — c12
  { id: "ct26", reference: "AUT-2019-3321", clientId: "c12", type: "Auto", status: "Actif", premium: 810, paymentFrequency: "Mensuelle", startDate: "2019-08-27", endDate: "2026-08-27", riskLevel: "Modéré", deductible: 450, coverageAmount: 24000 },
  { id: "ct27", reference: "PRE-2022-5543", clientId: "c12", type: "Prévoyance", status: "Actif", premium: 960, paymentFrequency: "Annuelle", startDate: "2022-02-14", endDate: "2032-02-14", riskLevel: "Modéré", deductible: 0, coverageAmount: 150000 },

  // Wafa Jlassi — c13
  { id: "ct28", reference: "VIE-2014-0091", clientId: "c13", type: "Vie", status: "Actif", premium: 15200, paymentFrequency: "Annuelle", startDate: "2014-12-01", endDate: "2039-12-01", riskLevel: "Faible", deductible: 0, coverageAmount: 500000 },
  { id: "ct29", reference: "HAB-2014-0092", clientId: "c13", type: "Habitation", status: "Actif", premium: 1120, paymentFrequency: "Annuelle", startDate: "2014-12-01", endDate: "2027-01-15", riskLevel: "Faible", deductible: 500, coverageAmount: 780000 },
  { id: "ct30", reference: "EMP-2018-2276", clientId: "c13", type: "Emprunteur", status: "Actif", premium: 1860, paymentFrequency: "Annuelle", startDate: "2018-09-10", endDate: "2033-09-10", riskLevel: "Faible", deductible: 0, coverageAmount: 410000 },

  // Aymen Bousetta — c14
  { id: "ct31", reference: "RCP-2022-6612", clientId: "c14", type: "Responsabilité Civile Pro", status: "Suspendu", premium: 6800, paymentFrequency: "Annuelle", startDate: "2022-03-15", endDate: "2026-07-19", riskLevel: "Élevé", deductible: 2000, coverageAmount: 1800000 },
  { id: "ct32", reference: "MRP-2022-6613", clientId: "c14", type: "Multirisque Professionnelle", status: "Actif", premium: 5120, paymentFrequency: "Trimestrielle", startDate: "2022-03-15", endDate: "2026-09-15", riskLevel: "Élevé", deductible: 1800, coverageAmount: 950000 },
  { id: "ct33", reference: "AUT-2022-6614", clientId: "c14", type: "Auto", status: "Actif", premium: 4600, paymentFrequency: "Annuelle", startDate: "2022-03-15", endDate: "2026-09-15", riskLevel: "Élevé", deductible: 900, coverageAmount: 180000 },

  // Aïcha Benali — c15
  { id: "ct34", reference: "AUT-2021-1145", clientId: "c15", type: "Auto", status: "Actif", premium: 650, paymentFrequency: "Mensuelle", startDate: "2021-01-08", endDate: "2027-01-08", riskLevel: "Faible", deductible: 350, coverageAmount: 19000 },
  { id: "ct35", reference: "SAN-2021-1146", clientId: "c15", type: "Santé", status: "Actif", premium: 900, paymentFrequency: "Mensuelle", startDate: "2021-01-08", endDate: "2027-01-08", riskLevel: "Faible", deductible: 0, coverageAmount: 70000 },

  // Hatem Slimani — c16
  { id: "ct36", reference: "HAB-2013-0044", clientId: "c16", type: "Habitation", status: "Résilié", premium: 470, paymentFrequency: "Annuelle", startDate: "2013-05-19", endDate: "2025-05-19", riskLevel: "Élevé", deductible: 350, coverageAmount: 190000 },

  // Sonia Ferjani — c17
  { id: "ct37", reference: "RCP-2020-8821", clientId: "c17", type: "Responsabilité Civile Pro", status: "Actif", premium: 2900, paymentFrequency: "Annuelle", startDate: "2020-11-23", endDate: "2026-11-23", riskLevel: "Modéré", deductible: 900, coverageAmount: 1200000 },
  { id: "ct38", reference: "MRP-2020-8822", clientId: "c17", type: "Multirisque Professionnelle", status: "Actif", premium: 1760, paymentFrequency: "Annuelle", startDate: "2020-11-23", endDate: "2026-11-23", riskLevel: "Faible", deductible: 700, coverageAmount: 450000 },

  // Skander Mzoughi — c18
  { id: "ct39", reference: "AUT-2024-1029", clientId: "c18", type: "Auto", status: "Actif", premium: 780, paymentFrequency: "Mensuelle", startDate: "2024-02-14", endDate: "2026-08-14", riskLevel: "Modéré", deductible: 400, coverageAmount: 21000 },
  { id: "ct40", reference: "HAB-2024-1030", clientId: "c18", type: "Habitation", status: "Actif", premium: 430, paymentFrequency: "Annuelle", startDate: "2024-02-14", endDate: "2027-02-14", riskLevel: "Modéré", deductible: 300, coverageAmount: 240000 },

  // Meriem Belhaj — c19
  { id: "ct41", reference: "VIE-2012-0011", clientId: "c19", type: "Vie", status: "Actif", premium: 9800, paymentFrequency: "Annuelle", startDate: "2012-09-30", endDate: "2037-09-30", riskLevel: "Faible", deductible: 0, coverageAmount: 320000 },
  { id: "ct42", reference: "PRE-2012-0012", clientId: "c19", type: "Prévoyance", status: "Actif", premium: 1240, paymentFrequency: "Annuelle", startDate: "2012-09-30", endDate: "2032-09-30", riskLevel: "Faible", deductible: 0, coverageAmount: 180000 },
  { id: "ct43", reference: "HAB-2018-3345", clientId: "c19", type: "Habitation", status: "Actif", premium: 760, paymentFrequency: "Annuelle", startDate: "2018-06-12", endDate: "2027-06-12", riskLevel: "Faible", deductible: 400, coverageAmount: 510000 },

  // Rami Rekik — c20
  { id: "ct44", reference: "RCP-2023-4471", clientId: "c20", type: "Responsabilité Civile Pro", status: "Actif", premium: 1680, paymentFrequency: "Annuelle", startDate: "2023-08-04", endDate: "2026-08-04", riskLevel: "Modéré", deductible: 600, coverageAmount: 700000 },
  { id: "ct45", reference: "MRP-2023-4472", clientId: "c20", type: "Multirisque Professionnelle", status: "Actif", premium: 980, paymentFrequency: "Annuelle", startDate: "2023-08-04", endDate: "2026-08-04", riskLevel: "Modéré", deductible: 500, coverageAmount: 300000 },

  // Dorra Ayari — c21 (prospect)
  { id: "ct46", reference: "AUT-2026-9102", clientId: "c21", type: "Auto", status: "En attente", premium: 740, paymentFrequency: "Mensuelle", startDate: "2026-07-22", endDate: "2027-07-22", riskLevel: "Modéré", deductible: 400, coverageAmount: 21000 },

  // Nizar Sassi — c22
  { id: "ct47", reference: "VIE-2016-0187", clientId: "c22", type: "Vie", status: "Actif", premium: 11400, paymentFrequency: "Annuelle", startDate: "2016-01-25", endDate: "2041-01-25", riskLevel: "Faible", deductible: 0, coverageAmount: 450000 },
  { id: "ct48", reference: "MRP-2016-0188", clientId: "c22", type: "Multirisque Professionnelle", status: "Actif", premium: 3400, paymentFrequency: "Trimestrielle", startDate: "2016-01-25", endDate: "2026-07-31", riskLevel: "Modéré", deductible: 1000, coverageAmount: 900000 },
  { id: "ct49", reference: "EMP-2020-6693", clientId: "c22", type: "Emprunteur", status: "Actif", premium: 2140, paymentFrequency: "Annuelle", startDate: "2020-06-18", endDate: "2035-06-18", riskLevel: "Faible", deductible: 0, coverageAmount: 520000 },

  // Syrine Ouertani — c23
  { id: "ct50", reference: "AUT-2022-7781", clientId: "c23", type: "Auto", status: "Actif", premium: 610, paymentFrequency: "Mensuelle", startDate: "2022-10-07", endDate: "2026-08-01", riskLevel: "Faible", deductible: 350, coverageAmount: 17000 },
  { id: "ct51", reference: "SAN-2022-7782", clientId: "c23", type: "Santé", status: "Actif", premium: 840, paymentFrequency: "Mensuelle", startDate: "2022-10-07", endDate: "2027-10-07", riskLevel: "Faible", deductible: 0, coverageAmount: 60000 },

  // Fares Ghariani — c24
  { id: "ct52", reference: "RCP-2011-0003", clientId: "c24", type: "Responsabilité Civile Pro", status: "Actif", premium: 4900, paymentFrequency: "Annuelle", startDate: "2011-04-16", endDate: "2026-07-16", riskLevel: "Élevé", deductible: 1400, coverageAmount: 1600000 },
  { id: "ct53", reference: "MRP-2011-0004", clientId: "c24", type: "Multirisque Professionnelle", status: "Actif", premium: 3760, paymentFrequency: "Trimestrielle", startDate: "2011-04-16", endDate: "2026-10-16", riskLevel: "Modéré", deductible: 1000, coverageAmount: 780000 },
  { id: "ct54", reference: "AUT-2011-0005", clientId: "c24", type: "Auto", status: "Actif", premium: 5200, paymentFrequency: "Annuelle", startDate: "2011-04-16", endDate: "2026-10-16", riskLevel: "Élevé", deductible: 900, coverageAmount: 210000 },
];

export function getContractsByClient(clientId: string): Contract[] {
  return contracts.filter((c) => c.clientId === clientId);
}

export function getContractById(id: string): Contract | undefined {
  return contracts.find((c) => c.id === id);
}
