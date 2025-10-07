import { Notification, NotificationPagedResults } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { FullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class INotificationsRepository extends FullRepository<Notification> {
  // Subjects Results
  abstract pagedNotifications: SubjectProp<NotificationPagedResults>;
  abstract cacheStore: ICacheStore;

  // Métodos específicos de notifications
  abstract getUnReadCount(useCache?: boolean): Promise<ResponseResult<number>>;
  abstract markAllAsRead(): Promise<ResponseResult<Notification[]>>;
  abstract markAsRead(id: string): Promise<ResponseResult<Notification>>;
  abstract markManyAsRead(ids: string[]): Promise<ResponseResult<Notification[]>>;
}
