import { Provider } from '@angular/core';
import { ICustomersRepository } from '@bussiness/customers/repository/customers.repository';
import { CustomersSupabaseRepository } from '@bussiness/customers/repository/customers.supabase.repository';

import { IFeedbackRepository } from '@bussiness/feedback/repository/feeback.repository';
import { FeedbackSupabaseRepository } from '@bussiness/feedback/repository/feeback.supabase.repository';
import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';
import { LocationsSupabaseRepository } from '@bussiness/locations/repository/locations.supabase.repository';
import { IOrdersRepository } from '@bussiness/orders/repository/orders.repository';
import { OrdersSupabaseRepository } from '@bussiness/orders/repository/orders.supabase.repository';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { ProductCategoriesSupabaseRepository } from '@bussiness/product-categories/repository/product.categories.supabase.repository';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { ProductsSupabaseRepository } from '@bussiness/products/repository/products.supabase.repository';
import { IUnitMeasureRepository } from '@bussiness/products/repository/unit.measure.repository';
import { UnitMeasureSupabaseRepository } from '@bussiness/products/repository/unit.measure.supabase.repository';
import { IOrganizationsRepository } from '@bussiness/settings/repository/organizations.repository';
import { OrganizationsSupabaseRepository } from '@bussiness/settings/repository/organizations.supabase.repository';
import { ISupportModulesRepository } from '@bussiness/support/repository/support.modules.repository';
import { SupportModulesSupabaseRepository } from '@bussiness/support/repository/support.modules.supabase.repository';
import { ISupportTicketRepository } from '@bussiness/support/repository/support.repository';
import { SupportTicketSupabaseRepository } from '@bussiness/support/repository/support.supabase.repository';

/**
 * Providers para todos los repositorios de la aplicación
 */
export const repositoryProviders: Provider[] = [
  { provide: IFeedbackRepository, useClass: FeedbackSupabaseRepository },
  { provide: ILocationsRepository, useClass: LocationsSupabaseRepository },
  { provide: IOrdersRepository, useClass: OrdersSupabaseRepository },
  { provide: ISupportModulesRepository, useClass: SupportModulesSupabaseRepository },
  { provide: ISupportTicketRepository, useClass: SupportTicketSupabaseRepository },
  { provide: IUnitMeasureRepository, useClass: UnitMeasureSupabaseRepository },
  { provide: IOrganizationsRepository, useClass: OrganizationsSupabaseRepository },
  { provide: IProductCategoriesRepository, useClass: ProductCategoriesSupabaseRepository },
  { provide: IProductsRepository, useClass: ProductsSupabaseRepository },
  { provide: ICustomersRepository, useClass: CustomersSupabaseRepository },
];
