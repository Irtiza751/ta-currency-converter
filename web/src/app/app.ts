import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CurrencyConverter } from './components/currency-converter/currency-converter';

@Component({
  selector: 'app-root',
  imports: [/* RouterOutlet, */CurrencyConverter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ta-currency-converter');
}
