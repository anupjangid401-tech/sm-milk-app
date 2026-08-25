import { Member, MilkPurchaseRecord, MilkSaleRecord, ItemSaleRecord } from './types';

export const INITIAL_MEMBERS: Member[] = [
  { id: '1', code: '101', name: 'Ramesh Patel', phone: '9829012345', milkType: 'BUFFALO', village: 'Surajpura', balance: -2450 },
  { id: '2', code: '102', name: 'Suresh Jangir', phone: '9414098765', milkType: 'COW', village: 'Surajpura', balance: -1800 },
  { id: '3', code: '103', name: 'Vikram Singh', phone: '9782054321', milkType: 'BUFFALO', village: 'Rampura', balance: -4120 },
  { id: '4', code: '104', name: 'Mohan Sharma', phone: '9928011223', milkType: 'COW', village: 'Surajpura', balance: -950 },
  { id: '5', code: '105', name: 'Devendra Kumar', phone: '9672099887', milkType: 'BUFFALO', village: 'Kishanpura', balance: -3200 },
];

export const INITIAL_PURCHASES: MilkPurchaseRecord[] = [
  {
    id: 'pur-1',
    date: new Date().toISOString().split('T')[0],
    shift: 'MORNING',
    memberCode: '101',
    memberName: 'Ramesh Patel',
    milkType: 'BUFFALO',
    liters: 14.5,
    fat: 6.8,
    snf: 8.9,
    ratePerLiter: 58.50,
    totalAmount: 848.25,
    timestamp: '07:15 AM'
  },
  {
    id: 'pur-2',
    date: new Date().toISOString().split('T')[0],
    shift: 'MORNING',
    memberCode: '102',
    memberName: 'Suresh Jangir',
    milkType: 'COW',
    liters: 18.0,
    fat: 4.2,
    snf: 8.5,
    ratePerLiter: 42.00,
    totalAmount: 756.00,
    timestamp: '07:30 AM'
  },
  {
    id: 'pur-3',
    date: new Date().toISOString().split('T')[0],
    shift: 'MORNING',
    memberCode: '103',
    memberName: 'Vikram Singh',
    milkType: 'BUFFALO',
    liters: 22.0,
    fat: 7.2,
    snf: 9.1,
    ratePerLiter: 62.00,
    totalAmount: 1364.00,
    timestamp: '08:05 AM'
  }
];

export const INITIAL_SALES: MilkSaleRecord[] = [
  {
    id: 'sale-1',
    date: new Date().toISOString().split('T')[0],
    shift: 'MORNING',
    customerName: 'Shree Krishna Dairy Booth',
    milkType: 'BUFFALO',
    liters: 40,
    ratePerLiter: 65,
    totalAmount: 2600,
    timestamp: '08:45 AM'
  }
];

export const INITIAL_ITEM_SALES: ItemSaleRecord[] = [
  {
    id: 'item-1',
    date: new Date().toISOString().split('T')[0],
    memberCode: '101',
    memberName: 'Ramesh Patel',
    itemName: 'Amul Cattle Feed (50kg Bag)',
    quantity: 1,
    unitPrice: 1250,
    totalAmount: 1250
  }
];
