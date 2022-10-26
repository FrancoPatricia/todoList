import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toDO } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
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

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.toDos.length + 1;
    this.toDos.push(new toDO(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: toDO) {
    const index = this.toDos.indexOf(todo);
    if (index !== -1) {
      this.toDos.splice(index, 1);
    }
    this.save();

  }

  markAsDone(todo: toDO) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: toDO) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.toDos);
    localStorage.setItem('toDos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('toDos');
    this.toDos = JSON.parse(data!);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}

