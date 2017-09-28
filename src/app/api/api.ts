import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  baseUrl = 'https://staging.api.wurcly.com/v1';
  headers: Headers;
  constructor(
    private http: Http
  ) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('X-requested-with', 'Application/json');
  }

  login(body: Object): Observable<any> {
    console.log(body);
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.baseUrl + '/login', body, options);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getJobs(page?: number) {
    let url = this.baseUrl + '/jobs';
    page ? url += '?page=' + page : null;
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(url, options);
  }

  getJobDetail(id: number) {
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.baseUrl + '/jobs/' + id, options);
  }

  filterJobsByText(text: string) {
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.baseUrl + '/jobs?filters[search]=' + text, options);
  }

  getBranches() {
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.baseUrl + '/branches', options);
  }

  filterByBranch(id: number) {
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.baseUrl + '/jobs?filters[branch]=' + id, options);
  }

  orderBy(option: string) {
    !this.headers.has('Authorization') ? this.headers.append('Authorization', localStorage.getItem('token')) : null;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(this.baseUrl + '/jobs?sort=' + option, options);
  }
}
