import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { BusyProp } from '@globals/types/busy.type';

export interface IBusy {
  busy: BusyProp;
}

export interface IReadable<T> extends IBusy {
  getById(id: string): Promise<ResponseResult<T> | null>;
}

export interface IReadableAll<T> extends IReadable<T> {
  getAll(): Promise<ResponseResult<T[]>>;
}

export interface IPaginable<T> extends IBusy {
  getPaged(request: PagedRequest): Promise<ResponseResult<T[]>>;
}

export interface IWritable<T> extends IBusy {
  save(entity: T, options?: any): Promise<ResponseResult<T>>;
  update(entity: T, options?: any): Promise<ResponseResult<T>>;
}

export interface IDeletable<T> extends IBusy {
  delete(id: string): Promise<ResponseResult<T>>;
  deleteMany(ids: string[]): Promise<ResponseResult<void>>;
  toggleEnableMany(ids: string[]): Promise<ResponseResult<void>>;
}

export interface IDisableable<T> extends IBusy {
  disable(id: string, state: boolean): Promise<ResponseResult<T>>;
}
