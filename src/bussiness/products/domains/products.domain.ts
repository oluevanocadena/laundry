import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

export class ProductsDomain {
  static getPriceOfStore(product: Product, sessionService: SessionService): number {
    const locationId = sessionService.sessionInfo.value?.Location?.id;
    const productPrice = product?.ProductLocationPrice?.find((price) => price.LocationId === locationId);
    return productPrice?.Price ?? 0;
  }
}
