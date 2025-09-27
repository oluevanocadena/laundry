import { Component, Input, ViewChild, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, registerables } from 'chart.js';
import { UILineChartOptions, UILineChartSeries } from '@components/atoms/line-chart/interfaces/line.chart.interfaces';

@Component({
  selector: 'bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() options!: UILineChartOptions; // 👉 Reutilizamos la misma interfaz
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  // 🎨 Paleta fija de colores
  private palette: string[] = [
    '#6664f5', // primary
    '#f1918a', // error
    '#43dfa6', // success
    '#fab75b', // warning
    '#ff5f2d', // warning-secondary
    '#76c6f5', // info
    '#4B49C6', // tertiary
    '#b9b9b9', // default
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.chart) {
      this.updateChart();
    }
  }

  private initChart() {
    const data: ChartData<'bar'> = {
      labels: this.options.labels,
      datasets: this.options.series.map((s, i) => ({
        label: s.label,
        data: s.data,
        backgroundColor: this.palette[i % this.palette.length],
        borderRadius: 3, // 👈 borde redondeado
        barPercentage: 0.7, // ancho relativo de la barra
        categoryPercentage: 0.6, // separación entre grupos
      })),
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              color: '#8c8c8c',
              font: { size: 12 },
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            bodyColor: '#686868',
            titleColor: '#bcbcbc',
            footerColor: '#686868',
            usePointStyle: true,
            padding: { top: 8, bottom: 8, left: 12, right: 12 },
            boxPadding: 5,
            boxWidth: 8,
            boxHeight: 8,
            callbacks: {
              labelPointStyle: () => ({
                pointStyle: 'circle',
                rotation: 0,
                radius: 2,
              }),
            },
          },
        },
        scales: {
          x: {
            grid: { display: false, color: '#2e2e2e' },
            border: { display: true, color: '#2e2e2e', width: 1 },
            ticks: { color: '#686868', font: { size: 12 } },
          },
          y: {
            grid: { display: false, drawBorder: false },
            ticks: { stepSize: 40, color: '#686868', font: { size: 12 } },
          },
        },
      } as ChartOptions<'bar'>,
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }

  private updateChart() {
    this.chart.data.labels = this.options.labels;
    this.chart.data.datasets = this.options.series.map((s, i) => ({
      label: s.label,
      data: s.data,
      backgroundColor: this.palette[i % this.palette.length],
      borderRadius: 4,
      barPercentage: 0.7,
      categoryPercentage: 0.6,
    }));
    this.chart.update();
  }
}
