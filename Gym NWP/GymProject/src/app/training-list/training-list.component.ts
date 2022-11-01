import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from '../model/Training';
import { TrainingServiceService } from '../services/training-service.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  public trainings !: Observable<Training[]>
  public name : string
  
  constructor(trainingService: TrainingServiceService) { 
    this.trainings = trainingService.getTrainingsOfATrainer(localStorage.getItem('trainerId'));
    this.name = localStorage.getItem('trainerName')
  }

  ngOnInit(): void {
  }

}
