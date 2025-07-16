import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IConversion } from '../interfaces/conversion';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiUrl = 'http://localhost:3000/api';
  conversionAdded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<Record<string, Currencies>>(`${this.apiUrl}/currencies`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/convert`, { from, to, amount })
        .subscribe({
          next: (data) => {
            this.conversionAdded.next();
            observer.next(data);
            observer.complete();
          },
          error: (error) => observer.error(error)
        });
    });
  }

  getConversions(): Observable<IConversion[]> {
    return this.http.get<IConversion[]>(`${this.apiUrl}/conversions`);
  }
}