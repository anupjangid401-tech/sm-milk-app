"use client";

import {
  Milk,
  ShoppingCart,
  UserPlus,
  FileSpreadsheet,
  TrendingUp,
  Sliders,
  CreditCard,
  CalendarRange,
  CalendarDays,
  BookOpen,
  PackageCheck,
  Settings,
} from "lucide-react";

export interface ModuleItem {
  id: string;
  titleEn: string;
  descEn: string;
  icon: React.ElementType;
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "milk-purchase",
    titleEn: "Milk Purchase",
    descEn: "FAT/SNF Rate Calculator",
    icon: Milk,
    badge: "POS",
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    descEn: "Retail & Wholesale Sale",
    icon: ShoppingCart,
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    descEn: "Add New Farmer Code",
    icon: UserPlus,
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    descEn: "Shift Collection Summary",
    icon: FileSpreadsheet,
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    descEn: "Daily Sales & Invoices",
    icon: TrendingUp,
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    descEn: "FAT/SNF Rate Matrix",
    icon: Sliders,
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    descEn: "Farmer Payout Register",
    icon: CreditCard,
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    descEn: "Collection History Log",
    icon: CalendarRange,
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    descEn: "Shift Comparative View",
    icon: CalendarDays,
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    descEn: "Farmer Ledger & Dues",
    icon: BookOpen,
    badge: "Ledger",
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    descEn: "Cattle Feed & Minerals",
    icon: PackageCheck,
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    descEn: "WiFi Scale & BT Printer",
    icon: Settings,
    badge: "Config",
  },
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        return (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod.id)}
            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/60 p-4 rounded-3xl transition-all flex flex-col justify-between text-left relative overflow-hidden group shadow-lg min-h-[95px] sm:min-h-[110px]"
            aria-label={`Open ${mod.titleEn}`}
          >
            {/* Top row: Icon & Badge */}
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-11 h-11 rounded-2xl bg-sky-900/60 border border-sky-700/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              {mod.badge && (
                <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {mod.badge}
                </span>
              )}
            </div>

            {/* Bottom text */}
            <div>
              <h3 className="font-extrabold text-sm text-white tracking-tight leading-tight truncate">
                {mod.titleEn}
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold truncate mt-0.5">
                {mod.descEn}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
