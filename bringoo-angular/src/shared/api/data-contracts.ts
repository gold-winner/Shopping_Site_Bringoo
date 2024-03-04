export enum LangCodeEnum {
  EN = 'EN',
  DE = 'DE',
  FR = 'FR',
  ALL = 'ALL',
}

export interface GuestSignUpInput {
  customerLanguageCode: LangCodeEnum;
  deviceId: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface CustomerSignUpInput {
  deviceId: string;
  pushNotificationToken?: string;
  deviceType?: string;
  deviceName?: string;
  deviceBrand?: string;
  deviceOs?: string;
  appVersion?: string;
  ipAddress?: string;
  allowedNotifications?: boolean;
  allowedLocationTracking?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  customerLanguageCode: LangCodeEnum;
  doNotVerifyEmail?: boolean;
}

export type Object = object;

export interface CustomerSignInInput {
  deviceId: string;
  pushNotificationToken?: string;
  deviceType?: string;
  deviceName?: string;
  deviceBrand?: string;
  deviceOs?: string;
  appVersion?: string;
  ipAddress?: string;
  allowedNotifications?: boolean;
  allowedLocationTracking?: boolean;
  email: string;
  password: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
  deviceId: string;
}

export interface EmailVerifyInput {
  code: string;
}

export interface ResetPasswordInput {
  email: string;
  deviceId: string;
}

export interface SetPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface SmsCheckCodeVerificationInput {
  code?: string;
}

export interface AccessTokenDto {
  accessToken: string;
}

export interface BaseSignInput {
  deviceId: string;
  pushNotificationToken?: string;
  deviceType?: string;
  deviceName?: string;
  deviceBrand?: string;
  deviceOs?: string;
  appVersion?: string;
  ipAddress?: string;
  allowedNotifications?: boolean;
  allowedLocationTracking?: boolean;
}

export enum OauthProviderEnum {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}

export interface OauthProfileDto {
  id: string;
  provider: OauthProviderEnum;
  profileId: string;
  email: string;
  firstName: string;
  lastName: string;
  language?: string;
  phoneNumber?: string;
}

export interface CartItemNoteDto {
  customerNote: string;
}

export interface LineItemCustomerNoteInput {
  customerNote: string;
}

export interface MetaDto {
  /** Multi language name */
  name_i18n: string;

  /** Multi language description */
  description_i18n?: string;

  /** Unique code */
  code: string;
}

export interface LocationInput {
  lat: number;
  lng: number;
}

export interface CartAddressCreateInput {
  countryCode: string;
  city: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode: string;
  state?: string;
  location: LocationInput;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface ProductInput {
  /** linkId from productDto */
  linkId: string;

  /** count = 0 removes product from cart */
  count: number;
  address?: CartAddressCreateInput;

  /** Customer note to the chosen product */
  customerNote?: string;
}

export interface CartInfoDto {
  id: string;
  price: string;
  itemsCount: number;
  weight: string;
  maxWeight: string;
  isOverload: boolean;
  productsCount: number;
}

export enum Iso2Enum {
  AD = 'AD',
  AE = 'AE',
  AF = 'AF',
  AG = 'AG',
  AI = 'AI',
  AL = 'AL',
  AM = 'AM',
  AO = 'AO',
  AQ = 'AQ',
  AR = 'AR',
  AS = 'AS',
  AT = 'AT',
  AU = 'AU',
  AW = 'AW',
  AX = 'AX',
  AZ = 'AZ',
  BA = 'BA',
  BB = 'BB',
  BD = 'BD',
  BE = 'BE',
  BF = 'BF',
  BG = 'BG',
  BH = 'BH',
  BI = 'BI',
  BJ = 'BJ',
  BL = 'BL',
  BM = 'BM',
  BN = 'BN',
  BO = 'BO',
  BQ = 'BQ',
  BR = 'BR',
  BS = 'BS',
  BT = 'BT',
  BV = 'BV',
  BW = 'BW',
  BY = 'BY',
  BZ = 'BZ',
  CA = 'CA',
  CC = 'CC',
  CD = 'CD',
  CF = 'CF',
  CG = 'CG',
  CH = 'CH',
  CI = 'CI',
  CK = 'CK',
  CL = 'CL',
  CM = 'CM',
  CN = 'CN',
  CO = 'CO',
  CR = 'CR',
  CU = 'CU',
  CV = 'CV',
  CW = 'CW',
  CX = 'CX',
  CY = 'CY',
  CZ = 'CZ',
  DE = 'DE',
  DJ = 'DJ',
  DK = 'DK',
  DM = 'DM',
  DO = 'DO',
  DZ = 'DZ',
  EC = 'EC',
  EE = 'EE',
  EG = 'EG',
  EH = 'EH',
  ER = 'ER',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FJ = 'FJ',
  FK = 'FK',
  FM = 'FM',
  FO = 'FO',
  FR = 'FR',
  GA = 'GA',
  GB = 'GB',
  GD = 'GD',
  GE = 'GE',
  GF = 'GF',
  GG = 'GG',
  GH = 'GH',
  GI = 'GI',
  GL = 'GL',
  GM = 'GM',
  GN = 'GN',
  GP = 'GP',
  GQ = 'GQ',
  GR = 'GR',
  GS = 'GS',
  GT = 'GT',
  GU = 'GU',
  GW = 'GW',
  GY = 'GY',
  HK = 'HK',
  HM = 'HM',
  HN = 'HN',
  HR = 'HR',
  HT = 'HT',
  HU = 'HU',
  ID = 'ID',
  IE = 'IE',
  IL = 'IL',
  IM = 'IM',
  IN = 'IN',
  IO = 'IO',
  IQ = 'IQ',
  IR = 'IR',
  IS = 'IS',
  IT = 'IT',
  JE = 'JE',
  JM = 'JM',
  JO = 'JO',
  JP = 'JP',
  KE = 'KE',
  KG = 'KG',
  KH = 'KH',
  KI = 'KI',
  KM = 'KM',
  KN = 'KN',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KY = 'KY',
  KZ = 'KZ',
  LA = 'LA',
  LB = 'LB',
  LC = 'LC',
  LI = 'LI',
  LK = 'LK',
  LR = 'LR',
  LS = 'LS',
  LT = 'LT',
  LU = 'LU',
  LV = 'LV',
  LY = 'LY',
  MA = 'MA',
  MC = 'MC',
  MD = 'MD',
  ME = 'ME',
  MF = 'MF',
  MG = 'MG',
  MH = 'MH',
  MK = 'MK',
  ML = 'ML',
  MM = 'MM',
  MN = 'MN',
  MO = 'MO',
  MP = 'MP',
  MQ = 'MQ',
  MR = 'MR',
  MS = 'MS',
  MT = 'MT',
  MU = 'MU',
  MV = 'MV',
  MW = 'MW',
  MX = 'MX',
  MY = 'MY',
  MZ = 'MZ',
  NA = 'NA',
  NC = 'NC',
  NE = 'NE',
  NF = 'NF',
  NG = 'NG',
  NI = 'NI',
  NL = 'NL',
  NO = 'NO',
  NP = 'NP',
  NR = 'NR',
  NU = 'NU',
  NZ = 'NZ',
  OM = 'OM',
  PA = 'PA',
  PE = 'PE',
  PF = 'PF',
  PG = 'PG',
  PH = 'PH',
  PK = 'PK',
  PL = 'PL',
  PM = 'PM',
  PN = 'PN',
  PR = 'PR',
  PS = 'PS',
  PT = 'PT',
  PW = 'PW',
  PY = 'PY',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RS = 'RS',
  RU = 'RU',
  RW = 'RW',
  SA = 'SA',
  SB = 'SB',
  SC = 'SC',
  SD = 'SD',
  SE = 'SE',
  SG = 'SG',
  SH = 'SH',
  SI = 'SI',
  SJ = 'SJ',
  SK = 'SK',
  SL = 'SL',
  SM = 'SM',
  SN = 'SN',
  SO = 'SO',
  SR = 'SR',
  SS = 'SS',
  ST = 'ST',
  SV = 'SV',
  SX = 'SX',
  SY = 'SY',
  SZ = 'SZ',
  TC = 'TC',
  TD = 'TD',
  TF = 'TF',
  TG = 'TG',
  TH = 'TH',
  TJ = 'TJ',
  TK = 'TK',
  TL = 'TL',
  TM = 'TM',
  TN = 'TN',
  TO = 'TO',
  TR = 'TR',
  TT = 'TT',
  TV = 'TV',
  TW = 'TW',
  TZ = 'TZ',
  UA = 'UA',
  UG = 'UG',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VA = 'VA',
  VC = 'VC',
  VE = 'VE',
  VG = 'VG',
  VI = 'VI',
  VN = 'VN',
  VU = 'VU',
  WF = 'WF',
  WS = 'WS',
  YE = 'YE',
  YT = 'YT',
  ZA = 'ZA',
  ZM = 'ZM',
  ZW = 'ZW',
}

export interface CountryDto {
  /** Multi language name */
  name_i18n: string;

  /** Multi language description */
  description_i18n?: string;

  /** Unique code */
  code: Iso2Enum;
}

export interface LocationDto {
  lat: number;
  lng: number;
}

export interface AddressDto {
  id: string;
  isActive: boolean;
  streets: string[];
  streetName?: string;
  streetNumber?: string;
  zipCode: string;
  city: string;
  state?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  country?: CountryDto;
  countryCode: Iso2Enum;
  location?: LocationDto;
}

export interface StoreLoyaltyProgramDto {
  code: string;
  name: string;
  description: string;
  logoUrl?: string;
}

export interface StoreDto {
  address: string;
  addresses?: AddressDto[];
  streetName: string;
  streetNumber: string;
  deliveryTimeInMinutes?: number;
  deliveryFee?: string;
  deliveryPrice?: number;
  distance?: string;
  id: string;
  code: string;
  isPickup: boolean;
  isDelivery: boolean;
  isInstantDelivery: boolean;
  isOnlineShipment: boolean;
  logoUrl: string;
  rectLogoUrl?: string;
  heroImgUrl?: string;
  promoImgUrl?: string;
  landingImgUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  navbarColor?: string;
  name_public_long_i18n: string;
  name_public_short_i18n: string;
  openingTime: string;
  vendorType: MetaDto;
  isOpen: boolean;
  deliveryDate?: number;
  timeZone: string;
  loyaltyPrograms?: StoreLoyaltyProgramDto[];

  /** The store have product replacement or not */
  replacementAllowed: boolean;

  /** Piker can start work without driver */
  isStartPickJobWithoutDriverAllowed: boolean;
  replacementMaxTime: number;
  replacementMaxAttempts: number;
}

export interface ProductSizeDetailedDto {
  /** Size value */
  size: number;

  /** Unit code */
  unitCode: string;

  /** Translatable unit name */
  unitName: string;

  /** Compiled size and unit name */
  label: string;
}

export enum ProductTypeEnum {
  BOOKSTORE = 'BOOKSTORE',
  ELECTRONIC = 'ELECTRONIC',
  FLOWER = 'FLOWER',
  GROCERY = 'GROCERY',
  HARDWARESTORE = 'HARDWARE_STORE',
  PHARMA = 'PHARMA',
  RESTAURANT = 'RESTAURANT',
}

export enum ShoppingListTypeEnum {
  PURCHASEDPRODUCTS = 'PURCHASED_PRODUCTS',
  CUSTOM = 'CUSTOM',
}

export interface ShoppingListBaseDto {
  id: string;
  name?: string;
  storeId: string;
  customerId: string;
  listType: ShoppingListTypeEnum;
}

export enum ReplaceTypeEnum {
  REPLACEOTHERBRAND = 'REPLACE_OTHER_BRAND',
  REPLACECHEAPER = 'REPLACE_CHEAPER',
  CONTACTME = 'CONTACT_ME',
  REMOVE = 'REMOVE',
}

export enum CartItemChangeTypeEnum {
  PRICE = 'PRICE',
  COUNT = 'COUNT',
  DELETED = 'DELETED',
}

export interface CartItemDto {
  imageUrl: string;
  name_i18n: string;
  subcategoryName: string;
  subcategoryCode: string;
  categoryCode: string;
  code: string;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  isCustomAgeRestriction: boolean;
  ageRestriction?: number;
  isAlcohol: boolean;

