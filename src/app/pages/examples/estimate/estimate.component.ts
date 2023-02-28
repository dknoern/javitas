import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API } from 'aws-amplify';

@Component({
  selector: "app-estimate",
  templateUrl: "estimate.component.html"
})
export class EstimateComponent implements OnInit {

  estimate = null;

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
          this.estimate = response.data
        })
        .catch((error) => {
          console.log('got error');
        });
    });
  }
}
