import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Timestamp } from "../timestamp";
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer-table',
  templateUrl: './timer-table.component.html',
  styleUrls: ['./timer-table.component.css']
})
export class TimerTableComponent implements OnInit {

  times: Timestamp[] = [];

  public convertedTimes: Timestamp[] = [
    {time: 0, page: "Home", stop: false},
    {time: 0, page: "About", stop: false},
    {time: 0, page: "Profile", stop: false}
  ];

  totalTime: number = 0;

  constructor(public usersService: UsersService, private timer: TimerService) { 
    this.times = usersService.curUser.times;
    let next = false; // next is used to determine if the next time is between logout and login

    for (let i = 1; i < this.times.length; i++) {
      let input = this.times[i];
      let output = Math.ceil((input.time - this.times[i-1].time) / 1000);
      
      // skip logout time
      if (input.stop) {
        next = true
        continue;
      }

      if (next) {
        next = false;
        continue;
      }

      if (input.page.toLowerCase().includes("home"))
        this.convertedTimes[0].time += output;
        else if (input.page.toLowerCase().includes("about"))
        this.convertedTimes[1].time += output;
        else if (input.page.toLowerCase().includes("profile"))
        this.convertedTimes[2].time += output;

      this.totalTime += output;
    }
    console.log(this.convertedTimes);

    // this.totalTime = Math.ceil((timer.getTime() - this.times[0].time)/1000);  
  }
  
  ngOnInit(): void {
    
  }

}
