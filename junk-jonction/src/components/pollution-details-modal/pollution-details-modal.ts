import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Pollution } from '../../models/types/Pollution';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, CircleX, CameraOff } from 'lucide-angular';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ImageDisplay } from '../image-display/image-display';

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
  dialog = inject(Dialog);

  CameraOff = CameraOff;

  closeModal() {
    this.dialogRef?.close();
  }

  displayImage(photo: string | undefined) {
    if (photo) {
      this.dialog.open(ImageDisplay, {
        data: photo,
      });
    }
  }

  CircleX = CircleX;
}
