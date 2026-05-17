import { Component, inject, input, output, signal , ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { SessionService } from '@app/core/services/session.service';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';
import { createMutation } from '@app/core/utils/mutation.helper';
import { ShareSessionRequest } from '@app/core/models/session.model';

import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-share-session-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmDialogImports,
    BrnDialogImports,
    HlmButtonImports,
    HlmLabelImports,
    HlmInputImports,
    FormRoot,
    FormField
],
  templateUrl: './share-session-dialog.html',
})
export class ShareSessionDialogComponent {
  readonly sessionService = inject(SessionService);
  state = input.required<'closed' | 'open'>();
  dialogStateChange = output<'closed' | 'open'>();
  confirmClick = output<string>();
  readonly sessions = this.sessionService.allSessions.data;
  readonly isLoading = this.sessionService.allSessions.isLoading;
  shareSessionModel = signal<{ sessionId: string, permission : 'VIEW_ONLY' | 'EDIT' }>({ sessionId: '', permission: 'VIEW_ONLY' });
  groupId = input.required<string>();

  shareSessionMutation = createMutation({
    mutationFn: (payload: ShareSessionRequest) => this.sessionService.shareSession(payload),
    onSuccess: () => {
      toast.success("Session shared successfully");
    },
    onError: (error) => {
      toast.error("Failed to share session", {description: error});
    }
  });

  shareSessionForm = form(
    this.shareSessionModel,
    (schema) => {
      required(schema.sessionId, { message: 'Session selection is required' });
    },
    {
      submission: {
        action: async () => {
          const payload = this.shareSessionModel();
          this.shareSessionMutation.mutate({...payload, groupId: this.groupId()});
          this.dialogStateChange.emit('closed');
        }
      }
    }
  )

  ngOnInit() {
    this.sessionService.loadAllSessions().subscribe();
  }

  selectedSessionId = signal('');

  closeDialog(ctx: any) {
    this.dialogStateChange.emit('closed');
    ctx.close();
  }
}
