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
import { Smartphone, RefreshCw } from "lucide-react";

export default function Home() {
  const [shift, setShift] = useState<ShiftType>("MORNING");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [purchases, setPurchases] = useState<MilkPurchaseRecord[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<MilkSaleRecord[]>(INITIAL_SALES);
  const [itemSales, setItemSales] = useState<ItemSaleRecord[]>(INITIAL_ITEM_SALES);

  // Load state from localStorage on client load
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem("vdc_members");
      const savedPurchases = localStorage.getItem("vdc_purchases");
      const savedSales = localStorage.getItem("vdc_sales");
      const savedItemSales = localStorage.getItem("vdc_item_sales");

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
    localStorage.setItem("vdc_members", JSON.stringify(newMembers));
  };

  const savePurchases = (record: MilkPurchaseRecord) => {
    const updated = [record, ...purchases];
    setPurchases(updated);
    localStorage.setItem("vdc_purchases", JSON.stringify(updated));
  };

  const saveSales = (record: MilkSaleRecord) => {
    const updated = [record, ...sales];
    setSales(updated);
    localStorage.setItem("vdc_sales", JSON.stringify(updated));
  };

  const saveItemSales = (record: ItemSaleRecord) => {
    const updated = [record, ...itemSales];
    setItemSales(updated);
    localStorage.setItem("vdc_item_sales", JSON.stringify(updated));
  };

  const handleToggleShift = () => {
    setShift((prev) => (prev === "MORNING" ? "EVENING" : "MORNING"));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-0 sm:py-6">
      {/* Mobile App Container Frame */}
      <div className="app-container w-full min-h-screen sm:min-h-[840px] sm:h-[840px] sm:rounded-[36px] sm:overflow-hidden sm:border sm:border-white/15">
        
        {/* App Header */}
        <MilkHeader
          shift={shift}
          onToggleShift={handleToggleShift}
          onOpenHelp={() => setActiveModal("sm-settings")}
        />

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
          {/* Quick Metrics Summary */}
          <QuickStats purchases={purchases} memberCount={members.length} />

          {/* Grid Title */}
          <div className="px-4 py-2 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              डेयरी सेवाएं एवं रिपोर्ट (Services & Reports)
            </h2>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              12 Modules
            </span>
          </div>

          {/* 12 Modern Glassmorphism Modules */}
          <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />
        </div>

        {/* Bottom App Footer Bar */}
        <div className="glass-nav absolute bottom-0 left-0 right-0 py-2.5 px-4 flex items-center justify-between border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-semibold text-slate-300">SM MILK Mobile App</span>
          </div>

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
            <span>Reset Demo</span>
          </button>
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
