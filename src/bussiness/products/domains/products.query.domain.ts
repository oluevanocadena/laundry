import { ProductRequest } from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';

export class ProductsQueryDomain {
  static buildGetAllQuery(client: SupabaseClient, sessionService: SessionService) {
    return client
      .from(SupabaseTables.Products)
      .select(
        `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
            ProductCategory: ${SupabaseTables.ProductCategories}(Name), 
            ProductImages: ${SupabaseTables.ProductImages}(*),
            ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}(*, Location: ${SupabaseTables.Locations}(*)),
            UnitMeasure: ${SupabaseTables.UnitMeasures}(Name, UnitType) `,
      )
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
  }

  static buildGetByIdQuery(client: SupabaseClient, sessionService: SessionService, id: string) {
    return client
      .from(SupabaseTables.Products)
      .select(
        `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
            ProductCategory: ${SupabaseTables.ProductCategories}(Name), 
            ProductImages: ${SupabaseTables.ProductImages}(*),
            ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}(*, Location: ${SupabaseTables.Locations}(*)),
            UnitMeasure: ${SupabaseTables.UnitMeasures}(Name, UnitType) `,
      )
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false)
      .eq('id', id)
      .single();
  }

  static buildPagedQuery(request: ProductRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Products)
      .select(
        `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)),  
            UnitMeasure: ${SupabaseTables.UnitMeasures}(*) `,
      )
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or(
        [
          `Name.ilike.%${searchTerm}%`,
          `Description.ilike.%${searchTerm}%`,
          `Barcode.ilike.%${searchTerm}%`,
          `SKU.ilike.%${searchTerm}%`,
        ].join(','),
      );
    }

    if (request.sortBy) {
      query = query.order(request.sortBy, { ascending: request.sortOrder === 'asc' });
    }

    return query;
  }

  static buildTotalCountQuery(request: ProductRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Products)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
    return query;
  }

  static buildDeleteQuery(client: SupabaseClient, sessionService: SessionService, id: string) {
    return client
      .from(SupabaseTables.Products)
      .update({ Deleted: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false)
      .eq('id', id)
      .select('*')
      .single();
  }

  static buildDisableQuery(client: SupabaseClient, sessionService: SessionService, id: string, state: boolean) {
    return client
      .from(SupabaseTables.Products)
      .update({ Disabled: state })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false)
      .eq('id', id)
      .select('*')
      .single();
  }

  static buildDeleteProductsQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Products).update({ Deleted: true }).in('id', ids).select('*');
  }

  static buildToggleProductsQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('products_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }

  static buildSearchQuery(
    client: SupabaseClient,
    sessionService: SessionService,
    search: string,
    page: number = 1,
    pageSize: number = 50,
    locationId: string,
  ) {
    let query = client
      .from(SupabaseTables.Products)
      .select(
        `*, 
              ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)), 
              ProductCategory: ${SupabaseTables.ProductCategories}(Name),
              ProductImages: ${SupabaseTables.ProductImages}(*),
              ProductLocationPrice: ${SupabaseTables.ProductLocationPrices}( * , Location: ${SupabaseTables.Locations}(*))!inner(eq(LocationId,"${locationId}")),
              UnitMeasure: ${SupabaseTables.UnitMeasures}(*) `,
      )
      .eq(`${SupabaseTables.ProductLocations}.LocationId`, locationId)
      .eq(`${SupabaseTables.ProductLocationPrices}.LocationId`, locationId)
      .eq('Deleted', false)
      .eq('Disabled', false)
      .eq('OrganizationId', sessionService.organizationId);

    if (search) {
      query = query.or(`Name.ilike.%${search}%,Description.ilike.%${search}%,Barcode.ilike.%${search}%,SKU.ilike.%${search}%`);
    }

    query = query.range((page - 1) * pageSize, page * pageSize);
    return query;
  }

  static buildSaveOrUpdateQuery(client: SupabaseClient, product: any) {
    return client.from(SupabaseTables.Products).upsert(product).select().single();
  }

  // Consultas para el guardado completo de productos con relaciones
  static buildDeleteProductLocationsQuery(client: SupabaseClient, productId: string) {
    return client
      .from(SupabaseTables.ProductLocations)
      .delete()
      .eq('ProductId', productId);
  }

  static buildInsertProductLocationsQuery(client: SupabaseClient, productLocations: any[]) {
    return client
      .from(SupabaseTables.ProductLocations)
      .upsert(productLocations, { onConflict: 'id' });
  }

  static buildDeleteProductImagesQuery(client: SupabaseClient, productId: string) {
    return client
      .from(SupabaseTables.ProductImages)
      .delete()
      .eq('ProductId', productId);
  }

  static buildInsertProductImagesQuery(client: SupabaseClient, productImages: any[]) {
    return client
      .from(SupabaseTables.ProductImages)
      .upsert(productImages);
  }

  static buildDeleteProductLocationPricesQuery(client: SupabaseClient, productId: string) {
    return client
      .from(SupabaseTables.ProductLocationPrices)
      .delete()
      .eq('ProductId', productId);
  }

  static buildInsertProductLocationPricesQuery(client: SupabaseClient, locationPrices: any[]) {
    return client
      .from(SupabaseTables.ProductLocationPrices)
      .upsert(locationPrices);
  }

  // Método principal para guardar producto completo
  static async buildSaveProductCompleteQuery(
    client: SupabaseClient,
    product: any,
    locations: any[],
    locationPrices: any[],
    images: string[]
  ) {
    // 1️⃣ Guardar o actualizar producto
    const { data: productSaved, error: productError } = await client
      .from(SupabaseTables.Products)
      .upsert(product)
      .select()
      .single();

    if (productError) throw productError;
    const productId = productSaved.id;

    // 2️⃣ Manejar ubicaciones si existen
    if (locations.length > 0) {
      // Eliminar relaciones previas
      const { error: deleteError } = await client
        .from(SupabaseTables.ProductLocations)
        .delete()
        .eq('ProductId', productId);

      if (deleteError) throw deleteError;

      // Insertar nuevas relaciones
      const productLocations = locations.map((loc) => {
        delete loc.Location; // eliminar la relación con la ubicación
        return {
          ...loc,
          ProductId: productId,
        };
      });

      if (productLocations.length) {
        const { error: locationError } = await client
          .from(SupabaseTables.ProductLocations)
          .upsert(productLocations, { onConflict: 'id' });

        if (locationError) throw locationError;
      }
    }

    // 3️⃣ Manejar imágenes si existen
    if (images.length > 0) {
      // Eliminar imágenes previas
      const { error: deleteErrorImages } = await client
        .from(SupabaseTables.ProductImages)
        .delete()
        .eq('ProductId', productId);
      
      if (deleteErrorImages) throw deleteErrorImages;

      // Insertar nuevas imágenes
      const productImages = images.map((image) => ({
        ProductId: productId,
        Url: image,
        Deleted: false,
      }));

      const { error: imageError } = await client
        .from(SupabaseTables.ProductImages)
        .upsert(productImages);

      if (imageError) throw imageError;
    }

    // 4️⃣ Manejar precios por ubicación si existen
    if (locationPrices.length > 0) {
      // Eliminar precios previos
      const { error: deleteErrorLocationPrice } = await client
        .from(SupabaseTables.ProductLocationPrices)
        .delete()
        .eq('ProductId', productId);
      
      if (deleteErrorLocationPrice) throw deleteErrorLocationPrice;

      // Insertar nuevos precios
      const { error: locationPriceError } = await client
        .from(SupabaseTables.ProductLocationPrices)
        .upsert(
          locationPrices.map((loc) => ({
            ProductId: productId,
            LocationId: loc.LocationId,
            Price: loc.Price,
          }))
        );
      
      if (locationPriceError) throw locationPriceError;
    }

    return { data: productSaved, error: null };
  }
}
