export interface DbMenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  is_vegetarian: boolean;
  image_url: string | null;
  display_order: number;
  is_available: boolean;
  is_featured: boolean;
}

export interface DbMenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  menu_items: DbMenuItem[];
}
