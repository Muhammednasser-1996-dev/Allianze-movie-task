import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-screen-header',
  templateUrl: './screen-header.component.html',
  styleUrls: ['./screen-header.component.scss']
})
export class ScreenHeaderComponent implements OnInit {

  @Output() CreateHandler: EventEmitter<boolean> = new EventEmitter();
  @Input() buttonStyle = 1 || 2;
  @Input() firstLetter = ''
  @Input() title = ''
  @Input() show: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.CreateHandler.emit()
  }

}
