import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pollution } from '../../models/types/Pollution';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-pollution-details-modal',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './pollution-details-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionDetailsModal {
  @Input() pollution: Pollution | null = null;
  @Input() closeModal!: () => void;

  CircleX = CircleX;

  close() {
    this.closeModal();
  }
}
