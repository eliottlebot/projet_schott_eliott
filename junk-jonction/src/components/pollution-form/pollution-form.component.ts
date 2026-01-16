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
import { first, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

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

  constructor(private pollutionService: PollutionService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      titre: new FormControl('', Validators.required),
      typePollution: new FormControl(this.pollutionTypes[0], Validators.required),
      dateObservation: new FormControl(null, Validators.required),
      lieu: new FormControl('', Validators.required),
      latitude: new FormControl('', [Validators.required, latLongValidator()]),
      longitude: new FormControl('', [Validators.required, latLongValidator()]),
      photo_url: new FormControl(''),
    });

    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.message = '';
      this.isSubmitting = false;
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.message = '';
    this.pollutionService.createPollution(this.formGroup.value as Pollution).subscribe({
      next: (response) => {
        console.log('Pollution created successfully:', response);
        this.formGroup.reset();
        this.isSubmitting = false;
        this.message = 'Pollution déclarée avec succès !';
      },
      error: (error) => {
        console.error('Error creating pollution:', error);
        this.isSubmitting = false;
        this.message = 'Erreur lors de la déclaration de la pollution.';
      },
    });
  }
}
