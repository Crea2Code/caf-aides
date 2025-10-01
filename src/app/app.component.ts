import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CardComponent }   from './shared/components/card/card.component';
import { ButtonComponent } from './shared/components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CardComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onSimulate() {
    console.log('🧮 Simulation lancée !');
    // ici tu mettras plus tard ta logique métier
  }
}
