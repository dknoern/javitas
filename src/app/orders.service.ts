import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  postOrder(order: any) {
    return API.post("orders", "/orders", {body: order});
  }

  getOrders() {
    return API.get("orders", "/orders/", {});
  }

  getOrder(orderId: string) {
    return API.get("orders", "/orders/object/" + orderId, {});
  }

  updateOrderStatus(id: string, status: string) {
    return API.post("orders", "/orders/status", { body: { "id": id, "status": status } });
  }

  updateTracking(id: string, shipper: string, trackingNumber: string, nextStatus: string) {
    return API.post("orders", "/orders/tracking", { body: { "id": id, "shipper": shipper, "trackingNumber": trackingNumber, "status": nextStatus } });
  }

  sendMessage(id: string, from: string, message: string) {
    return API.post("orders", "/orders/message", { body: { "id": id, "from": from, "message": message } });
  }

  saveEstimate(id: string,estimate: any) {
    console.log('saving estimate...');
    return API.post("orders", "/orders/estimate", { body: { "id": id, "estimate": estimate } });
  }

  isUserAdmin(email) {
    return email === 'oroszlan67@yahoo.com' || email == 'david@seattleweb.com' || email === 'authorizedwatchrepair@gmail.com';
  }
}
