import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function latLongValidator(): ValidatorFn {
  const regex = /^[0-9]{1,7}(\.[0-9]+)?$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isValid = regex.test(value);
    return isValid ? null : { invalidLatLong: true };
  };
}
