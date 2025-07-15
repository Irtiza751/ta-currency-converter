import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyService } from '../../services/currency-service';
import { LoadingDirective } from '../../directives/loading-directive';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    // LoadingDirective,
    MatCardModule
  ],
  providers: [CurrencyService],
  templateUrl: './currency-converter.html',
  styleUrls: ['./currency-converter.scss']
})
export class CurrencyConverter implements OnInit, OnDestroy {
  currencies = signal<string[]>([]);
  fromCurrency = signal('USD');
  toCurrency = signal('EUR');
  amount = signal(1);
  result = signal(0);
  isLoading = signal(false);
  private destroy$ = new Subject<void>()

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currencies.set(Object.keys(data));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  convert() {
    this.isLoading.set(true);
    this.currencyService.convertCurrency(
      this.fromCurrency(),
      this.toCurrency(),
      this.amount()
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.result.set(data.result);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
  }
}