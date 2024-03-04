import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-store-legal',
  templateUrl: './store-legal.component.html',
  styleUrls: ['./../store-basic-information-form/store-basic-information-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreLegalComponent {
  openPanel: boolean = false;
  constructor(private fb: UntypedFormBuilder) {}

  form: UntypedFormGroup = this.fb.group({
    businessName: [null],
    legalForm: [null],
    hrb: [null],
    registrationOffice: [null],
    address: [null],
    postalCode: [null],
    city: [null],
    businessLocation: [null],
  });

  addContactForm: UntypedFormGroup = this.fb.group({});

  owners: { id: string; name: string; placeOfBirth: string; dateOfBirth: string; citizenShip: string; countryOfResidence: string }[] = [
    {
      id: 'asdasd-asd-asd2143-5drs',
      name: 'Christian Christopher Hoffmann',
      placeOfBirth: 'Germany',
      dateOfBirth: '22.22.2222',
      citizenShip: 'Germany',
      countryOfResidence: 'Germany',
    },
  ];

  //todo delete ignore

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDeleteOwner(id: string): void {}

  onAddNewContact(): void {
    this.openPanel = false;
  }

  onSubmit(): void {}
}
