import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public now: Date = new Date();

  constructor(private userService: UsersService) { 
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    console.log(this.now.getTime());
  }
  

  cur = this.userService.curUser;

  ngOnInit(): void {
  }

}
