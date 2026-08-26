"use client";

import { MilkPurchaseRecord } from "@/lib/types";

interface RecentTableProps {
  purchases: MilkPurchaseRecord[];
  onOpenPurchase: () => void;
}

export default function RecentTable({ purchases, onOpenPurchase }: RecentTableProps) {
  const recent = [...purchases].reverse().slice(0, 10);

  return (
    <div className="data-table-card">
      <div className="data-table-header">
        <div>
          <div className="section-title" style={{ fontSize: 13 }}>
            Recent Milk Entries
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
            हालिया दूध प्रविष्टियां
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="glass-btn-secondary"
            style={{ fontSize: 12, padding: "6px 12px" }}
            onClick={onOpenPurchase}
          >
            + New Entry
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Time</th>
              <th>Shift</th>
              <th>Type</th>
              <th style={{ textAlign: "right" }}>Qty (L)</th>
              <th style={{ textAlign: "right" }}>FAT%</th>
              <th style={{ textAlign: "right" }}>SNF%</th>
              <th style={{ textAlign: "right" }}>Rate</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: "center",
                    color: "var(--text-dim)",
                    padding: "32px 16px",
                    fontSize: 13,
                  }}
                >
                  कोई प्रविष्टि नहीं — No entries yet for today
                </td>
              </tr>
            ) : (
              recent.map((record) => {
                const initials = record.memberName
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("");

                return (
                  <tr key={record.id}>
                    {/* Member */}
                    <td>
                      <div className="member-cell">
                        <div className="member-avatar">{initials}</div>
                        <div>
                          <div className="member-name">{record.memberName}</div>
                          <div className="member-code">#{record.memberCode}</div>
                        </div>
                      </div>
                    </td>

                    {/* Time */}
                    <td className="td-muted td-mono">
                      {record.timestamp || "—"}
                    </td>

                    {/* Shift */}
                    <td>
                      <span
                        className="badge"
                        style={
                          record.shift === "MORNING"
                            ? {
                                background: "var(--amber-dim)",
                                color: "var(--amber)",
                                borderColor: "rgba(245,158,11,0.2)",
                              }
                            : {
                                background: "var(--blue-dim)",
                                color: "var(--blue)",
                                borderColor: "rgba(59,130,246,0.2)",
                              }
                        }
                      >
                        {record.shift === "MORNING" ? "☀ Morning" : "🌙 Evening"}
                      </span>
                    </td>

                    {/* Type */}
                    <td>
                      <span
                        className={`milk-tag ${
                          record.milkType === "BUFFALO" ? "buffalo" : "cow"
                        }`}
                      >
                        {record.milkType === "BUFFALO" ? "🐃 Buffalo" : "🐄 Cow"}
                      </span>
                    </td>

                    {/* Liters */}
                    <td className="td-mono" style={{ textAlign: "right", fontWeight: 600 }}>
                      {record.liters.toFixed(1)}
                    </td>

                    {/* FAT */}
                    <td
                      className="td-mono"
                      style={{ textAlign: "right", color: "var(--amber)" }}
                    >
                      {record.fat.toFixed(1)}
                    </td>

                    {/* SNF */}
                    <td
                      className="td-mono"
                      style={{ textAlign: "right", color: "var(--blue)" }}
                    >
                      {record.snf.toFixed(1)}
                    </td>

                    {/* Rate */}
                    <td className="td-mono td-muted" style={{ textAlign: "right" }}>
                      ₹{record.ratePerLiter.toFixed(2)}
                    </td>

                    {/* Amount */}
                    <td
                      className="td-mono"
                      style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--green)",
                      }}
                    >
                      ₹{record.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {recent.length > 0 && (
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--border-muted)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          <span>Showing {recent.length} of {purchases.length} entries</span>
          <span style={{ color: "var(--green)", fontWeight: 600 }}>
            Total: ₹{purchases.reduce((s, r) => s + r.totalAmount, 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
      )}
    </div>
  );
}
