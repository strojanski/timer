import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  public time: number = 0;
  now: Date = new Date();
  interval: any;

  constructor() { }
  
  getTime(): number {
    this.now = new Date();
    this.time = this.now.getTime();
    return this.time;
  }

}