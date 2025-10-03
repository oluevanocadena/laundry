import { Injectable } from '@angular/core';

import { ProductCategoriesQueryDomain } from '@bussiness/product-categories/domains/product-categories.query.domain';
import {
  ProductCategory,
  ProductCategoryRequest,
} from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesSupabaseRepository extends SupabaseBaseApiService implements IProductCategoriesRepository {
  //Results
  public productCategories = new SubjectProp<ResponseResult<ProductCategory[]>>(null);
  public pagedProductCategories = new SubjectProp<PagedResults<ProductCategory>>(null);

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<ProductCategory[]>> {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildGetAllQuery(this.client, this.sessionService);
      const { data, error } = await query;
      data?.unshift({ id: '0', Name: 'Todas' });
      this.productCategories.value = super.handleResponse(data, error);
      return this.productCategories.value;
    }, 'Fetching Product Categories');
  }

  getById(id: string): Promise<ResponseResult<ProductCategory> | null> {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildGetByIdQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    }, 'Fetching Product Category');
  }

  getPaged(request: ProductCategoryRequest) {
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

  async save(productCategory: ProductCategory): Promise<ResponseResult<ProductCategory>> {
    return this._saveOrUpdate(productCategory);
  }

  async update(productCategory: ProductCategory): Promise<ResponseResult<ProductCategory>> {
    return this._saveOrUpdate(productCategory);
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<ProductCategory>> {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildDisableQuery(this.client, this.sessionService, id, state);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    }, 'Disabling Product Category');
  }

  async delete(id: string) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildDeleteQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    }, 'Deleting Product Category');
  }

  deleteMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildDeleteProductCategoriesQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildToggleProductCategoriesQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as void, error);
    });
  }

  private _saveOrUpdate(productCategory: ProductCategory) {
    return this.executeWithBusy(async () => {
      const query = ProductCategoriesQueryDomain.buildSaveOrUpdateQuery(this.client, productCategory);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    });
  }
}