  /** is bio product */
  isBio: boolean;

  /** frozen product */
  isFrozen: boolean;

  /** is tobacco product */
  isTobacco: boolean;

  /** is vegan product */
  isVegan: boolean;

  /** is vegetarian product */
  isVegetarian: boolean;

  /** is Lactose Free product */
  isLactoseFree: boolean;

  /** is Gluten Free product */
  isGlutenFree: boolean;

  /** is Fair Trade product */
  isFairTrade: boolean;
  productType: ProductTypeEnum;
  productId: string;
  linkId: string;
  discount?: string;
  price: string;
  salePrice?: string;
  regularPrice: string;

  /** The number of products in the user's cart */
  inCart: number;

  /** The product is in one of the customer shopping lists */
  inShoppingList: boolean;

  /** Shopping lists containing this product */
  shoppingLists: ShoppingListBaseDto[];
  basePrice: string;
  outOfStock: boolean;
  cartItemId: string;
  cartId: string;
  priceDiscounted: string;
  hasDeposit: boolean;
  replaceTypeCode?: ReplaceTypeEnum | null;

  /** price * inCart */
  totalAmount: string;

  /** priceDiscounted * inCart */
  totalAmountDiscounted: string;
  changeType?: CartItemChangeTypeEnum;
  changeText?: string;
  customerNote: string;

  /** Weight in grams */
  weight: number;

  /** voucher discount per unit */
  voucherDiscount: string;

  /** voucher discount per unit value */
  voucherDiscountValue: number;

  /** voucher discount total */
  voucherAllDiscount: string;

  /** voucher discount total value */
  voucherAllDiscountValue: number;
}

export interface TotalVatDto {
  vat: string;
  value: string;
}

export interface CartDto {
  id: string;
  price: string;
  itemsCount: number;
  weight: string;
  maxWeight: string;
  isOverload: boolean;
  productsCount: number;
  store: StoreDto;
  storeId: string;
  cartCode: string;
  items: CartItemDto[];
  changedItems: CartItemDto[];
  replaceTypeCode: ReplaceTypeEnum;
  isAlcohol: boolean;

  /** Product need age verification */
  isCustomAgeRestriction: boolean;

  /** Product need age verification */
  ageRestriction?: number;
  isTobacco: boolean;
  isNotForUnderage: boolean;
  vatTotal: TotalVatDto[];
  totalDeposit: string;
  priceDiscounted: string;
  subtotal: string;
  subtotalDiscounted: string;
  deliveryPrice: string;
  deliveryPriceDiscounted: string;
  totalPrice: string;
  totalPriceDiscounted: string;
  address?: AddressDto;
  itemsDiscount: string;
  itemsDiscountValue: number;
  deliveryFeeDiscount: string;
  deliveryFeeDiscountValue: number;
  allDiscount: string;
  allDiscountValue: number;
}

export interface CartReplaceTypeInput {
  replaceTypeCode: ReplaceTypeEnum | null;
}

export interface CheckoutAddressInput {
  countryCode: string;
  city: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode: string;
  state?: string;
  location: LocationInput;
  organizationName?: string;
  organizationTaxId?: string;
}

export enum DeliveryDestinationEnum {
  HOME = 'HOME',
  NEIGHBOUR = 'NEIGHBOUR',
}

export interface CheckoutInput {
  deliveryAddress: CheckoutAddressInput;
  billingAddress: CheckoutAddressInput;
  phoneCountryCode: string;
  phoneNumber: string;
  deliveryComment?: string;
  deliveryDestination: DeliveryDestinationEnum;
  messageForShopper?: string;
  deliveryDontRing?: boolean;
  deliveryCallMe?: boolean;
  deliveryLeaveAtTheDoor?: boolean;
}

export interface CheckoutDto {
  orderId: string;
  checkoutUrl: string;
  orderTransactionId: string;
}

export enum OrderStatusFilterEnum {
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum OrderStatusEnum {
  NEW = 'NEW',
  PAYMENTPENDING = 'PAYMENT_PENDING',
  PAYMENTERROR = 'PAYMENT_ERROR',
  PAYMENTEXPIRED = 'PAYMENT_EXPIRED',
  PAID = 'PAID',
  PENDING = 'PENDING',
  READY = 'READY',
  PICKING = 'PICKING',
  DELIVERYSTARTED = 'DELIVERY_STARTED',
  DELIVERY = 'DELIVERY',
  SHIPMENT = 'SHIPMENT',
  REJECTED = 'REJECTED',
  REJECTEDBYCUSTOMER = 'REJECTED_BY_CUSTOMER',
  COMPLETE = 'COMPLETE',
  COMPLETETERMINATIONREFUND = 'COMPLETE_TERMINATION_REFUND',
  COMPLETETERMINATIONNOREFUND = 'COMPLETE_TERMINATION_NO_REFUND',
  CANCELED = 'CANCELED',
  CANCELEDNOPRODUCT = 'CANCELED_NO_PRODUCT',
  CANCELEDBYMANAGER = 'CANCELED_BY_MANAGER',
}

export enum OrderCategoryEnum {
  INSTANTDELIVERY = 'INSTANT_DELIVERY',
  PREORDEREDDELIVERY = 'PRE_ORDERED_DELIVERY',
  ONLINESHIPMENT = 'ONLINE_SHIPMENT',
}

export enum OrderJobTypeEnum {
  PICK = 'PICK',
  DRIVE = 'DRIVE',
}

export enum OrderJobStatusEnum {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  PAYMENTPENDING = 'PAYMENT_PENDING',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETE',
  CANCELED = 'CANCELED',
}

export interface OrderJobDto {
  jobType: OrderJobTypeEnum;
  jobStatus: OrderJobStatusEnum;
  jobNumber: string;
  staffFirstName?: string;
  staffLastName?: string;

  /** The number of the Staff who accepted this job */
  staffNumber?: string;

  /** Phone number of the Staff who accepted this job */
  staffPhoneNumber?: string;
}

export enum OrderPriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  PREMIUM = 'PREMIUM',
}

export interface OrderDto {
  id: string;
  store: StoreDto;

  /** Delivery date */
  deliveryDate: number;

  /** Delivery time from */
  deliveryTimeFrom: string;

  /**
   * Expected delivery time before order is completed.
   *     And actual delivery time when the order is completed
   */
  deliveryTimeTo: string;
  orderNumber: string;
  allowCancel: boolean;
  orderStatus: OrderStatusEnum;
  totalRefund: string;
  totalRefundDiscounted: string;
  orderCategory: OrderCategoryEnum;
  orderStatus_i18n: string;
  deliveryPrice: string;
  deliveryPriceDiscounted: string;
  deliveryVatAmount: string;
  deliveryVatAmountDiscounted: string;
  deliveryVatRate: number;
  subTotal: string;
  subTotalDiscounted: string;
  grandTotal: string;
  grandTotalDiscounted: string;

  /** unix timestamp */
  orderDateTime: number;
  jobs?: OrderJobDto[];

  /** True if order has product replacement */
  hasReplacement: boolean;

  /** True if order has active product replacement */
  hasActiveReplacement: boolean;

  /** Replacement expires (unix timestamp) */
  replacementExpires?: number;

  /** True if order has active product replacement */
  hasUpdate: boolean;

  /** Amount paid by the customer */
  paidAmount: string;

  /** Discounted amount paid by the customer */
  paidAmountDiscounted: string;
  canBeReordered: boolean;
  itemsDiscount: string;
  itemsDiscountValue: number;
  deliveryFeeDiscount: string;
  deliveryFeeDiscountValue: number;
  allDiscount: string;
  allDiscountValue: number;
  tags: string[];
  orderPriority: OrderPriorityEnum;
}

export interface PageableOrderDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  data?: OrderDto[];
}

export interface DeliveryAddressDto {
  countryCode: string;
  zipCode: string;
  city: string;
  country_name_i18n: string;
  location: LocationDto;
  state?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export enum OrderItemStatusEnum {
  NEW = 'NEW',
  FOUNDALL = 'FOUND_ALL',
  FOUNDPARTIALLY = 'FOUND_PARTIALLY',
  NOTFOUND = 'NOT_FOUND',
  REPLACEDALL = 'REPLACED_ALL',
  CANCELED = 'CANCELED',
}

export interface OrderItemDto {
  orderId: string;
  orderItemId: string;
  linkId: string;
  ean: number;
  sku: string;
  replaceTypeCode: ReplaceTypeEnum;
  discount?: string;
  imageUrl?: string;
  name_i18n: string;
  price: string;
  priceDiscounted: string;
  subcategoryName?: string;
  isDeposit: boolean;
  categoryName?: string;
  quantity: number;
  quantityFound: number;
  quantityRefund: number;
  totalRefund: string;
  totalRefundDiscounted: string;
  basePrice?: string;
  baseSize?: string;
  productSize?: string;
  vatPercent: number;
  totalAmount: string;
  totalAmountDiscounted: string;
  orderItemStatus: OrderItemStatusEnum;
  weight: number;
  orderTransactionNumber: string;
  customerNote?: string;

  /** voucher discount per unit */
  voucherDiscount: string;

  /** voucher discount per unit value */
  voucherDiscountValue: number;

  /** voucher discount total */
  voucherAllDiscount: string;

  /** voucher discount total value */
  voucherAllDiscountValue: number;
}

export enum OrderTypeEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
  SHIPPING = 'SHIPPING',
}

export enum OrderTransactionStatusEnum {
  NEW = 'NEW',
  PAID = 'PAID',
  PICKING = 'PICKING',
  REPLACEMENT = 'REPLACEMENT',
  COMPLETE = 'COMPLETE',
}

export interface DeliveryFeeDto {
  value: string;
  valueDiscounted: string;
  isRefunded: boolean;
}

export enum OrderTransactionTypeEnum {
  REGULAR = 'REGULAR',
  REPLACEMENT = 'REPLACEMENT',
}

export interface OrderTransactionVoucherDto {
  orderVoucherId: string;
  voucherCode: string;
  orderTransactionVoucherId: string;
  orderTransactionId: string;
  orderTransactionNumber: string;
  deliveryFeeDiscount: number;
  itemsDiscount: number;
  allDiscount: number;
}

export interface OrderTransactionDto {
  id: string;
  orderTransactionStatus: OrderTransactionStatusEnum;
  orderTransactionStatusLabel: string;
  orderTransactionItems: OrderItemDto[];
  orderTransactionNumber: string;
  totalAmount: string;
  totalAmountDiscounted: string;
  totalRefundDiscounted: string;
  totalRefund: string;
  isShoppingExperienceGood: boolean;

  /** Date time then order transaction was paid (unix timestamp) */
  payDate?: number;

  /** Duration between create date and pay date (in minutes) */
  paymentPendingTime?: number;

  /** Amount paid by the customer */
  paidAmount: string;

  /** Discounted amount paid by the customer */
  paidAmountDiscounted: string;

  /** unix timestamp */
  create_date: number;
  orderTransactionVatTotal: TotalVatDto[];
  deliveryFee?: DeliveryFeeDto;
  totalDeposit?: string;
  itemsDiscount: string;
  itemsDiscountValue: number;
  deliveryFeeDiscount: string;
  deliveryFeeDiscountValue: number;
  allDiscount: string;
  allDiscountValue: number;

  /** Total transaction weight in grams */
  orderTransactionWeight: number;

  /** Initial transaction weight in grams */
  initialOrderTransactionWeight: number;

  /** Actual transaction weight in grams */
  actualOrderTransactionWeight: number;

