import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';
import { ClientServiceService } from '../services/client-service.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  public clients !: Observable<Client[]>;

  constructor(clientService: ClientServiceService) {
    this.clients = clientService.getClients('');
  }


  ngOnInit(): void {
  }

}
