import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './home/dashboard/dashboard.component'
import {LoginComponent} from './login/login.component'
import {AccountComponent} from './account/account.component'
import {AddProductsComponent} from './add-products/add-products.component'
import {EditProductsComponent} from './edit-products/edit-products.component'
import {InventoryReportComponent} from './inventory-report/inventory-report.component'
import {ProductsComponent} from './products/products.component'
import {AuthGuard} from './auth.guard'

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'',
    children:[
      {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
      {path:'account',component:AccountComponent,canActivate: [AuthGuard]},
      {path:'products',component:ProductsComponent,canActivate: [AuthGuard]},
      {path:'report',component:InventoryReportComponent,canActivate: [AuthGuard]},
      {path:'edit-product',component:EditProductsComponent,canActivate: [AuthGuard]},
      {path:'add-product',component:AddProductsComponent,canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[DashboardComponent,LoginComponent,AccountComponent,AddProductsComponent,EditProductsComponent,InventoryReportComponent,ProductsComponent]
