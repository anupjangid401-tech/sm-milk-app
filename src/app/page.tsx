"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

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
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        onOpenSettings={() => setActiveModal("sm-settings")}
      />

      {/* Main area */}
      <div className="main-area">
        {/* TopBar */}
        <TopBar
          currentShift={shift}
          onToggleShift={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
          onOpenSettings={() => setActiveModal("sm-settings")}
          onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
          purchaseCount={todayPurchases.length}
        />

        {/* Dashboard content */}
        <main className="page-content">
          {/* KPI Cards */}
          <KPICards purchases={todayPurchases} memberCount={members.length} />

          {/* Charts Row */}
          <div className="charts-grid">
            <CollectionChart purchases={purchases} />
            <ShiftBarChart purchases={todayPurchases} />
          </div>

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
              padding: "12px 0",
              borderTop: "1px solid var(--border-muted)",
              fontSize: 11,
              color: "var(--text-dim)",
            }}
          >
            <span>SM MILK ERP v3.5 Pro — स्मार्ट डेयरी कलेक्शन मैनेजमेंट</span>
            <button
              onClick={() => {
                if (confirm("क्या आप डेमो डेटा रीसेट करना चाहते हैं? All data will be cleared.")) {
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
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "4px 10px",
                color: "var(--text-dim)",
                fontSize: 11,
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--red)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <RefreshCw size={11} />
              Reset Data
            </button>
          </div>
        </main>
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
