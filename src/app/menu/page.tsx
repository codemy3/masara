import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { DbMenuCategory } from "@/types/database";
import { MenuClient } from "./MenuClient";
import { menuData } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu — Masara Fine Dine | A Journey In Flavour",
  description:
    "Explore the Masara menu. From reinvented Indian street food to slow-cooked Awadhi curries and Mangalorean seafood delicacies.",
};

export const revalidate = 0; 

export default async function Menu() {
  let sortedCategories: DbMenuCategory[] = [];

  try {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        slug,
        description,
        display_order,
        is_active,
        menu_items (
          id,
          category_id,
          name,
          description,
          price,
          is_vegetarian,
          image_url,
          display_order,
          is_available,
          is_featured
        )
      `)
      .eq("is_active", true)
      .order("display_order");

    if (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }

    // Sort menu items inside categories
    sortedCategories = (categories || []).map(cat => ({
      ...cat,
      menu_items: Array.isArray(cat.menu_items) 
        ? cat.menu_items.sort((a, b) => a.display_order - b.display_order) 
        : []
    })) as unknown as DbMenuCategory[];

  } catch (error) {
    console.error("Supabase failed or keys missing. Falling back to static data.");
    
    // Map the static menuData structure to match the DbMenuCategory structure
    sortedCategories = menuData.map((cat, index) => ({
      id: cat.id,
      name: cat.title,
      slug: cat.id,
      description: cat.description || null,
      display_order: index,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      menu_items: cat.items.map((item, itemIndex) => ({
        id: `${cat.id}-item-${itemIndex}`,
        category_id: cat.id,
        name: item.name,
        description: item.description || null,
        price: parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0,
        is_vegetarian: item.isVegetarian || false,
        image_url: null,
        display_order: itemIndex,
        is_available: true,
        is_featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    }));
  }

  return <MenuClient categories={sortedCategories} />;
}
