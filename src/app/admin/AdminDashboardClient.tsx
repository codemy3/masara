"use client";

import { useState, useTransition, useRef } from "react";
import { DbMenuCategory, DbMenuItem } from "@/types/database";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, ChevronDown, ChevronUp, X } from "lucide-react";
import { toggleItemAvailability, deleteMenuItem, saveCategory, saveMenuItem, deleteCategory } from "@/app/admin/mutations";

interface AdminDashboardClientProps {
  initialCategories: DbMenuCategory[];
  stats: {
    totalCategories: number;
    totalItems: number;
    availableItems: number;
    featuredItems: number;
  };
}

export function AdminDashboardClient({ initialCategories, stats }: AdminDashboardClientProps) {
  const [categories, setCategories] = useState<DbMenuCategory[]>(initialCategories);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(
    initialCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );
  const [isPending, startTransition] = useTransition();

  // Modal States
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<DbMenuCategory | null>(null);
  
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<DbMenuItem | null>(null);

  const toggleCat = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAvailability = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      setCategories(prevCats => 
        prevCats.map(cat => ({
          ...cat,
          menu_items: cat.menu_items.map(item => 
            item.id === id ? { ...item, is_available: !currentStatus } : item
          )
        }))
      );
      await toggleItemAvailability(id, !currentStatus);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      startTransition(async () => {
        setCategories(prevCats => 
          prevCats.map(cat => ({
            ...cat,
            menu_items: cat.menu_items.filter(item => item.id !== id)
          }))
        );
        await deleteMenuItem(id);
      });
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category? Ensure all dishes inside are deleted first.")) {
      startTransition(async () => {
        setCategories(prevCats => prevCats.filter(cat => cat.id !== id));
        await deleteCategory(id);
      });
    }
  };

  const submitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveCategory(formData);
      setIsCatModalOpen(false);
      // In a real scenario we'd refetch or rely on server components re-rendering, 
      // but since we passed initial data, we'd need to refresh the page to see changes easily.
      window.location.reload(); 
    });
  };

  const submitDish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveMenuItem(formData);
      setIsDishModalOpen(false);
      window.location.reload();
    });
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D081A] mb-2">Overview</h1>
          <p className="text-[#3D081A]/60 font-sans text-sm">Manage your MASARA dining experience.</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => { setEditingCat(null); setIsCatModalOpen(true); }}
            className="bg-transparent border border-[#3D081A]/20 text-[#3D081A] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#3D081A]/5 transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> Add Category
          </button>
          <button 
            onClick={() => { setEditingDish(null); setIsDishModalOpen(true); }}
            className="bg-[#3D081A] text-[#F5E9D5] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#2A0511] transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> Add Dish
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Categories" value={stats.totalCategories.toString()} />
        <StatCard title="Total Dishes" value={stats.totalItems.toString()} />
        <StatCard title="Available" value={stats.availableItems.toString()} subtitle={`${stats.totalItems - stats.availableItems} Unavailable`} />
        <StatCard title="Featured" value={stats.featuredItems.toString()} />
      </div>

      {/* Menu Manager */}
      <div className={`mt-8 flex flex-col gap-6 ${isPending ? 'opacity-70 pointer-events-none transition-opacity' : ''}`}>
        {categories.map((category) => (
          <div key={category.id} className="bg-white/40 border border-[#3D081A]/10 rounded-sm overflow-hidden shadow-sm backdrop-blur-sm">
            
            {/* Category Header */}
            <div 
              className="bg-white/60 p-4 md:p-6 flex items-center justify-between cursor-pointer hover:bg-white/80 transition-colors"
              onClick={() => toggleCat(category.id)}
            >
              <div className="flex items-center gap-4">
                <button className="text-[#3D081A]/40 hover:text-[#3D081A]">
                  {expandedCats[category.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <h2 className="font-serif text-2xl text-[#3D081A]">
                  {category.name}
                  {!category.is_active && <span className="ml-3 text-xs bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded font-sans uppercase tracking-widest">Hidden</span>}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 text-[#3D081A]/40 hover:text-[#CBA365] transition-colors"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setEditingCat(category); 
                    setIsCatModalOpen(true); 
                  }}
                  title="Edit Category"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="p-2 text-[#3D081A]/40 hover:text-red-600 transition-colors"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleDeleteCategory(category.id); 
                  }}
                  title="Delete Category"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Items List */}
            {expandedCats[category.id] && (
              <div className="flex flex-col border-t border-[#3D081A]/10">
                {category.menu_items.length === 0 ? (
                  <div className="p-6 text-center text-[#3D081A]/40 text-sm">No items in this category.</div>
                ) : (
                  category.menu_items.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-[#3D081A]/5 last:border-b-0 hover:bg-white/30 transition-colors gap-4">
                      
                      <div className="flex flex-col max-w-2xl">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-sans font-medium text-[#3D081A]">{item.name}</span>
                          {item.is_vegetarian && (
                            <span 
                              className="flex items-center justify-center w-[14px] h-[14px] border-[1.5px] border-green-600 rounded-[2px] flex-shrink-0" 
                              title="Vegetarian"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                            </span>
                          )}
                          {item.is_featured && (
                            <span title="Featured" className="flex items-center">
                              <Star size={12} className="text-[#CBA365] fill-[#CBA365]" />
                            </span>
                          )}
                          {!item.is_available && (
                            <span className="text-[10px] uppercase tracking-widest text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                        <div className="text-[#3D081A]/60 text-sm line-clamp-1">{item.description || "No description"}</div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <span className="font-serif text-xl italic text-[#CBA365]">₹{item.price}</span>
                        
                        <div className="flex items-center gap-2 border-l border-[#3D081A]/10 pl-6">
                          <button 
                            onClick={() => handleToggleAvailability(item.id, item.is_available)}
                            className={`p-2 transition-colors ${item.is_available ? 'text-[#3D081A]/60 hover:text-green-600' : 'text-red-500 hover:text-red-700'}`}
                            title={item.is_available ? "Mark as Unavailable" : "Mark as Available"}
                          >
                            {item.is_available ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                          <button 
                            onClick={() => { setEditingDish(item); setIsDishModalOpen(true); }}
                            className="p-2 text-[#3D081A]/60 hover:text-[#CBA365] transition-colors" 
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-[#3D081A]/40 hover:text-red-600 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                    </div>
                  ))
                )}
              </div>
            )}
            
          </div>
        ))}
      </div>

      {/* Modals */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3D081A]/80 backdrop-blur-sm p-4">
          <div className="bg-[#F5E9D5] w-full max-w-lg rounded shadow-2xl overflow-hidden relative">
            <button onClick={() => setIsCatModalOpen(false)} className="absolute top-4 right-4 text-[#3D081A]/50 hover:text-[#3D081A]">
              <X size={20} />
            </button>
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-3xl text-[#3D081A] mb-6">{editingCat ? 'Edit Category' : 'New Category'}</h2>
              <form onSubmit={submitCategory} className="flex flex-col gap-5">
                {editingCat && <input type="hidden" name="id" value={editingCat.id} />}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Name</label>
                  <input type="text" name="name" defaultValue={editingCat?.name} required className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A]" placeholder="e.g. Signature Cocktails" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Description</label>
                  <textarea name="description" defaultValue={editingCat?.description || ""} className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A] resize-none h-24" placeholder="Optional category description..." />
                </div>
                <button type="submit" disabled={isPending} className="mt-4 w-full bg-[#3D081A] text-[#F5E9D5] py-3 text-sm uppercase tracking-widest hover:bg-[#2A0511] transition-colors disabled:opacity-70">
                  {isPending ? "Saving..." : "Save Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDishModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3D081A]/80 backdrop-blur-sm p-4">
          <div className="bg-[#F5E9D5] w-full max-w-xl rounded shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsDishModalOpen(false)} className="absolute top-4 right-4 text-[#3D081A]/50 hover:text-[#3D081A]">
              <X size={20} />
            </button>
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-3xl text-[#3D081A] mb-6">{editingDish ? 'Edit Dish' : 'New Dish'}</h2>
              <form onSubmit={submitDish} className="flex flex-col gap-5">
                {editingDish && <input type="hidden" name="id" value={editingDish.id} />}
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Dish Name</label>
                  <input type="text" name="name" defaultValue={editingDish?.name} required className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A]" placeholder="e.g. Masala Dosa" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col gap-2 flex-grow">
                    <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Category</label>
                    <select name="category_id" defaultValue={editingDish?.category_id} required className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A]">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-[#F5E9D5]">{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-1/3">
                    <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Price (₹)</label>
                    <input type="number" name="price" defaultValue={editingDish?.price} required min="0" step="1" className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A]" placeholder="450" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium">Description</label>
                  <textarea name="description" defaultValue={editingDish?.description || ""} className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] text-[#3D081A] resize-none h-20" placeholder="Dish description..." />
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_vegetarian" defaultChecked={editingDish?.is_vegetarian} className="accent-[#3D081A] w-4 h-4" />
                    <span className="text-sm text-[#3D081A]">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_featured" defaultChecked={editingDish?.is_featured} className="accent-[#3D081A] w-4 h-4" />
                    <span className="text-sm text-[#3D081A]">Featured Dish</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_available" defaultChecked={editingDish ? editingDish.is_available : true} className="accent-[#3D081A] w-4 h-4" />
                    <span className="text-sm text-[#3D081A]">Currently Available</span>
                  </label>
                </div>

                <button type="submit" disabled={isPending} className="mt-4 w-full bg-[#3D081A] text-[#F5E9D5] py-3 text-sm uppercase tracking-widest hover:bg-[#2A0511] transition-colors disabled:opacity-70">
                  {isPending ? "Saving..." : "Save Dish"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string, value: string, subtitle?: string }) {
  return (
    <div className="bg-white/40 border border-[#3D081A]/10 p-4 md:p-6 rounded-sm flex flex-col justify-center backdrop-blur-sm">
      <span className="text-[#3D081A]/60 text-xs uppercase tracking-widest font-medium mb-2">{title}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-3xl md:text-4xl text-[#3D081A]">{value}</span>
        {subtitle && <span className="text-[10px] text-red-800 bg-red-100 border border-red-200 px-2 py-0.5 uppercase tracking-wider">{subtitle}</span>}
      </div>
    </div>
  );
}
