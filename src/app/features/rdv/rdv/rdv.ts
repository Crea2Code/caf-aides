import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


type RendezVous = {
  id: string;
  nom: string;
  email: string;
  motif: string;
  date: string;  // ISO (yyyy-MM-dd)
  heure: string; // HH:mm
  canal: 'visio' | 'telephone' | 'agence';
  commentaire?: string;
  consent: boolean;
  createdAt: string; // ISO
};

const STORAGE_KEY = 'caf-aides:rdv';

type FutureDateTimeOptions = {
  noWeekends?: boolean;        // interdit sam/dim
  minMinutesAhead?: number;    // ex. 15 => ≥ maintenant +15 min
  businessHours?: {            // plage horaire autorisée (heures locales)
    start: string;             // "HH:mm"
    end: string;               // "HH:mm"
  };
};

function parseHM(hm: string): { h: number; m: number } {
  const [h, m] = hm.split(':').map(Number);
  return { h: h ?? 0, m: m ?? 0 };
}

export function futureDateTimeValidator(
  opts: FutureDateTimeOptions = { noWeekends: true, minMinutesAhead: 0, businessHours: { start: '09:00', end: '17:30' } }
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const dateCtrl = group.get('date');
    const timeCtrl = group.get('heure');
    if (!dateCtrl || !timeCtrl) return null;

    const date = dateCtrl.value as string;
    const time = timeCtrl.value as string;
    if (!date || !time) return null; // laissent les "required" gérer

    const [yyyy, mm, dd] = date.split('-').map(Number);
    const { h: HH, m: MM } = parseHM(time);
    const selected = new Date(yyyy, (mm ?? 1) - 1, dd ?? 1, HH ?? 0, MM ?? 0, 0, 0);

    // 1) Interdire week-ends
    if (opts.noWeekends) {
      const day = selected.getDay(); // 0=dim,6=sam
      if (day === 0 || day === 6) return { weekendNotAllowed: true };
    }

    // 2) Délai minimal
    const now = new Date();
    now.setSeconds(0, 0);
    const min = new Date(now.getTime() + (opts.minMinutesAhead ?? 0) * 60 * 1000);
    if (selected < min) return { pastDateTime: true, minMinutesAhead: opts.minMinutesAhead ?? 0 };

    // 3) Horaires ouvrés (inclusifs)
    if (opts.businessHours) {
      const { start, end } = opts.businessHours;
      const s = parseHM(start);
      const e = parseHM(end);
      const startDay = new Date(selected); startDay.setHours(s.h, s.m, 0, 0);
      const endDay   = new Date(selected); endDay.setHours(e.h, e.m, 0, 0);

      if (selected < startDay || selected > endDay) {
        return { outsideBusinessHours: true, businessHours: opts.businessHours };
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-rdv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './rdv.html',
  styleUrls: ['./rdv.scss']
})
export class RdvComponent {
  todayISO = new Date().toISOString().slice(0, 10); // 👈 ici, dans la classe
  // --- Formulaire réactif
  form: FormGroup;
  // --- Liste des RDV (localStorage)
  rdvs = signal<RendezVous[]>([]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        nom: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        motif: ['', [Validators.required, Validators.minLength(3)]],
        date: ['', [Validators.required]],
        heure: ['', [Validators.required]],
        canal: ['visio' as const, [Validators.required]],
        commentaire: [''],
        consent: [false, [Validators.requiredTrue]],
      },
      {
        validators: [
          futureDateTimeValidator({
            noWeekends: true,
            minMinutesAhead: 0,             // mets 15 si tu veux un délai mini
            businessHours: { start: '09:00', end: '17:30' }
          })
        ]
      }
    );

    // Charger depuis localStorage au montage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.rdvs.set(JSON.parse(raw));
      } catch {
        this.rdvs.set([]);
      }
    }

    // Persister automatiquement à chaque changement
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.rdvs()));
    });
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const rdv: RendezVous = {
      id: `RDV-${Date.now()}`,
      nom: v.nom!,
      email: v.email!,
      motif: v.motif!,
      date: v.date!,
      heure: v.heure!,
      canal: v.canal!,
      commentaire: v.commentaire || '',
      consent: !!v.consent,
      createdAt: new Date().toISOString(),
    };

    this.rdvs.update(list => [rdv, ...list]);
    this.form.reset({
      canal: 'visio',
      consent: false
    });
  }

  resetForm() {
    this.form.reset({
      canal: 'visio',
      consent: false
    });
  }

  delete(id: string) {
    this.rdvs.update(list => list.filter(r => r.id !== id));
  }
}
