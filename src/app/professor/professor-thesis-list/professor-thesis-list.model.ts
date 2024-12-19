export interface ProfessorThesisListResponseItem {
    id: number;
    title: string;
    studentFirstName: string;
    studentLastName: string;
}

export interface ReportResponseListItem {
    id: number;
    title: string;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    studentPhone: string;
    grade: number;
    numberOfMeetings: number;
    numberOfFiles: number;
}