import { CreateSessionResponse, CreateSubSessionRequest } from '@app/core/models/session.model';

export interface LoadBalanceWarning {
  type: 'over-represented' | 'missing';
  subjectName: string;
  count?: number;
}

export interface Subject {
  id: string;
  name: string;
}

/**
 * Detect subjects appearing 4+ times in current week
 */
export function detectOverRepresentedSubjects(
  subSessions: CreateSubSessionRequest[],
  subjects: Subject[],
): LoadBalanceWarning[] {
  const subjectCounts = new Map<string, number>();

  subSessions.forEach((sub) => {
    if (sub.subjectId) {
      subjectCounts.set(sub.subjectId, (subjectCounts.get(sub.subjectId) || 0) + 1);
    }
  });

  const warnings: LoadBalanceWarning[] = [];
  subjectCounts.forEach((count, subjectId) => {
    if (count >= 4) {
      const subject = subjects.find((s) => s.id === subjectId);
      if (subject) {
        warnings.push({
          type: 'over-represented',
          subjectName: subject.name,
          count,
        });
      }
    }
  });

  return warnings;
}

/**
 * Detect subjects from previous weeks that are missing from current week
 */
export function detectMissingSubjects(
  currentSubSessions: CreateSubSessionRequest[],
  previousSessions: CreateSessionResponse[],
  subjects: Subject[],
  currentSessionId?: string,
): LoadBalanceWarning[] {
  const relevantSessions = currentSessionId
    ? previousSessions.filter((s) => s.weeklySession.id !== currentSessionId)
    : previousSessions;

  const previousSubjectIds = new Set<string>();
  relevantSessions.forEach((session) => {
    session.subSessions.forEach((sub) => {
      if (sub.subjectId) {
        previousSubjectIds.add(sub.subjectId);
      }
    });
  });

  const currentSubjectIds = new Set(
    currentSubSessions.map((sub) => sub.subjectId).filter((id) => id),
  );

  const warnings: LoadBalanceWarning[] = [];
  previousSubjectIds.forEach((subjectId) => {
    if (!currentSubjectIds.has(subjectId)) {
      const subject = subjects.find((s) => s.id === subjectId);
      if (subject) {
        warnings.push({
          type: 'missing',
          subjectName: subject.name,
        });
      }
    }
  });

  return warnings;
}

/**
 * Get all load balance warnings for current session
 */
export function getLoadBalanceWarnings(
  currentSubSessions: CreateSubSessionRequest[],
  previousSessions: CreateSessionResponse[],
  subjects: Subject[],
  currentSessionId?: string,
): LoadBalanceWarning[] {
  const overRepresented = detectOverRepresentedSubjects(currentSubSessions, subjects);
  const missing = detectMissingSubjects(
    currentSubSessions,
    previousSessions,
    subjects,
    currentSessionId,
  );
  return [...overRepresented, ...missing];
}

/**
 * Format warning message for display
 */
export function formatWarningMessage(warning: LoadBalanceWarning): string {
  if (warning.type === 'over-represented') {
    return `You have ${warning.count} ${warning.subjectName} sessions this week. Consider balancing your subjects.`;
  } else {
    return `You haven't scheduled any ${warning.subjectName} sessions this week.`;
  }
}
