import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  public availabilityData = {date : new Date()}
  constructor(public uds: UserDataService) { }
  onSubmit(){
    console.log(this.availabilityData.date)
    console.log(typeof this.availabilityData.date)
  }
  ngOnInit(): void {
  }

}
