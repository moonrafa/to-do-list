import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    // private http: Http
    private http: HttpClient

  ) {
  }
// API: GET /todos
public getAllTodos(){
  // will use this.http.get()
  return this.http
    .get(API_URL + '/todo.json').pipe(map((response: any) =>{
      let todos = response.data
      return todos.map((todo: any) => new Todo(todo));
    })).pipe(
      catchError(this.handleError)
    );
  
}


// API: POST /todos
public createTodo(todo: Todo): Observable<Todo> {
  // will use this.http.post()
  return this.http
  .post(API_URL + '/todo.json', todo)
  .pipe(map((response: any) => {
    return new Todo(response.data);
  }))
  .pipe(catchError(this.handleError));
}

// API: GET /todos/:id
public getTodoById(todoId: number) {
  // will use this.http.get()
  return this.http
    .get(API_URL + '/todo/' + todoId + '.json')
    .pipe(map((response: any) => {
      return new Todo(response.data);
    })).pipe(
      catchError(this.handleError)
    );
}

// API: PUT /todos/:id
public updateTodo(todo: Todo) {
  // will use this.http.put()
  return this.http
    .put(API_URL + '/todo/' + todo.id +'.json', todo)
    .pipe(map((response: any) => {
      return new Todo(response.data);
    }))
    .pipe(catchError(this.handleError));
}



// DELETE /todos/:id
public deleteTodoById(todoId: number){
  // will use this.http.delete()
  var heads={"Content-Type": "application/json" }

  return this.http
      .delete(API_URL + '/todo/' + todoId +'.json',  {headers:heads}) 
      .pipe(map((response: any) => null as any))
      .pipe(catchError(this.handleError));
}
private handleError (error: Response | any) {
  console.error('ApiService::handleError', error);
  return throwError(error);
}

}