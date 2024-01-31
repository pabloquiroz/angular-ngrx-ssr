import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY_WALLET, HOST_WALLET, WALLETS_URL } from '../constant/request';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {

  constructor(private httpClient: HttpClient) { }

  getAllWallets() {

    const headers = new HttpHeaders({
      'X-RapidAPI-Host': HOST_WALLET,
      'X-RapidAPI-Key':  API_KEY_WALLET
    });

    return this.httpClient.get<any>(WALLETS_URL, { headers });
  }

}
