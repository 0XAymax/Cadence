export interface GoalData {
    title: string;
    hours: number;
    deadline: Date;
    subjectId: string;
}
export type GoalWithoutSubject = Omit<GoalData, 'subjectId'>;