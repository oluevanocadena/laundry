import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addRAfterLastSpace' })
export class AddRAfterLastSpacePipe implements PipeTransform {
	transform(value: string): string {
		// Buscar el último espacio en el string
		const lastSpaceIndex = value.lastIndexOf(' ');

		if (lastSpaceIndex !== -1) {
			// Si se encontró un espacio, agregar "R-" después de ese espacio
			return value.substring(0, lastSpaceIndex + 1) + 'R-' + value.substring(lastSpaceIndex + 1);
		}

		// Si no se encontró ningún espacio, simplemente devolver el string original
		return value;
	}
}
