import { NutriScoreEnum, ProductUnitCodeEnum } from '../../../../shared/api/auth/data-contracts';
import { DECIMAL_COMMA_PATTERN_CONFIG } from '../../../../shared/config/decimal-pattern.config';
import { ProductMetaDataEnum } from '../../../../shared/enums/product-meta-data.enum';
import { SLUG_PATTERN } from '../../../../shared/helpers/slug-pattern';

export enum ProductFieldEditViewEnum {
  inputString = 'inputString',
  inputNumber = 'inputNumber',
  inputMultiLanguage = 'inputMultiLanguage',
  checkboxBoolean = 'checkboxBoolean',
  pickerDate = 'pickerDate',
  selectList = 'selectList',
  jsonOneToMany = 'jsonOneToMany',
  file = 'file',
  customComponent = 'customComponent',
}

export const productFieldsConfig: Record<string, any> = {
  ean: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'EAN',
  },
  isActive: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Active',
  },
  name_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Name',
    validators: {
      maxLength: {
        value: 300,
      },
    },
  },
  description_i18n: {
    type: 'textarea',
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Description',
    validators: {
      maxLength: {
        value: 300,
      },
    },
  },
  code: {
    view: ProductFieldEditViewEnum.inputString,
    label: 'Code',
  },
  note_internal: {
    type: 'textarea',
    view: ProductFieldEditViewEnum.inputString,
    label: 'Note Internal',
    validators: {
      maxLength: {
        value: 300,
      },
    },
  },
  note_external: {
    type: 'textarea',
    view: ProductFieldEditViewEnum.inputString,
    label: 'Note External',
    validators: {
      maxLength: {
        value: 300,
      },
    },
  },
  nutriScore: {
    view: ProductFieldEditViewEnum.selectList,
    list: Object.keys(NutriScoreEnum),
    label: 'Nutri Score',
  },
  gtin: {
    view: ProductFieldEditViewEnum.inputString,
    label: 'GTIN',
  },
  sku: {
    view: ProductFieldEditViewEnum.inputString,
    label: 'SKU',
  },
  slug: {
    view: ProductFieldEditViewEnum.inputString,
    label: 'SLUG',
    validators: {
      maxLength: {
        value: 50,
      },
      pattern: {
        value: SLUG_PATTERN,
      },
      minLength: {
        value: 3,
      },
    },
  },
  isAlcohol: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Alcohol',
  },
  alcoholValue: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Alcohol value',
    validators: {
      min: {
        value: 0,
      },
      pattern: {
        value: DECIMAL_COMMA_PATTERN_CONFIG,
        message: 'decimals with 2 max after comma',
      },
    },
  },
  isCustomAgeRestriction: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is custom age restriction',
  },
  ageRestriction: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Age restriction',
    validators: {
      max: {
        value: 99,
      },
    },
  },
  isApproved: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Approved',
  },
  isPickup: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Pickup',
  },
  isPickAndDrive: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Pickup and Drive',
  },
  isOnlineShipment: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Online Shipment',
  },
  isPublic: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Public',
  },
  isBio: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Bio',
  },
  isFrozen: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Frozen',
  },
  isTobacco: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Tobacco',
  },
  isVegan: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Vegan',
  },
  isVegetarian: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Vegetation',
  },
  isGlutenFree: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Gluten Free',
  },
  isLactoseFree: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Lactose Free',
  },
  isFairTrade: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Is Fair Trade',
  },
  isPublicDateTime: {
    view: ProductFieldEditViewEnum.pickerDate,
    label: 'Public Date Time',
  },
  productBrandCode: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'productBrandCode',
    label: 'Product Brand',
  },
  productCategoryCode: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'productCategoryCode',
    label: 'Product Category',
  },
  productSubcategoryCode: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'productSubcategoryCode',
    label: 'Product Subcategory',
  },
  imageUrls: {
    view: ProductFieldEditViewEnum.file,
    path: 'product',
    multiple: true,
    areImages: true,
    label: 'Product picture',
  },
  weight: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Weight',
    validators: {
      min: {
        value: 1,
      },
    },
  },
  productUnitCode: {
    view: ProductFieldEditViewEnum.selectList,
    list: Object.keys(ProductUnitCodeEnum),
    label: 'Product Unit',
  },
  baseUnitCode: {
    view: ProductFieldEditViewEnum.selectList,
    list: Object.keys(ProductUnitCodeEnum),
    label: 'Base Unit',
  },
  productMeasurement: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Product Measurement',
    validators: {
      min: {
        value: 1,
      },
    },
  },
  baseMeasurement: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Base Measurement',
    validators: {
      min: {
        value: 1,
      },
    },
  },
  defaultPrice: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Default price',
    validators: {
      min: {
        value: 0.1,
      },
      pattern: {
        value: DECIMAL_COMMA_PATTERN_CONFIG,
        message: 'decimals with 2 max after comma',
      },
    },
  },
  costPrice: {
    view: ProductFieldEditViewEnum.inputNumber,
    label: 'Cost price',
    validators: {
      min: {
        value: 0.1,
      },
      pattern: {
        value: DECIMAL_COMMA_PATTERN_CONFIG,
        message: 'decimals with 2 max after comma',
      },
    },
  },
  chargeTax: {
    view: ProductFieldEditViewEnum.checkboxBoolean,
    label: 'Charge price',
  },
  vatCode: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'vatCode',
    label: 'Vat',
  },
  deposit: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'deposit',
    label: 'Deposit',
  },
  tags_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Tags',
  },
  manufacturer_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Manufacturer',
  },
  ingredients_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Ingredients',
  },
  special_notes_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Special notes',
  },
  metaData: {
    view: ProductFieldEditViewEnum.jsonOneToMany,
    keysList: Object.values(ProductMetaDataEnum),
    label: 'Meta Data',
  },
  allergenic_information_i18n: {
    view: ProductFieldEditViewEnum.inputMultiLanguage,
    label: 'Allergenic information',
  },
  nutritional_data: {
    view: ProductFieldEditViewEnum.customComponent,
    customType: 'nutritional_data',
    label: 'Nutritional',
  },
};
