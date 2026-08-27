import { Member, MilkPurchaseRecord, MilkSaleRecord, ItemSaleRecord } from "@/lib/types";

export interface DatabaseState {
  version: string;
  exportDate: string;
  members: Member[];
  purchases: MilkPurchaseRecord[];
  sales: MilkSaleRecord[];
  itemSales: ItemSaleRecord[];
}

const STORAGE_KEYS = {
  MEMBERS: "sm_members",
  PURCHASES: "sm_purchases",
  SALES: "sm_sales",
  ITEM_SALES: "sm_item_sales",
};

/**
 * Advanced Offline Storage Engine for SM MILK Dairy ERP
 */
export const StorageEngine = {
  // Load full state
  loadAll(): {
    members: Member[];
    purchases: MilkPurchaseRecord[];
    sales: MilkSaleRecord[];
    itemSales: ItemSaleRecord[];
  } {
    if (typeof window === "undefined") {
      return { members: [], purchases: [], sales: [], itemSales: [] };
    }

    try {
      const membersStr = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      const purchasesStr = localStorage.getItem(STORAGE_KEYS.PURCHASES);
      const salesStr = localStorage.getItem(STORAGE_KEYS.SALES);
      const itemSalesStr = localStorage.getItem(STORAGE_KEYS.ITEM_SALES);

      return {
        members: membersStr ? JSON.parse(membersStr) : [],
        purchases: purchasesStr ? JSON.parse(purchasesStr) : [],
        sales: salesStr ? JSON.parse(salesStr) : [],
        itemSales: itemSalesStr ? JSON.parse(itemSalesStr) : [],
      };
    } catch (err) {
      console.error("[StorageEngine] Error loading database", err);
      return { members: [], purchases: [], sales: [], itemSales: [] };
    }
  },

  // Save full state
  saveMembers(members: Member[]) {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },

  savePurchases(purchases: MilkPurchaseRecord[]) {
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
  },

  saveSales(sales: MilkSaleRecord[]) {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  },

  saveItemSales(itemSales: ItemSaleRecord[]) {
    localStorage.setItem(STORAGE_KEYS.ITEM_SALES, JSON.stringify(itemSales));
  },

  // Export full database to JSON file
  exportBackupJSON(): string {
    const data = this.loadAll();
    const backup: DatabaseState = {
      version: "3.5",
      exportDate: new Date().toISOString(),
      ...data,
    };
    return JSON.stringify(backup, null, 2);
  },

  // Trigger browser/device file download for backup
  downloadBackupFile() {
    const jsonStr = this.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split("T")[0];
    const link = document.createElement("a");
    link.href = url;
    link.download = `SM_MILK_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Restore database from JSON string
  restoreFromJSON(jsonStr: string): boolean {
    try {
      const parsed: DatabaseState = JSON.parse(jsonStr);
      if (Array.isArray(parsed.members)) this.saveMembers(parsed.members);
      if (Array.isArray(parsed.purchases)) this.savePurchases(parsed.purchases);
      if (Array.isArray(parsed.sales)) this.saveSales(parsed.sales);
      if (Array.isArray(parsed.itemSales)) this.saveItemSales(parsed.itemSales);
      return true;
    } catch (err) {
      console.error("[StorageEngine] Failed to parse backup file", err);
      return false;
    }
  },

  // Export records to CSV for Excel
  exportPurchasesCSV(): string {
    const { purchases } = this.loadAll();
    if (purchases.length === 0) return "";

    const headers = ["Date", "Shift", "Member Code", "Farmer Name", "Milk Type", "Liters", "FAT", "SNF", "Rate", "Amount"];
    const rows = purchases.map((p) => [
      p.date,
      p.shift,
      p.memberCode,
      `"${p.memberName}"`,
      p.milkType,
      p.liters,
      p.fat,
      p.snf,
      p.ratePerLiter,
      p.totalAmount,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  },

  downloadPurchasesCSV() {
    const csvStr = this.exportPurchasesCSV();
    if (!csvStr) {
      alert("No purchase data available to export.");
      return;
    }
    const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split("T")[0];
    const link = document.createElement("a");
    link.href = url;
    link.download = `SM_MILK_Purchases_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Database size calculation (in KB)
  getStorageSizeKB(): number {
    if (typeof window === "undefined") return 0;
    let totalBytes = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith("sm_")) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }
    return parseFloat((totalBytes / 1024).toFixed(2));
  },
};
