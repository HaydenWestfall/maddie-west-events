export interface RentalItemMetadata {
  color?: string;
  material?: string;
  dimensions?: string;
}

export interface RentalItem {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  totalQuantity: number;
  price: number;
  metadata: RentalItemMetadata;
  createdAt: string;
  updatedAt: string;
  availableQuantity: number;
}

export interface Pagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

export interface RentalItemsResponse {
  success: boolean;
  data: RentalItem[];
  pagination: Pagination;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface RentalFilters {
  date?: string;
  category?: string;
}
