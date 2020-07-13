import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message/Message';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  sender : number;
  receiver : string;
  text : string;
  users : Users;

  constructor(private $ser: DataService) { }

  ngOnInit(): void {
    this.users = new Users();
    this.$ser.getAllUsers().subscribe(((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
      this.sender = this.users.getUserByEmail(JSON.parse(localStorage.getItem('user')).login).id;
    }));
  }

  addMessage()
  {
    var d : Date = new Date();
    var date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getUTCFullYear()+" "+this.addZero(d.getHours())+":"+this.addZero(d.getMinutes());
    var message = new Message(
     1,
     this.text,
      this.sender,
      this.users.getUserIdByName(this.receiver),
      date
    ).jsonFormat();
    this.$ser.saveMessage(message).subscribe();
  }


  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

}
