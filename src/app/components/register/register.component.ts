import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public regData = {
    firstname: '',
    lastname: '',
    userType: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  constructor(private uds: UserDataService,private router: Router) { }
  onSubmit():void{
    if (this.regData.password !== this.regData.confirmPassword){
      console.log('passwords do not match')
      return;
    }
    this.uds.checkUserDataExists(this.regData.email)
    .subscribe(data => {
      if(data.length === 1){
        console.log('User already exists')
      }
      this.uds.makeUserData(this.regData.firstname, this.regData.lastname, this.regData.email, this.regData.userType, this.regData.password )
      .subscribe(data => {
        console.log('User created');
        this.router.navigate(['/log-in']);
      })
    })
  }
  ngOnInit(): void {
  }

}
