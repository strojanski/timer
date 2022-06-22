import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-table',
  templateUrl: './timer-table.component.html',
  styleUrls: ['./timer-table.component.css']
})
export class TimerTableComponent implements OnInit {

  now: Date = new Date();

  constructor() { 
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    console.log(this.now.getTime());
  }

  ngOnInit(): void {
  }

}
