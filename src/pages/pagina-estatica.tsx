/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import axios from 'axios';
import { GetStaticProps } from 'next';

interface Cities {
  id: string;
  nome: string;
}

interface ListaProps {
  list: Array<Cities>;
}

export default function Lista({ list }: ListaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {list.map((city) => (
            <div data-list-item key={city.id}>
              {city.nome}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
  const cidades = res.data;

  const data = cidades.slice(0, 10);

  return {
    props: {
      list: data,
    },
    revalidate: 60,
  };
};
