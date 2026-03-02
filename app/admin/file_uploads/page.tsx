"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    FileUp,
    ShoppingBag,
    CheckCircle2,
    Clock,
    ChevronRight
} from "lucide-react";

//import the modal
import { AddItemModal } from "@app/components/Modals/AddItemModal";

// Mock Data
const INITIAL_ORDERS = [
    { id: "ORD-001", item: "Vintage Oversized Tee", category: "Tops", size: "XL", price: 2500, status: "Available", date: "2024-03-20" },
    { id: "ORD-002", item: "Slim Fit Chinos", category: "Bottoms", size: "32", price: 4200, status: "Reserved", date: "2024-03-21" },
    { id: "ORD-003", item: "Denim Trucker Jacket", category: "Outerwear", size: "L", price: 8500, status: "Available", date: "2024-03-19" },
    { id: "ORD-004", item: "Cargo Joggers", category: "Bottoms", size: "M", price: 3800, status: "Available", date: "2024-03-22" },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"];

export default function OrdersAdmin() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = INITIAL_ORDERS.filter(order => {
        const matchesCategory = activeCategory === "All" || order.category === activeCategory;
        const matchesSearch = order.item.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleEdit = (order: any) => {
        // Implement edit functionality
        alert(`Edit functionality for ${order.item} is not implemented yet.`);
    };

    const handleDelete = (orderId: string) => {
        // Implement delete functionality
        alert(`Delete functionality for order ${orderId} is not implemented yet.`);
    };

    const handleUpdateStatus = (orderId: string) => {
        // Implement status update functionality
        alert(`Status update functionality for order ${orderId} is not implemented yet.`);
    };

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
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-amber-100 to-red-800 text-white hover:to-red-700 transition-all shadow-lg font-medium">
                        <Plus className="w-4 h-4" />
                        Add New Item
                    </button>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Items", val: "124", icon: ShoppingBag, color: "text-blue-500" },
                    { label: "Available Now", val: "86", icon: CheckCircle2, color: "text-green-500" },
                    { label: "Pending Orders", val: "12", icon: Clock, color: "text-amber-500" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl border border-input bg-card shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-2xl font-bold">{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* Category & Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-input">
                <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                    : "hover:bg-accent text-muted-foreground border border-transparent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="rounded-xl border border-input bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-accent/50 border-b border-input">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Item Details</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-input">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-accent/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{order.item}</span>
                                            <span className="text-xs text-muted-foreground">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.category}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold">
                                            {order.size}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold">
                                        KES {order.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === "Available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${order.status === "Available" ? "bg-green-600" : "bg-amber-600"}`} />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* Edit Button - Blue/Neutral */}
                                            <button
                                                onClick={() => handleEdit(order)}
                                                className="p-2 hover:bg-blue-500/10 hover:text-blue-600 rounded-lg transition-colors group/edit"
                                                title="Edit Details"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>

                                            {/* Update Status Button - Green (Your Theme) */}
                                            <button
                                                onClick={() => handleUpdateStatus(order.id)}
                                                className="p-2 hover:bg-green-500/10 hover:text-green-600 rounded-lg transition-colors"
                                                title="Update Status"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>

                                            {/* Delete Button - Red */}
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="p-2 hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-colors"
                                                title="Delete Item"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddModalOpen && <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
        </div>
    );
}