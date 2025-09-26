import { OrderItemStatusEnum, OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { IRepository } from '@globals/interfaces/repository.interface';
import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';

export abstract class IOrdersRepository extends IRepository<Order> {
  // Sobreescribir la paginación y necesitas algo más específico
  abstract override getPaged(request: OrderRequest): Promise<ResponseResult<Order[]>>;
  abstract override update(order: Order, orderItems: OrderItem[]): Promise<ResponseResult<Order>>;
  abstract override save(order: Order, orderItems: OrderItem[]): Promise<ResponseResult<Order>>;

  // Métodos de dominio específicos de Orders
  abstract updateOrderStatus(id: string, status: OrderStatusEnum): Promise<ResponseResult<Order>>;
  abstract updateOrderItem(item: OrderItem): Promise<ResponseResult<OrderItem>>;
  abstract updateOrderItemStatus(id: string, status: OrderItemStatusEnum): Promise<ResponseResult<Order>>;
  abstract updateAllOrderItemsStatus(orderId: string, status: OrderItemStatusEnum): Promise<ResponseResult<Order>>;
}

export interface OrderRequest extends PagedRequest {
  locationId?: string | null;
  accountId?: string | null;
}
