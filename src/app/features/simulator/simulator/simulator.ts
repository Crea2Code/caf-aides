import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

/**
 * Règles fictives (pédagogiques) pour une aide logement/CAF-like :
 * - Plafond de ressources (mensuelles nettes) selon foyer :
 *   - 1 adulte : base = 1400 €
 *   - +300 € par personne à charge
 * - Loyer pris en compte plafonné à 800 €
 * - Aide brute = 35% * min(loyer, 800) - pénalité de ressources
 * - Pénalité = max(0, (revenu_mensuel - plafond) * 0.15)
 * - Aide nette = max(0, aide_brute - pénalité), arrondi à l'euro
 * NB : ce sont des règles fictives pour démo.
 */

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './simulator.html',
  styleUrls: ['./simulator.scss']
})
export class SimulatorComponent {
  form: FormGroup;
  result = signal<number | null>(null);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      adults: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
      dependents: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      monthlyIncome: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      rent: [650, [Validators.required, Validators.min(0), Validators.max(3000)]],
      city: ['Caen', [Validators.required]], // champ libre (pour style)
    }); 
  }

  restored = signal(false); // ✅ indique si on a restauré des données
  
  ngOnInit(): void {
    const saved = localStorage.getItem('simulationData');
    if (saved) {
      const data = JSON.parse(saved);
      this.form.patchValue(data); // ✅ recharge les anciennes valeurs
      this.restored.set(true); // ✅ afficher la bannière
      setTimeout(() => this.restored.set(false), 15000); // auto-hide après 15s
    }
  }
  
 clearSavedData(): void {
    localStorage.removeItem('simulationData');
    this.reset();
    this.restored.set(false); // au cas où la bannière serait visible
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.result.set(null);
      return;
    }

    const { adults, dependents, monthlyIncome, rent, city } = this.form.value;

    // ✅ Sauvegarde dans localStorage
    localStorage.setItem(
        'simulationData',
        JSON.stringify({ adults, dependents, monthlyIncome, rent, city })
    );

    // Plafond de ressources
    const base = 1400;
    const perDependent = 300;
    const plafond = base + perDependent * (Number(dependents) || 0);

    // Loyer pris en compte (plafonné)
    const loyerPrisEnCompte = Math.min(Number(rent) || 0, 800);

    // Aide brute = 35% du loyer pris en compte
    const aideBrute = 0.35 * loyerPrisEnCompte;

    // Pénalité de ressources
    const depassement = Math.max(0, (Number(monthlyIncome) || 0) - plafond);
    // bonus léger si plusieurs adultes (fictif) : +200€ de tolérance par adulte au-delà du 1er
    const bonusAdulte = Math.max(0, (Number(adults) || 1) - 1) * 200;
    const penalite = Math.max(0, (depassement - bonusAdulte) * 0.15);

    // Aide nette
    const aideNette = Math.max(0, Math.round(aideBrute - penalite));
    this.result.set(aideNette);
  }

  reset(): void {
    this.form.reset({
      adults: 1,
      dependents: 0,
      monthlyIncome: 0,
      rent: 650,
      city: 'Caen',
    });
    this.result.set(null);
  }

  // Helpers UI
  hasError(name: string, error: string): boolean {
    const c = this.form.get(name);
    return !!c && (c.touched || c.dirty) && c.hasError(error);
  }
}
