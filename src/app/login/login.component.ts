import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';  
import { TimerService } from '../timer.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  placeholder_user: User = {id: this.userService.users.length * 100 + 45, username: '', password: '', times: []};
  user: string = "";

  constructor(private router: Router, public userService: UsersService, private timer: TimerService, public cookie: CookieService) { 
    
  }

  ngOnInit(): void {    
  }

  login() {
    
    if (this.placeholder_user.username.length == 0) { 
      alert("Please enter a username");
      return;
    }

    // check if user exists
    this.user = this.cookie.getCookie(this.placeholder_user.username);
    //console.log(this.placeholder_user.username);
    //console.log("Logged in: ", this.user);
    if (this.user) {
      //console.log(this.user);
      let old_user = JSON.parse(this.user);
      this.userService.curUser = old_user;
      console.log("Hello old user");
    } else {

      this.cookie.setCookie({
        name: this.placeholder_user.username,
        value: this.placeholder_user,
        expires: 1
      })
      this.userService.curUser = this.placeholder_user;
    }

    //console.log("User time spent: ", this.userService.curUser.times);

    this.userService.curUser.times.push({time: this.timer.getTime(), page: "home", stop: false});
    this.userService.users.push(this.userService.curUser);
    console.log(this.userService.curUser);
    this.router.navigateByUrl('/home/' + this.placeholder_user.id);
  }
  
}
