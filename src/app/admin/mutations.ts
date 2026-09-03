"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleItemAvailability(id: string, isAvailable: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .update({ is_available: isAvailable })
    .eq("id", id);
    
  if (error) return { error: error.message };
  
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);
    
  if (error) return { error: error.message };
  
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  const supabase = await createClient();
  
  if (id) {
    // Update
    const { error } = await supabase
      .from("categories")
      .update({ name, description })
      .eq("id", id);
    if (error) return { error: error.message };
  } else {
    // Insert
    // Auto-generate a simple slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { error } = await supabase
      .from("categories")
      .insert({ name, description, slug });
    if (error) return { error: error.message };
  }
  
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveMenuItem(formData: FormData) {
  const id = formData.get("id") as string;
  const category_id = formData.get("category_id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const is_vegetarian = formData.get("is_vegetarian") === "on";
  const is_available = formData.get("is_available") !== "off"; // default true
  const is_featured = formData.get("is_featured") === "on";
  
  if (!name || !price || !category_id) {
    return { error: "Name, price, and category are required." };
  }

  const supabase = await createClient();
  
  const payload = {
    category_id,
    name,
    price,
    description: description || null,
    is_vegetarian,
    is_available,
    is_featured
  };
  
  if (id) {
    const { error } = await supabase.from("menu_items").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("menu_items").insert(payload);
    if (error) return { error: error.message };
  }
  
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  
  // Note: if there are foreign key constraints, Supabase will block this 
  // unless cascade delete is set up, or the user manually deletes items first.
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
    
  if (error) return { error: error.message };
  
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}
