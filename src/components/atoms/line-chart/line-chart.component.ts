import { Component, Input, ViewChild, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { UILineChartOptions, UILineChartSeries } from '@components/atoms/line-chart/interfaces/line.chart.interfaces';
import { Chart, ChartConfiguration, ChartOptions, ChartData, registerables } from 'chart.js';

@Component({
  selector: 'line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() options!: UILineChartOptions;
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
    // 👇 registra escalas, ejes, leyendas, tooltips, etc.
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

  private getChartColors(series: UILineChartSeries) {
    return series.color || getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  }

  private initChart() {
    const data: ChartData<'line'> = {
      labels: this.options.labels,
      datasets: this.options.series.map((s, i) => ({
        label: s.label,
        data: s.data,
        borderColor: this.palette[i % this.palette.length],
        backgroundColor: this.palette[i % this.palette.length],
        pointBackgroundColor: this.palette[i % this.palette.length],
        pointBorderColor: this.palette[i % this.palette.length],
        pointRadius: 0,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: this.palette[i % this.palette.length],
        pointHoverBorderColor: this.palette[i % this.palette.length],
        borderWidth: 1,
        tension: 0.2,
        fill: false,
      })),
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index', // 👈 hover global (todas las series en ese índice)
          intersect: false, // 👈 no necesita estar justo en el punto
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
            padding: {
              top: 8,
              bottom: 8,
              left: 12,
              right: 12
            },
            boxPadding: 5,
            boxWidth: 8, // Ancho del cuadro de color
            boxHeight: 8,
            callbacks: {
              labelPointStyle: function (context) {
                return {
                  pointStyle: 'circle', // forma del punto
                  rotation: 0,
                  radius: 2, // tamaño del círculo
                };
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              color: '#2e2e2e',
            },
            border: {
              display: true,
              color: '#2e2e2e', // <-- tu color para la línea inferior
              width: 1,
            },
            ticks: {
              color: '#686868',
              font: { size: 12 },
            },
          },
          y: {
            grid: {
              display: false, // sin líneas horizontales
              drawBorder: false,
            },
            ticks: {
              stepSize: 40,
              color: '#686868',
              font: { size: 12 },
            },
          },
        },
      } as ChartOptions<'line'>,
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }

  private updateChart() {
    this.chart.data.labels = this.options.labels;
    this.chart.data.datasets = this.options.series.map((s, i) => ({
      label: s.label,
      data: s.data,
      borderColor: this.palette[i % this.palette.length],
      backgroundColor: this.palette[i % this.palette.length],
      pointBackgroundColor: this.palette[i % this.palette.length],
      pointBorderColor: this.palette[i % this.palette.length],
      pointRadius: 1,
      pointHoverRadius: 2,
      pointHoverBorderWidth: 2,
      pointHoverBackgroundColor: this.palette[i % this.palette.length],
      pointHoverBorderColor: this.palette[i % this.palette.length],
      borderWidth: 1,
      tension: 0.2,
      fill: false,
    }));
    this.chart.update();
  }
}
