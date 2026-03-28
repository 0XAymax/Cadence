import { Component, input, output, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { FeedSharedSession } from '../../../../core/models/group.model';

@Component({
  selector: 'app-group-feed-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmCardImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmInputImports,
    DatePipe,
  ],
  templateUrl: './group-feed-card.html',
})
export class GroupFeedCardComponent {
  session = input.required<FeedSharedSession>();
  addComment = output<{ sessionId: string; content: string }>();

  showComments = signal(false);
  newComment = signal('');

  toggleComments() {
    this.showComments.update((v) => !v);
  }

  submitComment() {
    if (this.newComment().trim()) {
      this.addComment.emit({ sessionId: this.session().id, content: this.newComment() });
      this.newComment.set('');
    }
  }
}
