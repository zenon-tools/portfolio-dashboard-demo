import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Portfolio } from './interfaces/portfolio';

@Injectable({
  providedIn: 'root',
})
export class ZenonToolsApiService {

  getPortfolio(address: string) {
    return this.httpClient.get<Portfolio>(
      `${environment.ztApiUrl}/portfolio?address=${address}`
    );
  }

  constructor(private httpClient: HttpClient) {}
}
