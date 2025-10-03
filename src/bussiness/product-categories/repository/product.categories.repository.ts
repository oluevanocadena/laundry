import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { FullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IProductCategoriesRepository extends FullRepository<ProductCategory> {
  abstract productCategories: SubjectProp<ResponseResult<ProductCategory[]>>;
  abstract pagedProductCategories: SubjectProp<PagedResults<ProductCategory>>;
}
