import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qty-counter',
  templateUrl: './qty-counter.component.html',
  styleUrls: ['./qty-counter.component.scss']
})
export class QtyCounterComponent implements OnInit {

  
  @Input() qty: number = 1;
  @Output('qtyChange') qtyChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  incrementQuantity(){
    this.qty++;
    this.qtyChange.emit(this.qty);
  }

  decrementQuantity(){
    this.qty--;
    if(this.qty < 1){
      this.qty = 1;
    }
    this.qtyChange.emit(this.qty);
  }

}
