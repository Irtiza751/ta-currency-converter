import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CurrencyConverter } from './components/currency-converter/currency-converter';
import { Conversions } from './components/conversions/conversions';

@Component({
  selector: 'app-root',
  imports: [/* RouterOutlet, */CurrencyConverter, Conversions],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ta-currency-converter');
}
