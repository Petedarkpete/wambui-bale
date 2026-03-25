"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    LogOut,
    Filter,
    FileUp,
    ShoppingBag,
    CheckCircle2,
    Clock,
    ChevronRight
} from "lucide-react";

//import the modal
import { AddItemModal } from "@app/components/Modals/AddItemModal";
import { AddCategoryModal } from "@app/components/Modals/AddCategoryModal";
import { CategoriesTable } from '@app/components/Tables/CategoriesTable';
import { ProductsTable, type Product } from '@app/components/Tables/ProductsTable'
import { ProductFilters } from '@app/components/ProductFilters'
import { bg } from "date-fns/locale";

//to prevent from caching
export const dynamic = 'force-dynamic'

export default function OrdersAdmin() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([])

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category.name === activeCategory
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.origin?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const totalItems = products.length
    const availableItems = products.filter(p => p.inStock).length
    const unavailableItems = products.filter(p => !p.inStock).length

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/authentication/login'
    }

    return (
        <div className="min-h-screen bg-background p-6 space-y-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory & Orders</h1>
                    <p className="text-muted-foreground">Manage your clothing line stock and availability.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-all text-sm font-medium">
                        <FileUp className="w-4 h-4" />
                        Bulk Upload
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-orange-200 text-dark  transition-all shadow-lg font-medium">
                        <Plus className="w-4 h-4" />
                        Add New Item
                    </button>

                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Items", val: totalItems, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-200", border: "border-blue-100" },
                    { label: "Available Now", val: availableItems, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-200", border: "border-green-100" },
                    { label: "Unavailable", val: unavailableItems, icon: Clock, color: "text-amber-500", bg: "bg-amber-200", border: "border-amber-100" },
                ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-xl border ${stat.border} ${stat.bg} shadow-sm space-y-2`}>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-2xl font-bold">{stat.val}</p>
                    </div>
                ))}
            </div>

            <ProductFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onCategoryAdded={() => fetchProducts()}
            />


            {/* Inventory Table */}
            <ProductsTable products={filteredProducts} onRefresh={fetchProducts} />

            <hr></hr>

            {/* Categories Table */}
            <CategoriesTable />

            {isAddModalOpen && <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
        </div>
    );
}