"use client";

import DashboardFooter from "./DashboardFooter";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  DollarSign,
  Eye,
  FileText,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  MoreVertical,
  Package,
  Percent,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

type NavChild = {
  label: string;
  href?: string;
};

type NavItem = {
  label: string;
  icon: React.ReactNode;
  badge?: string;
  active?: boolean;
  arrow?: boolean;
  children?: NavChild[];
};

function SidebarItem({
  item,
  defaultOpen = false,
}: {
  item: NavItem;
  defaultOpen?: boolean;
}) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className={[
          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition",
          item.active
            ? "bg-[#374151] text-white"
            : "text-gray-300 hover:bg-white hover:text-black",
        ].join(" ")}
      >
        <span className="flex items-center gap-3">
          <span className={item.active ? "text-white" : "text-gray-400"}>
            {item.icon}
          </span>
          <span className={item.active ? "font-semibold text-white" : "font-medium"}>
            {item.label}
          </span>
        </span>

        {hasChildren ? (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 \${
              open ? "rotate-180" : ""
            }`}
          />
        ) : item.badge ? (
          <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-bold text-red-600">
            {item.badge}
          </span>
        ) : item.arrow ? (
          <ChevronRight size={16} className="text-gray-400" />
        ) : null}
      </button>

      {hasChildren && open ? (
        <div className="ml-9 mt-1 space-y-1 border-l border-gray-700 pl-4">
          {item.children?.map((child) => (
            <Link
              key={child.label}
              href={child.href || "#"}
              className="block rounded-lg px-3 py-2 text-[14px] text-gray-300 transition hover:bg-white hover:text-black"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const commerceItems: NavItem[] = useMemo(
    () => [
      { label: "Overview", icon: <LayoutDashboard size={18} />, active: true },
      { label: "Orders", icon: <ShoppingCart size={18} /> },
      {
        label: "Products",
        icon: <Package size={18} />,
        children: [
          { label: "All Products", href: "/admin/products" },
          { label: "Add New Product", href: "/admin/products/add" },
          { label: "Brand", href: "/admin/products/brand" },
          { label: "Categories", href: "/admin/products/category" },
          { label: "Units", href: "/admin/products/units" },
          { label: "Attribute Sets", href: "/admin/products/attributes" },
          { label: "Bulk Import", href: "/admin/products/import" },
          { label: "Bulk Export", href: "/admin/products/export" },
        ],
      },
      { label: "Categories", icon: <Grid2X2 size={18} /> },
      { label: "Customers", icon: <Users size={18} /> },
      { label: "Inventory", icon: <Warehouse size={18} /> },
      { label: "Shipping", icon: <Truck size={18} /> },
      { label: "Returns", icon: <RefreshCcw size={18} /> },
    ],
    []
  );

  const salesItems: NavItem[] = useMemo(
    () => [
      { label: "Revenue", icon: <DollarSign size={18} /> },
      { label: "Discounts", icon: <Percent size={18} /> },
      { label: "Coupons", icon: <Tag size={18} /> },
      { label: "Transactions", icon: <CreditCard size={18} /> },
      { label: "Reports", icon: <BarChart3 size={18} /> },
    ],
    []
  );

  const storefrontItems: NavItem[] = useMemo(
    () => [
      {
        label: "StoreFront",
        icon: <Store size={18} />,
        children: [{ label: "Slider", href: "/admin/storefront/slider" }],
      },
      { label: "Reviews", icon: <Star size={18} /> },
      { label: "Messages", icon: <MessageSquare size={18} />, badge: "12" },
      { label: "Pages", icon: <FileText size={18} /> },
      { label: "Fulfillment", icon: <Boxes size={18} />, arrow: true },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111827]">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden border-r border-gray-700 bg-[#1f2937] xl:flex xl:flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1f2937]">
                <ShoppingCart size={18} />
              </div>
              <div>
                <div className="text-[16px] font-bold tracking-tight text-white">
                  Modern Electronics Ltd
                </div>
                <div className="text-[12px] text-gray-400">Seller Admin</div>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="flex gap-3">
              <Link
                href="/admin/products/add"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 text-[15px] font-medium text-[#1f2937] shadow-sm transition-colors hover:bg-gray-50"
              >
                <Plus size={18} />
                Add Product
              </Link>
              <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-700 bg-[#111827] text-white transition-colors hover:bg-black">
                <ClipboardList size={18} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex-1 overflow-y-auto px-4 pb-6">
            <div>
              <p className="px-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                Ecommerce
              </p>
              <div className="mt-3 space-y-1.5">
                {commerceItems.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    defaultOpen={item.label === "Products"}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="px-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                Sales & Marketing
              </p>
              <div className="mt-3 space-y-1.5">
                {salesItems.map((item) => (
                  <SidebarItem key={item.label} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="px-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                Store Management
              </p>
              <div className="mt-3 space-y-1.5">
                {storefrontItems.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    defaultOpen={item.label === "StoreFront"}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 px-6 py-5">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Store owner"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-medium text-white">
                  Kenneth Store
                </div>
                <div className="truncate text-[13px] text-gray-400">
                  seller@modernelectronics.com
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-col">
          {/* Topbar */}
          <header className="border-b border-[#e5e7eb] bg-white px-4 py-3 md:px-6 xl:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#111827] xl:hidden">
                  <Menu size={18} />
                </button>

                <div className="hidden items-center gap-2 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[14px] text-[#374151] md:flex">
                  <span className="font-medium">Store:</span>
                  <span>Easy Spares Electronics</span>
                  <ChevronDown size={16} />
                </div>

                <div className="flex min-w-[220px] max-w-[520px] flex-1 items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-2.5">
                  <Search size={18} className="text-[#6b7280]" />
                  <input
                    type="text"
                    placeholder="Search orders, products, customers..."
                    className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8b8f97]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="hidden rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-[14px] font-medium text-[#111827] md:inline-flex">
                  View Store
                </button>
                <button className="hidden rounded-xl bg-[#ff9900] px-4 py-2.5 text-[14px] font-semibold text-white md:inline-flex">
                  Create Offer
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#111827]">
                  <Bell size={18} />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#111827]">
                  <Settings size={18} />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#111827]">
                  <Moon size={18} />
                </button>
                <img
                  src="https://i.pravatar.cc/80?img=32"
                  alt="User avatar"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                />
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-5 md:px-6 xl:px-8">
            {children}
          </div>
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
