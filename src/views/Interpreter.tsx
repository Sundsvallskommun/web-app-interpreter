import { Translator } from "../components/translator/translator.component";

interface InterpreterProps {
  onRestart: () => void;
}

export const Interpreter: React.FC<InterpreterProps> = ({ onRestart }) => {
  return (
    <main className="w-[100svw] h-[100svh] flex flex-col justify-between px-48 max-h-[100svh] max-w-[100svw] overflow-hidden">
      <div className="pt-48 pb-24 h-1/2">
        <Translator id={2} />
      </div>
      <div className="pt-24 pb-48 h-1/2">
        <Translator id={1} onRestart={onRestart} />
      </div>
    </main>
  );
};
