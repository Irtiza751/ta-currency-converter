import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective implements OnChanges {
  @Input() appLoading: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appLoading'] && this.el.nativeElement.style) {
      if (this.appLoading) {
        this.el.nativeElement.style.opacity = '0.5';
        this.el.nativeElement.style.pointerEvents = 'none';
      } else {
        this.el.nativeElement.style.opacity = '1';
        this.el.nativeElement.style.pointerEvents = 'auto';
      }
    }
  }
}