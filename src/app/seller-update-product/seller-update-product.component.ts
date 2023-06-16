import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../datatype';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product
  productMessage: undefined| string;
  constructor(private route: ActivatedRoute, private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data);
      this.productData = data;
    })
  }
  onSubmit(data: product) {
    console.warn(data);
    if(this.productData){
      data.id= this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        console.log("Product is updated")
        this.productMessage="Product is update"
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined; 
      this.router.navigate(['/seller-home'])
    },3000)
   }
}

