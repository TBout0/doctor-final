export class appointmentData {
  // doctorId
  // patientId
  // timeSlot
  // date
  // id
    constructor(public doctorId:number, public patientId:number|null,public timeSlot:number, public date: Date,public id:number|null = null){}
}
