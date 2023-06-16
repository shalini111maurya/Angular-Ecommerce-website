import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  cartData : cart[]| undefined
  totalPrice : number | undefined
  orderMsg : string | undefined
  constructor(private product:ProductService, private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData= result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (item.price * +item.quantity)
        }
      });
      this.totalPrice=price + (price / 10) + 100 - (price / 10);
     
      console.warn(this.totalPrice);
    })
    
  }

  orderNow(data:{email:string, address:string, contact:string}){
    let user =localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined

      }
      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
         item.id && this.product.deleteCartItems(item.id) 
        },900)
      })
      console.warn("orderData: ",orderData);
      
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          // console.warn(result);
          this.orderMsg="Your order has been placed"
          setTimeout(()=>{
          this.router.navigate(['/my-orders'])
          this.orderMsg= undefined;
          },4000)
        }
      })
    }
  }
}
