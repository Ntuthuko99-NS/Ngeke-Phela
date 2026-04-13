import { useState } from "react";


// Simple Chart Container
export function ChartContainer({ data, children }) {
  return (
    <div className="chart-container">
      {children(data)}
    </div>
  );
}


// Simple Tooltip (shows info when hovering a point)
export function ChartTooltip({ active, data }) {
  if (!active || !data) return null;

  return (
    <div className="chart-tooltip">
      <p>{data.label}</p>
      <p>{data.value}</p>
    </div>
  );
}


// Simple Legend (shows labels)
export function ChartLegend({ items = [] }) {
  return (
    <div className="chart-legend">
      {items.map((item, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
