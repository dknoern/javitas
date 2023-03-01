import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API } from 'aws-amplify';
import { first } from "rxjs";

@Component({
  selector: "app-estimate",
  templateUrl: "estimate.component.html"
})
export class EstimateComponent implements OnInit {

  estimate = {
    necessaryServices: [{name:'',price:null}],
    optionalServices: [{name:'',price:null}]
  };

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      console.log('on init, id is', id);

      // try this

      const myInit = {
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        // queryStringParameters: {
        //   name: 'param' // OPTIONAL
        // }
      };

      API.get("estimates", "/estimates/object/" + id, myInit)
        .then((response) => {
          if(response.data != null && response.data.necessaryServices.length>0) {
            this.estimate = response.data;
            if(this.estimate.optionalServices == null || this.estimate.optionalServices.length==0 ){
              this.estimate.optionalServices =  [{name:'',price:null}];
            }
          }
        })
        .catch((error) => {
          console.log('got error');
        });
    });
  }

  public addNecessaryService(): void {
    this.estimate.necessaryServices.push({name:'',price:null});
  }

  public removeNecessaryService(i): void {
    const firstHalf = this.estimate.necessaryServices.slice(0,i)
    const secondHalf = this.estimate.necessaryServices.slice(i+1,this.estimate.necessaryServices.length)
    this.estimate.necessaryServices = firstHalf.concat(secondHalf);
  }

  public addOptionalService(): void {
    this.estimate.optionalServices.push({name:'',price:null});
  }

  public removeOptionalService(i): void {
    const firstHalf = this.estimate.optionalServices.slice(0,i)
    const secondHalf = this.estimate.optionalServices.slice(i+1,this.estimate.optionalServices.length)
    this.estimate.optionalServices = firstHalf.concat(secondHalf);
  }
}
