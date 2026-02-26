import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl ="https://localhost:44391/api/";

  constructor(private _httpClient:HttpClient) { }

  getAllTask():any{
    return this._httpClient.get(`${this.baseUrl}task/getalltasks`)
  }

   getAllEmployee():any{
    return this._httpClient.get(`${this.baseUrl}v1/employee/getAllEmployee`)
  }
}
