// src/tarefas/tarefas.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './interfaces/tarefa.interface';
import { FilterTarefaDto } from './dto/filter-tarefa.dto';

@Controller('tarefas') // Define o prefixo da rota para todos os endpoints neste controller: /tarefas
export class TarefasController {
  constructor(private tarefasService: TarefasService) {} // Injeta o TarefasService

  // Endpoint para listar todas as tarefas ou filtrar por status
  // GET /tarefas ou GET /tarefas?status=pendente
  @Get()
  getAllTarefas(@Query() filterDto: FilterTarefaDto): Tarefa[] {
    return this.tarefasService.getAllTarefas(filterDto);
  }

  // Endpoint para buscar uma tarefa específica por ID
  // GET /tarefas/:id
  @Get(':id') // :id indica um parâmetro de rota
  getTarefaById(@Param('id') id: string): Tarefa {
    // @Param('id') extrai o ID da URL
    return this.tarefasService.getTarefaById(id);
  }

  // Endpoint para criar uma nova tarefa
  // POST /tarefas
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna status 201 Created em caso de sucesso
  createTarefa(@Body() createTarefaDto: CreateTarefaDto): Tarefa {
    // @Body() extrai o corpo da requisição e valida com o DTO
    return this.tarefasService.createTarefa(createTarefaDto);
  }

  // Endpoint para atualizar uma tarefa existente por ID
  // PUT /tarefas/:id
  @Put(':id')
  updateTarefa(
    @Param('id') id: string,
    @Body() updateTarefaDto: UpdateTarefaDto,
  ): Tarefa {
    return this.tarefasService.updateTarefa(id, updateTarefaDto);
  }

  // Endpoint para excluir uma tarefa por ID
  // DELETE /tarefas/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna status 204 No Content em caso de sucesso (comum para DELETE)
  deleteTarefa(@Param('id') id: string): void {
    this.tarefasService.deleteTarefa(id);
  }
}
