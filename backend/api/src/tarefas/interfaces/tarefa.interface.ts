// src/tarefas/interfaces/tarefa.interface.ts
export enum TarefaStatus {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em andamento',
  CONCLUIDA = 'concluída',
}

export interface Tarefa {
  id: string; // UUID para gerar IDs únicos
  titulo: string;
  descricao?: string; // O `?` indica que é opcional
  status: TarefaStatus;
  dataCriacao: Date;
  dataConclusao?: Date; // Opcional, preenchida quando o status muda para "concluída"
}
