import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public loginData = {email: '', password: ''}
  constructor(private uds:UserDataService) { }
  onSubmit():void{
    console.log("Logging in...")
    this.uds.logIn(this.loginData.email, this.loginData.password)
  }
  ngOnInit(): void {
  }

}
