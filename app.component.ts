import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chat-app';
  userMessage: string = '';
  messages: { role: string; content: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ role: 'user', content: this.userMessage });
      this.chatService
        .sendMessage(this.userMessage)
        .subscribe((response: any) => {
          this.messages.push({
            role: 'bot',
            content: response.choices[0].text, // Correctly handle ChatGPT-3.5 response format
          });
        });
      this.userMessage = '';
    }
  }
}
