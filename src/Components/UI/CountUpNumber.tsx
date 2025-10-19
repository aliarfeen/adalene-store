
import React, { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number; // seconds
}

const CountUpNumber: React.FC<Props> = ({ value, duration = 1.5 }) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = display;
    const diff = value - from;
    const ms = duration * 1000;

    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const cur = Math.round(from + diff * p);
      setDisplay(cur);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display}</>;
};

export default CountUpNumber;
