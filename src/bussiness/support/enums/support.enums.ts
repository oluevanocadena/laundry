export enum TicketStatusIdEnum {
  Open = 1, // Ticket creado por el cliente y en espera de ser atendido
  InProgress = 2, // Ticket asignado y en proceso de atención
  Resolved = 3, // El problema fue resuelto por soporte
  Closed = 4, // El ticket fue cerrado por el cliente o el sistema
  Cancelled = 5, // El ticket fue cancelado antes de su resolución
}

export const TicketStatusLabels: Record<TicketStatusIdEnum, string> = {
  [TicketStatusIdEnum.Open]: 'Open',
  [TicketStatusIdEnum.InProgress]: 'In Progress',
  [TicketStatusIdEnum.Resolved]: 'Resolved',
  [TicketStatusIdEnum.Closed]: 'Closed',
  [TicketStatusIdEnum.Cancelled]: 'Cancelled',
};

export enum SupportTicketPriorityEnum {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const SupportTicketPriorityLabels: Record<SupportTicketPriorityEnum, string> = {
  [SupportTicketPriorityEnum.Low]: 'Low',
  [SupportTicketPriorityEnum.Medium]: 'Medium',
  [SupportTicketPriorityEnum.High]: 'High',
};
