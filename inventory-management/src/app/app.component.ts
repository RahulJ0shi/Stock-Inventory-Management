import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  login:any
  constructor(private router:Router){}
  title = 'inventory-management';

  ngOnInit(){

    if(localStorage.getItem('access')=='true'){
      this.login=true
      // window.location.reload()
    }
    else{
      this.login=false      
    }
  }
  
}
