import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgClass } from '@angular/common'; // ← pour [ngClass]

@Component({
  selector: 'app-button',
  standalone: true,                 // ← indispensable pour l’import direct
  imports: [NgClass],               // ← rend [ngClass] disponible dans le template
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Cliquez ici';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
