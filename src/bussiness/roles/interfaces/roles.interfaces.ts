export interface Role {
  id?: string; // uuid
  createdAt?: string;
  Name: string;
  Description?: string;

  Checked?: boolean; //Only for UI
}
