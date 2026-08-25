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
  Settings,
  ChevronRight
} from "lucide-react";

export interface ModuleItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descHi: string;
  icon: any;
  theme: 'amber' | 'emerald' | 'purple' | 'rose' | 'cyan' | 'blue';
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "milk-purchase",
    titleEn: "Milk Purchase",
    titleHi: "दूध खरीद प्रविष्टि",
    descHi: "FAT/SNF से ऑटो रेट गणना",
    icon: Milk,
    theme: "amber",
    badge: "मुख्य सेवा"
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    titleHi: "दूध बिक्री प्रविष्टि",
    descHi: "खुदरा व डेयरी बिक्री",
    icon: ShoppingCart,
    theme: "emerald"
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    titleHi: "सदस्य / ग्राहक जोड़ें",
    descHi: "नया किसान कोड रजिस्टर",
    icon: UserPlus,
    theme: "purple"
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    titleHi: "दूध खरीद रिपोर्ट",
    descHi: "शिफ्ट वार खरीद समरी",
    icon: FileSpreadsheet,
    theme: "rose"
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    titleHi: "दूध बिक्री रिपोर्ट",
    descHi: "दैनिक बिक्री व बिलिंग",
    icon: TrendingUp,
    theme: "amber"
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    titleHi: "FAT/SNF दर तालिका",
    descHi: "राजस्थान/अमूल रेट मैट्रिक्स",
    icon: Sliders,
    theme: "emerald"
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    titleHi: "भुगतान एवं बिल रिपोर्ट",
    descHi: "किसान भुगतान रजिस्टर",
    icon: CreditCard,
    theme: "purple"
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    titleHi: "दिनांक अनुसार सारांश",
    descHi: "दिनांक वार दूध संकलन",
    icon: CalendarRange,
    theme: "rose"
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    titleHi: "तारीख वार दूध सारांश",
    descHi: "सुबह व शाम तुलनात्मक",
    icon: CalendarDays,
    theme: "amber"
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    titleHi: "ग्राहक पासबुक खाते",
    descHi: "किसान लेजर व बकाया राशि",
    icon: BookOpen,
    theme: "emerald",
    badge: "पासबुक"
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    titleHi: "दाना / फीड बिक्री",
    descHi: "पशु आहार, खल व मिनरल",
    icon: PackageCheck,
    theme: "purple"
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    titleHi: "प्रिंटर, कांटा व Slip",
    descHi: "WiFi कांटा व BT प्रिंटर",
    icon: Settings,
    theme: "cyan",
    badge: "WiFi & BT"
  }
];

interface ModuleGridProps {
  onSelectModule: (id: string) => void;
}

export default function ModuleGrid({ onSelectModule }: ModuleGridProps) {
  return (
    <div className="px-4 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {MODULES.map((mod, index) => {
        const IconComponent = mod.icon;
        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            onClick={() => onSelectModule(mod.id)}
            className={`module-card-luxury card-${mod.theme} group`}
          >
            {/* Top Badge */}
            <div className="w-full flex items-center justify-between">
              {mod.badge ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/15 text-white border border-white/20 backdrop-blur-md">
                  {mod.badge}
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">MODULE #{index + 1}</span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>

            {/* Glowing Icon Box */}
            <div className="icon-box-glowing">
              <IconComponent className="w-7 h-7" />
            </div>

            {/* Title & Hindi Subtitle */}
            <div className="text-center w-full">
              <h3 className="font-extrabold text-base text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {mod.titleEn}
              </h3>
              <p className="text-xs font-bold text-slate-300 mt-0.5">{mod.titleHi}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium line-clamp-1">{mod.descHi}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
