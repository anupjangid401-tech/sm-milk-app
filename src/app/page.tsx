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
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* ── HIGH CONTRAST TOP HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 text-white px-4 py-3 flex items-center justify-between shadow-xl border-b border-sky-600/50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-cyan-400/25 flex items-center justify-center border border-cyan-300/50 shadow-md flex-shrink-0">
            <Droplets className="w-6 h-6 text-cyan-200 animate-pulse" />
          </div>
          <div className="truncate">
            <h1 className="font-black text-lg tracking-tight leading-none text-white truncate drop-shadow-sm">SM MILK</h1>
            <p className="text-[11px] font-black text-cyan-300 mt-0.5 tracking-wider truncate uppercase">DAIRY ENTERPRISE POS</p>
          </div>
        </div>

        {/* Shift Switcher & Printer Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 border shadow-lg transition-all active:scale-95 ${
              shift === "MORNING"
                ? "bg-amber-400 text-slate-950 border-amber-300"
                : "bg-slate-950 text-cyan-300 border-cyan-400/50"
            }`}
          >
            {shift === "MORNING" ? <Sun className="w-4 h-4 text-amber-950" /> : <Moon className="w-4 h-4 text-blue-400" />}
            <span>{shift === "MORNING" ? "Morning" : "Evening"}</span>
          </button>

          <button
            onClick={() => setActiveModal("sm-settings")}
            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-cyan-400/50 text-cyan-300 shadow-lg active:scale-95"
            title="Printer & Scale Settings"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── MAIN MOBILE CONTENT AREA ── */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-32">
        {/* Mobile Quick Stats Banner — High Contrast Vibrant Cards */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 p-4 rounded-3xl border border-sky-500/50 shadow-xl flex flex-col justify-between min-h-[105px]">
            <div className="flex items-center justify-between text-xs font-black text-cyan-300">
              <span className="uppercase tracking-wider">MILK COLLECTION</span>
              <Droplets className="w-5 h-5 text-cyan-300 flex-shrink-0" />
            </div>
            <div className="text-2xl font-black text-white font-mono mt-2 truncate drop-shadow-md">
              {totalLitersToday.toFixed(1)} <span className="text-sm text-cyan-300 font-sans font-black">Ltr</span>
            </div>
            <div className="text-xs text-slate-300 font-bold mt-1 truncate">
              {todayPurchases.length} Entries Today
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-4 rounded-3xl border border-emerald-500/50 shadow-xl flex flex-col justify-between min-h-[105px]">
            <div className="flex items-center justify-between text-xs font-black text-emerald-300">
              <span className="uppercase tracking-wider">TOTAL PAYOUT</span>
              <TrendingUp className="w-5 h-5 text-emerald-300 flex-shrink-0" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-2 truncate drop-shadow-md">
              ₹{totalPayoutToday.toFixed(0)}
            </div>
            <div className="text-xs text-slate-300 font-bold mt-1 truncate">
              {members.length} Farmers
            </div>
          </div>
        </div>

        {/* 12 Operations Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>DAIRY OPERATIONS</span>
            </h2>
            <span className="text-xs font-black text-cyan-200 bg-sky-900/80 px-3 py-1 rounded-full border border-sky-500/60 flex-shrink-0 shadow-md">
              12 Services
            </span>
          </div>

          <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />
        </div>

        {/* Reset Data Footer */}
        <div className="pt-4 pb-2 text-center">
          <button
            onClick={() => {
              if (confirm("Reset demo data? All records will be cleared.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-red-400 px-4 py-2.5 rounded-2xl border border-slate-800 bg-slate-950 font-bold shadow-lg active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </main>

      {/* ── NATIVE MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 px-6 py-3 flex items-center justify-around shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 text-xs font-black transition-all ${
            activeTab === "home" ? "text-cyan-300 scale-110" : "text-slate-400"
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveModal("milk-purchase")}
          className="flex flex-col items-center gap-1 text-xs font-black -mt-7 bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4.5 rounded-full border-4 border-slate-950 shadow-2xl shadow-sky-500/60 active:scale-95 transition-all"
        >
          <Milk className="w-7 h-7" />
        </button>

        <button
          onClick={() => setActiveModal("customer-passbook")}
          className={`flex flex-col items-center gap-1 text-xs font-black transition-all ${
            activeTab === "passbook" ? "text-cyan-300 scale-110" : "text-slate-400"
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span>Passbook</span>
        </button>

        <button
          onClick={() => setActiveModal("sm-settings")}
          className={`flex flex-col items-center gap-1 text-xs font-black transition-all ${
            activeTab === "settings" ? "text-cyan-300 scale-110" : "text-slate-400"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span>Settings</span>
        </button>
      </nav>

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
