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
  titleHi: string;
  descHi: string;
  icon: React.ElementType;
  iconTheme: "amber" | "green" | "purple" | "red" | "cyan" | "blue";
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "milk-purchase",
    titleEn: "Milk Purchase",
    titleHi: "Milk Purchase Entry",
    descHi: "FAT/SNF Rate Calc",
    icon: Milk,
    iconTheme: "amber",
    badge: "POS",
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    titleHi: "Milk Sale Entry",
    descHi: "Retail & Dairy Sale",
    icon: ShoppingCart,
    iconTheme: "green",
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    titleHi: "Add Member / Farmer",
    descHi: "Register New Farmer",
    icon: UserPlus,
    iconTheme: "purple",
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    titleHi: "Milk Purchase Report",
    descHi: "Shift Summary Report",
    icon: FileSpreadsheet,
    iconTheme: "red",
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    titleHi: "Milk Sale Report",
    descHi: "Daily Sales & Bills",
    icon: TrendingUp,
    iconTheme: "amber",
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    titleHi: "FAT/SNF Rate Table",
    descHi: "FAT & Rate Matrix",
    icon: Sliders,
    iconTheme: "green",
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    titleHi: "Payment & Bill Report",
    descHi: "Farmer Payout Log",
    icon: CreditCard,
    iconTheme: "purple",
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    titleHi: "Date-wise Summary",
    descHi: "Collection Log",
    icon: CalendarRange,
    iconTheme: "blue",
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    titleHi: "Datewise Milk Summary",
    descHi: "Shift Comparison",
    icon: CalendarDays,
    iconTheme: "cyan",
  },
  {
    id: "customer-passbook",
    titleEn: "Passbook",
    titleHi: "Customer Passbook",
    descHi: "Farmer Ledger Dues",
    icon: BookOpen,
    iconTheme: "green",
    badge: "Ledger",
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    titleHi: "Feed / Item Sale",
    descHi: "Cattle Feed & Khal",
    icon: PackageCheck,
    iconTheme: "purple",
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    titleHi: "Printer, Scale & Slip",
    descHi: "WiFi Scale & BT Print",
    icon: Settings,
    iconTheme: "cyan",
    badge: "Config",
  },
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2.5">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 p-3 rounded-2xl transition-all flex items-center gap-2.5 text-left relative overflow-hidden group shadow-md"
              aria-label={`Open ${mod.titleEn}`}
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-sky-900/60 border border-sky-700/50 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>

              {/* Text Container - Safe Truncation */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-extrabold text-xs text-white truncate leading-tight">
                    {mod.titleEn}
                  </span>
                  {mod.badge && (
                    <span className="text-[9px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded flex-shrink-0">
                      {mod.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">
                  {mod.descHi}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
