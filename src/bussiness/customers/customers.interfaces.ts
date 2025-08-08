export interface Customer {
  id?: string;
  created_at?: string;
  Address?: string;
  AllowNotifications: boolean;
  Country: string;
  CustomerNumber?: string;
  CustomerNumberSeq?: number;
  Email: string;
  ExtNumber: string;
  FirstName: string;
  FullName: string;
  IntNumber: string | null;
  LastName: string;
  Municipality: string;
  Neighborhood: string;
  Notes: string;
  Phone: string;
  State: string;
  Status: boolean;
  StatusCreationId: number;
  Street: string;
  TotalOrders?: number;
  ZipCode: string;
}
