import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {EncrDecrService} from 'src/app/encr-decr.service'
import {FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private encrdecrService:EncrDecrService,private formBuilder:FormBuilder) { }
  private login:any
  loginForm:FormGroup
  submitted = false;  
  Username
  Password
  response:any
  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  
  }
  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.Username=(this.loginForm.value.username)
    this.Password=this.loginForm.value.password
    this.Username=this.encrdecrService.set('123456$#@$^@1ERF',this.Username);
    this.Password=this.encrdecrService.set('123456$#@$^@1ERF',this.Password);
    var data={
      'username':String(this.Username),
      'password':String(this.Password)
    }
    
    this.http.post('http://localhost:5000/login',data).subscribe(res=>{this.response=res,this.loginAccess()})
  }
  loginAccess(){
    this.login=this.response['msg']
    if (this.login=='false'){
      this.submitted=false
      this.loginForm.reset()
    }
    if(this.login=='true'){
      localStorage.setItem('access',this.login)
      this.router.navigate(['dashboard']).then(()=>window.location.reload())
      // window.location.reload()
    }
  }
}
