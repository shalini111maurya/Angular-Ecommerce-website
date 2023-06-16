import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ProductService } from '../services/product.service';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent  implements OnInit{
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
    onSubmit(data:product){
      console.warn(data);
      this.product.addProduct(data).subscribe((result)=>{
        console.warn(result)
      if(result){
        this.addProductMessage="Product is successfully added"
      }
        setTimeout(()=>(this.addProductMessage=undefined),3000);
      })
    
    }
  }


