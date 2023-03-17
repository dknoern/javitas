import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

  postOrder(order: any) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders";
    return this.http.post(url, order, this.httpOptions);
  }

  getOrders() {
    console.log("getting orders");
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders";
    return this.http.get(url, this.httpOptions);
  }

  getOrder(id: any) {
    console.log("getting order",id);
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/object/"+id;
    return this.http.get(url, this.httpOptions);
  }

  updateOrderStatus(id: string, status: string) {
    let url = "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev/orders/status";
    return this.http.post(url,{"id":id, "status":status}, this.httpOptions);
  }

}
