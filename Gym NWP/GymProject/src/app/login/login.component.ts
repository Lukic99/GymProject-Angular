import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerServiceService } from '../services/trainer-service.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appComponent !: AppComponent;
  constructor(private trainerService: TrainerServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: any) {
    let trainer = loginForm.value
    this.trainerService.login(trainer.trainer.username, trainer.trainer.password).subscribe(resp => {
      localStorage.setItem("trainerId", '' + resp.id)
      localStorage.setItem("trainerName", '' + resp.name)
      localStorage.setItem("token", '' + resp.token)
      this.router.navigate(['trainings/list']);
    }, err=>alert("Something is wrong"));
    
  }
}
