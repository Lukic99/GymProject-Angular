import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trainer } from '../model/Trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = 'http://localhost:3000'

  login(username: string, password: string): Observable<any> {
    // console.log('pozvan trener servis')
    return this.httpClient.post(this.BACKEND_BASE + '/api/trainers/login', {
      username: username,
      password: password
    }).pipe(map((resp: any) => {
      // alert(resp.id)
      // console.log(resp)
      return resp;
    }))
  }

  // getTrainer(id: number): Trainer {
  //   return this.httpClient.post(this.BACKEND_BASE + '/api/trainers/
  // }  
}
