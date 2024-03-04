import { Component } from '@angular/core';

@Component({
  selector: 'ui-others',
  templateUrl: './others.component.html',
})
export class OthersComponent {
  tableData = {
    energie: '1448 kJ',
    fett: '0.8 g',
    kohlenhydrate: '76.8 g',
    eiweiß: '8 g',
    salz: '0.03 g',
  };

  deliveryTypeData = [
    {
      id: '1',
      text: 'Pickup',
    },
    {
      id: '2',
      text: 'Delivery',
    },
    {
      id: '3',
      text: 'Shipping',
    },
  ];
}
