import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit, OnDestroy{
  @Input() title: string = "";
  @Output() close = new EventEmitter();

  ngOnInit(): void {
    document.body.style.overflow = "hidden";
  }

  ngOnDestroy(): void {
    document.body.style.overflow = "auto";
  }

  onClose() {
    this.close.emit();
  }
}
