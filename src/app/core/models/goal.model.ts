export interface GoalData {
    title: string;
    hours: number;
    deadline: Date;
    subjectId: string;
}
export type GoalWithoutSubject = Omit<GoalData, 'subjectId'>;

export interface Goal {
  id: string
  title: string;
  targetHoursPerWeek: number;
  progress: number;
  deadline: string;
}

export interface GoalTask {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
}

export interface CreateGoalRequest {
  title: string;
  targetHoursPerWeek: number;
  progress: number;
  deadline: Date;
}   