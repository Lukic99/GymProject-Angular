import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/merge';

import { Observable, Subject } from 'rxjs';
import { Client } from '../model/Client';
import { ClientServiceService } from '../services/client-service.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input()
  public client!: Client; 

  constructor(private router:Router, private clientService:ClientServiceService) {

  }
  ngOnInit(): void {
  }

  deleteClient(naem:string) {
    if(confirm("Are you sure to delete "+naem+' from client list')) {
      this.clientService.removeClient(this.client.id).subscribe()
      window.location.reload(); // reload. Ili je moglo preko Subject.next()
    }
  }

  showTrainingLog(){
    localStorage.setItem('trainingLogClientId',''+this.client.id)
    this.router.navigate(['clients/trainingLog'])
  }
}
