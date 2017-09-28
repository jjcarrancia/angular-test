import { Component, OnInit } from '@angular/core';
import { Api } from '../../api/api';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'jobdetail-component',
  templateUrl: './jobDetail.component.html',
})

export class JobDetailComponent implements OnInit {
  jobId: number;
  jobDetail: any;
  keys: Array<any> = [];
  constructor(
    private api: Api,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.jobId = params['id'];
      this.api.getJobDetail(this.jobId).subscribe(
        response => {
          this.jobDetail = JSON.parse(response['_body']);
          this.keys = Object.keys(this.jobDetail)
        },
        err => console.log(err)
      );
    });

  }
}
