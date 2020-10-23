import { Component, OnInit, Input } from '@angular/core';
import { LocalService } from '../../../../../local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() quantity: any;
  // basket_item: any = [];
  @Input() item: any;
  @Input() basket: any;
  constructor(private local: LocalService, private router: Router ) {}

  ngOnInit(): void {
    console.log('ItemComponent -> item', this.item);
    this.local.basktItems.subscribe(basket_item => this.basket = basket_item);
    this.local.quantityItems.subscribe(qnt => this.quantity = qnt);

  }
ngDoCheck() {
  console.log("basket",this.basket, this.quantity);
  // console.log('++++>',this.local.basktItems)
}

addFun(){
  if(this.basket.indexOf(this.item) === -1){ 
  this.basket.push(this.item);
  this.quantity.push(1)
  }
  this.addItem();
  this.addOne();
}

addItem(){
  if(localStorage.Id){ 
  this.local.addToBasket(this.basket);
  }else{
    this.router.navigateByUrl('/signup')
  }
}
  addOne(){
  this.local.addOne(this.quantity);
}
}
