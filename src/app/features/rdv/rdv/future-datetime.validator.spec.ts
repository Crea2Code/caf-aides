import { FormBuilder, Validators } from '@angular/forms';
import { futureDateTimeValidator } from './rdv'; // <-- adapte le chemin si besoin

function iso(d: Date): string {
  return d.toISOString().slice(0, 10); // yyyy-MM-dd
}
function hm(d: Date): string {
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

describe('futureDateTimeValidator', () => {
  const fb = new FormBuilder();
  const opts = {
    noWeekends: true,
    minMinutesAhead: 0,
    businessHours: { start: '09:00', end: '17:30' }
  } as const;

  it('refuse une date passée (pastDateTime)', () => {
    const past = new Date(Date.now() - 60 * 60 * 1000); // -1h
    const group = fb.group(
      {
        nom: ['ok', Validators.required],
        email: ['a@b.com', [Validators.required, Validators.email]],
        motif: ['test', Validators.required],
        date: [iso(past), Validators.required],
        heure: [hm(past), Validators.required],
        canal: ['visio', Validators.required],
        commentaire: [''],
        consent: [true]
      },
      { validators: [futureDateTimeValidator(opts)] }
    );

    const err = group.errors;
    expect(err).toBeTruthy();
    expect(err!['pastDateTime']).toBeTrue();
  });

  it('refuse un week-end (weekendNotAllowed)', () => {
    // Trouver le prochain samedi
    const now = new Date();
    const day = now.getDay(); // 0 dim..6 sam
    const add = (6 - day + 7) % 7 || 7; // >= 1 jour
    const saturday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + add, 10, 0, 0, 0);

    const group = fb.group(
      {
        nom: ['ok', Validators.required],
        email: ['a@b.com', [Validators.required, Validators.email]],
        motif: ['test', Validators.required],
        date: [iso(saturday), Validators.required],
        heure: ['10:00', Validators.required], // dans horaires ouvrés
        canal: ['visio', Validators.required],
        commentaire: [''],
        consent: [true]
      },
      { validators: [futureDateTimeValidator({ ...opts, minMinutesAhead: 0 })] }
    );

    const err = group.errors;
    expect(err).toBeTruthy();
    expect(err!['weekendNotAllowed']).toBeTrue();
  });

  it('refuse hors horaires ouvrés (outsideBusinessHours)', () => {
    // Prochain jour ouvré à 08:00
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0, 0, 0);

    // Si samedi/dimanche, pousse jusqu’au lundi
    while ([0,6].includes(next.getDay())) {
      next.setDate(next.getDate() + 1);
    }

    const group = fb.group(
      {
        nom: ['ok', Validators.required],
        email: ['a@b.com', [Validators.required, Validators.email]],
        motif: ['test', Validators.required],
        date: [iso(next), Validators.required],
        heure: ['08:00', Validators.required], // avant 09:00
        canal: ['visio', Validators.required],
        commentaire: [''],
        consent: [true]
      },
      { validators: [futureDateTimeValidator(opts)] }
    );

    const err = group.errors;
    expect(err).toBeTruthy();
    expect(err!['outsideBusinessHours']).toBeTruthy();
    expect(err!['outsideBusinessHours'].businessHours.start).toBe('09:00');
  });

  it('accepte une date valide (ouvré, futur, horaires OK)', () => {
    // Prochain jour ouvré à 10:00
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0, 0);
    while ([0,6].includes(next.getDay())) {
      next.setDate(next.getDate() + 1);
    }

    const group = fb.group(
      {
        nom: ['ok', Validators.required],
        email: ['a@b.com', [Validators.required, Validators.email]],
        motif: ['test', Validators.required],
        date: [iso(next), Validators.required],
        heure: ['10:00', Validators.required],
        canal: ['visio', Validators.required],
        commentaire: [''],
        consent: [true]
      },
      { validators: [futureDateTimeValidator(opts)] }
    );

    expect(group.errors).toBeNull(); // ✅ aucun des trois flags d’erreur
  });
});
