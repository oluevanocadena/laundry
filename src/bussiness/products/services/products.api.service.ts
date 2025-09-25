import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { SubjectProp } from '@globals/types/subject.type';

import { ProductsQueryDomain } from '@bussiness/products/domains/product.query.domain';
import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import {
  Product,
  ProductLocation,
  ProductLocationPrice,
  ProductRequest,
} from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseBuckets, SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends ApiBaseService {
  products = new SubjectProp<Product[]>([]);
  pagedProducts = new SubjectProp<PagedResults<Product>>(null);
  unitMeasures = new SubjectProp<UnitMeasure[]>([]);

  constructor() {
    super();
  }

  getPagedProduct(request: ProductRequest) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildQuery(request, this.client, this.sessionService);
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
      return super.handleResponse(data, error);
    }, 'Fetching Product Categories');
  }

  getUnitMeasures() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.UnitMeasures).select('*').eq('Deleted', false);
      return super.handleResponse(data, error);
    }, 'Fetching Unit Measures');
  }

  getProducts(search: string, page: number = 1, pageSize: number = 50, locationId: string) {
    return this.executeWithBusy(async () => {
      let query = this.client
        .from(SupabaseTables.Products)
        .select(
          `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
              ProductCategory: ${SupabaseTables.ProductCategories}(Name),
              ProductImages: ${SupabaseTables.ProductImages}(*),
              ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}(*, Location: ${SupabaseTables.Locations}(*)),
              UnitMeasure: ${SupabaseTables.UnitMeasures}(*) `,
        )
        .eq('Deleted', false)
        .eq('Disabled', false)
        .eq('OrganizationId', this.sessionService.organizationId);
      if (search) {
        query = query.or(
          `Name.ilike.%${search}%,Description.ilike.%${search}%,Barcode.ilike.%${search}%,SKU.ilike.%${search}%`,
        );
      }
      query = query.range((page - 1) * pageSize, page * pageSize);
      const { data, error } = await query;
      this.products.value = data as unknown as Product[];
      return super.handleResponse(this.products.value, error);
    }, 'Fetching Products');
  }

  getProduct(productId: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Products)
        .select(
          `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
              ProductCategory: ${SupabaseTables.ProductCategories}(Name), 
              ProductImages: ${SupabaseTables.ProductImages}(*),
              ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}(*, Location: ${SupabaseTables.Locations}(*)),
              UnitMeasure: ${SupabaseTables.UnitMeasures}(Name, UnitType) `,
        )
        .eq('Deleted', false)
        .eq('Disabled', false)
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Id', productId)
        .single();
      return super.handleResponse(data, error);
    }, 'Fetching Product Images');
  }

  uploadProductImage(file: File) {
    return this.executeWithBusy(async () => {
      // Generar nombre único manteniendo la extensión original
      const extension = file.name.split('.').pop();
      const uniqueName = `${uuidv4()}.${extension}`;

      // Subir con ruta en carpeta "public" (por RLS)
      const { data, error } = await this.client.storage.from(SupabaseBuckets.Products).upload(`public/${uniqueName}`, file);

      // Obtener la URL pública
      const { data: publicUrl } = this.client.storage.from(SupabaseBuckets.Products).getPublicUrl(`public/${uniqueName}`);

      return super.handleResponse(publicUrl.publicUrl, error);
    }, 'Uploading Product Image');
  }

  async saveProduct(product: Product, locations: ProductLocation[], locationPrices: ProductLocationPrice[], images: string[]) {
    return this.executeWithBusy(async () => {
      // 1️⃣ Guardar o actualizar producto
      const { data: productSaved, error: productError } = await this.client
        .from(SupabaseTables.Products)
        .upsert(product)
        .select()
        .single();

      if (productError) throw productError;
      console.log('🤔 productData', productSaved);
      const productId = productSaved.id;

      if (locations.length > 0) {
        // 2️⃣ Eliminar relaciones previas para evitar duplicados
        const { error: deleteError } = await this.client
          .from(SupabaseTables.ProductLocations)
          .delete()
          .eq('ProductId', productId);

        if (deleteError) throw deleteError;
        console.log('🤔 Location availability deleted');

        // 3️⃣ Eliminar e insertar nuevas relaciones
        const productLocations = locations.map((loc) => {
          delete loc.Location; //eliminar la relación con la ubicación
          return {
            ...loc,
            ProductId: productId, //actualizar el id del producto
          };
        });
        console.log('🤔 productLocations cleaned', productLocations);

        if (productLocations.length) {
          // Insertar nuevas relaciones
          const { error: locationError } = await this.client
            .from(SupabaseTables.ProductLocations)
            .upsert(productLocations, { onConflict: 'id' });

          if (locationError) throw locationError;
          console.log('🤔 Inserted availability locations');
        }
      }

      // 4️⃣ Guardar imágenes
      if (images.length > 0) {
        // 5️⃣ Eliminar imágenes previas
        const { error: deleteErrorImages } = await this.client
          .from(SupabaseTables.ProductImages)
          .delete()
          .eq('ProductId', productId);
        if (deleteErrorImages) throw deleteErrorImages;
        console.log('🤔 Images deleted');

        // 6️⃣ Insertar nuevas imágenes
        const productImages = images.map((image) => ({
          ProductId: productId,
          Url: image,
          Deleted: false,
        }));

        const { error: imageError } = await this.client.from(SupabaseTables.ProductImages).upsert(productImages);

        if (imageError) throw imageError;
        console.log('🤔 Images inserted');
      }

      // Location Prices
      if (locationPrices.length > 0) {
        // 7️⃣ Eliminar precios previos
        const { error: deleteErrorLocationPrice } = await this.client
          .from(SupabaseTables.ProductLocationPrices)
          .delete()
          .eq('ProductId', productId);
        if (deleteErrorLocationPrice) throw deleteErrorLocationPrice;
        console.log('🤔 Location prices deleted');

        // 8️⃣ Insertar nuevos precios
        const { error: locationPriceError } = await this.client.from(SupabaseTables.ProductLocationPrices).upsert(
          locationPrices.map((loc) => ({
            ProductId: productId,
            LocationId: loc.LocationId,
            Price: loc.Price,
          })),
        );
        if (locationPriceError) throw locationPriceError;
        console.log('🤔 Location prices inserted');
      }

      // 9️⃣ Retornar el producto ya guardado con relaciones
      return super.handleResponse({ ...productSaved }, null);
    }, 'Saving Product');
  }

  deleteProduct(productId: string) {
    return this.executeWithBusy(async () => {
      const { error } = await this.client
        .from(SupabaseTables.Products)
        .update({ Disabled: true, Deleted: true })
        .eq('id', productId);
      return super.handleResponse(null, error);
    }, 'Deleting Product');
  }

  deleteProducts(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildDeleteProductsQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as Product[], error);
    });
  }

  disableProducts(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = ProductsQueryDomain.buildToggleProductsQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as Product[], error);
    });
  }
}
