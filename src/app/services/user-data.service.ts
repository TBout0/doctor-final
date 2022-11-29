import { Injectable } from '@angular/core';
import { Observable,of,take } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { userData } from 'Data/userData';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private currentUser: userData|null = null;

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser = () => this.currentUser

  logOut = () => this.currentUser = null

  checkUserDataExists(email:string): Observable<userData[]>{
    return this.http.get<userData[]>(`http://localhost:3000/userData?email=${email}`)
  }

  makeUserData(firstname:string, lastname:string, email:string,userType:string,password:string): Observable<userData>{
    return this.http.post<userData>(`http://localhost:3000/userData`, new userData(firstname,lastname,email,password,userType))
  }

  logIn(email:string,password:String):void{
    this.http.get<userData[]>(`http://localhost:3000/userData?email=${email}&password=${password}`)
    .subscribe(data => {
      if(data.length == 1){
        this.currentUser = data[0];
        this.router.navigate(['/appointments'])
      }
      else{
        console.log('User Does Not Exist')
      }
    })
  }
}