  /** Checkout url */
  checkoutUrl?: string;
  orderTransactionType: OrderTransactionTypeEnum;
  orderReplacementId?: string;
  orderReplacementMessageReadCounter?: number;
  orderTransactionVoucher?: OrderTransactionVoucherDto;
}

export interface OrderCreditNoteItemDto {
  orderItemId: string;
  linkId: string;
  ean: number;
  sku: string;
  imageUrl?: string;
  name_i18n: string;
  subcategoryName?: string;
  isDeposit: boolean;
  categoryName?: string;
  quantity: number;
}

export interface OrderCreditNoteDto {
  id: string;
  note: string;
  orderCreditNoteNumber: string;
  orderCreditNoteItems: OrderCreditNoteItemDto[];
}

export interface OrderDetailsDto {
  id: string;
  store: StoreDto;

  /** Delivery date */
  deliveryDate: number;

  /** Delivery time from */
  deliveryTimeFrom: string;

  /**
   * Expected delivery time before order is completed.
   *     And actual delivery time when the order is completed
   */
  deliveryTimeTo: string;
  orderNumber: string;
  allowCancel: boolean;
  orderStatus: OrderStatusEnum;
  totalRefund: string;
  totalRefundDiscounted: string;
  orderCategory: OrderCategoryEnum;
  orderStatus_i18n: string;
  deliveryPrice: string;
  deliveryPriceDiscounted: string;
  deliveryVatAmount: string;
  deliveryVatAmountDiscounted: string;
  deliveryVatRate: number;
  subTotal: string;
  subTotalDiscounted: string;
  grandTotal: string;
  grandTotalDiscounted: string;

  /** unix timestamp */
  orderDateTime: number;
  jobs?: OrderJobDto[];

  /** True if order has product replacement */
  hasReplacement: boolean;

  /** True if order has active product replacement */
  hasActiveReplacement: boolean;

  /** Replacement expires (unix timestamp) */
  replacementExpires?: number;

  /** True if order has active product replacement */
  hasUpdate: boolean;

  /** Amount paid by the customer */
  paidAmount: string;

  /** Discounted amount paid by the customer */
  paidAmountDiscounted: string;
  canBeReordered: boolean;
  itemsDiscount: string;
  itemsDiscountValue: number;
  deliveryFeeDiscount: string;
  deliveryFeeDiscountValue: number;
  allDiscount: string;
  allDiscountValue: number;
  tags: string[];
  orderPriority: OrderPriorityEnum;
  customerName: string;
  customerNumber: string;
  invoiceDate?: number;
  invoiceNumber?: string;
  totalShopAmount?: string;
  receiptUrls?: string[];
  receiptVatUrls?: string[];
  receiptNumber?: string;
  deliveryAddress: DeliveryAddressDto;
  deliveryAddressShort: string;
  billingAddress: DeliveryAddressDto;
  billingAddressShort: string;
  orderItems: OrderItemDto[];
  orderType: OrderTypeEnum;

  /** Total weight in grams */
  orderWeight: number;

  /** Initial order weight in grams */
  initialOrderWeight: number;

  /** Actual order weight in grams */
  actualOrderWeight: number;
  totalDeposit?: string;
  vatTotal: TotalVatDto[];
  isAlcohol: boolean;

  /** Product need age verification */
  isCustomAgeRestriction: boolean;

  /** Product need age verification */
  ageRestriction?: number;
  isTobacco: boolean;
  isNotForUnderage: boolean;
  isAgeVerified: boolean;

  /** Products quantity in customer cart */
  orderQuantityRequested: number;

  /** Products quantity found by picker */
  orderQuantityFound: number;
  messageForShopper?: string;
  deliveryComment?: string;
  phoneCountryCode: string;
  phoneNumber: string;
  deliveryDistance: number;
  deliveryDontRing: boolean;
  deliveryCallMe: boolean;
  deliveryLeaveAtTheDoor: boolean;
  invoiceUrl?: string;
  isReplacementAllowed: boolean;
  orderTransactions: OrderTransactionDto[];
  orderCreditNotes: OrderCreditNoteDto[];
}

export enum OrderHistoryEventTypeEnum {
  ORDERCREATED = 'ORDER_CREATED',
  ORDERCANCELEDBYCUSTOMER = 'ORDER_CANCELED_BY_CUSTOMER',
  ORDERCANCELEDBYMANAGER = 'ORDER_CANCELED_BY_MANAGER',
  ORDERREFUNDBYMANAGER = 'ORDER_REFUND_BY_MANAGER',
  ORDERCANCELEDNOPRODUCTS = 'ORDER_CANCELED_NO_PRODUCTS',
  ORDERPAID = 'ORDER_PAID',
  PICKJOBACCEPTED = 'PICK_JOB_ACCEPTED',
  DELIVERYJOBACCEPTED = 'DELIVERY_JOB_ACCEPTED',
  PICKJOBSTARTED = 'PICK_JOB_STARTED',
  ENDOFPICKING = 'END_OF_PICKING',
  INSHOPPAYMENT = 'IN_SHOP_PAYMENT',
  DELIVERYJOBSTARTED = 'DELIVERY_JOB_STARTED',
  CONFIRMAGEVERBALLY = 'CONFIRM_AGE_VERBALLY',
  CONFIRMAGEVERBALLYISSUE = 'CONFIRM_AGE_VERBALLY_ISSUE',
  CONFIRMIDPHOTO = 'CONFIRM_ID_PHOTO',
  CONFIRMIDPHOTOISSUE = 'CONFIRM_ID_PHOTO_ISSUE',
  VERIFYAGE = 'VERIFY_AGE',
  TERMINATEORDERWITHREFUND = 'TERMINATE_ORDER_WITH_REFUND',
  TERMINATEORDERWITHOUTREFUND = 'TERMINATE_ORDER_WITHOUT_REFUND',
  DELIVERYJOBCOMPLETE = 'DELIVERY_JOB_COMPLETE',
  SETPICKERBYMANAGER = 'SET_PICKER_BY_MANAGER',
  SETDRIVERBYMANAGER = 'SET_DRIVER_BY_MANAGER',
  CHANGEDELIVERYCOMMENT = 'CHANGE_DELIVERY_COMMENT',
  CHANGEMESSAGEFORSHOPPER = 'CHANGE_MESSAGE_FOR_SHOPPER',
  CHANGEDELIVERYADDRESS = 'CHANGE_DELIVERY_ADDRESS',
  CHANGEBILLINGADDRESS = 'CHANGE_BILLING_ADDRESS',
  REPLACEMENTCREATED = 'REPLACEMENT_CREATED',
  REPLACEMENTEXTENDED = 'REPLACEMENT_EXTENDED',
  REPLACEMENTEXPIRED = 'REPLACEMENT_EXPIRED',
  REPLACEMENTTERMINATED = 'REPLACEMENT_TERMINATED',
  REPLACEMENTMESSAGEREAD = 'REPLACEMENT_MESSAGE_READ',
  REPLACEMENTCOMPLETED = 'REPLACEMENT_COMPLETED',
  ADDORDERRECEIPTIMAGESBYMANAGER = 'ADD_ORDER_RECEIPT_IMAGES_BY_MANAGER',
  ADDORDERVATRECEIPTIMAGESBYMANAGER = 'ADD_ORDER_VAT_RECEIPT_IMAGES_BY_MANAGER',
  REPLACEMENTCREATEDCUSTOMERVOICECALL = 'REPLACEMENT_CREATED_CUSTOMER_VOICE_CALL',
  UPDATEORDERRECEIPTIMAGESBYMANAGER = 'UPDATE_ORDER_RECEIPT_IMAGES_BY_MANAGER',
  UPDATEORDERVATRECEIPTIMAGESBYMANAGER = 'UPDATE_ORDER_VAT_RECEIPT_IMAGES_BY_MANAGER',
  SENDSMSPAYMENTLINK = 'SEND_SMS_PAYMENT_LINK',
  SENDSMSVOICECALLORDERREPLACEMENTCREATED = 'SEND_SMS_VOICE_CALL_ORDER_REPLACEMENT_CREATED',
  ACCOUNTINGORDERINVOICESUBMITTED = 'ACCOUNTING_ORDER_INVOICE_SUBMITTED',
}

export interface OrderEventDto {
  eventType: OrderHistoryEventTypeEnum;
  name_i18n: string;
  description_i18n?: string;
  dateTime: number;
  isCurrent: boolean;
  metadata?: string[];
}

export interface OrderHistoryDto {
  events: OrderEventDto[];
  orderNumber: string;
  orderStatus: OrderStatusEnum;
}

export interface CancelInput {
  cancelReasonCode: string;
  cancelDescription?: string;
}

export interface ShoppingExperienceInput {
  isShoppingExperienceGood: boolean;
}

export interface CartVoucherDto {
  cartVoucherId: string;
  deliveryFeeDiscount: string;
  itemsDiscount: string;
  allDiscount: string;
  voucherCode: string;
}

export interface ApplyCartVoucherInput {
  cartId: string;
  voucherCode: string;
}

export interface VoucherApplyTryDto {
  messagesInfo: object;
  messages: string[];
  isApplied?: boolean;
}

export interface CityZipCodesDto {
  city: string;
  zipCodes: string[];
}

export enum UserGroupEnum {
  Manager = 'manager',
  Staff = 'staff',
  Customer = 'customer',
}

export interface FaqItemDto {
  id: string;
  code: string;
  userGroup: UserGroupEnum;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
}

export interface FaqTopicDto {
  id: string;
  code: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  items: FaqItemDto[];
}

export interface ReplacementMessageReadInput {
  orderReplacementId: string;
}

export interface OrderVoucherDto {
  voucherId: string;
  orderVoucherId: string;
  voucherCode: string;
  itemsDiscount: number;
  deliveryFeeDiscount: number;
  allDiscount: number;
  orderTransactionVouchers: OrderTransactionVoucherDto[];
}

export interface ProductBrandDto {
  /** Multi language name */
  name_i18n: string;

  /** Multi language description */
  description_i18n?: string;

  /** Unique code */
  code: string;
  imageUrl?: string;
  watermarkImageUrl?: string;
}

export interface PageableProductBandDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  data?: ProductBrandDto[];
}

export interface ProductRecallReasonDto {
  name: string;
  description: string;
  code: string;
}

export interface ProductRecallDto {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  startDateTime: string;
  endDateTime: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  reason: ProductRecallReasonDto;
}

export interface Pageable {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
}

export interface ProductRecallDetailDto {
  id: string;
  name: string;
  description: string;
  stores: string[];
  imageUrl: string;
  category: string;
  subcategory: string;
  brand: string;
  gtin: string;
  sku: string;
  ean: number;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  weight: number;
  startDateTime: string;
  endDateTime: string;
  reason: ProductRecallReasonDto;
}

export interface ProductDto {
  imageUrl: string;
  name_i18n: string;
  subcategoryName: string;
  subcategoryCode: string;
  categoryCode: string;
  code: string;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  isCustomAgeRestriction: boolean;
  ageRestriction?: number;
  isAlcohol: boolean;

  /** is bio product */
  isBio: boolean;

  /** frozen product */
  isFrozen: boolean;

  /** is tobacco product */
  isTobacco: boolean;

  /** is vegan product */
  isVegan: boolean;

  /** is vegetarian product */
  isVegetarian: boolean;

  /** is Lactose Free product */
  isLactoseFree: boolean;

  /** is Gluten Free product */
  isGlutenFree: boolean;

  /** is Fair Trade product */
  isFairTrade: boolean;
  productType: ProductTypeEnum;
  productId: string;
  linkId: string;
  discount?: string;
  price: string;
  salePrice?: string;
  regularPrice: string;

  /** The number of products in the user's cart */
  inCart: number;

  /** The product is in one of the customer shopping lists */
  inShoppingList: boolean;

  /** Shopping lists containing this product */
  shoppingLists: ShoppingListBaseDto[];
  basePrice: string;
  outOfStock: boolean;
}

