import {
  Component,
  input,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { lucideSend } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../../core/services/chat.service';

interface ChatMessage {
  id: string;
  userId: string;
  userInitials: string;
  userName: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-group-chat-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, HlmButtonImports, HlmInputImports, HlmIconImports, DatePipe],
  providers: [provideIcons({ lucideSend })],
  templateUrl: './group-chat-tab.html',
})
export class GroupChatTabComponent implements OnInit, OnDestroy, AfterViewChecked {
  currentUserId = input.required<string>();
  groupId = input.required<string>();

  private chatService = inject(ChatService);
  private subscription?: Subscription;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  messages = signal<ChatMessage[]>([]);
  newMessage = signal('');

  ngOnInit(): void {
    this.chatService.connect();
    this.subscription = this.chatService.getMessages(this.groupId()).subscribe((incoming) => {
      const msg: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        userId: incoming.senderName,
        userInitials: incoming.senderName.substring(0, 2).toUpperCase(),
        userName: incoming.senderName,
        content: incoming.content,
        timestamp: new Date(incoming.sentAt),
      };
      this.messages.update((msgs) => [...msgs, msg]);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.chatService.disconnect();
  }

  sendMessage(): void {
    const text = this.newMessage().trim();
    if (!text) return;
    this.chatService.sendMessage(this.groupId(), 'Aymane M.', text);
    this.newMessage.set('');
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }
}
