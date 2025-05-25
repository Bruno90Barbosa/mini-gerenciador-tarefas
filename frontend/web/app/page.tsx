// src/app/page.tsx
'use client';

import api from '@/app/lib/api';
import { Tarefa, TarefaStatus } from '@/app/types/tarefa';
import { TarefaCard } from '@/app/components/TarefaCard';
import { TarefaForm } from '@/app/components/TarefaForm';
import { EditTarefaModal } from '@/app/components/EditTarefaModal'; // <-- NOVA IMPORTAÇÃO AQUI!
import { useState, useEffect } from 'react';

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // NOVOS ESTADOS PARA O MODAL DE EDIÇÃO:
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState<Tarefa | null>(null);

  const fetchTarefas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Tarefa[]>('/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      setTarefas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchTarefas();
  }, []);

  const handleCreateTarefa = async (titulo: string, descricao: string) => {
    setIsLoading(true);
    try {
      const newTarefa = await api.post<Tarefa>('/tarefas', { titulo, descricao });
      setTarefas((prevTarefas) => [...prevTarefas, newTarefa.data]);
      console.log('Tarefa criada:', newTarefa.data);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // FUNÇÃO handleEdit ATUALIZADA PARA ABRIR O MODAL:
  const handleEdit = (tarefa: Tarefa) => {
    setSelectedTarefa(tarefa);
    setIsModalOpen(true);
  };

  // NOVA FUNÇÃO handleSaveEdit PARA SALVAR AS ALTERAÇÕES VIA API:
  const handleSaveEdit = async (id: string, titulo: string, descricao: string, status: TarefaStatus) => {
    setIsLoading(true);
    try {
      const updatedTarefa = await api.put<Tarefa>(`/tarefas/${id}`, { titulo, descricao, status });
      setTarefas((prevTarefas) =>
        prevTarefas.map((t) => (t.id === id ? updatedTarefa.data : t))
      );
      console.log('Tarefa atualizada:', updatedTarefa.data);
      setIsModalOpen(false); // Fecha o modal após salvar com sucesso
      setSelectedTarefa(null); // Limpa a tarefa selecionada
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }
    setIsLoading(true);
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas((prevTarefas) => prevTarefas.filter((t) => t.id !== id));
      console.log(`Tarefa com ID ${id} excluída.`);
    } catch (error) {
      console.error(`Erro ao excluir tarefa com ID ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Meu Gerenciador de Tarefas
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Adicionar Nova Tarefa</h2>
          <TarefaForm onSubmit={handleCreateTarefa} isLoading={isLoading} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Minhas Tarefas</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Carregando tarefas...</p>
          ) : tarefas.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhuma tarefa encontrada. Crie uma nova!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tarefas.map((tarefa) => (
                <TarefaCard
                  key={tarefa.id}
                  tarefa={tarefa}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* INCLUSÃO DO MODAL DE EDIÇÃO AQUI: */}
      <EditTarefaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTarefa(null); // Limpa a tarefa selecionada ao fechar
        }}
        tarefa={selectedTarefa}
        onSave={handleSaveEdit} // Passa a nova função de salvar edição
        isLoading={isLoading}
      />
    </div>
  );
}