export interface ProductRecommendationDetailsDto {
  id: string;
  name_i18n: string;
  description_i18n: string;
  intro_i18n: string;
  mainImageUrls: string[];
  headerImageUrls: string[];
  previewImageUrls: string[];
  products: ProductDto[];
}

export enum ProductCardSizeEnum {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export interface ProductSaleDto {
  imageUrl: string;
  name_i18n: string;
  subcategoryName: string;
  subcategoryCode: string;
  categoryCode: string;
  code: string;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  isCustomAgeRestriction: boolean;
  ageRestriction?: number;
  isAlcohol: boolean;

  /** is bio product */
  isBio: boolean;

  /** frozen product */
  isFrozen: boolean;

  /** is tobacco product */
  isTobacco: boolean;

  /** is vegan product */
  isVegan: boolean;

  /** is vegetarian product */
  isVegetarian: boolean;

  /** is Lactose Free product */
  isLactoseFree: boolean;

  /** is Gluten Free product */
  isGlutenFree: boolean;

  /** is Fair Trade product */
  isFairTrade: boolean;
  productType: ProductTypeEnum;
  productId: string;
  linkId: string;
  discount?: string;
  price: string;
  salePrice?: string;
  regularPrice: string;
  productCardSize: ProductCardSizeEnum;
  basePrice: string;
  store: StoreDto;
}

export interface PageableProductSaleDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  data: ProductSaleDto[];
}

export interface PushNotificationSubscriptionEntity {
  id: string;
  token?: string;
  deviceId?: string;
  userId?: string;
  userGroup: UserGroupEnum;
  activeDate?: string;
  create_date?: string;
  update_date?: string;
}

export interface PushNotificationSubscriptionRefreshInput {
  deviceId: string;
}

export enum PushNotificationCodeEnum {
  STAFFORDERCANCELCUSTOMER = 'STAFF_ORDER_CANCEL_CUSTOMER',
  STAFFORDERCANCELADMIN = 'STAFF_ORDER_CANCEL_ADMIN',
  STAFFORDERCANCELNOPRODUCTS = 'STAFF_ORDER_CANCEL_NO_PRODUCTS',
  STAFFORDERJOBPICKERCREATED = 'STAFF_ORDER_JOB_PICKER_CREATED',
  STAFFORDERJOBPICKERACCEPTED = 'STAFF_ORDER_JOB_PICKER_ACCEPTED',
  STAFFORDERJOBPICKEREND = 'STAFF_ORDER_JOB_PICKER_END',
  STAFFORDERJOBRIDERCREATED = 'STAFF_ORDER_JOB_RIDER_CREATED',
  STAFFORDERJOBRIDERACCEPTED = 'STAFF_ORDER_JOB_RIDER_ACCEPTED',
  STAFFORDERJOBRIDEREND = 'STAFF_ORDER_JOB_RIDER_END',
  STAFFORDERJOBPICKERSTILLNOTACCEPTED = 'STAFF_ORDER_JOB_PICKER_STILL_NOT_ACCEPTED',
  STAFFORDERJOBRIDERSTILLNOTACCEPTED = 'STAFF_ORDER_JOB_RIDER_STILL_NOT_ACCEPTED',
  STAFFORDERJOBPICKERDELAYEDTOSTART = 'STAFF_ORDER_JOB_PICKER_DELAYED_TO_START',
  STAFFORDERJOBRIDERDELAYEDTOSTART = 'STAFF_ORDER_JOB_RIDER_DELAYED_TO_START',
  STAFFORDERREPLACEMENTEXPIRED = 'STAFF_ORDER_REPLACEMENT_EXPIRED',
  STAFFORDERREPLACEMENTPAID = 'STAFF_ORDER_REPLACEMENT_PAID',
  CUSTOMERORDERPAIDSUCCESSFUL = 'CUSTOMER_ORDER_PAID_SUCCESSFUL',
  CUSTOMERORDERCANCEL = 'CUSTOMER_ORDER_CANCEL',
  CUSTOMERORDERCANCELNOPRODUCTS = 'CUSTOMER_ORDER_CANCEL_NO_PRODUCTS',
  CUSTOMERORDERCANCELBYSUPPORT = 'CUSTOMER_ORDER_CANCEL_BY_SUPPORT',
  CUSTOMERORDERJOBPICKERSTART = 'CUSTOMER_ORDER_JOB_PICKER_START',
  CUSTOMERORDERUPDATEPRODUCT = 'CUSTOMER_ORDER_UPDATE_PRODUCT',
  CUSTOMERORDERPICKCOMPLETE = 'CUSTOMER_ORDER_PICK_COMPLETE',
  CUSTOMERORDERJOBRIDERSTART = 'CUSTOMER_ORDER_JOB_RIDER_START',
  CUSTOMERORDERJOBRIDEREND = 'CUSTOMER_ORDER_JOB_RIDER_END',
  CUSTOMERORDERTERMINATEWITHREFUND = 'CUSTOMER_ORDER_TERMINATE_WITH_REFUND',
  CUSTOMERORDERTERMINATENOREFUND = 'CUSTOMER_ORDER_TERMINATE_NO_REFUND',
  CUSTOMERORDERADDRESSCHANGED = 'CUSTOMER_ORDER_ADDRESS_CHANGED',
  CUSTOMERORDERJOBRIDERDELAYEDTOEND = 'CUSTOMER_ORDER_JOB_RIDER_DELAYED_TO_END',
  CUSTOMERORDERPAYMENTPENDINGDELAYED = 'CUSTOMER_ORDER_PAYMENT_PENDING_DELAYED',
  CUSTOMERORDERREPLACEMENTCREATED = 'CUSTOMER_ORDER_REPLACEMENT_CREATED',
  CUSTOMERORDERREPLACEMENTEXPIRED = 'CUSTOMER_ORDER_REPLACEMENT_EXPIRED',
}

export interface PushNotificationHistoryDataDto {
  orderId?: string;
  orderIds?: string[];
  storeId?: string;
  storeIds?: string[];
  orderJobId?: string;
  orderTransactionId?: string;
  code?: PushNotificationCodeEnum;
  firstName?: string;
  lastName?: string;
  orderNumber?: string;
  orderReplacementNumber?: string;
}

export interface PushNotificationHistoryDto {
  id: string;
  deviceId: string;
  userId: string;
  userGroup: UserGroupEnum;
  title: string;
  body: string;

  /** Payload */
  data: PushNotificationHistoryDataDto;
  markedAsReaded: boolean;
  markedAsDeleted: boolean;
  createDateTime: number;
}

export interface PushNotificationHistoryMarkInput {
  ids: string[];
}

export enum OsEnum {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export interface RatingAppSetInput {
  deviceOs?: OsEnum;
  rating: number;
  appVersion?: string;
  note?: string;
}

export interface RatingAppPostponementCreateInput {
  deviceOs?: OsEnum;
}

export interface SettingsVersionStateDto {
  version: string;
  isClientVersionUpToDate?: boolean;
}

export interface LanguageDto {
  code: LangCodeEnum;
  name_i18n: string;
  description_i18n: string;
}

export interface NationalityDto {
  code: string;
  country_i18n?: string;
  nationality_i18n: string;
}

export interface OrderCancelReasonDto {
  code: string;
  name_i18n: string;
  description_i18n: string;
}

export enum SalutationEnum {
  MR = 'MR',
  MRS = 'MRS',
  MS = 'MS',
  MISS = 'MISS',
  DR = 'DR',
  SR = 'SR',
  PROF = 'PROF',
}

export interface CustomerProfileDto {
  customerLanguageCode: string;
  customerNumber: string;
  dateOfBirth?: string;
  email: string;
  firstName: string;
  inviteCode?: string;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  lastName: string;
  phoneNumber?: string;
  phoneCountryCode?: string;
  placeOfBirth?: string;
  salutation?: SalutationEnum;
  nationalityCode?: string;
  isTempPasswordExist: boolean;
  isCustomerNew: boolean;
  photoUrl?: string;
}

export interface ProfilePhoneNumberUpdateInput {
  phoneCountryCode: string;
  phoneNumber: string;
}

export interface ProfileUpdateInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  nationalityCode?: string;
  customerLanguageCode?: string;
  inviteCode?: string;
  salutation?: SalutationEnum;
}

export interface ProfilePhotoUpdateInput {
  photoUrl: string;
}

export enum AddressTypeEnum {
  DELIVERY = 'DELIVERY',
  BILLING = 'BILLING',
}

export interface CustomerAddressDto {
  id: string;
  isActive: boolean;
  streets: string[];
  streetName?: string;
  streetNumber?: string;
  zipCode: string;
  city: string;
  state?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  country?: CountryDto;
  countryCode: Iso2Enum;
  location?: LocationDto;
  addressName: string;
  addressType: AddressTypeEnum;
  customerId: string;
  isDefault: boolean;
  deliveryComment?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface AddressCreateInput {
  addressName: string;
  addressType: AddressTypeEnum;
  countryCode: string;
  city: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode: string;
  state?: string;
  location: LocationInput;
  isDefault?: boolean;
  deliveryComment?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface AddressUpdateInput {
  addressName?: string;
  addressType?: AddressTypeEnum;
  countryCode?: string;
  city: string;
  floorNumber?: string;
  apartmentNumber?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  zipCode?: string;
  state?: string;
  location?: LocationInput;
  isDefault?: boolean;
  deliveryComment?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface ProductLegalDto {
  name_i18n: string;
  description_i18n: string;
  code: string;
}

export interface NotificationSettingsDto {
  newProductArrivals: boolean;
  sales: boolean;
  deliveryStatusChange: boolean;
}

export interface NotificationSettingsInput {
  newProductArrivals: boolean;
  sales: boolean;
  deliveryStatusChange: boolean;
}

export interface OrderItemNoteDto {
  customerNote: string;
}

export enum OrderReplacementItemStatusEnum {
  REVIEW = 'REVIEW',
  DONE = 'DONE',
  REMOVED = 'REMOVED',
  REPLACEMENT = 'REPLACEMENT',
  NEW = 'NEW',
}

export interface OrderReplacementItemDto {
  orderId: string;
  id: string;
  linkId: string;
  ean: number;
  imageUrl: string;
  name_i18n: string;
  price: string;
  priceDiscounted: string;
  subcategoryName: string;
  subcategoryCode: string;
  isDeposit?: boolean;
  categoryName: string;
  categoryCode: string;

  /** Quantity requested in current order replacement */
  quantity: number;

  /** Quantity requested in previous order transaction */
  replacementQuantityRequested: number;

  /** Quantity found in previous order transaction */
  replacementQuantityFound: number;
  basePrice: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  vatPercent: number;
  totalAmount: string;

  /** priceDiscounted * inCart */
  totalAmountDiscounted: string;
  totalRefund: string;
  totalRefundDiscounted: string;
  weight: number;
  orderReplacementItemStatus: OrderReplacementItemStatusEnum;
  parentId?: string;

  /** voucher discount per unit */
  voucherDiscount: string;

  /** voucher discount per unit value */
  voucherDiscountValue: number;

  /** voucher discount total */
  voucherAllDiscount: string;

  /** voucher discount total value */
  voucherAllDiscountValue: number;
}

export enum OrderReplacementStatusEnum {
  PENDING = 'PENDING',
  PICKING = 'PICKING',
  COMPLETE = 'COMPLETE',
  TERMINATEDBYCUSTOMER = 'TERMINATED_BY_CUSTOMER',
  TERMINATEDBYSTAFF = 'TERMINATED_BY_STAFF',
  TERMINATEDBYMANAGER = 'TERMINATED_BY_MANAGER',
  EXPIRED = 'EXPIRED',
}

export interface OrderReplacementDto {
  id: string;
  storeId: string;

  /** Replacement create date (unix timestamp) */
  create_date: number;

  /** Date time then order transaction was paid (unix timestamp) */
  payDate?: number;

  /** Duration between create date and pay date (in minutes) */
  paymentPendingTime?: number;

  /** Replacement expires (unix timestamp) */
  expires: number;
  attemptsLeft: number;
  messageReadDate?: number;
  messageReadCounter: number;
  price: string;
  priceDiscounted: string;

  /** Current weight for this replacement */
  weight: string;

  /** Max allowed weight for this replacement */
  maxWeight: string;
  isOverload: boolean;
  replacementItems: OrderReplacementItemDto[];

  /** Total refund for the last transaction to be refunded when the order is completed */
  totalPlannedRefund: string;
  itemsCount: number;
  productsCount: number;
  orderReplacementStatus: OrderReplacementStatusEnum;
  orderReplacementNumber: string;
  isAlcohol: boolean;
  isTobacco: boolean;
  isNotForUnderage: boolean;
  vatTotal: TotalVatDto[];
  totalDeposit: string;
  subtotal: string;
  subtotalDiscounted: string;
  totalPrice: string;
  totalPriceDiscounted: string;
  itemsDiscount: string;
  itemsDiscountValue: number;
  deliveryFeeDiscount: string;
  deliveryFeeDiscountValue: number;
  allDiscount: string;
  allDiscountValue: number;
}

export interface ReplacementCheckoutInput {
  deliveryAddress: CheckoutAddressInput;
  billingAddress: CheckoutAddressInput;
  phoneCountryCode: string;
  phoneNumber: string;
  deliveryComment?: string;
  deliveryDestination: DeliveryDestinationEnum;
  messageForShopper?: string;
  deliveryDontRing?: boolean;
  deliveryCallMe?: boolean;
  deliveryLeaveAtTheDoor?: boolean;
}

export interface ProductReplaceInput {
  productLinkId: string;
  count: number;
  itemId?: string;
}

export interface PageableProductDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  categoryCode?: string;
  data: ProductDto[];
}

export interface ActiveOrderDto {
  id: string;
  orderNumber: string;

  /** True if order has product replacement */
  hasReplacement: boolean;

  /** True if order has active product replacement */
  hasActiveReplacement: boolean;

  /** Replacement expires (unix timestamp) */
  replacementExpires?: number;
}

export interface PageableActiveOrderDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  data?: ActiveOrderDto[];
}

export interface CreateCartFromOrderInput {
  orderId: string;
}

export interface ShoppingListCreateInput {
  storeId: string;
  name: string;
}

export interface ShoppingListStoreDto {
  name_public_long_i18n: string;
  name_public_short_i18n: string;
}

export interface ShoppingListProductDto {
  imageUrl: string;
  name_i18n: string;
  subcategoryName: string;
  subcategoryCode: string;
  categoryCode: string;
  code: string;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  isCustomAgeRestriction: boolean;
  ageRestriction?: number;
  isAlcohol: boolean;

