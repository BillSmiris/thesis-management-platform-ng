export interface ProfessorMeetingListResponseItem {
    id: number;
    date: Date;
    agenda: string;
}

export interface CreateMeetingRequestModel {
    thesisId: number;
    agenda: string;
    date: Date;
}

export interface ProfessorMeetingInfoResponseModel {
    id: number;
    agenda: string;
    date: Date;
    notes: string;
}