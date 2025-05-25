// app/components/TarefaForm.tsx
'use client'; // Marca este arquivo como um Client Component

import { useState, FormEvent } from 'react';
import { TarefaStatus } from '@/app/types/tarefa';

interface TarefaFormProps {
  onSubmit: (titulo: string, descricao: string) => Promise<void>; // Função que será chamada ao submeter
  isLoading: boolean; // Indica se a submissão está em andamento
}

export function TarefaForm({ onSubmit, isLoading }: TarefaFormProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    if (!titulo.trim()) return; // Não permite submeter se o título estiver vazio

    await onSubmit(titulo, descricao); // Chama a função onSubmit passada como prop

    // Limpa o formulário após a submissão (se bem-sucedida)
    setTitulo('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
          Título da Tarefa:
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // CLASSE ADICIONADA AQUI
          placeholder="Ex: Comprar mantimentos"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição (Opcional):
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" // CLASSE ADICIONADA AQUI
          placeholder="Detalhes sobre a tarefa..."
          disabled={isLoading}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={isLoading}
      >
        {isLoading ? 'Adicionando...' : 'Adicionar Tarefa'}
      </button>
    </form>
  );
}
