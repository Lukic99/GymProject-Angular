import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GymProject';
  constructor(private router:Router){
  }

  public  logIn(){
  }
  public  logOut(){
    localStorage.clear();
    // localStorage.removeItem('trainerId');
    this.router.navigate(['/login'])
    
  }
  getLoginStatus(){
    if(localStorage.getItem("trainerId")){
      return true
    }
    return false
  }
}
