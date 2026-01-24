import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { CircleX, LucideAngularModule } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';

@Component({
  selector: 'app-image-display',
  imports: [LucideAngularModule],
  templateUrl: './image-display.html',
  host: {
    class:
      'absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75',
  },
})
export class ImageDisplay {
  dialogRef = inject<DialogRef<Pollution>>(DialogRef);
  photo = inject<string>(DIALOG_DATA);
  dialog = inject(Dialog);

  closeModal() {
    this.dialogRef?.close();
  }

  CircleX = CircleX;
}
