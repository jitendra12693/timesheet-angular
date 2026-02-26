import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
loginForm:FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder,private router:Router,private commonService:CommonService) { }

  login(event: any) {
    event.preventDefault();
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      this.commonService.makeLoginRequest(this.loginForm.value).subscribe((response: any) => {
        console.log('Login successful:', response);
        if(response && response?.statusCode==200){ 
          localStorage.setItem('token', response.token);
          this.commonService.notifyLoginStatus(true);
          this.router.navigate(['/timesheet']);
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      }, (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      });
    } else {
      console.log('Login form is invalid');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
