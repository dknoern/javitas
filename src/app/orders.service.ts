import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  postOrderx(order: any) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders";
    return this.http.post(url, order, this.httpOptions);
  }



  postOrder(order: any) {

    const myInit = {
      body: order,
      headers: {}
    };

    return API.post("orders", "/orders", myInit);
  }








  getOrdersx() {
    console.log("getting orders");
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders";
    return this.http.get(url, this.httpOptions);
  }

  getOrders(){
    const myInit = {
      headers: {},
      response: true
    };
    return API.get("orders", "/orders/", myInit);
  }




  getOrderx(id: any) {
    console.log("getting order",id);
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/object/"+id;
    return this.http.get(url, this.httpOptions);
  }


  getOrder(orderId: string) {
    const myInit = {
      headers: {},
      response: true
    };
    return API.get("orders", "/orders/object/" + orderId, myInit);
  }



  updateOrderStatusx(id: string, status: string) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/status";
    return this.http.post(url,{"id":id, "status":status}, this.httpOptions);
  }


  updateOrderStatus(id: string, status: string) {
    const myInit = {
      body: {"id":id, "status":status},
      headers: {}
    };
    return API.post("orders", "/orders/status", myInit);
  }








  updateTrackingx(id: string, shipper: string, trackingNumber: string, nextStatus: string) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/tracking";
    return this.http.post(url,{"id":id, "shipper":shipper, "trackingNumber":trackingNumber, "status":nextStatus}, this.httpOptions);
  }

  updateTracking(id: string, shipper: string, trackingNumber: string, nextStatus: string) {
    const myInit = {
      body: {"id":id, "shipper":shipper, "trackingNumber":trackingNumber, "status":nextStatus},
      headers: {}
    };
    return API.post("orders", "/orders/tracking", myInit);
  }


  sendMessagex(id: string, from: string, message: string) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/message";
    return this.http.post(url,{"id":id, "from":from, "message": message}, this.httpOptions);
  }

  sendMessage(id: string, from: string, message: string) {
    const myInit = {
      body: {"id":id, "from":from, "message": message},
      headers: {}
    };
    return API.post("orders", "/orders/message", myInit);
  }

}