  /** is bio product */
  isBio: boolean;

  /** frozen product */
  isFrozen: boolean;

  /** is tobacco product */
  isTobacco: boolean;

  /** is vegan product */
  isVegan: boolean;

  /** is vegetarian product */
  isVegetarian: boolean;

  /** is Lactose Free product */
  isLactoseFree: boolean;

  /** is Gluten Free product */
  isGlutenFree: boolean;

  /** is Fair Trade product */
  isFairTrade: boolean;
  productType: ProductTypeEnum;
  productId: string;
  linkId: string;
  discount?: string;
  price: string;
  salePrice?: string;
  regularPrice: string;

  /** The number of products in the user's cart */
  inCart: number;

  /** The product is in one of the customer shopping lists */
  inShoppingList: boolean;

  /** Shopping lists containing this product */
  shoppingLists: ShoppingListBaseDto[];
  basePrice: string;
  outOfStock: boolean;
  counter: number;
}

export interface ShoppingListDto {
  id: string;
  name?: string;
  storeId: string;
  customerId: string;
  listType: ShoppingListTypeEnum;
  store?: ShoppingListStoreDto;
  products?: ShoppingListProductDto[];
}

export interface ShoppingListRenameInput {
  listId: string;
  name: string;
}

export interface ShoppingListProductLinkInput {
  listId: string;
  productLinkId: string;
}

export interface CreateCartFromShoppingListInput {
  listId: string;
}

export enum CustomerRoleEnum {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
}

export enum Iso3Enum {
  AFG = 'AFG',
  ALA = 'ALA',
  ALB = 'ALB',
  DZA = 'DZA',
  ASM = 'ASM',
  AND = 'AND',
  AGO = 'AGO',
  AIA = 'AIA',
  ATA = 'ATA',
  ATG = 'ATG',
  ARG = 'ARG',
  ARM = 'ARM',
  ABW = 'ABW',
  AUS = 'AUS',
  AUT = 'AUT',
  AZE = 'AZE',
  BHS = 'BHS',
  BHR = 'BHR',
  BGD = 'BGD',
  BRB = 'BRB',
  BLR = 'BLR',
  BEL = 'BEL',
  BLZ = 'BLZ',
  BEN = 'BEN',
  BMU = 'BMU',
  BTN = 'BTN',
  BOL = 'BOL',
  BES = 'BES',
  BIH = 'BIH',
  BWA = 'BWA',
  BVT = 'BVT',
  BRA = 'BRA',
  IOT = 'IOT',
  BRN = 'BRN',
  BGR = 'BGR',
  BFA = 'BFA',
  BDI = 'BDI',
  CPV = 'CPV',
  KHM = 'KHM',
  CMR = 'CMR',
  CAN = 'CAN',
  CYM = 'CYM',
  CAF = 'CAF',
  TCD = 'TCD',
  CHL = 'CHL',
  CHN = 'CHN',
  CXR = 'CXR',
  CCK = 'CCK',
  COL = 'COL',
  COM = 'COM',
  COG = 'COG',
  COD = 'COD',
  COK = 'COK',
  CRI = 'CRI',
  CIV = 'CIV',
  HRV = 'HRV',
  CUB = 'CUB',
  CUW = 'CUW',
  CYP = 'CYP',
  CZE = 'CZE',
  DNK = 'DNK',
  DJI = 'DJI',
  DMA = 'DMA',
  DOM = 'DOM',
  ECU = 'ECU',
  EGY = 'EGY',
  SLV = 'SLV',
  GNQ = 'GNQ',
  ERI = 'ERI',
  EST = 'EST',
  SWZ = 'SWZ',
  ETH = 'ETH',
  FLK = 'FLK',
  FRO = 'FRO',
  FJI = 'FJI',
  FIN = 'FIN',
  FRA = 'FRA',
  GUF = 'GUF',
  PYF = 'PYF',
  ATF = 'ATF',
  GAB = 'GAB',
  GMB = 'GMB',
  GEO = 'GEO',
  DEU = 'DEU',
  GHA = 'GHA',
  GIB = 'GIB',
  GRC = 'GRC',
  GRL = 'GRL',
  GRD = 'GRD',
  GLP = 'GLP',
  GUM = 'GUM',
  GTM = 'GTM',
  GGY = 'GGY',
  GIN = 'GIN',
  GNB = 'GNB',
  GUY = 'GUY',
  HTI = 'HTI',
  HMD = 'HMD',
  VAT = 'VAT',
  HND = 'HND',
  HKG = 'HKG',
  HUN = 'HUN',
  ISL = 'ISL',
  IND = 'IND',
  IDN = 'IDN',
  IRN = 'IRN',
  IRQ = 'IRQ',
  IRL = 'IRL',
  IMN = 'IMN',
  ISR = 'ISR',
  ITA = 'ITA',
  JAM = 'JAM',
  JPN = 'JPN',
  JEY = 'JEY',
  JOR = 'JOR',
  KAZ = 'KAZ',
  KEN = 'KEN',
  KIR = 'KIR',
  PRK = 'PRK',
  KOR = 'KOR',
  KWT = 'KWT',
  KGZ = 'KGZ',
  LAO = 'LAO',
  LVA = 'LVA',
  LBN = 'LBN',
  LSO = 'LSO',
  LBR = 'LBR',
  LBY = 'LBY',
  LIE = 'LIE',
  LTU = 'LTU',
  LUX = 'LUX',
  MAC = 'MAC',
  MDG = 'MDG',
  MWI = 'MWI',
  MYS = 'MYS',
  MDV = 'MDV',
  MLI = 'MLI',
  MLT = 'MLT',
  MHL = 'MHL',
  MTQ = 'MTQ',
  MRT = 'MRT',
  MUS = 'MUS',
  MYT = 'MYT',
  MEX = 'MEX',
  FSM = 'FSM',
  MDA = 'MDA',
  MCO = 'MCO',
  MNG = 'MNG',
  MNE = 'MNE',
  MSR = 'MSR',
  MAR = 'MAR',
  MOZ = 'MOZ',
  MMR = 'MMR',
  NAM = 'NAM',
  NRU = 'NRU',
  NPL = 'NPL',
  NLD = 'NLD',
  NCL = 'NCL',
  NZL = 'NZL',
  NIC = 'NIC',
  NER = 'NER',
  NGA = 'NGA',
  NIU = 'NIU',
  NFK = 'NFK',
  MKD = 'MKD',
  MNP = 'MNP',
  NOR = 'NOR',
  OMN = 'OMN',
  PAK = 'PAK',
  PLW = 'PLW',
  PSE = 'PSE',
  PAN = 'PAN',
  PNG = 'PNG',
  PRY = 'PRY',
  PER = 'PER',
  PHL = 'PHL',
  PCN = 'PCN',
  POL = 'POL',
  PRT = 'PRT',
  PRI = 'PRI',
  QAT = 'QAT',
  REU = 'REU',
  ROU = 'ROU',
  RUS = 'RUS',
  RWA = 'RWA',
  BLM = 'BLM',
  SHN = 'SHN',
  KNA = 'KNA',
  LCA = 'LCA',
  MAF = 'MAF',
  SPM = 'SPM',
  VCT = 'VCT',
  WSM = 'WSM',
  SMR = 'SMR',
  STP = 'STP',
  SAU = 'SAU',
  SEN = 'SEN',
  SRB = 'SRB',
  SYC = 'SYC',
  SLE = 'SLE',
  SGP = 'SGP',
  SXM = 'SXM',
  SVK = 'SVK',
  SVN = 'SVN',
  SLB = 'SLB',
  SOM = 'SOM',
  ZAF = 'ZAF',
  SGS = 'SGS',
  SSD = 'SSD',
  ESP = 'ESP',
  LKA = 'LKA',
  SDN = 'SDN',
  SUR = 'SUR',
  SJM = 'SJM',
  SWE = 'SWE',
  CHE = 'CHE',
  SYR = 'SYR',
  TWN = 'TWN',
  TJK = 'TJK',
  TZA = 'TZA',
  THA = 'THA',
  TLS = 'TLS',
  TGO = 'TGO',
  TKL = 'TKL',
  TON = 'TON',
  TTO = 'TTO',
  TUN = 'TUN',
  TUR = 'TUR',
  TKM = 'TKM',
  TCA = 'TCA',
  TUV = 'TUV',
  UGA = 'UGA',
  UKR = 'UKR',
  ARE = 'ARE',
  GBR = 'GBR',
  USA = 'USA',
  UMI = 'UMI',
  URY = 'URY',
  UZB = 'UZB',
  VUT = 'VUT',
  VEN = 'VEN',
  VNM = 'VNM',
  VGB = 'VGB',
  VIR = 'VIR',
  WLF = 'WLF',
  ESH = 'ESH',
  YEM = 'YEM',
  ZMB = 'ZMB',
  ZWE = 'ZWE',
}

export interface CountryEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code: Iso2Enum;
  iso2: Iso2Enum;
  iso3: Iso3Enum;
}

export interface CustomerAddressEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: CountryEntity;
  countryCode?: string;
  location?: LocationDto;
  addressName: string;
  addressType: AddressTypeEnum;
  customerId?: string;
  isDefault?: boolean;
  deliveryComment?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface CorporateEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
}

