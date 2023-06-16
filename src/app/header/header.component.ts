import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { product } from '../datatype';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  http: any;
  searchResult: undefined | product[];
  userName: string = "";
  cartItem=0;
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default'
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem = items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })

    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirecttoDetails(id: number) {
    this.route.navigate(['/details/' + id])
  }
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`])

  }

}
