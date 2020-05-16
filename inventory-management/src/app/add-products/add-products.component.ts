import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms'
import {ProductsService} from 'src/app/products.service';
import {HttpClient} from '@angular/common/http'
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private productService:ProductsService,private http:HttpClient) { }
  addProductForm:FormGroup
  addCategoryForm:FormGroup
  category:any
  Name
  Category
  Price
  Mfg_date
  Exp_date
  Units
  newCategory
  UnitCapacity
  addProdRes
  addCatRes


  ngOnInit() {
    this.addProductForm=this.formBuilder.group({
      name:['',Validators.required],
      price:[''],
      category:[''],
      mfg_date:[''],
      exp_date:[''],
      units:['']
    })

    this.addCategoryForm=this.formBuilder.group({
      category:[''],
      units:['']
    })

    this.productService.Categories().subscribe(data=>this.category=data)
  }
  get f() { return this.addProductForm.controls; }
  get g() { return this.addCategoryForm.controls; }

  submitProduct(){

    if(this.addProductForm.invalid){return}
    this.Name=this.addProductForm.value.name
    this.Price=this.addProductForm.value.price
    this.Units=this.addProductForm.value.units
    this.Mfg_date=this.addProductForm.value.mfg_date
    this.Exp_date=this.addProductForm.value.exp_date
    this.addProductForm.reset()
    var postData={
      'id':null,
      'name':this.Name,
      'price':this.Price,
      'category':this.Category,
      'units':String(this.Units),
      'mf_date':String(this.Mfg_date),
      'expire_date':String(this.Exp_date)
    }
    this.http.post('http://localhost:5000/add-product',postData).subscribe(data=>this.addProdRes=data)
  }

  submitCategory(){
    if(this.addCategoryForm.invalid){return}
    this.newCategory=this.addCategoryForm.value.category
    this.UnitCapacity=this.addCategoryForm.value.units
    this.addCategoryForm.reset()
    var postData={
      'id':null,
      'p_category':this.newCategory,
      'capacity':String(this.UnitCapacity)
    }
    this.http.post('http://localhost:5000/add-category',postData).subscribe(data=>this.addCatRes=data)
  }

  changeCategory(e) {
    this.Category=e.target.value
  }

}
