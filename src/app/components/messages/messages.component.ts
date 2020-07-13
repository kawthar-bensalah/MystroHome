import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/models/message/Messages';
import { DataService } from 'src/app/services/data.service';
import { Message } from 'src/app/models/message/Message';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';
import { interval } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  tabMessages  : Messages;
  tab : any;
  users : Users;
  tabChecked = new Array<number>();
  text : string;
  constructor(private $ser : DataService) { }

  ngOnInit(): void {
  
  this.users = new Users();
  
      this.$ser.getAllUsers().subscribe(((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
      //Messages
      this.tabMessages=new Messages();
      this.$ser.getAllMessages(this.users.getUserByEmail(JSON.parse(localStorage.getItem('user')).login).id).subscribe(((tabMessages) => {
        this.tabMessages.tabMessages = (tabMessages || []).map(item => new Message(item))
        this.tab=this.tabMessages.tabMessages;
      }));
    }));


  }

   //REMOVE METHODS
   deleteMessage(id:number){
    //BD Delete
    alert(id)
    this.$ser.deleteMessage(id).subscribe();
     //Display Delete
     this.tabMessages.deleteMessage(id);
  }

  deleteAllMessages(){
    for (var i=0; i<this.tabChecked.length; i++)
    {
      this.$ser.deleteMessage(this.tabChecked[i]).subscribe();
      this.tabMessages.deleteMessage(this.tabChecked[i]);
      }
  }

  //CHECK METHODS
  check(event : any, id:number)
  {
     if(event.target.checked)
      this.tabChecked.push(id);
     else
      for(var i=0; i<this.tabChecked.length; i++)
        if (this.tabChecked[i] == id)
          this.tabChecked.splice(i, 1);
  }

  checkAll(event : any)
  {
    if(event.target.checked)
      for(var i=0; i<this.tabMessages.tabMessages.length; i++)
        this.tabChecked.push(this.tabMessages.tabMessages[i].id);
    else
        this.tabChecked.splice(0, this.tabChecked.length);
  }

  messageIsChecked(id:number){
    for(var i=0; i<this.tabChecked.length; i++)
        if (this.tabChecked[i] == id)
          return true;
    return false;
  }

  refresh(){
    this.tabMessages=new Messages();
      this.$ser.getAllMessages(this.users.getUserByEmail(JSON.parse(localStorage.getItem('user')).login).id).subscribe(((tabMessages) => {
        this.tabMessages.tabMessages = (tabMessages || []).map(item => new Message(item))
        this.tab=this.tabMessages.tabMessages;
      }));
  }
}

