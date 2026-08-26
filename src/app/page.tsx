"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Smartphone, Monitor, Sparkles } from "lucide-react";

// Layout
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

// Dashboard components
import KPICards from "@/components/dashboard/KPICards";
import CollectionChart from "@/components/dashboard/CollectionChart";
import ShiftBarChart from "@/components/dashboard/ShiftBarChart";
import RecentTable from "@/components/dashboard/RecentTable";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [purchases, setPurchases] = useState<MilkPurchaseRecord[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<MilkSaleRecord[]>(INITIAL_SALES);
  const [itemSales, setItemSales] = useState<ItemSaleRecord[]>(INITIAL_ITEM_SALES);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedMembers   = localStorage.getItem("sm_members");
      const savedPurchases = localStorage.getItem("sm_purchases");
      const savedSales     = localStorage.getItem("sm_sales");
      const savedItemSales = localStorage.getItem("sm_item_sales");
      if (savedMembers)   setMembers(JSON.parse(savedMembers));
      if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
      if (savedSales)     setSales(JSON.parse(savedSales));
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

  // Today's purchases only (for KPI)
  const todayStr = new Date().toISOString().split("T")[0];
  const todayPurchases = purchases.filter((p) => p.date === todayStr);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center ${viewMode === 'mobile' ? 'py-4' : 'p-0'}`}>
      
      {/* View Mode Bar for localhost testing */}
      <div className="w-full max-w-5xl px-4 py-2 flex items-center justify-between bg-slate-900/80 border-b border-white/10 text-xs mb-2 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">SM MILK — Viewport Mode:</span>
          <span className="text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
            {viewMode === 'mobile' ? '📱 Mobile Phone Screen View (Android APK Preview)' : '🖥️ Desktop Command Center'}
          </span>
        </div>

        <button
          onClick={() => setViewMode(v => v === 'mobile' ? 'desktop' : 'mobile')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
        >
          {viewMode === 'mobile' ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Switch to Desktop View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Switch to Mobile View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container Wrapper */}
      <div
        className={`w-full transition-all duration-300 ease-in-out relative flex flex-col ${
          viewMode === 'mobile'
            ? 'max-w-[430px] min-h-[840px] h-[840px] rounded-[44px] overflow-hidden border-[8px] border-slate-800 shadow-2xl shadow-cyan-500/20 bg-slate-950'
            : 'max-w-full min-h-screen bg-slate-950'
        }`}
      >
        <div className="app-shell flex-1">
          {/* Sidebar */}
          {viewMode === 'desktop' && (
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed((v) => !v)}
              onOpenSettings={() => setActiveModal("sm-settings")}
            />
          )}

          {/* Main area */}
          <div className="main-area flex-1">
            {/* TopBar */}
            <TopBar
              currentShift={shift}
              onToggleShift={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
              onOpenSettings={() => setActiveModal("sm-settings")}
              onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
              purchaseCount={todayPurchases.length}
            />

            {/* Dashboard content */}
            <main className="page-content overflow-y-auto no-scrollbar pb-16">
              {/* KPI Cards */}
              <KPICards purchases={todayPurchases} memberCount={members.length} />

              {/* Charts Row (Only in Desktop view or optimized in mobile) */}
              {viewMode === 'desktop' && (
                <div className="charts-grid">
                  <CollectionChart purchases={purchases} />
                  <ShiftBarChart purchases={todayPurchases} />
                </div>
              )}

              {/* Recent Entries Table */}
              <RecentTable
                purchases={purchases}
                onOpenPurchase={() => setActiveModal("milk-purchase")}
              />

              {/* Operations Module Grid */}
              <ModuleGrid onSelectModule={(id) => setActiveModal(id)} />

              {/* Footer reset */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 11,
                  color: "#94a3b8",
                }}
              >
                <span>SM MILK Mobile ERP v3.5</span>
                <button
                  onClick={() => {
                    if (confirm("Reset demo data? All data will be cleared.")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    color: "#94a3b8",
                    fontSize: 11,
                  }}
                >
                  <RefreshCw size={11} />
                  Reset
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* ── ALL MODALS (fully preserved) ── */}
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
