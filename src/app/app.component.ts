import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { Portfolio, PortfolioStake } from './services/interfaces/portfolio';
import { MarketApiService } from './services/market-api.service';
import { ZenonToolsApiService } from './services/zenon-tools-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('addressInput', { static: false })
  addressInput!: ElementRef;

  decimals = 100000000;
  isLoading = false;

  portfolio$!: Observable<Portfolio>;
  stakedAmount$!: Observable<number>;
  stakeCount$!: Observable<number>;

  currentZnnPrice$ = this.marketApiService
    .getCurrentCoinPrice('zenon')
    .pipe(map((i) => i['usd']));

  totalZnn$ = new BehaviorSubject<number>(0);
  totalQsr$ = new BehaviorSubject<number>(0);
  usdValue$ = new BehaviorSubject<number>(0);

  constructor(
    private zenonToolsApiService: ZenonToolsApiService,
    private marketApiService: MarketApiService
  ) {}

  onSearchAddress() {
    const address = this.addressInput.nativeElement.value.toString().trim();
    if (address.length == 40) {
      this.isLoading = true;
      this.portfolio$ = this.zenonToolsApiService.getPortfolio(address);
      this.stakedAmount$ = this.portfolio$.pipe(
        map((portfolio) =>
          portfolio.stakes.reduce(
            (previous, current) => previous + current.stakedAmount,
            0
          )
        )
      );
      this.stakeCount$ = this.portfolio$.pipe(
        map((portfolio) => portfolio.stakes.length)
      );

      combineLatest([
        this.portfolio$,
        this.stakedAmount$,
        this.currentZnnPrice$,
      ]).subscribe(([portfolio, stakedAmount, znnPrice]) => {
        let totalZnn =
          portfolio.balances
            .filter((balance) => balance.symbol === 'ZNN')
            .reduce((sum, item) => sum + item.balance, 0) / this.decimals;
        totalZnn += stakedAmount / this.decimals;

        if (portfolio.sentinel.active) {
          totalZnn += 5000;
        }

        if (portfolio.pillar.name) {
          totalZnn += 15000;
        }

        let totalQsr =
          portfolio.balances
            .filter((balance) => balance.symbol === 'QSR')
            .reduce((sum, item) => sum + item.balance, 0) / this.decimals;

        if (portfolio.sentinel.active) {
          totalQsr += 50000;
        }

        const usdValue = totalZnn * znnPrice + totalQsr * (znnPrice / 10);

        this.totalZnn$.next(totalZnn);
        this.totalQsr$.next(totalQsr);
        this.usdValue$.next(usdValue);
        this.isLoading = false;
      });
    }
  }
}
