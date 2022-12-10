import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient

  ) {
  }
public getAllTodos(){
  return this.http
    .get(API_URL + '/todo.json').pipe(map((response: any) =>{
      let todos = response.data
      return todos.map((todo: any) => new Todo(todo));
    })).pipe(
      catchError(this.handleError)
    );
  
}


public createTodo(todo: Todo): Observable<Todo> {
  return this.http
  .post(API_URL + '/todo.json', todo)
  .pipe(map((response: any) => {
    return new Todo(response.data);
  }))
  .pipe(catchError(this.handleError));
}

public getTodoById(todoId: number) {
  return this.http
    .get(API_URL + '/todo/' + todoId + '.json')
    .pipe(map((response: any) => {
      return new Todo(response.data);
    })).pipe(
      catchError(this.handleError)
    );
}

public updateTodo(todo: Todo) {
  return this.http
    .put(API_URL + '/todo/' + todo.id +'.json', todo)
    .pipe(map((response: any) => {
      return new Todo(response.data);
    }))
    .pipe(catchError(this.handleError));
}


public deleteTodoById(todoId: number){
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