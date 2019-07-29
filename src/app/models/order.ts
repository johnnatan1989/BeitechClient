import { OrderDetail } from './order-detail';

export interface Order {
    id: number,
    creationDate: string,
    deliveryAddress: string,
    total: number,
    ordersDetail: OrderDetail[]
}
