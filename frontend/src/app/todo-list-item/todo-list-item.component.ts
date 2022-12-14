import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

	public textEdited: string;
  public editActive: boolean = false;
  

  @Input() todo: Todo = null as any;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  @Output()
  edit: EventEmitter<Todo> = new EventEmitter();

 


  constructor() {
    this.textEdited = '';

  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }
 

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }
  editTodo(todo: Todo) {
    todo.body = this.textEdited
    this.editActive = false;
    this.edit.emit(todo);
  }
  
  public cancel() : void {
		this.editActive = false;
	}
  public activateEdit() : void {
		this.editActive = true;
    this.textEdited = this.todo.body
	}

}