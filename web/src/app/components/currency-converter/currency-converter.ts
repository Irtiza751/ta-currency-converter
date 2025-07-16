import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyService } from '../../services/currency-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [CurrencyService],
  templateUrl: './currency-converter.html',
  styleUrls: ['./currency-converter.scss']
})
export class CurrencyConverter implements OnInit, OnDestroy {
  currencies: string[] = [];
  converterForm: FormGroup;
  result = 0;
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {
    this.converterForm = this.fb.group({
      amount: [1],
      fromCurrency: ['USD'],
      toCurrency: ['EUR']
    });
  }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currencies = Object.keys(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  convert() {
    this.isLoading = true;
    const { fromCurrency, toCurrency, amount } = this.converterForm.value;
    
    this.currencyService.convertCurrency(fromCurrency, toCurrency, amount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.result = data.result;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
}