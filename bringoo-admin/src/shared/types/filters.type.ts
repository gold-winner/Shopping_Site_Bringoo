export type filters = {
  search: string;
  onlyWithImages?: boolean | 0;
  store?: string;
  storeId?: string;
  category: string;
  subCategory: string;
  brand: string;
  isDeposit: 'Show deposits' | 'Hide deposits' | 'Show ALL';
  isActive: 'Show Active' | 'Show Inactive' | 'Show ALL';
  includeExpired: boolean;
  storeProductRecommendationId: string | null;
};
