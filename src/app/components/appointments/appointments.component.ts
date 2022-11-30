import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnInit } from '@angular/core';
import { appointmentData } from 'Data/appointmentData';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  public availabilityData = {date : new Date(), slotIds: []}
  public apptData:appointmentData[] = []
  constructor(public uds: UserDataService,private apptService:AppointmentsService) { }

  toDate = (z:Date) => {return new Date(z)}
  formatTimeSlot(slot:number){
    let time = [['8:00','9:00'],['9:00','10:00'],['10:00','11:00'],['11:00','12:00'],['12:00','1:00'],['1:00','2:00'],['3:00','4:00'],['4:00','5:00']]
    return `From ${time[slot-1][0]} to ${time[slot-1][1]}`
  }
  onDoctorSubmit(){
    //a == b ? "Equal" : "Not Equal"
    let userid:number
    if(this.uds.currentUser === null){
      return
    }
    if(this.uds.currentUser.id !== null){
      userid = this.uds.currentUser.id
    }else{return}
    let ids = this.availabilityData.slotIds
    console.log(this.availabilityData.date)
    console.log(typeof this.availabilityData.date)
    console.log(this.availabilityData.slotIds)
    console.log(typeof ids)
    console.log(ids[0])
    console.log(new Date().getTime())
    console.log(this.availabilityData.date.getTime())
    if(new Date().getTime() > this.availabilityData.date.getTime()){
      console.log('selected Date is in past pick another date')
      return
    }
    for(let id of this.availabilityData.slotIds){
      let z = new appointmentData(userid,null,id,this.availabilityData.date)
      this.apptService.createAppointment(z)
      .subscribe(data=>{
        console.log(`Created appointment in slot ${id}`)
        this.getAppointments()
      })
    }
  }

  onDelete(item:appointmentData) {
    this.apptService.deleteAppointment(item)
    .subscribe(data=>{
      console.log(`Deleted appointment`)
      this.getAppointments()
    })


  }

  getAppointments():void{
    let a = this.apptService.getCurrentAppointments()
    if (a !== false && a !== true ){
      a.subscribe(data=> this.apptData = data)
    }
  }



  ngOnInit(): void {
    this.getAppointments()
  }

}
