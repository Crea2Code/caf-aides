import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  goSim() { this.router.navigate(['/simulateur']); } // prochaine feature
}
