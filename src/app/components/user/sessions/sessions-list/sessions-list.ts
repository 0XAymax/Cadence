import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CreateSessionResponse,
  CreateSubSessionResponse,
} from '../../../../core/models/session.model';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import {
  LucideAngularModule,
  Clock,
  FileText,
  CheckCircle2,
  PlayCircle,
  Goal,
  ChevronDown,
} from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmBadgeImports,
    LucideAngularModule,
    HlmButtonImports,
    HlmAccordionImports,
  ],
  templateUrl: './sessions-list.html',
})
export class SessionsListComponent {
  sessions = input<CreateSessionResponse[]>([]);
  isLoadingSesions = input.required<boolean>();
  sessionClick = output<string>();
  startSession = output<string>();
  completeSession = output<string>();

  protected Clock = Clock;
  protected FileText = FileText;
  protected CheckCircle2 = CheckCircle2;
  protected PlayCircle = PlayCircle;
  protected Goal = Goal;
  protected ChevronDown = ChevronDown;

  getBadgeVariant(status: string): any {
    switch (status) {
      case 'COMPLETED':
      case 'CLOSED':
        return 'default';
      case 'INCOMPLETED':
        return 'destructive';
      case 'IN_PROGRESS':
        return 'secondary';
      case 'PENDING':
      default:
        return 'outline';
    }
  }

  onActionClick(
    event: Event,
    subSession: CreateSubSessionResponse,
    action: 'start' | 'complete' | 'view',
  ) {
    event.stopPropagation(); // Prevent card click
    if (action === 'start') {
      this.startSession.emit(subSession.id);
    } else if (action === 'complete') {
      this.completeSession.emit(subSession.id);
    } else if (action === 'view') {
      this.sessionClick.emit(subSession.id);
    }
  }
}
