import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'simulateur',
    loadComponent: () =>
      import('./features/simulator/simulator/simulator').then(m => m.SimulatorComponent)
  },
  {
    path: 'dossiers',
    loadComponent: () => import('./features/cases/cases/cases').then(m => m.CasesComponent)
  },
  {
    path: 'dossiers/:id',
    loadComponent: () => import('./features/cases/case-detail/case-detail').then(m => m.CaseDetailComponent)
  },
  {
  path: 'rdv',
  loadComponent: () =>
    import('./features/rdv/rdv/rdv').then(m => m.RdvComponent)
},
  { path: '**', redirectTo: 'dashboard' }
];
