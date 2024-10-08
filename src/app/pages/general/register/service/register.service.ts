import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private postUserUrl = environment.apiUrls.postUser;
  constructor(private http: HttpClient) {}

  postUser(userData: any): Observable<any> {
    return this.http.post(this.postUserUrl, userData);
  }
}
