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
  { path: '**', redirectTo: 'dashboard' }
];
