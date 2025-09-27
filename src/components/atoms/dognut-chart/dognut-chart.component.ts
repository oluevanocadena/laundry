import { Component, Input, ViewChild, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, registerables } from 'chart.js';
import { UILineChartOptions, UILineChartSeries } from '@components/atoms/line-chart/interfaces/line.chart.interfaces';

@Component({
  selector: 'dognut-chart',
  standalone: false,
  templateUrl: './dognut-chart.component.html',
  styleUrls: ['./dognut-chart.component.scss'],
})
export class DognutChartComponent implements OnInit {
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
    const firstSeries = this.options.series[0];

    const data: ChartData<'doughnut'> = {
      labels: this.options.labels,
      datasets: [
        {
          label: firstSeries?.label || 'Series',
          data: firstSeries?.data || [],
          backgroundColor: this.palette.slice(0, this.options.labels.length),
          borderColor: '#2e2e2e', // 👈 borde en color fijo
          borderWidth: 2, // 👈 grosor del borde
        },
      ],
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '90%', // 👈 porcentaje del agujero central
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#8c8c8c',
              font: { size: 12 },
              boxWidth: 8,
              boxHeight: 8,
            },
          },
          tooltip: {
            bodyColor: '#686868',
            titleColor: '#bcbcbc',
            footerColor: '#686868',
            usePointStyle: true,
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
      } as ChartOptions<'doughnut'>,
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }

  private updateChart() {
    const firstSeries = this.options.series[0];

    this.chart.data.labels = this.options.labels;
    this.chart.data.datasets = [
      {
        label: firstSeries?.label || 'Series',
        data: firstSeries?.data || [],
        backgroundColor: this.palette.slice(0, this.options.labels.length),
        borderWidth: 1,
        borderColor: '#8c8c8c',
      },
    ];
    this.chart.update();
  }
}
