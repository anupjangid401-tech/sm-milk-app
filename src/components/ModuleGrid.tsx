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
  HelpCircle,
} from "lucide-react";

export interface ModuleItem {
  id: string;
  titleEn: string;
  icon: React.ElementType;
  color: string;
}

const MODULES: ModuleItem[] = [
  { id: "milk-purchase", titleEn: "Milk Purchase", icon: Milk, color: "#f39c12" },
  { id: "milk-sale", titleEn: "Milk Sale", icon: ShoppingCart, color: "#2980b9" },
  { id: "member-entry", titleEn: "Member/Customer Entry", icon: UserPlus, color: "#8e44ad" },
  { id: "purchase-report", titleEn: "Milk Purchase Report", icon: FileSpreadsheet, color: "#e74c3c" },
  { id: "sale-report", titleEn: "Milk Sale Report", icon: TrendingUp, color: "#f39c12" },
  { id: "rate-chart", titleEn: "Milk Rate Add/ Edit", icon: Sliders, color: "#27ae60" },
  { id: "payment-report", titleEn: "Milk Payment Report", icon: CreditCard, color: "#8e44ad" },
  { id: "date-summary", titleEn: "Date To Date Summary", icon: CalendarRange, color: "#e67e22" },
  { id: "datewise-summary", titleEn: "Datewise Milk Summary", icon: CalendarDays, color: "#f39c12" },
  { id: "customer-passbook", titleEn: "Customer Passbook", icon: BookOpen, color: "#27ae60" },
  { id: "item-sale", titleEn: "Item Sale", icon: PackageCheck, color: "#8e44ad" },
  { id: "help-support", titleEn: "Help", icon: HelpCircle, color: "#e74c3c" },
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-300 border border-gray-300">
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        return (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod.id)}
            className="flex flex-col items-center justify-center p-2 min-h-[120px] border-4 border-white transition-all active:brightness-90"
            style={{ backgroundColor: mod.color }}
          >
            <div className="mb-2">
              <Icon className="w-8 h-8 text-white opacity-80" />
            </div>
            <span className="text-[11px] leading-tight font-bold text-white text-center">
              {mod.titleEn}
            </span>
          </button>
        );
      })}
    </div>
  );
}
