import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Training } from '../model/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = 'http://localhost:3000'

  getTrainings(query: string): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.BACKEND_BASE + '/api/trainings', {
      params: { q: query }
    });
  }

  getClientsTrainings(name: string): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.BACKEND_BASE + '/api/trainings/name/' + name);
  }

  getTrainingsOfATrainer(id: string): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.BACKEND_BASE + '/api/trainings/trainer/' + id);
  }

  addTraining(training:Training): Observable<Training> {//trainerID:number, athlete:string,time:string
    console.log('servis pozvan')

    return this.httpClient.post<Training>(this.BACKEND_BASE + "/api/trainings", training);
  }

  removeTraining(id:number):Observable<Training[]>{
    return this.httpClient.get<Training[]>(this.BACKEND_BASE + '/api/trainings/delete/'+id);
  }
  // treba dodati i patch za promenu treninga
}
