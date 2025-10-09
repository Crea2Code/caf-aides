import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CASES_MOCK, CaseItem } from '../cases/cases.data';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './case-detail.html',
  styleUrls: ['./case-detail.scss']
})
export class CaseDetailComponent {
  id = signal<string>('');
  item = signal<CaseItem | null>(null);

  constructor(private route: ActivatedRoute, private router: Router) {
    const pid = this.route.snapshot.paramMap.get('id') || '';
    this.id.set(pid);
    this.item.set(CASES_MOCK.find(c => c.id === pid) || null);
  }

  back() { this.router.navigate(['/dossiers']); }
}
