import { Component, input, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { lucideSend } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';

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
  template: `
    <div class="flex flex-col h-125 border border-border rounded-lg bg-card/30 mt-6">
      <!-- Chat Messages Area -->
      <div #scrollContainer class="flex-1 overflow-y-auto p-4 space-y-4">
        @for (msg of messages(); track msg.id) {
          <div
            class="flex"
            [ngClass]="{
              'justify-end': msg.userId === currentUserId(),
              'justify-start': msg.userId !== currentUserId(),
            }"
          >
            <div
              class="flex max-w-[75%] gap-2"
              [ngClass]="{ 'flex-row-reverse': msg.userId === currentUserId() }"
            >
              <div
                class="shrink-0 bg-muted flex items-center justify-center rounded-full h-8 w-8 text-xs font-medium mt-1"
              >
                {{ msg.userInitials }}
              </div>

              <div
                class="flex flex-col"
                [ngClass]="{ 'items-end': msg.userId === currentUserId() }"
              >
                <span class="text-xs text-muted-foreground mb-1 px-1">
                  {{ msg.userName }} &bull; {{ msg.timestamp | date: 'shortTime' }}
                </span>

                <div
                  class="px-4 py-2 rounded-2xl text-sm"
                  [ngClass]="{
                    'bg-primary text-primary-foreground rounded-tr-sm':
                      msg.userId === currentUserId(),
                    'bg-muted rounded-tl-sm': msg.userId !== currentUserId(),
                  }"
                >
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </div>
        } @empty {
          <div class="h-full flex items-center justify-center">
            <p class="text-muted-foreground text-sm">No messages yet. Say hi!</p>
          </div>
        }
      </div>

      <!-- Input Area -->
      <div class="p-3 border-t border-border bg-card rounded-b-lg flex gap-2">
        <input
          hlmInput
          class="flex-1"
          placeholder="Type a message..."
          [(ngModel)]="newMessage"
          (keyup.enter)="sendMessage()"
        />
        <button hlmBtn size="icon" (click)="sendMessage()" [disabled]="!newMessage().trim()">
          <ng-icon hlm name="lucideSend" size="sm"></ng-icon>
        </button>
      </div>
    </div>
  `,
})
export class GroupChatTabComponent implements AfterViewChecked {
  currentUserId = input.required<string>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  messages = signal<ChatMessage[]>([
    {
      id: '1',
      userId: 'user-2',
      userInitials: 'JD',
      userName: 'John Doe',
      content: 'Hey everyone! Excited to join this group.',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      userId: 'user-3',
      userInitials: 'AR',
      userName: 'Alice Ray',
      content: 'Welcome John! We usually meet on Fridays.',
      timestamp: new Date(Date.now() - 3500000),
    },
  ]);

  newMessage = signal('');

  sendMessage() {
    const text = this.newMessage().trim();
    if (!text) return;

    const msg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId: this.currentUserId(),
      userInitials: 'AM', // Mocking current user initials
      userName: 'Aymane M.', // Mocking current user name
      content: text,
      timestamp: new Date(),
    };

    this.messages.update((msgs) => [...msgs, msg]);
    this.newMessage.set('');
  }

  ngAfterViewChecked() {
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
