import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductsService} from 'src/app/products.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private productService:ProductsService) { }

  ngOnInit() {
  }

  onSubmit(searchText){
    this.productService.setFilter(searchText)
  }

  logout(){
    localStorage.setItem('access','false')  
  }
}
