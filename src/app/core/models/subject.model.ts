export enum SubjectPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface SubjectData {
    subjectName: string;
    subjectDescription: string;
    subjectPriority: SubjectPriority;
}