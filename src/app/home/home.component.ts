import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { OrderPipe } from "ngx-order-pipe";
import { User } from "@/_models";
import { UserService, AuthenticationService } from "@/_services";

@Component({ templateUrl: "home.component.html"})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  searchText;
  order: string = "name";
  reverse: boolean = false;
  currentDate = new Date();
  date_item: string;
  showDate:boolean= false;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private orderPipe: OrderPipe
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    setInterval(() => {
        this.currentDate = new Date();
      }, 1);
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.users = this.orderPipe.transform(users, "userName");
      });
  }
  onChangeDate(item){
    if(item==="24-hour")
    {
        this.showDate = true;
    }
    else{
        this.showDate = false;
    }
  }
}
