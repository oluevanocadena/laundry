import { Component, Input, HostBinding } from '@angular/core';

export type GridAlign =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center-center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() template: string | null = null; // Define grid-template-rows/columns.
  @Input() direction: 'row' | 'column' = 'row'; // Define flex-direction.
  @Input() gap: [number, number] = [0, 0]; // Define row-gap y column-gap.
  @Input() align: GridAlign = 'top-left'; // Define alignment in flex.
  @Input() height: string = 'auto'; // Define height.

  @HostBinding('style.display') get displayStyle(): string {
    return this.template ? 'grid' : this.direction === 'row' ? 'grid' : 'flex'; // Usa grid si se pasa template, si no, flex
  }

  @HostBinding('style.gridTemplateColumns') get gridTemplateColumns():
    | string
    | null {
    return this.template && this.direction === 'column' ? this.template : null; // Solo aplica template para 'column'
  }

  @HostBinding('style.gridTemplateRows') get gridTemplateRows(): string | null {
    return this.template && this.direction === 'row' ? this.template : null; // Solo aplica template para 'row'
  }

  @HostBinding('style.flexDirection') get flexDirection(): string | null {
    return !this.template && this.direction === 'row' ? this.direction : null; // Aplica flex-direction
  }

  @HostBinding('style.rowGap') get rowGap(): string {
    return `${this.gap[0]}px`; // Asigna row-gap
  }

  @HostBinding('style.columnGap') get columnGap(): string {
    return `${this.gap[1]}px`; // Asigna column-gap
  }

  // Lógica de alineación para 'alignItems' y 'justifyContent' dependiendo de la dirección
  @HostBinding('style.alignItems') get alignItems(): string {
    const [side, alignment] = this.align.split('-');

    if (this.direction === 'column') {
      if (side === 'top') {
        return 'flex-start'; // Align to the top for column layout
      } else if (side === 'center') {
        return 'center'; // Align vertically in the center for column layout
      } else if (side === 'bottom') {
        return 'flex-end'; // Align to the bottom for column layout
      }
    } else {
      // When direction is 'row'
      if (side === 'left' || side === 'right') {
        return 'center'; // Align to center vertically in row layout
      }
      return 'center'; // Default behavior for center alignment in row layout
    }

    return 'center'; // Default behavior for center alignment
  }

  @HostBinding('style.justifyContent') get justifyContent(): string {
    const [side, alignment] = this.align.split('-');
    if (this.direction === 'column') {
      if (alignment === 'left') {
        return 'flex-start';
      } else if (alignment === 'right') {
        return 'flex-end';
      } else if (alignment === 'center') {
        return 'center';
      }
    } else {
      // When direction is 'row'
      if (side === 'left' || side === 'right') {
        return alignment === 'top'
          ? 'flex-start'
          : alignment === 'bottom'
          ? 'flex-end'
          : 'stretch';
      } else {
        return 'stretch'; // Default for top-center, center-center, bottom-center
      }
    }

    return 'flex-start'; // Default justification
  }
}
