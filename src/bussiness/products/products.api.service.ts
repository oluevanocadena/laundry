import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '../../environments/environment';
import { BusyProp } from '../../types/busy.type';
import { FacadeApiBase } from '../../types/facade.base';
import { SubjectProp } from '../../types/subject.type';
import {
  Product,
  ProductCategory,
  ProductLocation,
} from './products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  private bucket = 'products';
  private table = 'Products';
  private tableLocations = 'Locations';
  private tableProductLocations = 'ProductLocations';
  private tableProductCategories = 'ProductCategories';
  private tableProductImages = 'ProductImages';

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
          `*, ProductLocations: ${this.tableProductLocations}(*, Location: ${this.tableLocations}(*)), 
              ProductCategory: ${this.tableProductCategories}(Name),
              ProductImages: ${this.tableProductImages}(*) `
        )
        .eq('Deleted', false)
        .overrideTypes<Product[], { merge: false }>();
      if (error) throw error;
      this.products.value = data || [];
    }, 'fetching products');
  }

  getProduct(productId: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select(
          `*, ProductLocations: ${this.tableProductLocations}(*), 
              ProductCategory: ${this.tableProductCategories}(Name), 
              ProductImages: ${this.tableProductImages}(*) `
        )
        .eq('Id', productId);
      if (error) throw error;
      return data[0] || [];
    }, 'fetching product images');
  }

  uploadProductImage(file: File) {
    return this.executeWithBusy(async () => {
      // Generar nombre único manteniendo la extensión original
      const extension = file.name.split('.').pop();
      const uniqueName = `${uuidv4()}.${extension}`;

      // Subir con ruta en carpeta "public" (por RLS)
      const { data, error } = await this.client.storage
        .from(this.bucket)
        .upload(`public/${uniqueName}`, file);

      if (error) throw error;

      // Obtener la URL pública
      const { data: publicUrl } = this.client.storage
        .from(this.bucket)
        .getPublicUrl(`public/${uniqueName}`);

      return publicUrl.publicUrl;
    }, 'uploading product image');
  }

  async saveProduct(product: Product, locations: ProductLocation[]) {
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
      }));

      if (productLocations.length) {
        const { error: locationError } = await this.client
          .from(this.tableProductLocations)
          .upsert(productLocations);

        if (locationError) throw locationError;
      }

      // 4️⃣ Retornar el producto ya guardado con relaciones
      return { ...productData, ProductLocations: productLocations };
    }, 'saving product');
  }
}
