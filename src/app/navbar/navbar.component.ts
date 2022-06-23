import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class NavbarComponent implements OnInit {

  cur = this.userService.curUser;
  nameEx = "(?<=/).*(?=/)";

  constructor(private userService: UsersService, private location: Location, private timer: TimerService) { }

  ngOnInit(): void {
  }

  changeLoc(to: string): void {
    let from = this.location.path();
    console.log(from);
    console.log(to);
   
    // push epoch time to curUser.times
    let time_now = this.timer.getTime();
    
    let actualTime = 0;
    actualTime = time_now - this.userService.curUser.times[this.userService.curUser.times.length - 1].time;
    console.log(time_now , " - ", this.userService.curUser.times[this.userService.curUser.times.length - 1].time, " = ", actualTime); 
    console.log("actual time spent on ", from, " is ", actualTime/1000, " seconds");

    // dont time when logged out
    
    this.userService.curUser.times.push({time: time_now, page: from});
    console.log(this.userService.curUser.id + " " + this.userService.curUser.username);
    console.log(this.userService.curUser.times);

  }

}
