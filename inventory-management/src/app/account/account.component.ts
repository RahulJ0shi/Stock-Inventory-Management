import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/products.service'
import {FormBuilder,FormGroup, Validators,FormArray,FormControl} from '@angular/forms'
import {EncrDecrService} from 'src/app/encr-decr.service'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private productService:ProductsService,private formBuilder:FormBuilder,private http:HttpClient,private encrdecrService:EncrDecrService) { }
  accounts:any
  addAccount:FormGroup
  submitted = false;
  Username
  Email
  Pass
  checkForm:FormGroup
  Data
  addRes
  delRes

  ngOnInit() {
    this.getAccounts()
    this.addAccount=this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    },{
      validator:this.MustMatch('password','confirmPassword')
    })

    this.checkForm=this.formBuilder.group({
      checkArray:this.formBuilder.array([])
    })
  }
  get f() { return this.addAccount.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  async getAccounts(){
    this.accounts=await this.productService.Accounts().toPromise()
    this.accounts.forEach(element => {
            // decrypt
    element['username']=this.encrdecrService.get('123456$#@$^@1ERF',element['username']).toString()
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addAccount.invalid) {
        return;
    }
    this.Username=this.addAccount.value.username
    this.Email=this.addAccount.value.email
    this.Pass=this.addAccount.value.password
  
    this.Username=this.encrdecrService.set('123456$#@$^@1ERF',this.Username);
    this.Email=this.encrdecrService.set('123456$#@$^@1ERF',this.Email);
    this.Pass=this.encrdecrService.set('123456$#@$^@1ERF',this.Pass);
    
    this.Data={
      'username':String(this.Username),
      'email':String(this.Email),
      'password':String(this.Pass)
    }

    this.http.post('http://localhost:5000/add-account',this.Data).subscribe(data=>{this.addRes=data,window.location.reload()})
    
  }

  submitCheckForm(){
    var temp=this.checkForm.value.checkArray
    var usernames=[]
    temp.forEach(element => {
      usernames.push(this.encrdecrService.set('123456$#@$^@1ERF',element).toString())
    });
    var data={'username':usernames}
    this.http.post('http://127.0.0.1:5000/deleteAccounts',data).subscribe(res=>{this.delRes,window.location.reload()})
    this.checkForm.reset()
    window.location.reload();
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

}
