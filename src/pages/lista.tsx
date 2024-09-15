/**
 * Lista
 *
 * - Primeiramente vá até /src/pages/api/users/index.ts e implemente a API
 * - Obter a lista de usuários da API
 * - Renderizar a lista de usuários
 */

import { useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { IUser } from '@/types/user';

export default function Lista() {
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUsersList() {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();

      if (!response.ok) throw new Error('Erro ao obter os dados');

      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar lista de usuários:', error);
    }
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de usuários</h2>

        <div data-list-container>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} data-list-item>
                ID: {user.id} <br />
                Nome: {user.name} <br />
                Email: {user.email}
              </div>
            ))
          ) : (
            <p>Carregando usuários...</p>
          )}
        </div>
      </div>
    </div>
  );
}
