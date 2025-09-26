import { Injectable } from '@angular/core';

import { ProductCategoriesQueryDomain } from '@bussiness/product-categories/domains/product-categories.query.domain';
import {
  ProductCategory,
  ProductCategoryRequest,
} from '@bussiness/product-categories/interfaces/product-categories.interfaces';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults, SupabaseResponse } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesApiService extends SupabaseBaseApiService {
  productCategories = new SubjectProp<ProductCategory[]>([]);
  pagedProductCategories = new SubjectProp<PagedResults<ProductCategory>>(null);

  constructor() {
    super();
  }

  getPagedProductCategories(request: ProductCategoryRequest) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = ProductCategoriesQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      (data as unknown as ProductCategory[]).forEach((productCategory) => {
        productCategory.Checked = false;
      });
      this.pagedProductCategories.value = {
        data: (data as unknown as ProductCategory[]) ?? [],
        count: totalCount,
      };
      return super.handleResponse(data, error);
    }, 'Fetching Product Categories');
  }

  getProductCategories() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.ProductCategories)
        .select('*')
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Deleted', false);
      if (error) throw error;
      this.productCategories.value = data || [];
      return super.handleResponse(data, error);
    }, 'Fetching Product Categories');
  }

  async saveProductCategory(productCategory: ProductCategory): Promise<SupabaseResponse<ProductCategory> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.ProductCategories)
        .upsert(productCategory)
        .select()
        .single();
      return super.handleResponse(data, error);
    }, 'Saving Product Category');
  }

  async disableProductCategory(id: string, disabled: boolean) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.ProductCategories)
        .update({ Disabled: !disabled })
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('id', id);
      return super.handleResponse(data, error);
    }, 'Disabling Product Category');
  }

  async deleteProductCategory(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.ProductCategories)
        .delete()
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('id', id);
      return super.handleResponse(data, error);
    }, 'Deleting Product Category');
  }

  deleteProductCategories(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildDeleteProductCategoriesQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as ProductCategory[], error);
    });
  }

  disableProductCategories(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildToggleProductCategoriesQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as ProductCategory[], error);
    });
  }
}
