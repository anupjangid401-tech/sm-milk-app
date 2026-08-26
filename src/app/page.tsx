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
      {/* ── NATIVE MOBILE APP HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-sky-900 text-white px-3.5 py-2.5 flex items-center justify-between shadow-lg border-b border-sky-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/40 shadow-inner flex-shrink-0">
            <Droplets className="w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
          <div className="truncate">
            <h1 className="font-black text-sm tracking-tight leading-none text-white truncate">SM MILK</h1>
            <p className="text-[9px] font-extrabold text-cyan-300 mt-0.5 tracking-wider truncate uppercase">Dairy POS v3.5</p>
          </div>
        </div>

        {/* Shift & Bluetooth Printer Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
            className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 border transition-all ${
              shift === "MORNING"
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                : "bg-slate-950 text-cyan-300 border-slate-800"
            }`}
          >
            {shift === "MORNING" ? <Sun className="w-3.5 h-3.5 text-amber-950" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
            <span>{shift === "MORNING" ? "Morning" : "Evening"}</span>
          </button>

          <button
            onClick={() => setActiveModal("sm-settings")}
            className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-300"
            title="Printer & Scale Settings"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── MAIN MOBILE CONTENT AREA ── */}
      <main className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3.5 pb-24">
        {/* Mobile Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-cyan-300">
              <span className="truncate">आज का दूध संकलन</span>
              <Droplets className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            </div>
            <div className="text-lg font-black text-white font-mono mt-1.5 truncate">
              {totalLitersToday.toFixed(1)} <span className="text-xs text-cyan-300 font-sans font-extrabold">Ltr</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 truncate">
              {todayPurchases.length} Entries Today
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-400">
              <span className="truncate">कुल डेयरी भुगतान</span>
              <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            </div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-1.5 truncate">
              ₹{totalPayoutToday.toFixed(0)}
            </div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 truncate">
              {members.length} Farmers
            </div>
          </div>
        </div>

        {/* 12 Operations Grid */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>डेयरी सेवाएं (Operations)</span>
            </h2>
            <span className="text-[9px] font-extrabold text-cyan-300 bg-sky-900/60 px-2 py-0.5 rounded-full border border-sky-700/50 flex-shrink-0">
              12 Modules
            </span>
          </div>

          <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />
        </div>

        {/* Reset Data Footer */}
        <div className="pt-1 text-center">
          <button
            onClick={() => {
              if (confirm("Reset demo data? All records will be cleared.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </main>

      {/* ── NATIVE MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-slate-800 px-4 py-2 flex items-center justify-around shadow-2xl backdrop-blur-lg">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-all ${
            activeTab === "home" ? "text-cyan-400 scale-105" : "text-slate-400"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveModal("milk-purchase")}
          className="flex flex-col items-center gap-0.5 text-xs font-extrabold -mt-5 bg-gradient-to-r from-sky-600 to-blue-700 text-white p-3.5 rounded-full border-4 border-slate-950 shadow-xl shadow-sky-600/50 active:scale-95 transition-all"
        >
          <Milk className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveModal("customer-passbook")}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-all ${
            activeTab === "passbook" ? "text-cyan-400 scale-105" : "text-slate-400"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Passbook</span>
        </button>

        <button
          onClick={() => setActiveModal("sm-settings")}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-all ${
            activeTab === "settings" ? "text-cyan-400 scale-105" : "text-slate-400"
          }`}
        >
          <Settings className="w-5 h-5" />
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
