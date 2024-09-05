import { useState } from "react";
import { Interpreter } from "./Interpreter";
import { useAppStore } from "../hooks/appStore";
import { Start } from "./Start";

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const reset = useAppStore((state) => state.reset);

  const handleRestart = () => {
    reset();
    setPage(0);
  };

  const pages = [
    <Start onNext={() => setPage(1)} />,
    <Interpreter onRestart={handleRestart} />,
  ];

  return <div className="w-full h-full overflow-x-hidden">{pages[page]}</div>;
};
