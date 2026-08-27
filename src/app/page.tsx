"use client";

import { useState, useEffect } from "react";
import {
  Milk,
  Home as HomeIcon,
  BookOpen,
  Settings,
  Sun,
  Moon,
  Printer,
  Sparkles,
  Droplets,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

// Dashboard components
import ModuleGrid from "@/components/ModuleGrid";

// Modals
import MilkPurchaseModal from "@/components/modals/MilkPurchaseModal";
import MilkSaleModal from "@/components/modals/MilkSaleModal";
import MemberEntryModal from "@/components/modals/MemberEntryModal";
import RateChartModal from "@/components/modals/RateChartModal";
import PassbookModal from "@/components/modals/PassbookModal";
import ItemSaleModal from "@/components/modals/ItemSaleModal";
import ReportsModal from "@/components/modals/ReportsModal";
import HelpModal from "@/components/modals/HelpModal";
import SettingsModal from "@/components/modals/SettingsModal";

// Types & initial data
import {
  Member,
  MilkPurchaseRecord,
  MilkSaleRecord,
  ItemSaleRecord,
  ShiftType,
} from "@/lib/types";
import {
  INITIAL_MEMBERS,
  INITIAL_PURCHASES,
  INITIAL_SALES,
  INITIAL_ITEM_SALES,
} from "@/lib/initialData";

export default function Home() {
  const [shift, setShift] = useState<ShiftType>("MORNING");
  const [activeTab, setActiveTab] = useState<"home" | "purchase" | "passbook" | "settings">("home");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [purchases, setPurchases] = useState<MilkPurchaseRecord[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<MilkSaleRecord[]>(INITIAL_SALES);
  const [itemSales, setItemSales] = useState<ItemSaleRecord[]>(INITIAL_ITEM_SALES);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem("sm_members");
      const savedPurchases = localStorage.getItem("sm_purchases");
      const savedSales = localStorage.getItem("sm_sales");
      const savedItemSales = localStorage.getItem("sm_item_sales");
      if (savedMembers) setMembers(JSON.parse(savedMembers));
      if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
      if (savedSales) setSales(JSON.parse(savedSales));
      if (savedItemSales) setItemSales(JSON.parse(savedItemSales));
    } catch (err) {
      console.error("Failed to load local state", err);
    }
  }, []);

  // Persist helpers
  const saveMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem("sm_members", JSON.stringify(newMembers));
  };

  const savePurchases = (record: MilkPurchaseRecord) => {
    const updated = [record, ...purchases];
    setPurchases(updated);
    localStorage.setItem("sm_purchases", JSON.stringify(updated));
  };

  const saveSales = (record: MilkSaleRecord) => {
    const updated = [record, ...sales];
    setSales(updated);
    localStorage.setItem("sm_sales", JSON.stringify(updated));
  };

  const saveItemSales = (record: ItemSaleRecord) => {
    const updated = [record, ...itemSales];
    setItemSales(updated);
    localStorage.setItem("sm_item_sales", JSON.stringify(updated));
  };

  // Summary Metrics
  const todayStr = new Date().toISOString().split("T")[0];
  const todayPurchases = purchases.filter((p) => p.date === todayStr);
  const totalLitersToday = todayPurchases.reduce((acc, curr) => acc + curr.liters, 0);
  const totalPayoutToday = todayPurchases.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 flex flex-col overflow-x-hidden font-sans select-none">
      {/* ── CLASSIC REPLICA HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#4682b4] text-white px-3 py-2 flex items-center shadow-md">
        <button className="p-2 mr-2">
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-tight uppercase ml-1">SM MILK</h1>
        </div>

        <div className="ml-auto">
          <button className="p-2">
            <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
            <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </button>
        </div>
      </header>

      {/* ── GRID CONTENT ── */}
      <main className="flex-1 p-2">
        <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />

        {/* Blue empty bar from image */}
        <div className="h-20 bg-[#4682b4] mt-1 border-4 border-white"></div>
      </main>

      {/* ── MODALS & FULL SCREEN SCREENS ── */}
      {activeModal === "milk-purchase" && (
        <MilkPurchaseModal
          members={members}
          shift={shift}
          onSave={savePurchases}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "milk-sale" && (
        <MilkSaleModal
          shift={shift}
          onSave={saveSales}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "member-entry" && (
        <MemberEntryModal
          members={members}
          onAddMember={(m) => saveMembers([...members, m])}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "rate-chart" && (
        <RateChartModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "customer-passbook" && (
        <PassbookModal
          members={members}
          purchases={purchases}
          itemSales={itemSales}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "item-sale" && (
        <ItemSaleModal
          members={members}
          onSave={saveItemSales}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "sm-settings" && (
        <SettingsModal onClose={() => setActiveModal(null)} />
      )}

      {(activeModal === "purchase-report" ||
        activeModal === "sale-report" ||
        activeModal === "payment-report" ||
        activeModal === "date-summary" ||
        activeModal === "datewise-summary") && (
        <ReportsModal
          reportType={
            activeModal === "sale-report"
              ? "sale"
              : activeModal === "payment-report"
              ? "payment"
              : activeModal === "date-summary"
              ? "date-summary"
              : activeModal === "datewise-summary"
              ? "datewise"
              : "purchase"
          }
          purchases={purchases}
          sales={sales}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "help-support" && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
