import {Component, OnInit} from '@angular/core';
import {Notice, User, ResultMessage, Chatting} from 'app/entity/entity';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userId: number;
  user: User = new User();

  chatWithUser: User = new User();


  ngOnInit() {

  }

}
