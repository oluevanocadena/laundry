import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicketPriority } from '@bussiness/support/types/support.types';

export interface SupportTicket {
  id: string;
  AccountId: string;
  CreatedBy?: string | null;
  Title: string;
  Description: string;
  StatusId: TicketStatusIdEnum;
  Priority: SupportTicketPriority;
  AssignedTo?: string | null;
  created_At: Date;
  updated_At: Date;
  resolved_At?: Date | null;
  closed_At?: Date | null;
  Deleted: boolean;
  OrganizationId: string;
}

export interface SupportTicketImage {
  id: string;
  SupportTicketId: string;
  OrganizationId?: string | null;
  ImageUrl: string;
  UploadedAt: Date;
  UploadedBy?: string | null;
}

export interface SupportTicketComment {
  id: string;
  SupportTicketId: string;
  OrganizationId?: string | null;
  AuthorId: string;
  Comment: string;
  CreatedAt: Date;
}

export interface SupportTicketStatus {
  id: TicketStatusIdEnum; // Relación con el enum
  Name: string; // Nombre del estado (ej: "Open")
  Description: string; // Descripción (ej: "Ticket creado por el cliente y en espera de ser atendido")
}
