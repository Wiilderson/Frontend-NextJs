/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { useForm } from 'react-hook-form';

interface IFormInput {
  name: string;
  email: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o usuário');
      }

      const result = await response.json();
      console.log('Usuário criado:', result);
      reset();
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao criar o usuário. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'O nome é obrigatório' })}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              {...register('email', {
                required: 'O e-mail é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Formato de e-mail inválido',
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <button type="submit" data-type="confirm">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
