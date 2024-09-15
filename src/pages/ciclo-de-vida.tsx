/**
 * Ciclo de Vida
 *
 * - No evento de montagem deste component, deve ser registrados os seguintes events listeners:
 *  	- onCounterMount
 * 		- onCounterUnmount
 * 		- onCounterUpdate
 * - Os eventos devem ser disparados no componente Counter, seguindo o ciclo de vida do mesmo
 * - Ao atualizar o contador, deverá ser passado o valor atualizado no evento onCounterUpdate, e quando o valor
 * 		chegar a 10, o Counter deve ser desmontado.
 *
 * (Opcional)
 * - Ao observar os eventos, você verá que eles são disparados mais de uma vez, isso acontece porque o componente
 * 		Counter é desmontado e montado novamente, e os eventos são registrados novamente, isto é um problema comum
 * 		no nextjs, você deve resolver este problema.
 */

import { GetServerSideProps } from 'next/types';

import styles from '@/styles/ciclo-de-vida.module.css';
import { Counters } from '@/components/Counter';
import { useEffect, useState } from 'react';
import eventEmitter from '@/utils/eventEmitter';

export default function CicloDeVida() {
  const [showCounter, setShowCounter] = useState(false);

  function handleOcultCounterClick() {
    setShowCounter((prevState) => !prevState);
  }

  function handleUnmount() {
    setShowCounter(false);
  }

  useEffect(() => {
    function handleCounterMount(data: any) {
      console.log('onCounterMount', data);
    }

    function handleCounterUnmount(data: any) {
      console.log('onCounterUnmount', data);
    }

    function handleCounterUpdate(data: any) {
      console.log('onCounterUpdate - count:', data);
    }

    eventEmitter.on('onCounterMount', handleCounterMount);
    eventEmitter.on('onCounterUnmount', handleCounterUnmount);
    eventEmitter.on('onCounterUpdate', handleCounterUpdate);

    return () => {
      eventEmitter.off('onCounterMount', handleCounterMount);
      eventEmitter.off('onCounterUnmount', handleCounterUnmount);
      eventEmitter.off('onCounterUpdate', handleCounterUpdate);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <button type="button" onClick={handleOcultCounterClick}>
          {showCounter ? 'Ocultar contador' : 'Mostrar contador'}
        </button>

        {showCounter && (
          <>
            <h1>Exemplo de Ciclo de vida</h1>

            <div data-content>
              <Counters initialCount={0} onUnmount={handleUnmount} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