export interface StoreBrandEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  corporate?: CorporateEntity;
  corporateCode?: string;
  imageUrl?: string;
}

export interface StoreRegionEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  countryCode: Iso2Enum;
}

export interface StoreAddressEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: CountryEntity;
  countryCode?: string;
  location?: LocationDto;

  /** Global location number */
  gln?: string;
  addressType: 'MAIN' | 'SECONDARY' | 'WAREHOUSE' | 'OTHER';
  storeId?: string;
}

export enum StoreContactTypeEnum {
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  OTHER = 'OTHER',
}

export interface StoreContactEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  firstName?: string;
  lastName?: string;
  salutation: SalutationEnum;
  contactType?: StoreContactTypeEnum;
  email?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  store?: StoreEntity;
  storeId?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  zipCode?: string;
  city?: string;
  country?: CountryEntity;
  countryCode?: string;
  description?: string;
}

export interface StoreClosingDayEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  dateStart?: string;
  dateEnd?: string;
  store?: StoreEntity;
  storeId?: string;
  note?: string;
}

export enum DayOfWeekEnum {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export interface StoreOpeningHourEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  timeStart?: string;
  timeEnd?: string;
  dateStart?: string;
  dateEnd?: string;
  store?: StoreEntity;
  storeId?: string;
  daysOfWeek?: DayOfWeekEnum[];
}

export interface StorePickDurationEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  timeStart?: string;
  timeEnd?: string;
  dateStart?: string;
  dateEnd?: string;
  store?: StoreEntity;
  storeId?: string;
  daysOfWeek?: DayOfWeekEnum[];
}

export interface StoreWeightOptionEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  timeStart?: string;
  timeEnd?: string;
  dateStart?: string;
  dateEnd?: string;
  weightValue?: number;
  store?: StoreEntity;
  storeId?: string;
}

export interface StoreDeliveryZoneEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  dateStart?: string;
  dateEnd?: string;
  country?: CountryEntity;
  countryCode?: Iso2Enum;
  storeId?: string;
  deliveryTime?: number;

  /** Default fee for this zone */
  defaultFee?: number;
  isInstantDelivery?: boolean;
  isPublicDisplay: boolean;
  zipCodes?: string[];
}

export interface StoreSocialMediaEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  accountType?: string;
  account?: string;
  store?: StoreEntity;
  storeId?: string;
}

export interface StoreDeliveryTimeEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  timeStart?: string;
  timeEnd?: string;
  dateStart?: string;
  dateEnd?: string;
  storeId?: string;
}

export interface VatEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  value?: number;
}

export enum CurrencyCodeEnum {
  USD = 'USD',
  EUR = 'EUR',
  NOK = 'NOK',
  DKK = 'DKK',
}

export interface CurrencyEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: CurrencyCodeEnum;
  symbol?: string;
}

export interface VendorTypeEntity {
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  id: string;
  isActive?: boolean;
  create_date?: string;
  update_date?: string;
}

export interface VendorCategoryEntity {
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
}

export interface ProductSubcategoryEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  category?: ProductCategoryEntity;
  categoryCode?: string;
  imageUrl?: string;
  order?: number;

  /** Unique identifying part of a web address */
  slug?: string;
}

export interface ProductCategoryEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  subcategories?: ProductSubcategoryEntity[];
  vendorCategory?: VendorCategoryEntity;
  vendorCategoryCode?: string;
  imageUrl?: string;
  order?: number;

  /** Unique identifying part of a web address */
  slug?: string;
}

export enum StaffRoleEnum {
  UNASSIGNED = 'UNASSIGNED',
  DRIVER = 'DRIVER',
  PICKER = 'PICKER',
  PICKERDRIVER = 'PICKER_DRIVER',
}

export enum Iso15897Enum {
  EnUS = 'en_US',
  NlNL = 'nl_NL',
  NlBE = 'nl_BE',
  FrFR = 'fr_FR',
  FrBE = 'fr_BE',
  DeDE = 'de_DE',
  DeAT = 'de_AT',
  DeCH = 'de_CH',
  EsES = 'es_ES',
  CaES = 'ca_ES',
  PtPT = 'pt_PT',
  ItIT = 'it_IT',
  NbNO = 'nb_NO',
  SvSE = 'sv_SE',
  FiFI = 'fi_FI',
  DaDK = 'da_DK',
  IsIS = 'is_IS',
  HuHU = 'hu_HU',
  PlPL = 'pl_PL',
  LvLV = 'lv_LV',
  LtLT = 'lt_LT',
}

export interface LanguageEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: LangCodeEnum;
  locale?: Iso15897Enum;
  isPrimary?: boolean;
}

export interface NationalityEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  country?: CountryEntity;
  countryCode?: string;
  code?: string;
  adjectiveNationality_i18n: string;
  nounNationality_i18n: string;
}

export interface StaffSettingsEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  firstName?: string;
  lastName?: string;
  staffLanguage?: LanguageEntity;
  staffLanguageCode: LangCodeEnum;
  phoneCountryCode?: string;
  phoneNumber?: string;
  staffNumber?: string;
  nationality?: NationalityEntity;
  nationalityCode?: string;
  salutation?: SalutationEnum;
  dateOfBirth?: string;
  placeOfBirth?: string;
  allowAssociateJobs: boolean;
  photoUrl?: string;
}

export interface StaffEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  email?: string;
  password?: string;
  tempPassword?: string;
  forgotDateTime?: string;
  rightToBeForgotten?: boolean;
  forgotUrl?: string;
  isEmailVerified?: boolean;
  isTermsAndConditionsAgreed?: boolean;
  lastLoginDate?: string;
  isOnline?: boolean;
  note?: string;
  appVersion?: string;
  settingsId?: string;
  isPhoneNumberVerified?: boolean;
  role: StaffRoleEnum;
  settings?: StaffSettingsEntity;
  storesBound?: StoreStaffBoundEntity[];

  /** Identifying the staff user as external user or bringoo inhouse employee. */
  isExternalEmployee?: boolean;
}

export interface StoreStaffBoundEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  storeId: string;
  staffId: string;
  staff?: StaffEntity;
  store?: StoreEntity;
}

export enum StoreStaffRestrictionEnum {
  FREELANCEONLY = 'FREELANCE_ONLY',
  BOUNDONLY = 'BOUND_ONLY',
  BOUNDANDFREELANCE = 'BOUND_AND_FREELANCE',
}

export interface StoreEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  name_public_short_i18n: string;
  name_public_long_i18n: string;
  storeBrand?: StoreBrandEntity;
  storeBrandCode?: string;
  corporate?: CorporateEntity;
  corporateCode?: string;
  region?: StoreRegionEntity;
  storeRegionCode?: string;
  addresses?: StoreAddressEntity[];
  contacts?: StoreContactEntity[];
  closingDays?: StoreClosingDayEntity[];
  openingHours?: StoreOpeningHourEntity[];
  pickDurations?: StorePickDurationEntity[];
  storeWeights?: StoreWeightOptionEntity[];
  deliveryZones?: StoreDeliveryZoneEntity[];
  socialMedia?: StoreSocialMediaEntity[];
  deliveryTime?: StoreDeliveryTimeEntity[];
  logoUrl?: string;
  rectLogoUrl?: string;
  heroImgUrl?: string;
  promoImgUrl?: string;
  landingImgUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  navbarColor?: string;
  productCardColor?: string;
  productCategoryCardColor?: string;
  isPickup?: boolean;
  isDelivery?: boolean;
  isOnlineShipment?: boolean;
  deliveryFeeVat?: VatEntity;
  deliveryFeeVatCode?: string;
  currency?: CurrencyEntity;
  currencyCode?: CurrencyCodeEnum;
  vendorType?: VendorTypeEntity;
  vendorTypeCode?: string;
  vendorCategory?: VendorCategoryEntity;
  vendorCategoryCode?: string;

  /** Product out out stock time, hours */
  productOutOfStockTime?: number;
  productLink?: string[];
  productCategoriesOutOfStockTime?: string[];
  categories?: ProductCategoryEntity[];
  subcategories?: ProductSubcategoryEntity[];
  staffBound?: StoreStaffBoundEntity[];

  /** Unique identifying part of a web address */
  slug?: string;

  /** Piker can start work without driver */
  isStartPickJobWithoutDriverAllowed?: boolean;
  pickerRestriction: StoreStaffRestrictionEnum;
  driverRestriction: StoreStaffRestrictionEnum;

  /** Maximum waiting time for a customer`s response (in seconds) on product replacement */
  replacementMaxTime?: number;

  /** Maximum attempts on product replacement */
  replacementMaxAttempts?: number;
  timeZone: string;

  /** This code is meant to be used to share data between bringoo and partner. */
  externalCode?: string;

  /** The store have product replacement or not. */
  replacementAllowed?: boolean;

  /** The store have sync order with partners service */
  syncOrdersToPartner?: boolean;
}

export interface CartAddressEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  streets?: string[];
  streetName?: string;
  streetNumber?: string;
  floorNumber?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: CountryEntity;
  countryCode?: string;
  location?: LocationDto;
  cartId?: string;
  organizationName?: string;
  organizationTaxId?: string;
}

export interface ProductBrandEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  imageUrl?: string;
  watermarkImageUrl?: string;
}

export enum ProductUnitCodeEnum {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  ITEM = 'ITEM',
  LAUNDRY = 'LAUNDRY',
  SHEET = 'SHEET',
  PAIR = 'PAIR',
}

export interface ProductUnitEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: ProductUnitCodeEnum;
}

export interface ProductDepositEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  itemVatCode?: string;
  itemVatPercent?: number;
  itemDepositValueGross?: number;
  itemDepositValueNet?: number;
  itemDepositVatValue?: number;
  boxVatCode?: string;
  boxVatPercent?: number;
  boxDepositValueGross?: number;
  boxDepositValueNet?: number;
  boxDepositVatValue?: number;
}

export interface ProductLegalEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  startDateTime?: string;
}

export enum NutriScoreEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  UNKNOWN = 'UNKNOWN',
}

export interface NutritionalDataDto {
  /** total energy in kj */
  energyTotal: number;

  /** Calories per 100 g */
  calories: number;

  /** Total fat in g */
  fatTotal: number;

  /** Fat saturates in g */
  fatSaturates: number;

  /** Carbohydrate Total in g */
  carbohydrateTotal: number;

  /** Carbohydrate sugars in g */
  carbohydrateSugars: number;

  /** Fibres in g */
  fibres: number;

  /** Protein in g */
  protein: number;

  /** Salt in g */
  salt: number;
}

export enum CoverTypeEnum {
  HARDCOVER = 'HARDCOVER',
  PAPERBACK = 'PAPERBACK',
}

export interface ProductAttributesEntity {
  id: string;

  /** Is alcoholic drink */
  isAlcohol: boolean;

  /** Alcohol value */
  alcoholValue: number;
  isBio: boolean;
  isFrozen: boolean;
  isTobacco: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
  isGlutenFree: boolean;
  nutriScore: NutriScoreEnum;
  nutritional_data: NutritionalDataDto;
  ingredients_i18n: string;
  allergenic_information_i18n: string;
  storageInstructions_i18n: string;
  width: number;
  height: number;
  length: number;
  bookPublisher: string;

  /** Book language */
  bookLanguage: string;
  bookCoverType: CoverTypeEnum;
  bookTotalPages: number;
  bookISBN_10: string;
  bookISBN_13: string;

  /** Reading Age Range */
  bookReadingAge: number;

  /** Gradle Level Range */
  bookGradleLevel: number;

  /** Pharmazentralnummer */
  pzn: string;
  dar_i18n: string;
  packingStandard_i18n: string;
  activeSubstance_i18n: string;
  recipeAble: boolean;
  monoPreparation: boolean;
  pharmaciesRequired: boolean;
}

