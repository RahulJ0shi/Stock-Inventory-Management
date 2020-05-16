import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ProductsService} from 'src/app/products.service'

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  
  products:any
  categories:any
  totalUnits=0
  unitAvailableArray=[]
  unitCapacityArray=[]
  totalCategories=[]
  highcharts = Highcharts;
  data
  chartOptions

  constructor(private productService:ProductsService) { }
  
  ngOnInit() {
    this.getData()
  }
  async getData(){
    this.products=await this.productService.AllProducts().toPromise()
    this.categories=await this.productService.Categories().toPromise()
    this.categories.forEach(cat => {
      var count=0
      this.products.forEach(prod=>{
        if(prod['category']==cat['p_category']){
          count+=Number(prod['units'])
        }
      })
      this.totalUnits+=count
      this.unitAvailableArray.push(this.totalUnits)
    });

    this.categories.forEach(cat => {
      this.unitCapacityArray.push(Number(cat['capacity']))
      this.totalCategories.push(cat['p_category'])
    });
    console.log(this.unitCapacityArray)
    console.log(this.totalCategories)
    console.log(this.unitAvailableArray)

    this.data = [{
      name: 'Units Available',
      data: this.unitAvailableArray,
      // color:"MediumSeaGreen"
      },{
      name: 'Units Capacity',
      data: this.unitCapacityArray,
      // color:"#343a40"
      }];

    this.chartOptions = {   
        chart: {
         type: "column",
         height:450,
         width:850,
        },
        title: {
         text: "Product Graph by No. of Units"
        },
        xAxis:{
         categories:this.totalCategories
        },
        yAxis: {          
         title:{
            text:"UNITS"
         } 
        },
        plotOptions:{
          series:{
            maxPointWidth: 50,
          }
        },
        series: this.data,
        };      
  }

}