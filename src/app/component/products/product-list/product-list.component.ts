import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { element } from '@angular/core/src/render3';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    productList:Product[];
  constructor(
    private productService:ProductService,
    private toastr: ToastrService) 
    { }

  ngOnInit() {
    this.productService.getProducts()
        .snapshotChanges()
        .subscribe(items => {
            this.productList = [];
            items.forEach(element =>{
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              this.productList.push(x as Product);
            })
        })
  }
  onEdit(product: Product){
                                          // to quit databinding
      this.productService.selectProduct = Object.assign({}, product);//product;
  }
  onDelete($key:string){
     if(confirm('Are you sure yo want to delete it?')){
      this.productService.deleteProduct($key);
      this.toastr.success('Succesfully Operation', 'Product Deleted');
     }
  }

}
