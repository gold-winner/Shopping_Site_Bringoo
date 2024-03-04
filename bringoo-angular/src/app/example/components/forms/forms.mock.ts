import IItem from '../../../../shared/components/dropdown/item.interface';

export const DefaultDropDownData: IItem[] = [
  {
    id: 1,
    value: 'Option1',
  },
  {
    id: 2,
    value: 'Option2',
  },
  {
    id: 3,
    value: 'Option3',
  },
  {
    id: 4,
    value: 'Option4',
  },
  {
    id: 5,
    value: 'Option5',
  },
];

export const DeliveryTimeDropdownData: IItem[] = [
  {
    id: 1,
    value: '09:00-11:00',
    rowItem: {
      time: '09:00-11:00',
      price: '1,17 €',
    },
  },
  {
    id: 2,
    value: '11:00-12:00',
    rowItem: {
      time: '11:00-12:00',
      price: '1,17 €',
    },
  },
  {
    id: 3,
    value: '12:00-14:00',
    color: 'red',
    other: '3,50 €',
    rowItem: {
      time: '12:00-14:00',
      price: '1,17 €',
    },
  },
  {
    id: 4,
    value: '14:00-15:00',
    rowItem: {
      time: '14:00-15:00',
      price: '1,17 €',
    },
  },
  {
    id: 5,
    value: '16:00-17:00',
    color: 'green',
    rowItem: {
      time: '16:00-17:00',
      price: 'Free',
    },
  },
  {
    id: 6,
    value: '17:00-19:00',
    rowItem: {
      time: '17:00-19:00',
      price: '1,17 €',
    },
  },
  {
    id: 7,
    value: '19:00-20:00',
    rowItem: {
      time: '19:00-20:00',
      price: '1,17 €',
    },
  },
];
