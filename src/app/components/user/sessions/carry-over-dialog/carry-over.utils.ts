import { CreateSubSessionRequest, MissedSubSession } from '@app/core/models/session.model';

export interface CarryOverItem extends MissedSubSession {
  selected: boolean;
}

export function mapMissedToCarryOverItems(missed: MissedSubSession[]): CarryOverItem[] {
  return missed.map((sub) => ({
    ...sub,
    selected: true,
  }));
}

export function carryOverItemsToSubSessionRequests(
  items: CarryOverItem[],
): CreateSubSessionRequest[] {
  return items
    .filter((item) => item.selected)
    .map((item) => ({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      subjectId: item.subjectId,
    }));
}
