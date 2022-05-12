import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay } from "rxjs";
import { environment } from "src/environments/environment";
import { Portfolio } from "./interfaces/portfolio";

@Injectable({
  providedIn: "root",
})
export class ZenonToolsApiService {
  getPortfolio(address: string) {
    return this.httpClient
      .get<Portfolio>(`${environment.ztApiUrl}/portfolio?address=${address}`)
      .pipe(shareReplay(1));
  }

  constructor(private httpClient: HttpClient) {}
}
