import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@environments/environment';
import { BusyProp } from '@type/busy.type';
import { FacadeApiBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import {
  Product,
  ProductCategory,
  ProductLocation,
  ProductLocationPrice,
  UnitMeasure,
} from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import {
  SupabaseBuckets,
  SupabaseTables,
} from '../../globals/constants/supabase-tables.constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  products = new SubjectProp<Product[]>([]);
  productCategories = new SubjectProp<ProductCategory[]>([]);
  unitMeasures = new SubjectProp<UnitMeasure[]>([]);

  constructor(
    public nzMessageService: NzMessageService,
    public sessionService: SessionService
  ) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al intentar realizar la acción! ⛔'
      );
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getUnitMeasures() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.UnitMeasures)
        .select('*')
        .eq('Deleted', false);
      if (error) throw error;
      this.unitMeasures.value = data || [];
    }, 'Fetching Unit Measures');
  }

  getProductCategories() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.ProductCategories)
        .select('*')
        .eq('Deleted', false);
      if (error) throw error;
      this.productCategories.value = data || [];
    }, 'Fetching Product Categories');
  }

  getProducts(search: string, page: number = 1, pageSize: number = 50) {
    this.executeWithBusy(async () => {
      let query = this.client
        .from(SupabaseTables.Products)
        .select(
          `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
              ProductCategory: ${SupabaseTables.ProductCategories}(Name),
              ProductImages: ${SupabaseTables.ProductImages}(*),
              ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}(*, Location: ${SupabaseTables.Locations}(*)),
              UnitMeasure: ${SupabaseTables.UnitMeasures}(*) `
        )
        .eq('Deleted', false)
        .eq('Disabled', false)
        .eq('OrganizationId', this.sessionService.organizationId);
      if (search) {
        query = query.or(
          `Name.ilike.%${search}%,Description.ilike.%${search}%,Barcode.ilike.%${search}%,SKU.ilike.%${search}%`
        );
      }
      query = query.range((page - 1) * pageSize, page * pageSize);
      const { data, error } = await query.overrideTypes<
        Product[],
        { merge: false }
      >();
      if (error) throw error;
      this.products.value = data || [];
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
              UnitMeasure: ${SupabaseTables.UnitMeasures}(Name, UnitType) `
        )
        .eq('Deleted', false)
        .eq('Disabled', false)
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Id', productId)
        .single();
      if (error) throw error;
      return data || [];
    }, 'Fetching Product Images');
  }

  uploadProductImage(file: File) {
    return this.executeWithBusy(async () => {
      // Generar nombre único manteniendo la extensión original
      const extension = file.name.split('.').pop();
      const uniqueName = `${uuidv4()}.${extension}`;

      // Subir con ruta en carpeta "public" (por RLS)
      const { data, error } = await this.client.storage
        .from(SupabaseBuckets.Products)
        .upload(`public/${uniqueName}`, file);

      if (error) throw error;

      // Obtener la URL pública
      const { data: publicUrl } = this.client.storage
        .from(SupabaseBuckets.Products)
        .getPublicUrl(`public/${uniqueName}`);

      return publicUrl.publicUrl;
    }, 'Uploading Product Image');
  }

  async saveProduct(
    product: Product,
    locations: ProductLocation[],
    locationPrices: ProductLocationPrice[],
    images: string[]
  ) {
    return this.executeWithBusy(async () => {
      // 1️⃣ Guardar o actualizar producto
      const { data: productData, error: productError } = await this.client
        .from(SupabaseTables.Products)
        .upsert(product)
        .select()
        .single();

      if (productError) throw productError;
      console.log('🤔 productData', productData);
      const productId = productData.id;

      if (locations.length > 0) {
        // 2️⃣ Eliminar relaciones previas para evitar duplicados
        const { error: deleteError } = await this.client
          .from(SupabaseTables.ProductLocations)
          .delete()
          .eq('ProductId', productId);

        if (deleteError) throw deleteError;
        console.log('🤔 Location availability deleted');

        // 3️⃣ Insertar nuevas relaciones
        const productLocations = locations.map((loc) => {
          delete loc.Location; //eliminar la relación con la ubicación
          return {
            ...loc,
            ProductId: productId, //actualizar el id del producto
          };
        });
        console.log('🤔 productLocations cleaned', productLocations);

        if (productLocations.length) {
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

        const { error: imageError } = await this.client
          .from(SupabaseTables.ProductImages)
          .upsert(productImages);

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
        const { error: locationPriceError } = await this.client
          .from(SupabaseTables.ProductLocationPrices)
          .upsert(
            locationPrices.map((loc) => ({
              ProductId: productId,
              LocationId: loc.LocationId,
              Price: loc.Price,
            }))
          );
        if (locationPriceError) throw locationPriceError;
        console.log('🤔 Location prices inserted');
      }

      // 9️⃣ Retornar el producto ya guardado con relaciones
      return { ...productData };
    }, 'Saving Product');
  }

  deleteProduct(productId: string) {
    return this.executeWithBusy(async () => {
      const { error } = await this.client
        .from(SupabaseTables.Products)
        .update({ Disabled: true, Deleted: true })
        .eq('id', productId);
      if (error) throw error;
      return true;
    }, 'Deleting Product');
  }
}
