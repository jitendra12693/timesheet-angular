import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  baseUrl = "https://localhost:44391/api/";

  constructor(private _httpClient: HttpClient) { }

  getAllTimesheet():any{
    return this._httpClient.get(`${this.baseUrl}Timesheet/getAllTimesheet`)
  }

  saveTimesheet(body:any):any{
    return this._httpClient.post(`${this.baseUrl}Timesheet/saveTimesheet`,body);
  }

  
}
