import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/products.service'
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms'
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  public x=[]
  editForm:FormGroup
  submitted=false
  name
  price
  units
  editRes
  dltRes

  constructor(private productService:ProductsService,private formBuilder:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit() {
    if(this.productService.editProduct==undefined){
      this.route.navigate(['products'])
    }
    this.x=this.productService.editProduct
    this.editForm=this.formBuilder.group({
      name:new FormControl({value:this.x['name'],disabled:false}),
      price:new FormControl({value:this.x['price'],disabled:false}),
      category:new FormControl({value:this.x['category'],disabled:true}),
      mfdate:new FormControl({value:this.x['mf_date'],disabled:true}),
      exdate:new FormControl({value:this.x['expire_date'],disabled:true}),
      units:new FormControl({value:this.x['units'],disabled:false})
    })  
  }
  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit(buttonType){
    this.submitted=true
    if(this.editForm.invalid){return}
    this.name=this.editForm.value.name
    this.price=this.editForm.value.price
    this.units=this.editForm.value.units
    this.editForm.reset()
    var postData={'id':this.x['id'],'name':this.name,'price':this.price,'units':this.units}

    if(buttonType=='save'){
      this.http.post('http://127.0.0.1:5000/editProduct',postData).subscribe(res=>this.editRes=res)
      // console.log(response)
    }
    else{
      var data={'id':Array(this.x['id'])}
      this.http.post('http://127.0.0.1:5000/deleteProduct',data).subscribe(res=>this.dltRes=res)
    }
  }

}
