import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient :HttpClient,private router:Router) { }
  public Data:any
  public searchText:any
  public editProduct:any

  public TopProducts():Observable<any[]>{
    return this.httpClient.get<any[]>('http://127.0.0.1:5000/top-products')
  }

  public AllProducts():Observable<any[]>{
    return this.httpClient.get<any[]>('http://127.0.0.1:5000/all-products')
  }

  public Categories():Observable<any[]>{
    return this.httpClient.get<any[]>('http://127.0.0.1:5000/categories')
  }

  public Accounts():Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:5000/accounts')
  }

  public setFilter(data){
    this.searchText=data
    this.router.navigate(['products'])
  }

}
