import { Translator } from "../components/translator/translator.component";

interface InterpreterProps {
  onRestart: () => void;
}

export const Interpreter: React.FC<InterpreterProps> = ({ onRestart }) => {
  return (
    <main className="w-[100svw] h-[100svh] flex flex-col justify-between gap-40 max-h-[100svh] max-w-[100svw] overflow-hidden bg-primitives-gray-lightest dark:bg-black">
      <div className="h-1/2">
        <Translator id={2} />
      </div>
      <div className=" h-1/2">
        <Translator id={1} onRestart={onRestart} />
      </div>
    </main>
  );
};
