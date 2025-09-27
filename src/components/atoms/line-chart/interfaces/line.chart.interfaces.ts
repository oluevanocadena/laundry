// src/app/atoms/line-chart/line-chart.model.ts
export interface UILineChartSeries {
  label: string;
  data: number[];
  color?: string; // opcional, si no se pasa se usa color base
}

export interface UILineChartOptions {
  labels: string[]; // etiquetas del eje X
  series: UILineChartSeries[];
}
