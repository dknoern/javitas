import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  constructor(private http: HttpClient) { }

  saveEstimate(estimate: any) {

    const myInit = {
      body: estimate,
      headers: {}
    };

    API.post("estimates", "/estimates", myInit)
      .then((response) => {
        console.log("estimate posted");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async getEstimate(orderId: string) {
    var estimate = null;
    const myInit = {
      headers: {},
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      // queryStringParameters: {
      //   name: 'param' // OPTIONAL
      // }
    };

    return API.get("estimates", "/estimates/object/" + orderId, myInit);

  }













}
