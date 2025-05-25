// app/components/TarefaCard.tsx
import { Tarefa, TarefaStatus } from '@/app/types/tarefa';

interface TarefaCardProps {
  tarefa: Tarefa;
  onEdit: (tarefa: Tarefa) => void;
  onDelete: (id: string) => void;
}

export function TarefaCard({ tarefa, onEdit, onDelete }: TarefaCardProps) {
  const statusColor = {
    [TarefaStatus.PENDENTE]: 'bg-red-200 text-red-800',
    [TarefaStatus.EM_ANDAMENTO]: 'bg-yellow-200 text-yellow-800',
    [TarefaStatus.CONCLUIDA]: 'bg-green-200 text-green-800',
  }[tarefa.status];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{tarefa.titulo}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {tarefa.status.charAt(0).toUpperCase() + tarefa.status.slice(1)}
        </span>
      </div>
      {tarefa.descricao && (
        <p className="text-gray-600 mb-3 text-sm">{tarefa.descricao}</p>
      )}
      <div className="text-xs text-gray-500 mb-3">
        <p>Criado em: {new Date(tarefa.dataCriacao).toLocaleDateString()}</p>
        {tarefa.dataConclusao && (
          <p>Concluído em: {new Date(tarefa.dataConclusao).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(tarefa)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(tarefa.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}