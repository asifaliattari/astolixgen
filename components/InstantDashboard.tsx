"use client";

import { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

type CellValue = string | number | null;
type DataRow = CellValue[];

interface Dataset {
  headers: string[];
  rows: DataRow[];
  fileName: string;
}

const SAMPLE_CSV = `Month,Region,Product,Units,Revenue
Jan,North,Widget A,120,5400
Jan,South,Widget B,85,4250
Jan,East,Widget A,95,4275
Feb,North,Widget B,110,5500
Feb,South,Widget A,140,6300
Feb,East,Widget C,60,3600
Mar,North,Widget A,160,7200
Mar,South,Widget C,75,4500
Mar,East,Widget B,100,5000
Apr,North,Widget C,90,5400
Apr,South,Widget A,130,5850
Apr,East,Widget A,115,5175`;

function parseCSV(text: string): { headers: string[]; rows: DataRow[] } {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim() !== "");
  if (lines.length < 2) return { headers: [], rows: [] };
  const splitLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        out.push(cur.trim()); cur = "";
      } else cur += ch;
    }
    out.push(cur.trim());
    return out;
  };
  const headers = splitLine(lines[0]);
  const rows = lines.slice(1).map((l) =>
    splitLine(l).map((v) => {
      if (v === "") return null;
      const n = Number(v.replace(/,/g, ""));
      return v !== "" && !Number.isNaN(n) ? n : v;
    })
  );
  return { headers, rows };
}

function isNumericColumn(rows: DataRow[], idx: number): boolean {
  let numeric = 0, total = 0;
  for (const r of rows) {
    const v = r[idx];
    if (v === null || v === undefined || v === "") continue;
    total++;
    if (typeof v === "number") numeric++;
  }
  return total > 0 && numeric / total >= 0.6;
}

