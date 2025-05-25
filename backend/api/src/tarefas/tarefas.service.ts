// src/tarefas/tarefas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; // Importa a função v4 do pacote uuid para gerar IDs
import { Tarefa, TarefaStatus } from './interfaces/tarefa.interface';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { FilterTarefaDto } from './dto/filter-tarefa.dto';

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = []; // Array para armazenar as tarefas em memória

  // Método para buscar todas as tarefas, opcionalmente filtrando por status
  getAllTarefas(filterDto: FilterTarefaDto): Tarefa[] {
    const { status } = filterDto;

    // Se um status for fornecido no filtro, filtra as tarefas por ele
    if (status) {
      return this.tarefas.filter((tarefa) => tarefa.status === status);
    }

    // Se nenhum status for fornecido, retorna todas as tarefas
    return this.tarefas;
  }

  // Método para buscar uma tarefa por ID
  getTarefaById(id: string): Tarefa {
    const found = this.tarefas.find((tarefa) => tarefa.id === id);

    // Se a tarefa não for encontrada, lança uma exceção NotFoundException
    if (!found) {
      throw new NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
    }

    return found;
  }

  // Método para criar uma nova tarefa
  createTarefa(createTarefaDto: CreateTarefaDto): Tarefa {
    const { titulo, descricao } = createTarefaDto;

    const tarefa: Tarefa = {
      id: uuid(), // Gera um ID único para a tarefa
      titulo,
      descricao: descricao || '', // Garante que a descrição seja uma string vazia se não for fornecida
      status: TarefaStatus.PENDENTE, // Toda nova tarefa começa como PENDENTE
      dataCriacao: new Date(),
      dataConclusao: undefined, // Inicialmente sem data de conclusão
    };

    this.tarefas.push(tarefa); // Adiciona a nova tarefa ao array
    return tarefa;
  }

  // Método para atualizar uma tarefa existente
  updateTarefa(id: string, updateTarefaDto: UpdateTarefaDto): Tarefa {
    let tarefa = this.getTarefaById(id); // Busca a tarefa existente

    const { titulo, descricao, status } = updateTarefaDto;

    // Atualiza o título se fornecido
    if (titulo) {
      tarefa.titulo = titulo;
    }

    // Atualiza a descrição se fornecida
    if (descricao !== undefined) {
      // Permite atualizar para string vazia
      tarefa.descricao = descricao;
    }

    // Atualiza o status se fornecido
    if (status && tarefa.status !== status) {
      // Só atualiza se o status for diferente
      tarefa.status = status;
      // Se o status for CONCLUIDA, define a dataConclusao
      if (status === TarefaStatus.CONCLUIDA) {
        tarefa.dataConclusao = new Date();
      } else {
        tarefa.dataConclusao = undefined; // Limpa a data se o status mudar de CONCLUIDA
      }
    }

    // Se o status for alterado para CONCLUIDA e dataConclusao não estiver definida, defina-a
    // Isso garante que se a tarefa foi "concluída" e depois alterada para outro status
    // e depois voltada para "concluída" de novo, a data de conclusão seja atualizada.
    if (tarefa.status === TarefaStatus.CONCLUIDA && !tarefa.dataConclusao) {
      tarefa.dataConclusao = new Date();
    }

    // Atualiza a tarefa no array (encontrando e substituindo)
    this.tarefas = this.tarefas.map((t) => (t.id === id ? tarefa : t));
    return tarefa;
  }

  // Método para excluir uma tarefa
  deleteTarefa(id: string): void {
    const found = this.getTarefaById(id); // Garante que a tarefa existe antes de tentar excluir
    this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== found.id); // Remove a tarefa do array
  }
}
