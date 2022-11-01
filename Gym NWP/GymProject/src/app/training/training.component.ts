
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from '../model/Trainer';
import { Training } from '../model/Training';
import { ClientServiceService } from '../services/client-service.service';
import { TrainerServiceService } from '../services/trainer-service.service';
import { TrainingServiceService } from '../services/training-service.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  @Input()
  public training !: Training;

  // public trainer !: Trainer;
  // public trainings !: TrainingServiceService[];

  constructor(private trainingService: TrainingServiceService, private clientService: ClientServiceService, private trainerService: TrainerServiceService) {
  }

  ngOnInit(): void {
  }

  removeTraining(){
    if(confirm("Are you sure you wish to delete this training from your list of appointments?")) {
      this.trainingService.removeTraining(this.training.id).subscribe()
      window.location.reload(); // reload hackers 
    }
  }
}
