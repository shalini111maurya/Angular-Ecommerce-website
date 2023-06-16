import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../datatype';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin: boolean=true;
  authError:string=""
  constructor(private user: UserService, private product: ProductService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp){
    this.user.userSignUp(data);
  }
  login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("check: ",result);
      if(result){
        this.authError="Plese enter valid user details"
      }else{
        this.localCarttoRemoteCart()
      }
      
    })
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
  localCarttoRemoteCart(){
    let data = localStorage.getItem('localCart')
    let user=localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList = JSON.parse(data);
      cartDataList.forEach((product:product,index: number) => {
        let cartData : cart={
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id;
        setTimeout(()=>{
          this.product.getCartData(cartData).subscribe((result)=>{
            if(result)
            {
              console.warn("Item stored in DB");
              
            }
          })
        }
        ,500)
          if(cartDataList.length=== index+1){
            localStorage.removeItem('localCart')
          }
        
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000);
  }

}
