import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CASES_MOCK, CaseItem } from './cases.data';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './cases.html',
  styleUrls: ['./cases.scss']
})
export class CasesComponent {
  private all = signal<CaseItem[]>(CASES_MOCK);
  q = signal<string>('');
  status = signal<string>('Tous');

  filtered = computed(() => {
    const term = this.q().toLowerCase().trim();
    const st = this.status();
    return this.all().filter(c =>
      (st === 'Tous' || c.statut === st) &&
      (term === '' || c.titre.toLowerCase().includes(term) || c.id.toLowerCase().includes(term))
    );
  });

  constructor(private router: Router) {}

  view(id: string) { this.router.navigate(['/dossiers', id]); }
}
