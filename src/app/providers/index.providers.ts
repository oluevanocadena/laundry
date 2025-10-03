import { Provider } from '@angular/core';

import { repositoryProviders } from './repository.providers';
import { serviceProviders } from './service.providers';
import { uiProviders } from './ui.providers';

/**
 * Exporta todos los providers organizados por categoría
 */
export const appProviders: Provider[] = [
  ...repositoryProviders,
  ...serviceProviders,
  ...uiProviders,
];

// Exportaciones individuales para uso específico
export { repositoryProviders } from './repository.providers';
export { serviceProviders } from './service.providers';
export { uiProviders } from './ui.providers';
