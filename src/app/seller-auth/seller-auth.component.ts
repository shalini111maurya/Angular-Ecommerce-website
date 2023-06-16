import { Component,OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import { SignUp, login } from '../datatype';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router){}
  showLogin=false;
  authError:string='';

  ngOnInit():void{
    this.seller.reloadSeller()
  }
  
  signUp(data: SignUp): void {
    console.warn(data)
    this.seller.userSignUp(data)
  }

  login(data: SignUp): void {
    // console.warn(data)
    this.authError="";
    this.seller.userlogin(data)
    this.seller.loginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is not correct"
      }
    })
  }
  openlogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
