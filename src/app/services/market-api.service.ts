import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { CoinGeckoResponse } from './interfaces/coin-gecko-types';

@Injectable({
  providedIn: 'root',
})
export class MarketApiService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  getCurrentCoinPrice(coin: string) {
    return this.httpClient
      .get<CoinGeckoResponse>(`${this.baseUrl}/coins/${coin}`)
      .pipe(pluck('market_data', 'current_price'));
  }

  constructor(private httpClient: HttpClient) {}
}
