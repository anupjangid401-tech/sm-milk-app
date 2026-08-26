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
  UserCheck,
  Droplets,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

// Dashboard components
import ModuleGrid from "@/components/ModuleGrid";

// Modals (all preserved)
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
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans">
      {/* ── NATIVE MOBILE APP HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-sky-800 text-white px-4 py-3 flex items-center justify-between shadow-lg border-b border-sky-700">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
            <Droplets className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight leading-none text-white">SM MILK</h1>
            <p className="text-[10px] font-bold text-sky-200 mt-0.5 tracking-wide">Dairy ERP App v3.5</p>
          </div>
        </div>

        {/* Shift & Bluetooth Printer Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              shift === "MORNING"
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                : "bg-indigo-900 text-indigo-100 border-indigo-700"
            }`}
          >
            {shift === "MORNING" ? <Sun className="w-3.5 h-3.5 text-amber-950" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            <span>{shift === "MORNING" ? "Morning" : "Evening"}</span>
          </button>

          <button
            onClick={() => setActiveModal("sm-settings")}
            className="p-2 rounded-xl bg-sky-900/60 hover:bg-sky-700 border border-sky-600/50 text-sky-100"
            title="Printer & Weight Settings"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── MAIN MOBILE CONTENT AREA ── */}
      <main className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4 pb-20">
        {/* Mobile Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-gradient-to-br from-sky-900/60 to-slate-900 p-3 rounded-2xl border border-sky-500/30 shadow-md">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-sky-300">
              <span>आज का संकलन</span>
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-white font-mono mt-1">
              {totalLitersToday.toFixed(1)} <span className="text-xs text-sky-300 font-sans font-bold">Ltr</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-semibold">
              {todayPurchases.length} Entries Today
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/60 to-slate-900 p-3 rounded-2xl border border-emerald-500/30 shadow-md">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-300">
              <span>कुल भुगतान</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 font-mono mt-1">
              ₹{totalPayoutToday.toFixed(0)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-semibold">
              {members.length} Registered Farmers
            </div>
          </div>
        </div>

        {/* 12 Operations Grid */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>डेयरी सेवाएं (Milk Operations)</span>
            </h2>
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/30">
              12 Services
            </span>
          </div>

          <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />
        </div>

        {/* Reset Data Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              if (confirm("Reset demo data? All records will be cleared.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </main>

      {/* ── NATIVE MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-around shadow-2xl backdrop-blur-lg">
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
          className="flex flex-col items-center gap-0.5 text-xs font-extrabold text-amber-400 -mt-4 bg-sky-700 hover:bg-sky-600 text-white p-3 rounded-full border-4 border-slate-950 shadow-xl shadow-sky-600/50 active:scale-95 transition-all"
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
