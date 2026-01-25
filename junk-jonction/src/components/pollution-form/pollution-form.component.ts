import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { POLLUTION_FIELDS } from '../../models/config/field-config';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { latLongValidator } from '../../models/validators/latitude-longitude.validator';
import { Pollution } from '../../models/types/Pollution';
import { PollutionService } from '../../services/pollution.service';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { fileToBase64 } from '../../utils/file-utils';

@Component({
  selector: 'app-pollution-form',
  imports: [ReactiveFormsModule, FormsModule, LucideAngularModule, CommonModule],
  templateUrl: './pollution-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex items-center flex-col justify-center bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center ',
  },
})
export class PollutionFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  pollutionTypes: string[] = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];
  pollutionFields = POLLUTION_FIELDS;
  LoaderCircle = LoaderCircle;

  isSubmitting: boolean = false;
  message: string = '';
  showDiv: boolean = false;

  selectedFile: File | null = null;

  constructor(
    private pollutionService: PollutionService,
    private userService: UserService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      titre: new FormControl('', Validators.required),
      typePollution: new FormControl(this.pollutionTypes[0], Validators.required),
      dateObservation: new FormControl(null, Validators.required),
      lieu: new FormControl('', Validators.required),
      latitude: new FormControl('', [Validators.required, latLongValidator()]),
      longitude: new FormControl('', [Validators.required, latLongValidator()]),
    });

    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.message = '';
      this.isSubmitting = false;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB en bytes

    if (file.size > MAX_SIZE) {
      alert("L'image est trop grande ! Maximum 2 MB.");
      input.value = ''; // Reset l'input
      return;
    }

    this.selectedFile = file;
  }

  async onSubmit() {
    if (this.formGroup.invalid) return;

    this.isSubmitting = true;
    this.message = '';

    const pollution: Pollution = {
      ...this.formGroup.value,
      createdBy: this.userService.getCurrentUserFromLocalStorage()?.id,
    };

    try {
      if (this.selectedFile) {
        pollution.photo = await fileToBase64(this.selectedFile);
      }

      await this.pollutionService.createPollution(pollution).subscribe();

      this.formGroup.reset();
      this.selectedFile = null;
      this.message = 'Pollution déclarée avec succès !';
    } catch (error) {
      console.error(error);
      this.message = 'Erreur lors de la déclaration de la pollution.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
