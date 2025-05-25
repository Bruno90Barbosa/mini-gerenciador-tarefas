// app/types/tarefa.ts
// Este enum e interface espelham os do backend para garantir compatibilidade de tipos
export enum TarefaStatus {
  PENDENTE = "pendente",
  EM_ANDAMENTO = "em andamento",
  CONCLUIDA = "concluída",
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  status: TarefaStatus;
  dataCriacao: string; // Vem como string (ISO 8601) do backend
  dataConclusao?: string; // Vem como string (ISO 8601) do backend
}