function formatNumber(n: number): string {
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function BarChart({ labels, values, color }: { labels: string[]; values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  const W = 720, H = 300, padL = 8, padB = 44, padT = 16;
  const chartH = H - padB - padT;
  const n = values.length;
  const slot = (W - padL * 2) / Math.max(n, 1);
  const barW = Math.min(56, slot * 0.62);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Bar chart">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padL} x2={W - padL}
          y1={padT + chartH * (1 - t)} y2={padT + chartH * (1 - t)}
          stroke="rgba(255,255,255,0.07)"
        />
      ))}
      {values.map((v, i) => {
        const h = Math.max(3, (v / max) * chartH);
        const x = padL + slot * i + (slot - barW) / 2;
        const y = padT + chartH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={5} fill={color === "gradient" ? "url(#barGrad)" : color} />
            <text x={x + barW / 2} y={y - 7} textAnchor="middle" fontSize={11} fill="#94a3b8">
              {formatNumber(v)}
            </text>
            <text
              x={x + barW / 2} y={H - 12}
              textAnchor="middle" fontSize={11} fill="#64748b"
              transform={n > 8 ? `rotate(-18 ${x + barW / 2} ${H - 12})` : undefined}
            >
              {labels[i].length > 14 ? labels[i].slice(0, 13) + "…" : labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function InstantDashboard() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [catCol, setCatCol] = useState<number | null>(null);
  const [numCol, setNumCol] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const numericCols = useMemo(
    () => (dataset ? dataset.headers.map((_, i) => i).filter((i) => isNumericColumn(dataset.rows, i)) : []),
    [dataset]
  );
  const categoryCols = useMemo(
    () =>
      dataset
        ? dataset.headers
            .map((_, i) => i)
            .filter((i) => {
              if (isNumericColumn(dataset.rows, i)) return false;
              const uniq = new Set(dataset.rows.map((r) => String(r[i] ?? "")));
              return uniq.size >= 2 && uniq.size <= 30;
            })
        : [],
    [dataset]
  );

  const activeCat = catCol ?? categoryCols[0] ?? null;
  const activeNum = numCol ?? numericCols[0] ?? null;

  const chartData = useMemo(() => {
    if (!dataset || activeCat === null || activeNum === null) return null;
    const agg = new Map<string, number>();
    for (const r of dataset.rows) {
      const k = String(r[activeCat] ?? "(blank)");
      const v = typeof r[activeNum] === "number" ? (r[activeNum] as number) : 0;
      agg.set(k, (agg.get(k) ?? 0) + v);
    }
    const entries = Array.from(agg.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
    return { labels: entries.map((e) => e[0]), values: entries.map((e) => e[1]) };
  }, [dataset, activeCat, activeNum]);

  const kpis = useMemo(() => {
    if (!dataset || activeNum === null) return null;
    const vals = dataset.rows
      .map((r) => r[activeNum])
      .filter((v): v is number => typeof v === "number");
    if (!vals.length) return null;
    const sum = vals.reduce((a, b) => a + b, 0);
    return {
      sum,
      avg: sum / vals.length,
      min: Math.min(...vals),
      max: Math.max(...vals),
    };
  }, [dataset, activeNum]);

  const loadFile = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let headers: string[] = [];
      let rows: DataRow[] = [];
      if (ext === "csv" || ext === "txt") {
        const text = await file.text();
        ({ headers, rows } = parseCSV(text));
      } else if (ext === "xlsx" || ext === "xls") {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<(string | number | null)[]>(ws, {
          header: 1,
          defval: null,
          raw: true,
        });
        if (json.length >= 2) {
          headers = (json[0] as (string | number | null)[]).map((h, i) =>
            h === null || h === "" ? `Column ${i + 1}` : String(h)
          );
          rows = (json.slice(1) as (string | number | null)[][]).map((r) =>
            headers.map((_, i) => {
              const v = r[i];
              return v === null || v === undefined || v === "" ? null : v;
            })
          );
        }
      } else {
        throw new Error("Please upload a .csv, .xlsx or .xls file.");
      }
      if (!headers.length || !rows.length) throw new Error("No data rows found in this file.");
      setDataset({ headers, rows, fileName: file.name });
      setCatCol(null);
      setNumCol(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this file.");
      setDataset(null);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    const { headers, rows } = parseCSV(SAMPLE_CSV);
    setDataset({ headers, rows, fileName: "sample-sales.csv" });
    setCatCol(null);
    setNumCol(null);
    setError(null);
  };

  return (
    <div className="card-border rounded-2xl p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold text-white">Try it now — instant dashboard</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        Upload a spreadsheet and watch it reshape into a dashboard automatically. Everything runs
        in your browser — your file never leaves your device.
      </p>

      {/* Upload zone */}
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) loadFile(f);
        }}
        className="mt-5 cursor-pointer rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-accent/60"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
        aria-label="Upload a CSV or Excel file"
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) loadFile(f);
            e.target.value = "";
          }}
        />
        {loading ? (
          <p className="text-sm text-accent">Reading your file…</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-white">
              Drop a <span className="text-accent">.csv</span> or <span className="text-accent">.xlsx</span> file here, or click to browse
            </p>
            <p className="mt-1 text-xs text-slate-500">or</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); loadSample(); }}
              className="mt-2 rounded-lg border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-accent hover:text-accent"
            >
              Try with sample data
            </button>
          </>
        )}
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {/* Dashboard */}
      {dataset && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-white">{dataset.fileName}</span> ·{" "}
              {dataset.rows.length.toLocaleString()} rows × {dataset.headers.length} columns
            </p>
            <button
              type="button"
              onClick={() => setDataset(null)}
              className="text-xs text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Column pickers */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Group by (category)</span>
              <select
                value={activeCat ?? ""}
                onChange={(e) => setCatCol(e.target.value === "" ? null : Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-white"
              >
                {categoryCols.map((i) => (
                  <option key={i} value={i}>{dataset.headers[i]}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Measure (number)</span>
              <select
                value={activeNum ?? ""}
                onChange={(e) => setNumCol(e.target.value === "" ? null : Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-white"
              >
                {numericCols.map((i) => (
                  <option key={i} value={i}>{dataset.headers[i]}</option>
                ))}
              </select>
            </label>
          </div>

          {/* KPI cards */}
          {kpis && dataset && activeNum !== null && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: `Total ${dataset.headers[activeNum]}`, value: formatNumber(kpis.sum) },
                { label: "Average", value: formatNumber(kpis.avg) },
                { label: "Maximum", value: formatNumber(kpis.min === kpis.max ? kpis.max : kpis.max) },
                { label: "Minimum", value: formatNumber(kpis.min) },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">{k.label}</p>
                  <p className="mt-1 font-display text-xl font-bold text-white">{k.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Chart */}
          {chartData && dataset && activeCat !== null && activeNum !== null ? (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-2 text-sm font-semibold text-white">
                {dataset.headers[activeNum]} by {dataset.headers[activeCat]}
              </p>
              <BarChart labels={chartData.labels} values={chartData.values} color="gradient" />
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-500">
              Couldn&apos;t auto-detect a chartable combination — try a file with at least one text
              column and one numeric column.
            </p>
          )}

          {/* Table preview */}
          <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  {dataset.headers.map((h) => (
                    <th key={h} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.rows.slice(0, 8).map((r, ri) => (
                  <tr key={ri} className="border-b border-white/5 last:border-0">
                    {dataset.headers.map((h, ci) => (
                      <td key={ci} className="px-4 py-2 text-slate-300">
                        {r[ci] === null ? <span className="text-slate-600">—</span> : String(r[ci])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {dataset.rows.length > 8 && (
              <p className="px-4 py-2 text-xs text-slate-600">
                Showing 8 of {dataset.rows.length.toLocaleString()} rows
              </p>
            )}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            This is a taste of what we build for clients — production versions connect to your live
            data, refresh automatically, and are designed in Power&nbsp;BI or custom dashboards.{" "}
            <a href="/contact" className="text-accent underline-offset-4 hover:underline">
              Ask us about yours →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
