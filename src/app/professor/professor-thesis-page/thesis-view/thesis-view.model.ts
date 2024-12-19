export interface ProfessorThesisResponseModel {
    id: number;
    title: string;
    startDate: Date;
    programmingLanguages: string[];
    technologies: string[];
    finalGrade: number;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    studentPhoneNumber: string;
}

export interface ProfessorGradeThesisRequestModel {
    id: number;
    grade: number;
}