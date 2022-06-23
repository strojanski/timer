import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';  
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  placeholder_user: User = {id: this.userService.users.length * 100 + 45, username: '', password: '', times: []};

  constructor(private router: Router, public userService: UsersService, private timer: TimerService) { 
    
  }

  ngOnInit(): void {
  }

  login() {
    
    if (this.placeholder_user.username.length == 0) { 
      alert("Please enter a username");
      return;
    }
    
    if (this.userService.users.find(user => user.username === this.placeholder_user.username) == null) {
      this.userService.users.push(this.placeholder_user);
      this.userService.curUser = this.placeholder_user;
      console.log("Hello new user");
    } else {
      let curUser = this.userService.users.find(user => (user.username === this.placeholder_user.username && user.password === this.placeholder_user.password));
      if (curUser)
        this.userService.curUser = curUser;
      console.log("Hello old user"); 
    }

    this.userService.curUser.times.push({time: this.timer.getTime(), page: "home", stop: false}); 
    console.log(this.userService.users);
    console.log(this.userService.curUser);
    this.router.navigateByUrl('/home/' + this.placeholder_user.id);
  }
  
}
