import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, Subject } from 'rxjs';
import { IConversion } from '../interfaces/conversion';
import { Convert } from '../interfaces/convert';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiUrl = 'http://localhost:3000/api';
  conversionAdded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`${this.apiUrl}/currencies`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.post<Convert>(`${this.apiUrl}/convert`, { from, to, amount }).pipe(
      tap((res) => {
        console.log('API response:', res); // Debug
        this.conversionAdded.next();
      }),
      catchError((error) => {
        console.error('API error:', error); // Debug
        return throwError(() => error);
      })
    );
  }

  getConversions(): Observable<IConversion[]> {
    return this.http.get<IConversion[]>(`${this.apiUrl}/conversions`);
  }
}