"use client";

import { motion } from "framer-motion";
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
  Settings 
} from "lucide-react";

export interface ModuleItem {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: any;
  theme: string; // 'amber' | 'emerald' | 'purple' | 'rose' | 'cyan' | 'blue'
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "milk-purchase",
    titleEn: "Milk Purchase",
    titleHi: "दूध खरीद प्रविष्टि",
    icon: Milk,
    theme: "amber",
    badge: "मुख्य"
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    titleHi: "दूध बिक्री प्रविष्टि",
    icon: ShoppingCart,
    theme: "emerald"
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    titleHi: "सदस्य/ग्राहक जोड़ें",
    icon: UserPlus,
    theme: "purple"
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    titleHi: "दूध खरीद रिपोर्ट",
    icon: FileSpreadsheet,
    theme: "rose"
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    titleHi: "दूध बिक्री रिपोर्ट",
    icon: TrendingUp,
    theme: "amber"
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    titleHi: "FAT/SNF दर तालिका",
    icon: Sliders,
    theme: "emerald"
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    titleHi: "भुगतान एवं बिल रिपोर्ट",
    icon: CreditCard,
    theme: "purple"
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    titleHi: "दिनांक अनुसार सारांश",
    icon: CalendarRange,
    theme: "rose"
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    titleHi: "तारीख अनुसार दूध सारांश",
    icon: CalendarDays,
    theme: "amber"
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    titleHi: "ग्राहक पासबुक खाते",
    icon: BookOpen,
    theme: "emerald",
    badge: "पासबुक"
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    titleHi: "दाना / फीड बिक्री",
    icon: PackageCheck,
    theme: "purple"
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    titleHi: "प्रिंटर, कांटा व Slip",
    icon: Settings,
    theme: "cyan",
    badge: "BT & WiFi"
  }
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="px-4 pb-20 grid grid-cols-3 gap-3">
      {MODULES.map((mod, index) => {
        const IconComponent = mod.icon;
        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            onClick={() => onSelectModule(mod.id)}
            className={`module-card theme-${mod.theme}`}
          >
            {/* Optional badge */}
            {mod.badge && (
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/20 text-white backdrop-blur-md border border-white/30">
                {mod.badge}
              </span>
            )}

            {/* Icon Wrapper */}
            <div className="icon-wrapper">
              <IconComponent />
            </div>

            {/* Titles */}
            <div className="flex flex-col items-center">
              <span className="module-title-en">{mod.titleEn}</span>
              <span className="module-title-hi">{mod.titleHi}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
