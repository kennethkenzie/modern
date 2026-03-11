"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  MoreVertical,
  RefreshCcw,
  Truck,
  Users,
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  headline: string;
  subtext: string;
};

type OrderRow = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
};

type StockRow = {
  product: string;
  sku: string;
  stock: number;
  status: "Low" | "Critical";
};

type SellerRow = {
  name: string;
  category: string;
  units: number;
  revenue: string;
};

type ActivityRow = {
  customer: string;
  action: string;
  time: string;
};

const statCards: StatCard[] = [
  {
    title: "Total Sales",
    value: "UGX 18.4M",
    change: "+18.2%",
    positive: true,
    headline: "Sales increased this month",
    subtext: "Compared to last 30 days",
  },
  {
    title: "Orders",
    value: "1,284",
    change: "+9.4%",
    positive: true,
    headline: "Order volume is healthy",
    subtext: "Average 42 orders per day",
  },
  {
    title: "Products",
    value: "8,642",
    change: "+4.1%",
    positive: true,
    headline: "Catalog keeps expanding",
    subtext: "New SKUs added this week",
  },
  {
    title: "Conversion Rate",
    value: "5.8%",
    change: "-1.6%",
    positive: false,
    headline: "Slight drop in conversion",
    subtext: "Review product pages & ads",
  },
];

const recentOrders: OrderRow[] = [
  {
    id: "#ES-1042",
    customer: "Sarah Namukasa",
    product: "T-CON Board Sony 42\"",
    amount: "UGX 85,000",
    status: "Pending",
    date: "Today, 10:45 AM",
  },
  {
    id: "#ES-1041",
    customer: "David Kato",
    product: "LG Power Supply Board",
    amount: "UGX 120,000",
    status: "Shipped",
    date: "Today, 09:10 AM",
  },
  {
    id: "#ES-1039",
    customer: "Brian Ssemanda",
    product: "Universal TV Remote",
    amount: "UGX 35,000",
    status: "Delivered",
    date: "Yesterday",
  },
  {
    id: "#ES-1036",
    customer: "Mariam Achieng",
    product: "Backlight Strips Set",
    amount: "UGX 95,000",
    status: "Cancelled",
    date: "Yesterday",
  },
];

const lowStock: StockRow[] = [
  {
    product: 'T-CON Board Sony 42"',
    sku: "TC-SONY-42",
    stock: 4,
    status: "Low",
  },
  {
    product: 'LG LED Backlight 32"',
    sku: "LG-BL-32",
    stock: 2,
    status: "Critical",
  },
  {
    product: "HDMI Switch 3 Port",
    sku: "HDMI-3P",
    stock: 6,
    status: "Low",
  },
  {
    product: "Samsung PSU Board",
    sku: "SAM-PSU-19",
    stock: 1,
    status: "Critical",
  },
];

const topSellers: SellerRow[] = [
  {
    name: "Universal TV Remote",
    category: "Accessories",
    units: 214,
    revenue: "UGX 7.4M",
  },
  {
    name: "Samsung Main Board",
    category: "Spare Parts",
    units: 132,
    revenue: "UGX 12.8M",
  },
  {
    name: "HDMI Cable 2M",
    category: "Cables",
    units: 310,
    revenue: "UGX 4.6M",
  },
  {
    name: "LG Backlight Strip",
    category: "Spare Parts",
    units: 98,
    revenue: "UGX 6.1M",
  },
];

const customerActivity: ActivityRow[] = [
  {
    customer: "Kevin M.",
    action: "placed an order for TDA2822M IC",
    time: "5 min ago",
  },
  {
    customer: "Ruth A.",
    action: "added 3 products to cart",
    time: "12 min ago",
  },
  {
    customer: "Paul K.",
    action: "completed checkout",
    time: "20 min ago",
  },
  {
    customer: "Janet N.",
    action: "requested return for TV remote",
    time: "1 hour ago",
  },
  {
    customer: "Emma S.",
    action: "left a 5-star review",
    time: "2 hours ago",
  },
];

