import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserUpdate } from '../interface/users.module';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private deleteUrl = environment.apiUrls.deleteUsers;
  private postUserUrl = environment.apiUrls.postUser;
  private updateUsers = environment.apiUrls.updateUsers;
  constructor(private http: HttpClient) {}
  getData(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrls.getUsers);
  }

  deleteUserById(id: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    console.log('URL enviada para eliminar:', url); 
    return this.http.delete(url, { responseType: 'text' }).pipe(
      map((response: string) => {
        try {
          return JSON.parse(response);
        } catch (error) {
          console.warn('La respuesta no es JSON, se devuelve como texto.');
          return response;
        }
      }),
      catchError((error) => {
        console.error('Error en la petición:', error);
        return throwError(error);
      })
    );
  }
  postUser(userData: any): Observable<any> {
    return this.http.post(this.postUserUrl, userData);
  }

  updateUser(userId: number, userData: UserUpdate): Observable<User> {
    const { email, name, surname, age, phone, username } = userData; 
    const dataToUpdate = {
      email,
      name,
      surname,
      age,
      phone, 
      username
    };
    return this.http.put<User>(`${this.updateUsers}/${userId}`, dataToUpdate).pipe(
      catchError((error) => {
        console.error('Error en la actualización del usuario:', error);
        return throwError(error);
      })
    );
  }
}
