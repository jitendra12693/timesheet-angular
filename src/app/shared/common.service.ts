import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loginSubject = new Subject<boolean>();
  baseUrl ="https://localhost:44391/api/";

  constructor(private _httpClient:HttpClient) { }

  getAllTask():any{
    return this._httpClient.get(`${this.baseUrl}task/getalltasks`)
  }

   getAllEmployee():any{
    return this._httpClient.get(`${this.baseUrl}v1/employee/getAllEmployee`)
  }

  makeLoginRequest(data: any) {
    return this._httpClient.post(`${this.baseUrl}v1/employee/employeeLogin`, data);
  }

  registerEmployee(employee: any): any {
    return this._httpClient.post(`${this.baseUrl}v1/employee/registerEmployee`, employee);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  }

  notifyLoginStatus(isLoggedIn: boolean) {
    this.loginSubject.next(isLoggedIn);
  }
}
