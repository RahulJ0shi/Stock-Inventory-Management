import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/products.service';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder,FormArray,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
// import { map } from 'highcharts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductsService,private route:Router,private formBuilder:FormBuilder,private http:HttpClient) { }

  public searchText
  public temp
  public allProducts:any
  public categories:any
  checkForm:FormGroup
  exportData:any
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Products : ',
    useBom: true,
    noDownload: false,
    headers: ["ID", "NAME", "CATEGORY", "PRICE","EXPIRE DATE","UNITS","MFG DATE"]
  };

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/exportCSV').subscribe(data=>this.exportData=data)
    this.productService.AllProducts().subscribe(data=>this.allProducts=data)
    this.productService.Categories().subscribe(data=>this.categories=data)
    setInterval(()=>{this.checkDataChange()},100)

    this.checkForm=this.formBuilder.group({
      checkArray:this.formBuilder.array([])
    })
  }

  checkDataChange(){
    this.searchText=this.productService.searchText
  
  }

  editProduct(data){
    this.allProducts.forEach(product => {
      if (product['id']==data){this.productService.editProduct=product}
    });
    this.route.navigate(['edit-product'])
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.checkForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitCheckForm(){
    var data={'id':this.checkForm.value.checkArray}
    this.http.post('http://127.0.0.1:5000/deleteProduct',data).subscribe(res=>{console.log(res),window.location.reload()})
    this.checkForm.reset()
  }

  Export(){
    new  AngularCsv(this.exportData, "ProductList", this.csvOptions);
  }
}
