import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatMessage {
  groupId: string;
  senderName: string;
  content: string;
  sentAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private rxStomp = new RxStomp();

  connect(): void {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      reconnectDelay: 5000,
    });
    this.rxStomp.activate();
  }

  disconnect(): void {
    this.rxStomp.deactivate();
  }

  sendMessage(groupId: string, senderName: string, content: string): void {
    const message: ChatMessage = {
      groupId,
      senderName,
      content,
      sentAt: new Date().toISOString(),
    };
    this.rxStomp.publish({
      destination: `/app/chat/${groupId}`,
      body: JSON.stringify(message),
    });
  }

  getMessages(groupId: string): Observable<ChatMessage> {
    return this.rxStomp
      .watch(`/topic/group/${groupId}`)
      .pipe(map((message) => JSON.parse(message.body) as ChatMessage));
  }
}