export interface ProductEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  name_i18n?: string;
  description_i18n?: string;
  code?: string;
  note_internal?: string;
  note_external?: string;

  /** Global Trade Item Number */
  gtin?: string;
  metaData?: string;

  /** Stock Keeping Unit */
  sku?: string;

  /** European Article Number */
  ean?: number;

  /** Unique identifying part of a web address */
  slug?: string;

  /** Product need age verification */
  isCustomAgeRestriction?: boolean;

  /** Age Restriction */
  ageRestriction?: number;

  /** Approved to be published */
  isApproved?: boolean;

  /** visible on backend */
  isPublic?: boolean;
  isFairTrade?: boolean;

  /** visible from */
  isPublicDateTime?: string;
  isPickup?: boolean;
  isPickAndDrive?: boolean;
  isOnlineShipment?: boolean;
  productBrand?: ProductBrandEntity;
  productBrandCode?: string;
  subcategory?: ProductSubcategoryEntity;
  productSubcategoryCode?: string;
  category?: ProductCategoryEntity;
  productCategoryCode?: string;
  imageUrls?: string[];
  productType?: ProductTypeEnum;

  /** Product weight in grams */
  weight?: number;
  productUnit?: ProductUnitEntity;
  productUnitCode: ProductUnitCodeEnum;
  baseUnitCode: ProductUnitCodeEnum;
  baseUnit?: ProductUnitEntity;

  /** Total product measurement in units */
  productMeasurement?: number;

  /** Base measurement in units */
  baseMeasurement?: number;

  /** Default product price */
  defaultPrice?: number;

  /** Cost product price */
  costPrice?: number;

  /** Charge tax on this product */
  chargeTax?: boolean;
  productLink?: ProductLinkEntity[];
  deposit?: ProductDepositEntity;
  depositId?: string;
  vat?: VatEntity;
  vatCode?: string;
  productVatPercent?: number;
  productValueGross?: number;
  productValueNet?: number;
  productVatValue?: number;
  basePriceCoefficient?: number;
  tags_i18n?: string;

  /** Image not found */
  noImage?: boolean;
  manufacturer_i18n?: string;
  special_notes_i18n?: string;

  /** Product details must show consultant details */
  isConsultationRecommended?: boolean;
  productLegal?: ProductLegalEntity;
  productLegalCode?: string;
  productAttributes?: ProductAttributesEntity;
  productAttributesId?: string;
}

export enum PriceTypeEnum {
  REGULAR = 'REGULAR',
  SALE = 'SALE',
}

export interface ProductPriceEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  productLink?: ProductLinkEntity;
  productLinkId?: string;
  dateStart?: string;
  dateEnd?: string;

  /** Price */
  price?: number;
  vat?: VatEntity;
  vatCode?: string;
  productVatPercent?: number;
  note?: string;
  productValueGross: number;
  productValueNet: number;
  productVatValue: number;
  type?: PriceTypeEnum;
}

export enum UserRoleEnum {
  Manager = 'manager',
  Staff = 'staff',
  Customer = 'customer',
}

export interface OutOfStockEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  productLink?: ProductLinkEntity;
  productLinkId?: string;
  startDateTime: string;
  endDateTime: string;

  /** Comment */
  comment?: string;
  creatorRole?: UserRoleEnum;
  creatorId?: string;

  /** Id of picker who found product */
  finderId?: string;
}

export interface ProductLinkEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  product?: ProductEntity;
  productId?: string;
  store?: StoreEntity;
  storeId?: string;
  prices?: ProductPriceEntity[];
  outStocks?: OutOfStockEntity[];
}

export interface CartItemEntity {
  id: string;
  create_date?: string;
  update_date?: string;
  productLink?: ProductLinkEntity;
  productLinkId?: string;
  name_i18n?: string;
  category_name_i18n?: string;
  categoryCode?: string;
  code?: string;
  slug?: string;
  subcategory_name_i18n?: string;
  subcategoryCode?: string;
  imageUrls?: string[];

  /** One Item VAT % */
  productVatPercent: number;

  /** One Item Vat Value */
  productVatValue: number;

  /** One Item weight in gramms */
  weight: number;

  /** Product need age verification */
  isCustomAgeRestriction?: boolean;

  /** Age Restriction */
  ageRestriction?: number;
  isFairTrade?: boolean;
  replaceTypeCode: ReplaceTypeEnum | null;
  quantity?: number;
  sku?: string;

  /** European Article Number */
  ean?: number;
  productCode?: string;
  store_name_i18n: string;
  storeId?: string;
  productType?: ProductTypeEnum;

  /** Regular item price */
  regularPrice?: number;

  /** Sale item price */
  salePrice?: number;

  /** Saved item price */
  price?: number;

  /** Discount from voucher */
  discount?: number;

  /** Vat discount from voucher */
  vatDiscount?: number;
  productId?: string;
  currency?: CurrencyEntity;
  currencyCode?: CurrencyCodeEnum;
  customerId?: string;
  customer?: CustomerEntity;
  customerNote?: string;
  cart?: CartEntity;
  cartId?: string;
}

export enum CartStatusEnum {
  DELETED = 'DELETED',
  OPEN = 'OPEN',
  PAYMENTPENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
}

export enum VoucherTypeEnum {
  FREESHIPPING = 'FREE_SHIPPING',
  DISCOUNTFIXED = 'DISCOUNT_FIXED',
  DISCOUNTPERCENTAGE = 'DISCOUNT_PERCENTAGE',
  BUYXGETY = 'BUY_X_GET_Y',
}

export enum VoucherRequirementsEnum {
  NONE = 'NONE',
  MINCOSTAMOUNT = 'MIN_COST_AMOUNT',
  MINITEMSAMOUNT = 'MIN_ITEMS_AMOUNT',
}

export enum VoucherCustomerEligibilityEnum {
  ALL = 'ALL',
  TAGS = 'TAGS',
  SELECTED = 'SELECTED',
}

export enum VoucherStoreEligibilityEnum {
  ALL = 'ALL',
  SELECTED = 'SELECTED',
}

export interface ManagerRoleEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  description?: string;
  code?: string;
}

export interface ManagerSettingsEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  firstName?: string;
  lastName?: string;
  managerLanguage?: LanguageEntity;
  managerLanguageCode: LangCodeEnum;
  phoneCountryCode?: string;
  phoneNumber?: string;
  nationality?: NationalityEntity;
  nationalityCode?: string;
  salutation?: SalutationEnum;
  dateOfBirth?: string;
  placeOfBirth?: string;
  managerNumber?: string;
  photoUrl?: string;
}

export interface ManagerEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  email?: string;
  password?: string;
  tempPassword?: string;
  forgotDateTime?: string;
  rightToBeForgotten?: boolean;
  forgotUrl?: string;
  isEmailVerified?: boolean;
  isTermsAndConditionsAgreed?: boolean;
  lastLoginDate?: string;
  isOnline?: boolean;
  note?: string;
  appVersion?: string;
  settingsId?: string;
  role: string;
  managerRole?: ManagerRoleEntity;
  settings?: ManagerSettingsEntity;
}

export enum VoucherCountryEligibilityEnum {
  ALL = 'ALL',
  SELECTED = 'SELECTED',
}

export interface VoucherFreeShippingEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  voucherId: string;
  voucher?: VoucherEntity;
  countryEligibility: VoucherCountryEligibilityEnum;
  countryIds?: string[];

  /** Is Max shipping rate for a voucher apply */
  isMaxShippingRate: boolean;

  /** Max shipping rate for a voucher apply */
  maxShippingRate?: number;
}

export enum VoucherProductEligibilityEnum {
  ALL = 'ALL',
  TAGS = 'TAGS',
  SELECTED = 'SELECTED',
}

export interface VoucherDiscountEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  voucherId: string;
  voucher?: VoucherEntity;
  value: number;
  productEligibility: VoucherProductEligibilityEnum;
  productTags?: string[];
  productIds?: string[];

  /** Is discount applied to a delivery fee */
  isAppliedToDeliveryFee: boolean;
}

export interface VoucherUsageEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  voucherId: string;
  voucher?: VoucherEntity;
  customerId: string;
  customer?: CustomerEntity;
}

export interface VoucherEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  code: string;
  voucherType: VoucherTypeEnum;
  requirements: VoucherRequirementsEnum;

  /** Min cost amount for a voucher apply */
  minCostAmount?: number;

  /** Min item amount for a voucher apply */
  minItemAmount?: number;
  excludeProductCategories?: string[];
  isLimitUsageTotal: boolean;

  /** Limit Usage Total */
  limitUsageTotal?: number;
  isLimitUsagePerCustomer: boolean;
  customerEligibility: VoucherCustomerEligibilityEnum;
  customerTags?: string[];
  customerIds?: string[];
  startDateTime: string;
  endDateTime?: string;
  storeEligibility: VoucherStoreEligibilityEnum;
  storeIds?: string[];
  managerId: string;
  isForNewCustomerOnly: boolean;
  manager?: ManagerEntity;
  freeShipping?: VoucherFreeShippingEntity;
  discount?: VoucherDiscountEntity;
  usages?: VoucherUsageEntity[];
}

export interface CartVoucherEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  cartId: string;
  cart?: CartEntity;
  voucherId: string;
  voucher?: VoucherEntity;

  /** Delivery fee discount */
  deliveryFeeDiscount?: number;

  /** Cart items discount */
  itemsDiscount?: number;
}

export interface CartEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  customer?: CustomerEntity;
  customerId?: string;
  store?: StoreEntity;
  address?: CartAddressEntity;
  storeId?: string;
  cartCode?: string;
  items?: CartItemEntity[];
  replaceTypeCode: ReplaceTypeEnum;
  weight?: number;
  maxWeight?: number;
  cartStatus?: CartStatusEnum;
  cartItemQuantity?: number;
  cartProductQuantity?: number;

  /** Order price without delivery fee */
  totalAmount?: number;

  /** Delivery fee */
  deliveryFee?: number;
  cartVoucher?: CartVoucherEntity;
}

export interface CustomerSettingsEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  firstName?: string;
  lastName?: string;
  customerLanguage?: LanguageEntity;
  customerLanguageCode?: LangCodeEnum;
  phoneCountryCode?: string;
  phoneNumber?: string;
  nationality?: NationalityEntity;
  nationalityCode?: string;
  salutation?: SalutationEnum;
  dateOfBirth?: string;
  placeOfBirth?: string;
  customerNumber?: string;
  inviteCode?: string;
  photoUrl?: string;
}

export interface CustomerNotificationSettingsEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  newProductArrivals?: boolean;
  sales?: boolean;
  deliveryStatusChange?: boolean;
}

export interface CustomerBanEntity {
  id: string;
  isActive: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  customerId: string;
  managerId: string;
  managerComment?: string;
  startDateTime: string;
  endDateTime?: string;
  manager?: ManagerEntity;
  customer?: CustomerEntity;
}

export interface CustomerEmailCodeEntity {
  id?: string;
  code: string;
  token: string;
  expires: string;
  customerId: string;
  customer?: CustomerEntity;
}

export interface CustomerEntity {
  id: string;
  isActive?: boolean;
  create_date?: string;
  update_date?: string;
  deleted_date?: string;
  email?: string;
  password?: string;
  tempPassword?: string;
  forgotDateTime?: string;
  rightToBeForgotten?: boolean;
  forgotUrl?: string;
  isEmailVerified?: boolean;
  isTermsAndConditionsAgreed?: boolean;
  lastLoginDate?: string;
  isOnline?: boolean;
  note?: string;
  appVersion?: string;
  settingsId?: string;
  role: CustomerRoleEnum;
  addresses?: CustomerAddressEntity[];
  carts?: CartEntity[];
  settings?: CustomerSettingsEntity;
  notificationSettings?: CustomerNotificationSettingsEntity;
  bans?: CustomerBanEntity[];
  customerTags?: string[];
  isPhoneNumberVerified?: boolean;
  emailCodes?: CustomerEmailCodeEntity[];
  isCustomerNew: boolean;
}

export interface VendorTypeDto {
  id: string;
  name_i18n: string;
  code: string;
  count: number;
}

