import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { Account } from '@bussiness/users/interfaces/users.interfaces';

export interface SupportTicket {
  id?: string;
  TicketNumber?: string;
  AccountId: string;
  CreatedBy?: string | null;
  Title: string;
  Description: string;
  SupportTicketModuleId: number | null;
  StatusId: TicketStatusIdEnum | null;
  Priority: SupportTicketPriorityEnum | null;
  AssignedTo?: string | null;
  created_At: string;
  updated_At: string;
  resolved_At?: string | null;
  closed_At?: string | null;
  Deleted: boolean;
  OrganizationId: string;
}

export interface SupportTicketImage {
  id?: string | null;
  SupportTicketId: string;
  OrganizationId?: string | null;
  ImageUrl: string;
  UploadedAt: string;
  UploadedBy?: string | null;
}

export interface SupportTicketComment {
  id?: string;
  SupportTicketId: string;
  OrganizationId?: string | null;
  AuthorId: string;
  Comment: string;
  CreatedAt: string;
  Author?: Account; // For UI only
}

export interface SupportTicketStatus {
  id?: TicketStatusIdEnum; // Relación con el enum
  Name: string; // Nombre del estado (ej: "Open")
  Description: string; // Descripción (ej: "Ticket creado por el cliente y en espera de ser atendido")
}

export interface SupportTicketModule {
  id: number; // bigserial (autoincremental)
  Name: string; // varchar(100), requerido
  Code: string; // varchar(50), requerido, único
  Description?: string; // varchar(255), opcional
  Deleted: boolean; // boolean, por defecto false
}
