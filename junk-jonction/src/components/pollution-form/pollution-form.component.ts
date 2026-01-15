import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

@Component({
  selector: 'app-pollution-form',
  imports: [ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './pollution-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full flex-1 flex-col flex items-center justify-center',
  },
})
export class PollutionFormComponent implements OnInit {
  @Input() formTitle = 'Pollution Form';
  formGroup: FormGroup = new FormGroup({});
  pollutionTypes: string[] = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];
  pollutionFields = POLLUTION_FIELDS;
  LoaderCircle = LoaderCircle;

  isSubmitting: boolean = false;
  message: string = '';

  constructor(private pollutionService: PollutionService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      titre: new FormControl('', Validators.required),
      type_pollution: new FormControl(this.pollutionTypes[0], Validators.required),
      date_observation: new FormControl(null, Validators.required),
      lieu: new FormControl('', Validators.required),
      latitude: new FormControl('', [Validators.required, latLongValidator()]),
      longitude: new FormControl('', [Validators.required, latLongValidator()]),
      photo_url: new FormControl(''),
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
