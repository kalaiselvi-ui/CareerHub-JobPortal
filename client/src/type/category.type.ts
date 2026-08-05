export interface Category {
  _id: string;
  name: string;
  slug: string;
  jobCount: number;
}

export interface CategoryResponse {
  category: Category[];
}

export interface CreateCategory {
  name: string;
}
