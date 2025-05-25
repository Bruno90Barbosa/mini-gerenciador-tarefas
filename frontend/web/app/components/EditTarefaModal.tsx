// src/app/components/EditTarefaModal.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Tarefa, TarefaStatus } from '@/app/types/tarefa';

interface EditTarefaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarefa: Tarefa | null; // A tarefa a ser editada
  onSave: (id: string, titulo: string, descricao: string, status: TarefaStatus) => Promise<void>;
  isLoading: boolean;
}

export function EditTarefaModal({ isOpen, onClose, tarefa, onSave, isLoading }: EditTarefaModalProps) {
  const [titulo, setTitulo] = useState(tarefa?.titulo || '');
  const [descricao, setDescricao] = useState(tarefa?.descricao || '');
  const [status, setStatus] = useState<TarefaStatus>(tarefa?.status || TarefaStatus.PENDENTE);

  // Atualiza os estados locais quando a tarefa prop muda
  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao || '');
      setStatus(tarefa.status);
    }
  }, [tarefa]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!tarefa || !titulo.trim()) return;

    await onSave(tarefa.id, titulo, descricao, status);
    // onClose(); // Fechar o modal após salvar é opcional, dependendo do UX desejado
  };

  if (!isOpen) return null; // Se isOpen for false, o modal não é renderizado

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Editar Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-titulo" className="block text-sm font-medium text-gray-700">
              Título:
            </label>
            <input
              type="text"
              id="edit-titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // CLASSE ADICIONADA AQUI
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="edit-descricao" className="block text-sm font-medium text-gray-700">
              Descrição:
            </label>
            <textarea
              id="edit-descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // CLASSE ADICIONADA AQUI
              disabled={isLoading}
            ></textarea>
          </div>
          <div>
            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TarefaStatus)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // CLASSE ADICIONADA AQUI
              disabled={isLoading}
            >
              {Object.values(TarefaStatus).map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-200"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
