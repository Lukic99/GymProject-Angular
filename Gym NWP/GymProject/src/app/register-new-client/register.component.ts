import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientServiceService } from '../services/client-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private clientService: ClientServiceService,private datepipe: DatePipe, private router:Router) { }

  ngOnInit(): void {
  }

  createClient(registerForm: any) {
    let client = {
      id : 0,
      name: registerForm.value.client.name,
      imageUrl: registerForm.value.client.imageUrl,
      age: registerForm.value.client.age,
      trainingLog: 'Signed in: '+this.datepipe.transform(new Date(), 'dd.MM.yyyy.'), //datepipe dodat u Providers niz u app.component
      specialization: registerForm.value.client.specialization
    }
    this.clientService.createClient(client).subscribe(resp => this.router.navigate(['clients/list']))
  }
}
