import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }
  removeToCart(cartId:number |undefined){
    cartId &&this.cartData && this.product.removeToCart(cartId).subscribe((result)=>{
     this.loadDetails();
    })
  }
  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log("Cart Info ", typeof (this.cartData[0].price));
      let price = 0;
      result.forEach((item) => {
        console.log("ITEM :" , item)
        if (item.quantity) {
          console.log("ITEM Price" , item.price)
          console.log(price + (item.price * item.quantity))
          price = price + (item.price * +item.quantity)
        }
      });
      console.warn("price : ", typeof (price));
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10)
      console.warn(this.priceSummary);

      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    })
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
}
