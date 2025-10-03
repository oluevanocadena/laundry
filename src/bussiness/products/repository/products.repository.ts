import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { FullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IProductsRepository extends FullRepository<Product> {
  abstract products: SubjectProp<ResponseResult<Product[]>>;
  abstract pagedProducts: SubjectProp<PagedResults<Product>>;

  abstract search(search: string, page: number, pageSize: number, locationId: string): Promise<ResponseResult<Product[]>>;
  abstract saveProductComplete(product: Product, locations?: any[], locationPrices?: any[], images?: string[]): Promise<ResponseResult<Product>>;
  abstract uploadtImage(file: File): Promise<ResponseResult<string>>;
}
