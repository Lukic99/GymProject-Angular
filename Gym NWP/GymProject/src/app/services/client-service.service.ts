import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  

  constructor(private httpClient: HttpClient) {}

  BACKEND_BASE = 'http://localhost:3000'


  getClients(query: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.BACKEND_BASE + '/api/clients', {
      params: {q: query}
    });
  }

  getClient(id: string): Observable<Client> {
    return this.httpClient.get<Client>(this.BACKEND_BASE + '/api/clients/'+id)
  }
 
  changeTrainingLog(id:number, newTrainingLog:string):Observable<any>{
    return this.httpClient.patch(this.BACKEND_BASE+'/api/clients/'+id,{
      trainingLog : newTrainingLog
    })
  }
  createClient(client:Client):Observable<Client>{
    // console.log("Pozvan klijent servis")
    return this.httpClient.post<Client>(this.BACKEND_BASE + '/api/clients', client);
  }
  removeClient(id:number):Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.BACKEND_BASE + '/api/clients/delete/'+id);
  }
}
