"use client";

import {
  LayoutDashboard,
  Droplets,
  Users,
  CreditCard,
  FlaskConical,
  BarChart3,
  Settings,
  Milk,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",    labelHi: "Dashboard",      icon: LayoutDashboard, active: true  },
  { id: "collection",  label: "Collection",   labelHi: "Milk Collection", icon: Droplets,        active: false },
  { id: "members",     label: "Members",      labelHi: "Farmer Members",  icon: Users,           active: false },
  { id: "payments",    label: "Payments",     labelHi: "Payments",        icon: CreditCard,      active: false },
  { id: "quality",     label: "Milk Quality", labelHi: "Milk Quality",    icon: FlaskConical,    active: false },
  { id: "reports",     label: "Reports",      labelHi: "Reports",         icon: BarChart3,       active: false },
];

export default function Sidebar({ collapsed, onToggle, onOpenSettings }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Milk size={16} />
        </div>
        {!collapsed && (
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">SM MILK</div>
            <div className="sidebar-brand-sub">Dairy ERP v3.5</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {!collapsed && (
          <div className="sidebar-section-label">Main Menu</div>
        )}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${item.active ? "active" : ""}`}
              title={collapsed ? `${item.label} (${item.labelHi})` : undefined}
              style={{ justifyContent: collapsed ? "center" : undefined }}
            >
              <Icon className="sidebar-icon" size={16} />
              {!collapsed && (
                <span className="sidebar-item-label">{item.label}</span>
              )}
            </button>
          );
        })}

        {!collapsed && (
          <div className="sidebar-section-label" style={{ marginTop: 8 }}>
            System
          </div>
        )}
        <button
          className="sidebar-item"
          onClick={onOpenSettings}
          title={collapsed ? "Settings" : undefined}
          style={{ justifyContent: collapsed ? "center" : undefined }}
        >
          <Settings className="sidebar-icon" size={16} />
          {!collapsed && (
            <span className="sidebar-item-label">Settings</span>
          )}
        </button>
      </nav>

      {/* Collapse toggle */}
      <div className="sidebar-footer">
        <button
          className="sidebar-item"
          onClick={onToggle}
          style={{
            justifyContent: collapsed ? "center" : "space-between",
            width: "100%",
          }}
          title={collapsed ? "Expand sidebar" : undefined}
        >
          {!collapsed && (
            <span className="sidebar-item-label" style={{ color: "var(--text-dim)", fontSize: 12 }}>
              Collapse
            </span>
          )}
          {collapsed ? (
            <ChevronRight size={14} style={{ color: "var(--text-dim)" }} />
          ) : (
            <ChevronLeft size={14} style={{ color: "var(--text-dim)" }} />
          )}
        </button>
      </div>
    </aside>
  );
}