export interface PageableVendorTypesDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  categoryCode: string;
  data?: VendorTypeDto[];
}

export interface PageableStoreDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  data?: StoreDto[];
}

export interface SubcategoryDto {
  name_i18n: string;
  code: string;
  categoryCode: string;
  productCount: number;
  data?: ProductDto[];
  imageUrl: string;
}

export interface CategoryDto {
  code: string;
  name_i18n: string;
  productCount: number;
  subcategoriesCount: number;
  subcategories: SubcategoryDto[];
  imageUrl: string;
  storeId: string;
}

export interface ProductAttributesDto {
  bookPublisher?: string;
  bookLanguage?: string;
  bookCoverType?: CoverTypeEnum;
  bookTotalPages?: number;
  bookISBN_10?: string;
  bookISBN_13?: string;

  /** Book Reading Age Range */
  bookReadingAge?: number;

  /** Book Grade Level Range */
  bookGradleLevel?: number;
  width?: number;
  height?: number;
  length?: number;

  /** Is alcoholic drink */
  isAlcohol?: boolean;

  /** Alcohol value */
  alcoholValue?: number;

  /** is bio product */
  isBio?: boolean;

  /** frozen product */
  isFrozen?: boolean;

  /** is tobacco product */
  isTobacco?: boolean;

  /** is vegan product */
  isVegan?: boolean;

  /** is vegetarian product */
  isVegetarian?: boolean;

  /** is Lactose Free product */
  isLactoseFree?: boolean;

  /** is Gluten Free product */
  isGlutenFree?: boolean;
  nutriScore?: NutriScoreEnum;

  /** Nutritional data */
  nutritional_data?: NutritionalDataDto;

  /** Multi language ingredients */
  ingredients_i18n?: string;

  /** Multi language storage instructions */
  storageInstructions_i18n?: string;

  /** Multi language allergenic information */
  allergenic_information_i18n?: string;

  /** Pharmazentralnummer */
  pzn?: string;
  dar_i18n?: string;
  activeSubstance_i18n?: string;
  packingStandard_i18n?: string;
  pharmaciesRequired?: boolean;
  monoPreparation?: boolean;
  recipeAble?: boolean;
}

export enum ProductDisclaimerSellerEnum {
  PARTNER = 'PARTNER',
  BRINGOO = 'BRINGOO',
}

export enum ProductDisclaimerDeliveryEnum {
  PARTNER = 'PARTNER',
  BRINGOO = 'BRINGOO',
}

export interface ProductDisclaimerDto {
  seller?: ProductDisclaimerSellerEnum;
  delivery?: ProductDisclaimerDeliveryEnum;
}

export interface ProductLinkDetailsDto {
  imageUrl: string;
  name_i18n: string;
  subcategoryName: string;
  subcategoryCode: string;
  categoryCode: string;
  code: string;
  slug: string;
  baseSize: string;
  baseSizeDetailed: ProductSizeDetailedDto;
  productSize: string;
  productSizeDetailed: ProductSizeDetailedDto;
  vatPercent: number;
  vat: string;
  isCustomAgeRestriction: boolean;
  ageRestriction?: number;
  isAlcohol: boolean;

  /** is bio product */
  isBio: boolean;

  /** frozen product */
  isFrozen: boolean;

  /** is tobacco product */
  isTobacco: boolean;

  /** is vegan product */
  isVegan: boolean;

  /** is vegetarian product */
  isVegetarian: boolean;

  /** is Lactose Free product */
  isLactoseFree: boolean;

  /** is Gluten Free product */
  isGlutenFree: boolean;

  /** is Fair Trade product */
  isFairTrade: boolean;
  productType: ProductTypeEnum;
  productId: string;
  linkId: string;
  discount?: string;
  price: string;
  salePrice?: string;
  regularPrice: string;

  /** The number of products in the user's cart */
  inCart: number;

  /** The product is in one of the customer shopping lists */
  inShoppingList: boolean;

  /** Shopping lists containing this product */
  shoppingLists: ShoppingListBaseDto[];
  basePrice: string;
  outOfStock: boolean;
  deposit?: string;
  storeId: string;
  alcoholValue?: string;
  description_i18n?: string;
  imageUrls: string[];
  ean: number;

  /** Product weight in grams */
  weight: number;
  sku: string;
  nutriScore: NutriScoreEnum;
  categoryName: string;
  nutritional_data?: NutritionalDataDto;
  productBrandName_i18n?: string;
  manufacturer_i18n?: string;
  ingredients_i18n?: string;
  allergenic_information_i18n?: string;

  /** Product details must show consultant details */
  isConsultationRecommended: boolean;

  /** Consultant is exist for this product in this store */
  isConsultantExist: boolean;

  /** Consultant is available right now */
  isConsultantAvailableNow: boolean;
  productLegalCode?: string;
  productDisclaimer?: ProductDisclaimerDto;

  /** Product attributes, depend on product type */
  productAttributes: ProductAttributesDto;
  cartMaxAmount: number;

  /** Does max limit per cart exists */
  isCartLimitExists: boolean;
}

export interface TimeSlotDto {
  /** Total number of orders that can be created in this slot */
  total: number;

  /** Number of orders that can be created in this slot */
  available: number;

  /** Number of orders that already created in this slot */
  booked: number;
  bookedPercent: number;
  isCustom: boolean;
  isActive: boolean;
  tz: string;
  dateTimeStart: number;
  dateTimeEnd: number;
  time: string;
  dateString: string;

  /** Duration in minutes */
  duration: number;
  deliveryFee: string;
}

export interface StoreSchedulerDayDto {
  weekDay: string;
  date: string;
  slots: TimeSlotDto[];

  /** Total number of orders that can be created in this day */
  totalOrders: number;

  /** Total number of orders that is booked for this day */
  bookedOrders: number;
  storeIsClosed: boolean;
}

export interface ReservationInput {
  deliveryDate: number;
}

export interface ShoppingListGeneralInfoDto {
  id: string;
  name?: string;
  storeId: string;
  customerId: string;
  listType: ShoppingListTypeEnum;
  itemsCount: number;
}

export interface StorePurschasedProductDto {
  productId: string;
  linkId: string;
  name_i18n: string;
  imageUrl: string;
  categoryCode: string;
  categoryName: string;
  subcategoryCode: string;
  subcategoryName: string;
  price: string;
  salePrice?: string;
  regularPrice: string;
  basePrice: string;
}

export interface SurveyDto {
  id: string;
  name_i18n: string;
  dateStart: string;
  dateEnd: string;
}

export interface PageableSurveyDto {
  /** Number of items on the current page */
  count: number;

  /** Total number of items */
  total: number;

  /** Current page */
  page: number;

  /** Total number of pages */
  pageCount: number;
  categoryCode: string;
  data?: SurveyDto[];
}

export interface SurveyDetailsDto {
  id: string;
  name_i18n: string;
  model: object;
  dateStart: string;
  dateEnd: string;
}

export interface StoreConsultantDto {
  id: string;

  /** If consultant available right now */
  isConsultantAvailable: boolean;
  phoneCountryCode: string;
  phoneNumber: string;
  storeName: string;
  storeAddress: string;
  description?: string;
  availableDates: string[];
  timeStart: string;
  timeEnd: string;
}

export interface ProductConsultationFeedbackInput {
  consultantId: string;
  firstName: string;
  lastName: string;
  email: string;

  /** Customer message */
  message: string;
}

export interface ProductConsultationCallbackInput {
  consultantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber?: string;

  /** Date yyyy-MM-dd */
  date: string;

  /** Time HH:mm */
  time: string;
}

export interface ProductPromotionDetailsDto {
  id: string;
  name_i18n: string;
  description_i18n: string;
  intro_i18n: string;
  mainImageUrls: string[];
  headerImageUrls: string[];
  previewImageUrls: string[];
  products: ProductDto[];
}

export enum ExceptionCodeEnum {
  SERVERERROR = 'SERVER_ERROR',
  CURRENTLYNOINSTANTDELIVERY = 'CURRENTLY_NO_INSTANT_DELIVERY',
  DELIVERYZONENOTFOUND = 'DELIVERY_ZONE_NOT_FOUND',
}

export interface ExceptionDto {
  /** Exception code */
  exceptionCode: ExceptionCodeEnum;

  /** Exception message */
  message: string;

  /** Exception status code */
  status: number;
}

export interface AuthGoogleControllerSignUpParams {
  token: string;
}

export interface AppCartControllerOrdersParams {
  limit?: number;
  page?: number;
  status?: OrderStatusFilterEnum;
}

export interface AppCustomerProductBrandControllerProductBrandsParams {
  limit: number;
  page: number;
  search?: string;
  storeId?: string;
  productCategoryCode?: string;
}

export interface AppCustomerProductRecallControllerGetProductRecallsParams {
  limit: number;
  page: number;
}

export interface AppCustomerProductRecallControllerGetProductRecallsByStoreParams {
  limit: number;
  page: number;
  storeId: string;
}

export interface AppCustomerProductRecommendationControllerGetProductRecommendationsByStoreParams {
  storeId: string;
  limit: number;
  page: number;
}

export interface AppCustomerProductRecommendationControllerGetProductRecommendationsDetailByStoreParams {
  storeId: string;
  limit: number;
  page: number;
}

export interface AppCustomerProductSalesControllerProductSalesParams {
  limit: number;
  page: number;
  zipCode: string;
  storeId?: string;
  productCategory?: string;
  productBrand?: string;
}

export interface AppCustomerPushNotificationControllerGetHistoriesByCustomerParams {
  deviceId?: string;
}

export interface AppCustomerMetaControllerProductLegalParams {
  code: string;
}

export interface AppOrderReplacementControllerStoreProductsForCategoryParams {
  limit: number;
  page: number;
  orderId: string;
  itemId: string;
}

export interface AppOrderReplacementControllerStoreProductsForSubCategoryParams {
  limit: number;
  page: number;
  orderId: string;
  itemId: string;
}

export interface AppOrderControllerActiveParams {
  limit?: number;
  page?: number;
}

export interface AppStoreControllerVendorTypesParams {
  limit?: number;
  page?: number;
}

export interface AppStoreControllerStoresParams {
  lat: number;
  lng: number;
  limit?: number;
  page?: number;
  vendorTypeCodes?: string[];
  countryCode: Iso2Enum;
  deliveryType?: ('DELIVERY' | 'PICKUP' | 'SHIPPING')[];
  zipCode: string;
}

export interface AppStoreControllerStoreParams {
  zipCode: string;
  id: string;
}

export interface AppStoreControllerStoreProductsParams {
  limit: number;
  page: number;
  isSalePrice?: boolean;
  id: string;
}

export interface AppStoreControllerStoreProductsAllParams {
  limit: number;
  page: number;
  isSalePrice?: boolean;
  id: string;
}

export interface AppStoreControllerStoreProductsSearchParams {
  limit: number;
  page: number;
  isSalePrice?: boolean;
  id: string;
  search: string;
}

export interface AppStoreControllerStoreProductsForCategoryParams {
  limit: number;
  page: number;
  isSalePrice?: boolean;
  id: string;
  code: string;
}

export interface AppStoreControllerStoreProductsForSubCategoryParams {
  limit: number;
  page: number;
  isSalePrice?: boolean;
  id: string;
  code: string;
}

export interface AppStoreControllerGetTimeSlotsParams {
  zipCode: string;
  id: string;
}

export interface AppCustomerSurveyControllerSurveysParams {
  limit: number;
  page: number;
  name_i18n?: string;
}

export interface AppVendorTypeControllerStoresParams {
  countryCode: Iso2Enum;
  zipCode: string;
  lat: number;
  lng: number;
}

export interface AppCustomerProductPromotionControllerGetProductPromotionsByStoreParams {
  storeId: string;
  limit: number;
  page: number;
}

export interface AppCustomerProductPromotionControllerGetProductPromotionsDetailByStoreParams {
  storeId: string;
  limit: number;
  page: number;
}
