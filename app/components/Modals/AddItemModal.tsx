"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, AlertCircle } from "lucide-react";

export function AddItemModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [imageErrors, setImageErrors] = useState<string>("");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageErrors("");

    if (files.length + images.length > 3) {
      setImageErrors("You can only upload a maximum of 3 images.");
      return;
    }

    const oversized = files.find(file => file.size > 1024 * 1024);
    if (oversized) {
      setImageErrors(`"${oversized.name}" is too large. Max size is 1MB.`);
      return;
    }

    setImages([...images, ...files]);
  };

  if (!isOpen) return null;

  return (
    /* 1. BACKDROP: Added overflow-y-auto to allow scrolling the modal itself.
       2. items-start + py-8: Ensures the modal doesn't get cut off at the top on small screens.
    */
    <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-black/70 backdrop-blur-md p-4 py-8">
      
      {/* 3. MODAL CONTAINER: Added bg-white and dark:bg-zinc-950 to ensure it's not translucent.
         4. relative: To keep the X button and content positioned correctly.
      */}
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl border border-input shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header - Sticky so it stays visible while scrolling */}
        <div className="top-0 z-10 flex items-center justify-between p-6 border-b border-input bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-xl font-bold text-foreground">Add New Inventory Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
                <option value="kitchen">Kitchen</option>
                <option value="beddings">Beddings</option>
              </select>
            </div>

            {/* Item Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Name</label>
              <input type="text" placeholder="e.g. Leather Bag" className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none" />
            </div>

            {/* Price & Weight */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (KES)</label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <input type="text" placeholder="e.g. 0.5kg" className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none" />
            </div>

            {/* Pieces & Origin */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pieces Available</label>
              <input type="number" placeholder="1" className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Origin</label>
              <input type="text" placeholder="e.g. Turkey, Local" className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none" />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              Product Images (Max 3)
              <span className="text-xs text-muted-foreground font-normal">(Under 1MB each)</span>
            </label>
            
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="aspect-square rounded-xl border-2 border-dashed border-input bg-accent/10 flex items-center justify-center relative overflow-hidden group">
                  {images[index] ? (
                    <>
                      <img 
                        src={URL.createObjectURL(images[index])} 
                        className="object-cover w-full h-full" 
                        alt="Preview" 
                      />
                      <button 
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 bg-red-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              ))}
            </div>
            
            {imageErrors && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {imageErrors}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-input">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-black from-80% to-green-600 text-white font-medium hover:to-green-500 transition-all shadow-lg active:scale-95"
            >
              Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}