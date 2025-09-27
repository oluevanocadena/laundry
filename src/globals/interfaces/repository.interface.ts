import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { BusyProp } from '@globals/types/busy.type';

export abstract class IRepository<T> {
  abstract busy: BusyProp;

  abstract getPaged(request: PagedRequest): Promise<ResponseResult<T[]>>;
  abstract getById(id: string): Promise<ResponseResult<T> | null>;
  abstract save(entity: T, options?: any): Promise<ResponseResult<T>>;
  abstract update(entity: T, options?: any): Promise<ResponseResult<T>>;
  abstract delete(id: string): Promise<ResponseResult<T>>;
  abstract deleteMany(ids: string[]): Promise<ResponseResult<void>>;
  abstract toggleEnableMany(ids: string[]): Promise<ResponseResult<void>>;
}

export abstract class IRepositoryReadOnly<T> {
  abstract busy: BusyProp;

  abstract getAll(): Promise<ResponseResult<T[]>>;
  abstract getById(id: string): Promise<ResponseResult<T> | null>;
}
