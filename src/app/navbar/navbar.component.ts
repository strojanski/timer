import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TimerService } from '../timer.service';
import { Router } from "@angular/router";
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class NavbarComponent implements OnInit {

  cur = this.userService.curUser;
  nameEx = "(?<=/).*(?=/)";

  constructor(private userService: UsersService, private location: Location, private timer: TimerService, private router : Router, public cookie : CookieService) { }

  ngOnInit(): void {
  }

  changeLoc(to: string): void {
    let from = this.location.path();
    console.log(from);
    console.log(to);

    // push epoch time to curUser.times
    let time_now = this.timer.getTime();
    
    let actualTime = 0;
    if (this.userService.curUser.times.length == 0) {
      this.router.navigateByUrl('/login');
    } else {
      actualTime = time_now - this.userService.curUser.times[this.userService.curUser.times.length - 1].time;
      console.log(time_now , " - ", this.userService.curUser.times[this.userService.curUser.times.length - 1].time, " = ", actualTime); 
      console.log("actual time spent on ", from, " is ", actualTime/1000, " seconds");

      // save new times to cookie
      this.cookie.setCookie({
        name: this.userService.curUser.username,
        value: this.userService.curUser,
        expires: 1});
      
      if (to.toLowerCase().includes("logout")) {
        this.userService.curUser.times.push({time: time_now, page: from, stop: true});
        this.userService.curUser = {id: 0, username: '', password: '', times: []};
      } else {
        this.userService.curUser.times.push({time: time_now, page: from, stop: false});
      }
    
      console.log(this.userService.curUser.id + " " + this.userService.curUser.username);
      console.log(this.userService.curUser.times);
    }
  }
}
