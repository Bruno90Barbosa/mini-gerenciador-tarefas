// src/tarefas/dto/update-tarefa.dto.ts
// src/tarefas/dto/update-tarefa.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // Importe PartialType
import { IsOptional, IsEnum } from 'class-validator';
import { TarefaStatus } from '../interfaces/tarefa.interface';
import { CreateTarefaDto } from './create-tarefa.dto';

// UpdateTarefaDto herda de CreateTarefaDto, mas torna todas as suas propriedades opcionais
export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
  @IsOptional()
  @IsEnum(TarefaStatus, {
    message:
      'Status inválido. Valores permitidos: pendente, em andamento, concluída.',
  })
  status?: TarefaStatus;
}
