import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Timestamp } from "../timestamp";

@Component({
  selector: 'app-timer-table',
  templateUrl: './timer-table.component.html',
  styleUrls: ['./timer-table.component.css']
})
export class TimerTableComponent implements OnInit {

  times: Timestamp[] = [];

  public convertedTimes: Timestamp[] = [
    {time: 0, page: "Home"},
    {time: 0, page: "About"},
    {time: 0, page: "Profile"}
  ];

  constructor(public usersService: UsersService) { 
    this.times = usersService.curUser.times;
    console.log(this.times);

    for (let i = 1; i < this.times.length; i++) {
      let input = this.times[i];
      let output = (input.time - this.times[i-1].time) / 1000;
      if (input.page.toLowerCase().includes("home"))
        this.convertedTimes[0].time += output;
      else if (input.page.toLowerCase().includes("about"))
        this.convertedTimes[1].time += output;
      else if (input.page.toLowerCase().includes("profile"))
        this.convertedTimes[2].time += output;
    }
    console.log(this.convertedTimes);
  }
  
  ngOnInit(): void {

  }


  //let actualTime = 0;
    //actualTime = time_now - this.userService.curUser.times[this.userService.curUser.times.length - 1].time;
    //console.log(time_now , " - ", this.userService.curUser.times[this.userService.curUser.times.length - 1].time, " = ", actualTime); 
    //console.log("actual time spent on ", from, " is ", actualTime/1000, " seconds");

    // cumulative = now - first timestamp

}
