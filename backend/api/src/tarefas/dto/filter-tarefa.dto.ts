// src/tarefas/dto/filter-tarefa.dto.ts
import { IsOptional, IsEnum } from 'class-validator';
import { TarefaStatus } from '../interfaces/tarefa.interface';

export class FilterTarefaDto {
  @IsOptional()
  @IsEnum(TarefaStatus, {
    message:
      'Status para filtro inválido. Valores permitidos: pendente, em andamento, concluída.',
  })
  status?: TarefaStatus;
}
