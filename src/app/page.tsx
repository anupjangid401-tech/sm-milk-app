"use client";

import { useState, useEffect } from "react";
import MilkHeader from "@/components/MilkHeader";
import QuickStats from "@/components/QuickStats";
import ModuleGrid from "@/components/ModuleGrid";

import MilkPurchaseModal from "@/components/modals/MilkPurchaseModal";
import MilkSaleModal from "@/components/modals/MilkSaleModal";
import MemberEntryModal from "@/components/modals/MemberEntryModal";
import RateChartModal from "@/components/modals/RateChartModal";
import PassbookModal from "@/components/modals/PassbookModal";
import ItemSaleModal from "@/components/modals/ItemSaleModal";
import ReportsModal from "@/components/modals/ReportsModal";
import HelpModal from "@/components/modals/HelpModal";
import SettingsModal from "@/components/modals/SettingsModal";

import { Member, MilkPurchaseRecord, MilkSaleRecord, ItemSaleRecord, ShiftType } from "@/lib/types";
import { INITIAL_MEMBERS, INITIAL_PURCHASES, INITIAL_SALES, INITIAL_ITEM_SALES } from "@/lib/initialData";
import { Smartphone, RefreshCw, Sparkles, Monitor } from "lucide-react";

export default function Home() {
  const [shift, setShift] = useState<ShiftType>("MORNING");
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [purchases, setPurchases] = useState<MilkPurchaseRecord[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<MilkSaleRecord[]>(INITIAL_SALES);
  const [itemSales, setItemSales] = useState<ItemSaleRecord[]>(INITIAL_ITEM_SALES);

  // Load state from localStorage on client load
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

  // Save to localStorage when state changes
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

  const handleToggleShift = () => {
    setShift((prev) => (prev === "MORNING" ? "EVENING" : "MORNING"));
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === "desktop" ? "mobile" : "desktop"));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-0 sm:py-4">
      {/* Container Wrapper: Full width desktop or phone frame based on viewMode */}
      <div
        className={`w-full transition-all duration-500 ease-in-out relative flex flex-col ${
          viewMode === 'mobile'
            ? 'max-w-[480px] min-h-screen sm:min-h-[850px] sm:h-[850px] sm:rounded-[36px] sm:overflow-hidden sm:border sm:border-white/20 sm:shadow-2xl sm:shadow-cyan-500/10'
            : 'max-w-6xl min-h-screen sm:min-h-[900px] sm:rounded-[28px] sm:overflow-hidden sm:border sm:border-white/15 sm:shadow-2xl'
        }`}
      >
        {/* App Header */}
        <MilkHeader
          shift={shift}
          viewMode={viewMode}
          onToggleShift={handleToggleShift}
          onToggleViewMode={handleToggleViewMode}
          onOpenSettings={() => setActiveModal("sm-settings")}
        />

        {/* Dashboard Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
          {/* Quick Metrics Cards */}
          <QuickStats purchases={purchases} memberCount={members.length} />

          {/* Section Header */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                डेयरी सेवाएं एवं नियंत्रण (Services & Operations)
              </h2>
            </div>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/15 px-2.5 py-1 rounded-full border border-cyan-500/30">
              12 Active Modules
            </span>
          </div>

          {/* 12 Luxury Dashboard Module Cards */}
          <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />
        </div>

        {/* Bottom App Status Bar */}
        <div className="glass-nav absolute bottom-0 left-0 right-0 py-2.5 px-4 flex items-center justify-between border-t border-white/10 text-xs backdrop-blur-2xl">
          <div className="flex items-center gap-2 text-slate-300">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-bold text-slate-200">SM MILK Mobile ERP v3.5 Pro</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleViewMode}
              className="hidden sm:flex items-center gap-1 text-[10px] text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 px-2.5 py-1 rounded-lg border border-cyan-500/30"
            >
              {viewMode === 'mobile' ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
              <span>{viewMode === 'mobile' ? 'Desktop View' : 'Phone View'}</span>
            </button>

            <button
              onClick={() => {
                if (confirm("क्या आप डेमो डेटा रीसेट करना चाहते हैं?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
            >
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DIALOGS */}
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
