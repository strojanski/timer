import { Injectable } from '@angular/core';
import { User } from "./user";
import { Observable, of } from "rxjs";
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  curUser: User = {id: 0, username: '', password: "", times: []};

  constructor(public timerService: TimerService) { }

  getUsers(): Observable<User[]> {
    const users = of(this.users);
    return of(this.users);
  }
}
