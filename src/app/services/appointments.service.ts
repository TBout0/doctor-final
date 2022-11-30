import { Observable,of,take,pipe } from 'rxjs';
import { appointmentData } from 'Data/appointmentData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient,private uds:UserDataService) { }
  createAppointment(appointment:appointmentData) {
  return this.http.post('http://localhost:3000/appointments',appointment)
  .pipe(take(1),catchError(this.handleError<any>('createAppointments')))
  }
  getCurrentAppointments():Observable<appointmentData[]>|boolean{
    if(this.uds.currentUser ===null){return false}
    if(this.uds.currentUser.userType === 'doctor'){
      return this.http.get<appointmentData[]>(`http://localhost:3000/appointments?doctorId=${this.uds.currentUser.id}`)
      .pipe(take(1),catchError(this.handleError<any>('getCurrentAppointments')))
    }else{
      return this.http.get<appointmentData[]>(`http://localhost:3000/appointments?patientId=${this.uds.currentUser.id}`)
      .pipe(take(1),catchError(this.handleError<any>('getCurrentAppointments')))
    }
  }
  deleteAppointment(appointment:appointmentData):Observable<appointmentData[]>{
    return this.http.delete<appointmentData[]>(`http://localhost:3000/appointments/${appointment.id}`)
    .pipe(take(1),catchError(this.handleError<any>('DeleteAppointment')))
  }

  private handleError<T>(operation = 'operation', result ?:T) {
    return (error: any): Observable<T> => {
      console.log(`Error in executing execute ${operation} failed: ${error.message}`);
    return of(result as T);
  }
}

}
