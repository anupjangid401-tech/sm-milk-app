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
    descHi: "FAT/SNF Auto Rate Calc",
    icon: Milk,
    iconTheme: "amber",
    badge: "Primary",
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    titleHi: "Milk Sale Entry",
    descHi: "Retail & Dairy Sales",
    icon: ShoppingCart,
    iconTheme: "green",
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    titleHi: "Add Member / Farmer",
    descHi: "Register New Farmer Code",
    icon: UserPlus,
    iconTheme: "purple",
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    titleHi: "Milk Purchase Report",
    descHi: "Shift-wise Purchase Summary",
    icon: FileSpreadsheet,
    iconTheme: "red",
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    titleHi: "Milk Sale Report",
    descHi: "Daily Sales & Billing",
    icon: TrendingUp,
    iconTheme: "amber",
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    titleHi: "FAT/SNF Rate Table",
    descHi: "Rajasthan / Amul Rate Matrix",
    icon: Sliders,
    iconTheme: "green",
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    titleHi: "Payment & Bill Report",
    descHi: "Farmer Payment Register",
    icon: CreditCard,
    iconTheme: "purple",
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    titleHi: "Date-wise Summary",
    descHi: "Date-wise Milk Collection",
    icon: CalendarRange,
    iconTheme: "blue",
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    titleHi: "Datewise Milk Summary",
    descHi: "Morning & Evening Comparison",
    icon: CalendarDays,
    iconTheme: "cyan",
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    titleHi: "Customer Passbook",
    descHi: "Farmer Ledger & Dues",
    icon: BookOpen,
    iconTheme: "green",
    badge: "Passbook",
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    titleHi: "Feed / Item Sale",
    descHi: "Cattle Feed, Khal & Mineral",
    icon: PackageCheck,
    iconTheme: "purple",
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    titleHi: "Printer, Scale & Slip",
    descHi: "WiFi Scale & BT Printer",
    icon: Settings,
    iconTheme: "cyan",
    badge: "WiFi & BT",
  },
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Operations Centre</div>
          <div className="section-title-hi">Operation Modules</div>
        </div>
        <div className="section-badge">{MODULES.length} Modules</div>
      </div>

      <div className="module-grid">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              className="module-card"
              onClick={() => onSelectModule(mod.id)}
              aria-label={`Open ${mod.titleEn}`}
            >
              {/* Badge */}
              {mod.badge && (
                <div className="module-card-badge">{mod.badge}</div>
              )}

              {/* Icon */}
              <div className={`module-card-icon module-icon-${mod.iconTheme}`}>
                <Icon size={16} />
              </div>

              {/* Text */}
              <div className="module-card-content">
                <div className="module-card-title">{mod.titleEn}</div>
                <div className="module-card-desc">{mod.descHi}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
