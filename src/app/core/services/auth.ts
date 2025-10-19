import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private _user = new BehaviorSubject<AuthResponse['user'] | null>(null);

  public user$ = this._user.asObservable();

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, payload).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access_token);

        this._user.next(response.user);
      })
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, payload);
  }

  logout() {
    localStorage.removeItem('access_token');

    this._user.next(null);
  }

}
