import { Component, OnInit } from '@angular/core';
import { Api } from '../../api/api';
import { Router } from '@angular/router';

@Component({
  selector: 'jobs-component',
  templateUrl: './jobs.component.html',
})

export class JobsComponent implements OnInit{
  jobs: any;
  currentPage: number = 1;
  lastPage: number;
  searchText: string;
  branches: Array<any>;
  showList:boolean = false;
  showOrderOptions: boolean = false;

  constructor(
    private api: Api,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getJobs().subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.jobs = res['data'];
        this.lastPage = res['last_page'];
        console.log(JSON.parse(response['_body']))
        console.log(this.jobs);
      },
      err => console.log(err)
    );
    this.api.getBranches().subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.branches = res['data'];
        console.log(this.branches);
      },
      err => console.log(err)

    );
  }

  goToJob(id: number) {
    this.router.navigate(['/jobs/'+ id ]);
  }

  goPage(param: string) {
    switch (param) {
      case '+':
        this.currentPage !== this.lastPage ? this.currentPage++ : null;
        break;
      case '-':
        this.currentPage !== 1 ? this.currentPage-- : null;
        break;
    }
    this.api.getJobs(this.currentPage).subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.jobs = res['data'];
      },
      err => console.log(err)
    );
  }

  search() {
    this.api.filterJobsByText(this.searchText).subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.jobs = res['data'];
      },
      err => console.log(err)
    );
  }

  filterByBranch(id: number) {
    this.api.filterByBranch(id).subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.jobs = res['data'];
      },
      err => console.log(err)
    );
  }

  orderBy(option) {
    this.api.orderBy(option).subscribe(
      response => {
        const res = JSON.parse(response['_body']);
        this.jobs = res['data'];
      },
      err => console.log(err)
    );
  }

}
