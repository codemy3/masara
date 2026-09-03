import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { DbMenuCategory } from "@/types/database";
import { MenuClient } from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu — Masara Fine Dine | A Journey In Flavour",
  description:
    "Explore the Masara menu. From reinvented Indian street food to slow-cooked Awadhi curries and Mangalorean seafood delicacies.",
};

// We revalidate the menu page every 5 minutes to ensure updates from the admin panel reflect,
// or we can leave it dynamic. Since it's an important page, let's make it fully dynamic.
export const revalidate = 0; 

export default async function Menu() {
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
  }

  // Sort menu items inside categories
  const sortedCategories = (categories || []).map(cat => ({
    ...cat,
    menu_items: Array.isArray(cat.menu_items) 
      ? cat.menu_items.sort((a, b) => a.display_order - b.display_order) 
      : []
  })) as unknown as DbMenuCategory[];

  return <MenuClient categories={sortedCategories} />;
}
