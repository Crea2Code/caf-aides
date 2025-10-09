export type CaseStatus = 'Ouvert' | 'En cours' | 'Complet' | 'Rejeté';

export interface CaseItem {
  id: string;
  titre: string;
  type: 'APL' | 'RSA' | 'Prime activité' | 'PAJE';
  statut: CaseStatus;
  dateCreation: string; // ISO
  demandeur: string;
}

export const CASES_MOCK: CaseItem[] = [
  { id: 'C-2025-001', titre: 'Demande APL – logement Caen', type: 'APL', statut: 'En cours', dateCreation: '2025-09-17', demandeur: 'Sonia C.' },
  { id: 'C-2025-002', titre: 'RSA – ouverture de droits', type: 'RSA', statut: 'Ouvert', dateCreation: '2025-09-20', demandeur: 'Sonia C.' },
  { id: 'C-2025-003', titre: 'Prime activité – révision trimestrielle', type: 'Prime activité', statut: 'Complet', dateCreation: '2025-09-28', demandeur: 'Sonia C.' },
  { id: 'C-2025-004', titre: 'PAJE – naissance', type: 'PAJE', statut: 'Ouvert', dateCreation: '2025-09-30', demandeur: 'Sonia C.' },
];
