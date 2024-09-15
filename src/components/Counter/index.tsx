import { memo, useEffect, useState } from 'react';

import eventEmitter from '@/utils/eventEmitter';

interface CounterProps {
  initialCount: number;
  onUnmount: () => void;
}

export function Counter({ initialCount, onUnmount }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    eventEmitter.emit('onCounterMount', { count });

    return () => {
      eventEmitter.emit('onCounterUnmount', { count });
    };
  }, []);

  useEffect(() => {
    if (count > 0) {
      eventEmitter.emit('onCounterUpdate', count);
    }

    if (count === 10) {
      onUnmount();
      // Reinicia o contador para não manter o valor 10
    }
  }, [count, initialCount]);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Incrementar</button>
    </div>
  );
}

export const Counters = memo(Counter);
