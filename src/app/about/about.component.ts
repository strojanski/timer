import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  now = new Date();

  constructor() { 
    setInterval(() => {
    this.now = new Date();
  }, 1000);
  console.log(this.now.getTime());}
   


  ngOnInit(): void {
  }


}
