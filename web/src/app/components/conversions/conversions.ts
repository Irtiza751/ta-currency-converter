import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IConversion } from '../../interfaces/conversion';
import { MatTableModule } from '@angular/material/table';
import { CurrencyService } from '../../services/currency-service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conversions',
  imports: [MatCardModule, MatTableModule, DatePipe],
  providers: [CurrencyService],
  templateUrl: './conversions.html',
  styleUrl: './conversions.scss'
})
export class Conversions implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  dataSource: IConversion[] = []

  columns = ['id', 'fromCurrency', 'toCurrency', 'amount', 'result', 'date'];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getConversions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getConversions() {
    this.currencyService.getConversions()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => this.dataSource = data);
  }
}
