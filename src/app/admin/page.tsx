import { createClient } from "@/utils/supabase/server";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { DbMenuCategory, DbMenuItem } from "@/types/database";

export const revalidate = 0; // Ensure admin sees latest data

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all categories and items
  const { data: categories, error } = await supabase
    .from("categories")
    .select(`
      *,
      menu_items (*)
    `)
    .order("display_order");

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded border border-red-200">
        <h2 className="font-bold mb-2">Error loading menu data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Sort items
  const sortedCategories = (categories || []).map(cat => ({
    ...cat,
    menu_items: Array.isArray(cat.menu_items) 
      ? (cat.menu_items as unknown as DbMenuItem[]).sort((a: DbMenuItem, b: DbMenuItem) => a.display_order - b.display_order) 
      : []
  })) as unknown as DbMenuCategory[];

  // Calculate stats
  let totalItems = 0;
  let availableItems = 0;
  let featuredItems = 0;

  sortedCategories.forEach(cat => {
    totalItems += cat.menu_items.length;
    cat.menu_items.forEach(item => {
      if (item.is_available) availableItems++;
      if (item.is_featured) featuredItems++;
    });
  });

  const stats = {
    totalCategories: sortedCategories.length,
    totalItems,
    availableItems,
    featuredItems
  };

  return <AdminDashboardClient initialCategories={sortedCategories} stats={stats} />;
}
