import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';
import { Training } from '../model/Training';
import { ClientServiceService } from '../services/client-service.service';
import { TrainingServiceService } from '../services/training-service.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  public clients !: Observable<Client[]>
  public $clients !: Array<Client>
  public time !: string;
  public trainings !: Observable<Training[]>;

  constructor(private trainingService: TrainingServiceService, clientService: ClientServiceService,private router:Router) {
    // this.$clients = 
    clientService.getClients('').subscribe((element) => this.$clients=element) ;
    // this.$clients = []
    // this.clients.subscribe((element) => //this.$clients=element //pipe(map(rez => rhis.$clients = rez))??
    //    element.forEach((elem) => this.$clients.push(elem))
    // )
  }

  ngOnInit(): void {
  }

  addTraining(trainingForm: any) {
    let training = {
      "id": 0,
      "trainerId": localStorage.getItem('trainerId'),
      "athlete": trainingForm.value.training.athlete,
      "date": trainingForm.value.training.date+' @ '+trainingForm.value.training.time
    }
    this.trainingService.addTraining(training).subscribe(val => console.log(val))
    this.router.navigate(['trainings/list'])
  }
}
