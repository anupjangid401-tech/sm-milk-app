"use client";

import { useState, useRef } from "react";
import { X, Settings, Database, Download, Upload, FileSpreadsheet, HardDrive, CheckCircle, RefreshCw, Wifi, Bluetooth } from "lucide-react";
import { StorageEngine } from "@/lib/storageEngine";

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'Database' | 'Scale' | 'Printer'>('Database');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = StorageEngine.loadAll();
  const dbSizeKB = StorageEngine.getStorageSizeKB();

  // Export JSON Backup
  const handleExportBackup = () => {
    StorageEngine.downloadBackupFile();
    setStatusMsg("Backup file downloaded successfully! (Save it in phone storage)");
  };

  // Export CSV for Excel
  const handleExportCSV = () => {
    StorageEngine.downloadPurchasesCSV();
    setStatusMsg("Excel CSV file exported successfully!");
  };

  // Handle Restore JSON File
  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = StorageEngine.restoreFromJSON(content);
        if (success) {
          alert("Database restored successfully! The app will reload now.");
          window.location.reload();
        } else {
          alert("Invalid backup file format! Please upload a valid SM MILK .json backup.");
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Enterprise Settings</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-950 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 p-2 border-b border-slate-800 text-xs flex-shrink-0">
        <button
          onClick={() => setActiveTab('Database')}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-center transition-all ${
            activeTab === 'Database'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 bg-slate-950 border border-slate-800'
          }`}
        >
          Database & Backup
        </button>
        <button
          onClick={() => setActiveTab('Scale')}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-center transition-all ${
            activeTab === 'Scale'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 bg-slate-950 border border-slate-800'
          }`}
        >
          Weight Scale
        </button>
        <button
          onClick={() => setActiveTab('Printer')}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-center transition-all ${
            activeTab === 'Printer'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 bg-slate-950 border border-slate-800'
          }`}
        >
          BT Printer
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {statusMsg && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* TAB 1: ADVANCED OFFLINE DATABASE MANAGER */}
        {activeTab === 'Database' && (
          <div className="space-y-4">
            {/* Storage Health Stats Card */}
            <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-cyan-300" />
                  <span className="font-black text-sm text-white">Offline Database Status</span>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full uppercase">
                  100% Offline Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
                  <div className="text-[9px] text-slate-400 font-sans font-bold">Farmers</div>
                  <div className="text-base font-black text-white">{stats.members.length}</div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
                  <div className="text-[9px] text-slate-400 font-sans font-bold">Milk Entries</div>
                  <div className="text-base font-black text-cyan-300">{stats.purchases.length}</div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
                  <div className="text-[9px] text-slate-400 font-sans font-bold">DB Size</div>
                  <div className="text-base font-black text-emerald-400">{dbSizeKB} KB</div>
                </div>
              </div>
            </div>

            {/* Backup & Restore Action Buttons */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">Backup & Restore Operations</h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Download Backup Button */}
                <button
                  onClick={handleExportBackup}
                  className="p-4 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-400 flex flex-col items-center text-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-white block">Download Backup</span>
                    <span className="text-[10px] text-slate-400">Save DB File (.json)</span>
                  </div>
                </button>

                {/* Restore Backup Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-3xl bg-slate-950 border border-slate-800 hover:border-purple-400 flex flex-col items-center text-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-white block">Restore Backup</span>
                    <span className="text-[10px] text-slate-400">Upload DB File (.json)</span>
                  </div>
                </button>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleRestoreFile}
                  accept=".json"
                  className="hidden"
                />
              </div>

              {/* Excel CSV Export */}
              <button
                onClick={handleExportCSV}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-400 flex items-center justify-between shadow-lg text-xs font-extrabold text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <span>Export All Purchases to Excel (.CSV)</span>
                </div>
                <Download className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: WEIGHT SCALE */}
        {activeTab === 'Scale' && (
          <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <Wifi className="w-6 h-6 text-cyan-300 animate-pulse" />
              <div>
                <span className="font-extrabold text-sm text-white block">WiFi Scale Integration</span>
                <span className="text-xs text-slate-400">VDC(WIFI) Scale Connected</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BT PRINTER */}
        {activeTab === 'Printer' && (
          <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bluetooth className="w-6 h-6 text-cyan-300" />
                <div>
                  <span className="font-extrabold text-sm text-white block">Thermal Bluetooth Printer</span>
                  <span className="text-xs font-mono text-cyan-300">C8:47:8C:33:B5:41</span>
                </div>
              </div>
              <button onClick={() => alert("Scanning...")} className="px-3 py-1.5 rounded-xl bg-sky-700 text-white font-black text-xs">
                Scan BT
              </button>
            </div>
          </div>
        )}

        <div className="pt-2">
          <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-black text-sm shadow-lg">
            Done (Close Settings)
          </button>
        </div>
      </div>
    </div>
  );
}
