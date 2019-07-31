import { OrderDetail } from './order-detail';

export interface OrderToSave {
    customerId: number,
    creationDate: string,
    deliveryAddress: string,
    total: number,
    details: OrderDetail[]
}
