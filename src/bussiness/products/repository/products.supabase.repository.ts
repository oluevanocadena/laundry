import { Injectable } from '@angular/core';

import { ProductsQueryDomain } from '@bussiness/products/domains/products.query.domain';
import { Product, ProductRequest } from '@bussiness/products/interfaces/products.interfaces';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { SupabaseBuckets } from '@globals/constants/supabase-tables.constants';

import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class ProductsSupabaseRepository extends SupabaseBaseApiService implements IProductsRepository {
  //Results
  public products = new SubjectProp<ResponseResult<Product[]>>(null);
  public pagedProducts = new SubjectProp<PagedResults<Product>>(null);

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<Product[]>> {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildGetAllQuery(this.client, this.sessionService);
      const { data, error } = await query;
      this.products.value = super.buildReponse(data as unknown as Product[], error);
      return this.products.value;
    }, 'Fetching Products');
  }

  getById(id: string): Promise<ResponseResult<Product> | null> {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildGetByIdQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as Product, error);
    }, 'Fetching Product');
  }

  search(
    search: string,
    page: number = 1,
    pageSize: number = 50,
    locationId: string,
    productCategoryId?: string,
  ): Promise<ResponseResult<Product[]>> {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildSearchQuery(
        this.client,
        this.sessionService,
        search,
        page,
        pageSize,
        locationId,
        productCategoryId,
      );
      const { data, error } = await query;
      const result = super.buildReponse(data as unknown as Product[], error);
      this.products.value = result;
      return result;
    }, 'Fetching Products');
  }

  getPaged(request: ProductRequest) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildPagedQuery(request, this.client, this.sessionService);
      const countQuery = ProductsQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      (data as unknown as Product[]).forEach((product) => {
        product.Checked = false;
      });
      this.pagedProducts.value = {
        data: (data as unknown as Product[]) ?? [],
        count: totalCount,
      };
      return super.buildReponse(data as unknown as Product[], error);
    }, 'Fetching Product Categories');
  }

  async save(product: Product): Promise<ResponseResult<Product>> {
    return this.saveWithDependencies(product);
  }

  async update(product: Product): Promise<ResponseResult<Product>> {
    return this.saveWithDependencies(product);
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<Product>> {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildDisableQuery(this.client, this.sessionService, id, state);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Disabling Product');
  }

  async delete(id: string) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildDeleteQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Deleting Product');
  }

  deleteMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildDeleteProductsQuery(this.client, ids);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildToggleProductsQuery(this.client, ids);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    });
  }

  // Método para guardar producto completo con todas sus relaciones
  async saveWithDependencies(
    product: Product,
    locations: any[] = [],
    locationPrices: any[] = [],
    images: string[] = [],
  ): Promise<ResponseResult<Product>> {
    return this.executeWithBusy(async () => {
      const result = await ProductsQueryDomain.buildSaveProductCompleteQuery(
        this.client,
        product,
        locations,
        locationPrices,
        images,
      );
      return super.buildReponse(result.data, result.error);
    }, 'Saving Product Complete');
  }

  async uploadtImage(file: File): Promise<ResponseResult<string>> {
    return this.executeWithBusy(async () => {
      // Generar nombre único manteniendo la extensión original
      const extension = file.name.split('.').pop();
      const uniqueName = `${UtilsDomain.guid()}.${extension}`;

      // Subir con ruta en carpeta "public" (por RLS)
      const { data, error } = await this.client.storage.from(SupabaseBuckets.Products).upload(`public/${uniqueName}`, file);

      // Obtener la URL pública
      const { data: publicUrl } = this.client.storage.from(SupabaseBuckets.Products).getPublicUrl(`public/${uniqueName}`);

      return super.buildReponse(publicUrl.publicUrl, error);
    }, 'Uploading Product Image');
  }
}
