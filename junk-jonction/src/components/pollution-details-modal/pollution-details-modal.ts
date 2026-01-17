import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Pollution } from '../../models/types/Pollution';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, CircleX, CameraOff } from 'lucide-angular';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-pollution-details-modal',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './pollution-details-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionDetailsModal {
  dialogRef = inject<DialogRef<Pollution>>(DialogRef);
  pollution = inject<Pollution>(DIALOG_DATA);

  CameraOff = CameraOff;

  closeModal() {
    this.dialogRef?.close();
  }

  CircleX = CircleX;
}
