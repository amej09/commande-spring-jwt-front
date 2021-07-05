import { Injectable } from '@angular/core';
import {Client} from '../model/client.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = environment.baseUrl + 'client/';
  // @ts-ignore
  private _items: Array<Client>;
  // @ts-ignore
  private _selected: Client;
  // @ts-ignore
  private _selectes: Array<Client>;
  // @ts-ignore
  private _createDialog: boolean;
  // @ts-ignore
  private _editDialog: boolean;
  // @ts-ignore
  private _viewDialog: boolean;
  // @ts-ignore
  private _submitted: boolean;


  // constructor(private messageService: MessageService,
  //             private confirmationService: ConfirmationService, private http: HttpClient) {
  // }
  constructor(private http: HttpClient) {
  }

  get items(): Array<Client> {
    return this._items;
  }

  set items(value: Array<Client>) {
    this._items = value;
  }

  get selected(): Client {
    return this._selected;
  }

  set selected(value: Client) {
    this._selected = value;
  }

  get selectes(): Array<Client> {
    return this._selectes;
  }

  set selectes(value: Array<Client>) {
    this._selectes = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  public findAll(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(this.url);
  }

  public save(): Observable<Client> {
    this.selected.id = 0 ;
    return this.http.post<Client>(this.url + 'save/', this.selected);
    this.findAll();
  }

  public edit(): Observable<Client> {
    return this.http.put<Client>(this.url + 'update/', this.selected);
  }

  public deleteById(): Observable<number> {
    return this.http.delete<number>(this.url + 'id/' + this.selected.id);
  }

  public deleteMultipleById(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-id' , this.selectes);
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
    }
  }
}
