export interface MeetTrack {
  id: number;
  customer_name: string;
  contact_name: string;
  designation: string;
  zone: string;
  location: string;
  spoc: string;
  requester: string;
  objective: string;
  remarks: string;
  status: Status;
  meeting_date?: Date | null;
}

export enum Status {
  APPROVED = "Approved",
  PROPOSED = "Proposed",
  DECLINED = "Declined",
}
