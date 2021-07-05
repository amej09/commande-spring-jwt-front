import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ClientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
