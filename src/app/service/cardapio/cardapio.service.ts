import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarmitaHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardapioService {

  constructor(public http: HttpClient) { }
  
  public buscarCardapios(id_restaurante): Observable<any> {        
    let header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    return this.http.get(environment.serverUrl + '/cardapio/buscarTodos?id_restaurante=' + id_restaurante, header);
  }

  public gravarCardapio(params): Observable<any> {    
    let header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));          
    params = JSON.stringify(params);
    return this.http.post(environment.serverUrl + '/cardapio/inserir', params, header);
  }

  public removerCardapio(params): Observable<any> {
    let header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    params = JSON.stringify(params);
    return this.http.post(environment.serverUrl + '/cardapio/removerCardapio', params, header);
  }

  public contemPedidosPendentes(params): Observable<any> {
    let header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    params = JSON.stringify(params);
    return this.http.post(environment.serverUrl + '/cardapio/contemPedidosPendentes', params, header);
  }
}
