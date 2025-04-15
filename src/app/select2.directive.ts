

import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

// Declare jQuery for TypeScript
declare var $: any;

@Directive({
  selector: '[appSelect2]'
})
export class Select2Directive implements OnInit, OnDestroy {

  @Input() options: any; // Input property for Select2 options

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Initialize Select2
    ($(this.el.nativeElement) as any).select2(this.options);
  }

  ngOnDestroy() {
    // Destroy Select2 instance to avoid memory leaks
    ($(this.el.nativeElement) as any).select2('destroy');
  }


   // Initialize Select2 with options
  

  
}

