import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recap-form',
  imports: [],
  templateUrl: './recap-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecapFormComponent {
  @Input() formData: FormData | null = null;
  @Output() handleResetForm: EventEmitter<void> = new EventEmitter<void>();

  resetForm(): void {
    this.handleResetForm.emit();
  }
}