function StatBadge({
  positive = true,
  value,
}: {
  positive?: boolean;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-[14px] font-semibold text-[#111827]">
      {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {value}
    </div>
  );
}

function StatCard({ card }: { card: StatCard }) {
  return (
    <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[18px] font-medium text-[#6b7280]">{card.title}</h3>
        <StatBadge positive={card.positive} value={card.change} />
      </div>

      <div className="mt-3 text-[44px] font-semibold leading-none tracking-[-0.03em] text-[#0b1220]">
        {card.value}
      </div>

      <div className="mt-5 flex items-center gap-2 text-[18px] font-medium text-[#0b1220]">
        <span>{card.headline}</span>
        {card.positive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
      </div>

      <p className="mt-2 text-[16px] text-[#7b8394]">{card.subtext}</p>
    </div>
  );
}

function SalesChart() {
  const bars = [
    28, 22, 30, 35, 50, 58, 31, 62, 20, 40, 57, 38, 60, 27, 24, 22, 71, 56, 18,
    24, 30, 26, 57, 19, 66, 25, 70, 32, 49, 28, 71, 69, 84, 37, 25, 44, 53, 48,
    23, 18, 82, 61, 75, 38, 29, 17, 46, 41, 24, 72, 14, 52, 26, 73, 20, 67, 18,
    58, 55, 76, 22, 75, 25, 70, 47, 84, 20, 73, 28, 84, 17, 60, 80, 19, 69,
  ];

  const line = [
    12, 9, 18, 21, 28, 19, 25, 8, 12, 30, 17, 25, 14, 16, 11, 13, 35, 19, 10, 14,
    15, 19, 25, 8, 34, 12, 31, 15, 22, 12, 37, 41, 19, 14, 28, 21, 17, 10, 7, 39,
    24, 28, 26, 16, 8, 21, 17, 15, 37, 9, 20, 12, 34, 10, 27, 14, 24, 22, 39, 12,
    35, 14, 41, 9, 26, 16, 42, 10, 22, 14, 41, 11, 24, 39, 13, 31,
  ];

  const labels = [
    "Apr 5",
    "Apr 10",
    "Apr 15",
    "Apr 20",
    "Apr 25",
    "Apr 30",
    "May 5",
    "May 10",
    "May 15",
    "May 20",
    "May 25",
    "May 30",
    "Jun 4",
    "Jun 9",
    "Jun 14",
    "Jun 19",
    "Jun 24",
    "Jun 30",
  ];

  return (
    <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-[28px] font-semibold text-[#0b1220]">Sales Overview</h3>
          <p className="mt-1 text-[16px] text-[#7b8394]">
            Revenue and order activity for the last 3 months
          </p>
        </div>

        <div className="inline-flex w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#fafafa] lg:w-auto">
          {["Last 3 months", "Last 30 days", "Last 7 days"].map((item, i) => (
            <button
              key={item}
              className={[
                "px-6 py-3 text-[15px] font-medium",
                i === 0 ? "bg-[#f3f4f6] text-[#111827]" : "text-[#111827]",
                i !== 0 ? "border-l border-[#e5e7eb]" : "",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 h-[320px] w-full rounded-2xl bg-white">
        <svg viewBox="0 0 1200 320" className="h-full w-full">
          {[50, 100, 150, 200, 250].map((y) => (
            <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#edf0f4" strokeWidth="1" />
          ))}

          <path
            d={
              bars
                .map((v, i) => {
                  const x = (i / (bars.length - 1)) * 1200;
                  const y = 260 - v * 2.2;
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ") + ` L 1200 260 L 0 260 Z`
            }
            fill="rgba(96, 165, 250, 0.22)"
            stroke="#93c5fd"
            strokeWidth="2"
          />

          <path
            d={line
              .map((v, i) => {
                const x = (i / (line.length - 1)) * 1200;
                const y = 260 - v * 2.8;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#4f8cff"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-y-2 text-center text-[13px] text-[#7b8394] md:grid-cols-9 lg:grid-cols-[repeat(18,minmax(0,1fr))]">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function SmallCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[18px] font-semibold text-[#0b1220]">{title}</h3>
        {action ? (
          <button className="text-[13px] font-medium text-[#2554e8] hover:underline">
            {action}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function OrderStatusBadge({ status }: { status: OrderRow["status"] }) {
  const map = {
    Pending: "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]",
    Shipped: "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]",
    Delivered: "bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]",
    Cancelled: "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]",
  };

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[12px] font-medium ${map[status]}`}>
      {status}
    </span>
  );
}

function StockBadge({ status }: { status: StockRow["status"] }) {
  return status === "Critical" ? (
    <span className="rounded-full border border-[#fecaca] bg-[#fef2f2] px-2.5 py-1 text-[12px] font-medium text-[#dc2626]">
      Critical
    </span>
  ) : (
    <span className="rounded-full border border-[#fde68a] bg-[#fffbeb] px-2.5 py-1 text-[12px] font-medium text-[#ca8a04]">
      Low
    </span>
  );
}

function RevenueByCategory() {
  const categories = [
    { name: "TV Spare Parts", value: 68, amount: "UGX 12.5M" },
    { name: "Accessories", value: 48, amount: "UGX 8.1M" },
    { name: "Repair Tools", value: 36, amount: "UGX 5.4M" },
    { name: "Audio Parts", value: 24, amount: "UGX 3.2M" },
  ];

  return (
    <SmallCard title="Revenue by category" action="View report">
      <div className="space-y-4">
        {categories.map((item) => (
          <div key={item.name}>
            <div className="mb-1 flex items-center justify-between gap-3">
              <span className="text-[14px] font-medium text-[#111827]">{item.name}</span>
              <span className="text-[13px] text-[#6b7280]">{item.amount}</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#eef2f7]">
              <div
                className="h-2.5 rounded-full bg-[#4f8cff]"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SmallCard>
  );
}

function RecentOrdersTable() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#eef1f4] px-5 py-4">
        <div>
          <h3 className="text-[18px] font-semibold text-[#0b1220]">Recent orders</h3>
          <p className="text-[13px] text-[#7b8394]">
            Latest customer purchases and fulfillment status
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-[14px] font-medium text-[#111827]">
          <Eye size={16} />
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px]">
          <thead>
            <tr className="bg-[#fbfbfc] text-left">
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Order ID</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Customer</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Product</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Amount</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Status</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]">Date</th>
              <th className="px-5 py-3 text-[13px] font-medium text-[#6b7280]"></th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((row, i) => (
              <tr
                key={row.id}
                className={i !== recentOrders.length - 1 ? "border-t border-[#eef1f4]" : ""}
              >
                <td className="px-5 py-4 text-[14px] font-semibold text-[#111827]">{row.id}</td>
                <td className="px-5 py-4 text-[14px] text-[#111827]">{row.customer}</td>
                <td className="px-5 py-4 text-[14px] text-[#111827]">{row.product}</td>
                <td className="px-5 py-4 text-[14px] font-medium text-[#111827]">{row.amount}</td>
                <td className="px-5 py-4">
                  <OrderStatusBadge status={row.status} />
                </td>
                <td className="px-5 py-4 text-[14px] text-[#6b7280]">{row.date}</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-[#6b7280]">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function EcommerceAdminDashboard() {
  return (
    <>
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} card={card} />
        ))}
      </div>

      {/* Main analytics row */}
      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        <SalesChart />

        <div className="grid gap-6">
          <RevenueByCategory />

          <SmallCard title="Customer activity" action="See all">
            <div className="space-y-4">
              {customerActivity.map((item) => (
                <div
                  key={`${item.customer}-${item.time}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3ff] text-[#2554e8]">
                    <Users size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] text-[#111827]">
                      <span className="font-semibold">{item.customer}</span>{" "}
                      <span className="text-[#4b5563]">{item.action}</span>
                    </p>
                    <p className="mt-1 text-[12px] text-[#9ca3af]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SmallCard>
        </div>
      </div>

      {/* Ecommerce widgets */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.9fr)]">
        <RecentOrdersTable />

        <div className="grid gap-6">
          <SmallCard title="Low stock products" action="Restock">
            <div className="space-y-4">
              {lowStock.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#eef1f4] p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-medium text-[#111827]">
                      {item.product}
                    </div>
                    <div className="mt-1 text-[12px] text-[#7b8394]">
                      SKU: {item.sku}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-[14px] font-semibold text-[#111827]">
                      {item.stock} left
                    </div>
                    <StockBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </SmallCard>

          <SmallCard title="Top sellers" action="View ranking">
            <div className="space-y-4">
              {topSellers.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#eef1f4] p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-[14px] font-semibold text-white">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-[#111827]">
                        {item.name}
                      </div>
                      <div className="mt-1 text-[12px] text-[#7b8394]">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-[#111827]">
                      {item.revenue}
                    </div>
                    <div className="mt-1 text-[12px] text-[#7b8394]">
                      {item.units} units
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SmallCard>
        </div>
      </div>

      {/* Bottom quick widgets */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <SmallCard title="Pending shipments">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff] text-[#2563eb]">
              <Truck size={20} />
            </div>
            <div>
              <div className="text-[28px] font-semibold text-[#111827]">48</div>
              <div className="text-[13px] text-[#7b8394]">
                Orders waiting for dispatch
              </div>
            </div>
          </div>
        </SmallCard>

        <SmallCard title="Returns requested">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
              <RefreshCcw size={20} />
            </div>
            <div>
              <div className="text-[28px] font-semibold text-[#111827]">12</div>
              <div className="text-[13px] text-[#7b8394]">
                Awaiting review and approval
              </div>
            </div>
          </div>
        </SmallCard>

        <SmallCard title="Products to review">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fef2f2] text-[#dc2626]">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="text-[28px] font-semibold text-[#111827]">7</div>
              <div className="text-[13px] text-[#7b8394]">
                Missing images or incomplete details
              </div>
            </div>
          </div>
        </SmallCard>
      </div >
    </>
  );
}
