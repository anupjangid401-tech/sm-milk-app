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
    titleHi: "दूध खरीद प्रविष्टि",
    descHi: "FAT/SNF रेट ऑटो गणना",
    icon: Milk,
    iconTheme: "amber",
    badge: "Primary",
  },
  {
    id: "milk-sale",
    titleEn: "Milk Sale",
    titleHi: "दूध बिक्री प्रविष्टि",
    descHi: "खुदरा व डेयरी बिक्री",
    icon: ShoppingCart,
    iconTheme: "green",
  },
  {
    id: "member-entry",
    titleEn: "Member Entry",
    titleHi: "सदस्य / किसान जोड़ें",
    descHi: "नया किसान कोड रजिस्टर",
    icon: UserPlus,
    iconTheme: "purple",
  },
  {
    id: "purchase-report",
    titleEn: "Purchase Report",
    titleHi: "दूध खरीद रिपोर्ट",
    descHi: "शिफ्ट वार खरीद समरी",
    icon: FileSpreadsheet,
    iconTheme: "red",
  },
  {
    id: "sale-report",
    titleEn: "Sale Report",
    titleHi: "दूध बिक्री रिपोर्ट",
    descHi: "दैनिक बिक्री व बिलिंग",
    icon: TrendingUp,
    iconTheme: "amber",
  },
  {
    id: "rate-chart",
    titleEn: "Milk Rate Edit",
    titleHi: "FAT/SNF दर तालिका",
    descHi: "राजस्थान/अमूल रेट मैट्रिक्स",
    icon: Sliders,
    iconTheme: "green",
  },
  {
    id: "payment-report",
    titleEn: "Payment Report",
    titleHi: "भुगतान एवं बिल रिपोर्ट",
    descHi: "किसान भुगतान रजिस्टर",
    icon: CreditCard,
    iconTheme: "purple",
  },
  {
    id: "date-summary",
    titleEn: "Date Summary",
    titleHi: "दिनांक अनुसार सारांश",
    descHi: "दिनांक वार दूध संकलन",
    icon: CalendarRange,
    iconTheme: "blue",
  },
  {
    id: "datewise-summary",
    titleEn: "Datewise Milk",
    titleHi: "तारीख वार दूध सारांश",
    descHi: "सुबह व शाम तुलनात्मक",
    icon: CalendarDays,
    iconTheme: "cyan",
  },
  {
    id: "customer-passbook",
    titleEn: "Customer Passbook",
    titleHi: "ग्राहक पासबुक खाते",
    descHi: "किसान लेजर व बकाया राशि",
    icon: BookOpen,
    iconTheme: "green",
    badge: "Passbook",
  },
  {
    id: "item-sale",
    titleEn: "Item Sale",
    titleHi: "दाना / फीड बिक्री",
    descHi: "पशु आहार, खल व मिनरल",
    icon: PackageCheck,
    iconTheme: "purple",
  },
  {
    id: "sm-settings",
    titleEn: "SM Settings",
    titleHi: "प्रिंटर, कांटा व Slip",
    descHi: "WiFi कांटा व BT प्रिंटर",
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
          <div className="section-title-hi">ऑपरेशन मॉड्यूल</div>
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
              aria-label={`Open ${mod.titleEn} — ${mod.titleHi}`}
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
