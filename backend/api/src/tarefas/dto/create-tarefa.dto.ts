import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTarefaDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' }) // Garante que o título não seja vazio
  @IsString({ message: 'O título deve ser uma string.' }) // Garante que seja uma string
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres.' }) // Limita o tamanho de caracteres
  titulo: string;

  @IsOptional() // Indica que a descrição é opcional
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string; // Propriedade opcional
}
