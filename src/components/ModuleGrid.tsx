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
  theme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
  };
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "milk-purchase",
    titleEn: "Milk Purchase",
    descEn: "FAT & Rate POS Center",
    icon: Milk,
    badge: "PRIMARY POS",
    theme: {
      bg: "from-sky-950 via-slate-900 to-slate-950",
      border: "border-sky-500/60 shadow-sky-950/50",
      iconBg: "bg-sky-500/20 border-sky-400/50",
      iconColor: "text-sky-300",
      badgeBg: "bg-sky-500/30 text-cyan-200 border-sky-400/50",
    },
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    descEn: "Retail & Wholesale Sales",
    icon: ShoppingCart,
    theme: {
      bg: "from-emerald-950 via-slate-900 to-slate-950",
      border: "border-emerald-500/60 shadow-emerald-950/50",
      iconBg: "bg-emerald-500/20 border-emerald-400/50",
      iconColor: "text-emerald-300",
      badgeBg: "bg-emerald-500/30 text-emerald-200 border-emerald-400/50",
    },
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    descEn: "Register New Farmer Code",
    icon: UserPlus,
    theme: {
      bg: "from-purple-950 via-slate-900 to-slate-950",
      border: "border-purple-500/60 shadow-purple-950/50",
      iconBg: "bg-purple-500/20 border-purple-400/50",
      iconColor: "text-purple-300",
      badgeBg: "bg-purple-500/30 text-purple-200 border-purple-400/50",
    },
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    descEn: "Shift Collection Log",
    icon: FileSpreadsheet,
    theme: {
      bg: "from-blue-950 via-slate-900 to-slate-950",
      border: "border-blue-500/60 shadow-blue-950/50",
      iconBg: "bg-blue-500/20 border-blue-400/50",
      iconColor: "text-blue-300",
      badgeBg: "bg-blue-500/30 text-blue-200 border-blue-400/50",
    },
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    descEn: "Daily Sales & Invoices",
    icon: TrendingUp,
    theme: {
      bg: "from-amber-950 via-slate-900 to-slate-950",
      border: "border-amber-500/60 shadow-amber-950/50",
      iconBg: "bg-amber-500/20 border-amber-400/50",
      iconColor: "text-amber-300",
      badgeBg: "bg-amber-500/30 text-amber-200 border-amber-400/50",
    },
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    descEn: "FAT & SNF Matrix Setup",
    icon: Sliders,
    theme: {
      bg: "from-cyan-950 via-slate-900 to-slate-950",
      border: "border-cyan-500/60 shadow-cyan-950/50",
      iconBg: "bg-cyan-500/20 border-cyan-400/50",
      iconColor: "text-cyan-300",
      badgeBg: "bg-cyan-500/30 text-cyan-200 border-cyan-400/50",
    },
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    descEn: "Farmer Payout Register",
    icon: CreditCard,
    theme: {
      bg: "from-indigo-950 via-slate-900 to-slate-950",
      border: "border-indigo-500/60 shadow-indigo-950/50",
      iconBg: "bg-indigo-500/20 border-indigo-400/50",
      iconColor: "text-indigo-300",
      badgeBg: "bg-indigo-500/30 text-indigo-200 border-indigo-400/50",
    },
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    descEn: "Collection History Log",
    icon: CalendarRange,
    theme: {
      bg: "from-teal-950 via-slate-900 to-slate-950",
      border: "border-teal-500/60 shadow-teal-950/50",
      iconBg: "bg-teal-500/20 border-teal-400/50",
      iconColor: "text-teal-300",
      badgeBg: "bg-teal-500/30 text-teal-200 border-teal-400/50",
    },
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    descEn: "Morning/Evening Comparison",
    icon: CalendarDays,
    theme: {
      bg: "from-sky-950 via-slate-900 to-slate-950",
      border: "border-sky-500/60 shadow-sky-950/50",
      iconBg: "bg-sky-500/20 border-sky-400/50",
      iconColor: "text-sky-300",
      badgeBg: "bg-sky-500/30 text-sky-200 border-sky-400/50",
    },
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    descEn: "Farmer Ledger & Dues",
    icon: BookOpen,
    badge: "LEDGER",
    theme: {
      bg: "from-emerald-950 via-slate-900 to-slate-950",
      border: "border-emerald-500/60 shadow-emerald-950/50",
      iconBg: "bg-emerald-500/20 border-emerald-400/50",
      iconColor: "text-emerald-300",
      badgeBg: "bg-emerald-500/30 text-emerald-200 border-emerald-400/50",
    },
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    descEn: "Cattle Feed & Minerals",
    icon: PackageCheck,
    theme: {
      bg: "from-violet-950 via-slate-900 to-slate-950",
      border: "border-violet-500/60 shadow-violet-950/50",
      iconBg: "bg-violet-500/20 border-violet-400/50",
      iconColor: "text-violet-300",
      badgeBg: "bg-violet-500/30 text-violet-200 border-violet-400/50",
    },
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    descEn: "WiFi Scale & BT Printer",
    icon: Settings,
    badge: "CONFIG",
    theme: {
      bg: "from-slate-900 via-slate-950 to-slate-900",
      border: "border-cyan-500/60 shadow-cyan-950/50",
      iconBg: "bg-cyan-500/20 border-cyan-400/50",
      iconColor: "text-cyan-300",
      badgeBg: "bg-cyan-500/30 text-cyan-200 border-cyan-400/50",
    },
  },
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        return (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod.id)}
            className={`bg-gradient-to-br ${mod.theme.bg} border ${mod.theme.border} p-4 sm:p-5 rounded-3xl transition-all flex flex-col justify-between text-left relative overflow-hidden group shadow-xl active:scale-95 min-h-[115px] sm:min-h-[130px]`}
            aria-label={`Open ${mod.titleEn}`}
          >
            {/* Top row: Icon & Badge */}
            <div className="flex items-center justify-between w-full mb-3">
              <div className={`w-12 h-12 rounded-2xl ${mod.theme.iconBg} border flex items-center justify-center ${mod.theme.iconColor} group-hover:scale-110 transition-transform shadow-md`}>
                <Icon className="w-7 h-7" />
              </div>
              {mod.badge && (
                <span className={`text-[10px] font-black ${mod.theme.badgeBg} border px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                  {mod.badge}
                </span>
              )}
            </div>

            {/* Bottom text: High Contrast & Large Font */}
            <div className="space-y-0.5">
              <h3 className="font-black text-base text-white tracking-tight leading-tight truncate drop-shadow-sm">
                {mod.titleEn}
              </h3>
              <p className="text-xs text-slate-300 font-bold truncate">
                {mod.descEn}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
