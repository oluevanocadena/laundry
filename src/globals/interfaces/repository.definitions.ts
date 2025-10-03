import { IBusy, IDeletable, IPaginable, IReadable, IReadableAll, IWritable } from '@globals/interfaces/repository.interfaces';
import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { BusyProp } from '@globals/types/busy.type';

export abstract class FullRepository<T> implements IWritable<T>, IReadable<T>, IDeletable<T>, IPaginable<T>, IBusy {
  abstract busy: BusyProp;
  abstract getPaged(request: PagedRequest): Promise<ResponseResult<T[]>>;
  abstract getById(id: string): Promise<ResponseResult<T> | null>;
  abstract save(entity: T, options?: any): Promise<ResponseResult<T>>;
  abstract update(entity: T, options?: any): Promise<ResponseResult<T>>;
  abstract delete(id: string): Promise<ResponseResult<T>>;
  abstract deleteMany(ids: string[]): Promise<ResponseResult<void>>;
  abstract toggleEnableMany(ids: string[]): Promise<ResponseResult<void>>;
}

export abstract class ReadOnlyRepository<T> implements IReadable<T>, IReadableAll<T>, IBusy {
  abstract busy: BusyProp;
  abstract getAll(): Promise<ResponseResult<T[]>>;
  abstract getById(id: string): Promise<ResponseResult<T> | null>;
}

export abstract class WritableRepository<T> implements IWritable<T>, IReadable<T>, IBusy {
  abstract busy: BusyProp;
  abstract getById(id: string): Promise<ResponseResult<T> | null>;
  abstract save(entity: T, options?: any): Promise<ResponseResult<T>>;
  abstract update(entity: T, options?: any): Promise<ResponseResult<T>>;
}
