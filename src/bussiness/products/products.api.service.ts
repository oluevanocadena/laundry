import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { supabase } from '../../environments/environment';
import { BusyProp } from '../../types/busy.type';
import { FacadeApiBase } from '../../types/facade.base';
import { SubjectProp } from '../../types/subject.type';
import { Product, ProductCategory } from './products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  private table = 'Products';
  private tableProductLocations = 'ProductLocations';
  private tableProductCategories = 'ProductCategories';

  products = new SubjectProp<Product[]>([]);
  productCategories = new SubjectProp<ProductCategory[]>([]);

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚩 ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al guardar los cambios! ⛔'
      );
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getProductCategories() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.tableProductCategories)
        .select('*')
        .eq('Deleted', false);
      if (error) throw error;
      this.productCategories.value = data || [];
    }, 'fetching product categories');
  }

  getProducts() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select(
          `*, ProductLocations: ${this.tableProductLocations}(*), ProductCategory: ${this.tableProductCategories}(Name) `
        )
        .eq('Deleted', false)
        .overrideTypes<Product[], { merge: false }>();
      if (error) throw error;
      this.products.value = data || [];
    }, 'fetching products');
  }

  uploadProductImage(file: File) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.storage
        .from(this.table)
        .upload(file.name, file);
      if (error) throw error;
      return data;
    }, 'uploading product image');
  }

  async saveProduct(
    product: Product,
    locations: {
      LocationId: string;
      IsEnabled: boolean;
      StockByLocation?: number;
      PriceByLocation?: number;
    }[]
  ) {
    return this.executeWithBusy(async () => {
      // 1️⃣ Guardar o actualizar producto
      const { data: productData, error: productError } = await this.client
        .from(this.table)
        .upsert(product, { onConflict: 'Id' }) // si viene Id lo actualiza
        .select()
        .single();

      if (productError) throw productError;

      const productId = productData.Id;

      // 2️⃣ Eliminar relaciones previas para evitar duplicados
      const { error: deleteError } = await this.client
        .from(this.tableProductLocations)
        .delete()
        .eq('ProductId', productId);

      if (deleteError) throw deleteError;

      // 3️⃣ Insertar nuevas relaciones
      const productLocations = locations.map((loc) => ({
        ProductId: productId,
        LocationId: loc.LocationId,
        IsEnabled: loc.IsEnabled,
        StockByLocation: loc.StockByLocation ?? null,
        PriceByLocation: loc.PriceByLocation ?? null,
      }));

      if (productLocations.length) {
        const { error: locationError } = await this.client
          .from(this.tableProductLocations)
          .insert(productLocations);

        if (locationError) throw locationError;
      }

      // 4️⃣ Retornar el producto ya guardado con relaciones
      return { ...productData, ProductLocations: productLocations };
    }, 'saving product');
  }
}
