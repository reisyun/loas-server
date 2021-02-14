export interface EditHistoryPort {
  executorId: string;
  historyId: string;
  repeat?: number;
  secret?: boolean;
  completedAt?: Date;
}
