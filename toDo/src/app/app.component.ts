import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toDO } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public toDos: toDO[] = [];
  public title: string = "Lista de tarefas";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.toDos.push(new toDO(1, 'Passear com o cachorro', false));
    this.toDos.push(new toDO(2, 'Recolher a roupa', false));
    this.toDos.push(new toDO(3,'Lavar a louça', true));
  }

  remove(todo: toDO) {
    const index = this.toDos.indexOf(todo);
    if (index !== -1) {
      this.toDos.splice(index, 1);
    }

  }

  markAsDone(todo: toDO) {
    todo.done = true;
  }

  markAsUndone(todo: toDO) {
    todo.done = false;
  }
}

