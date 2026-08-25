export type MilkType = 'COW' | 'BUFFALO';
export type ShiftType = 'MORNING' | 'EVENING';

export interface Member {
  id: string;
  code: string;
  name: string;
  phone: string;
  milkType: MilkType;
  village: string;
  balance: number; // positive = advance given to farmer, negative = payment due to farmer
}

export interface MilkPurchaseRecord {
  id: string;
  date: string;
  shift: ShiftType;
  memberCode: string;
  memberName: string;
  milkType: MilkType;
  liters: number;
  fat: number;
  snf: number;
  ratePerLiter: number;
  totalAmount: number;
  timestamp: string;
}

export interface MilkSaleRecord {
  id: string;
  date: string;
  shift: ShiftType;
  customerName: string;
  milkType: MilkType;
  liters: number;
  ratePerLiter: number;
  totalAmount: number;
  timestamp: string;
}

export interface ItemSaleRecord {
  id: string;
  date: string;
  memberCode: string;
  memberName: string;
  itemName: string; // Cattle Feed, Khal, Mineral Mixture
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface RateChartEntry {
  fat: number;
  snf: number;
  cowRate: number;
  buffaloRate: number;
}
