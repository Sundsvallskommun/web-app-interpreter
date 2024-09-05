import { TypingSequence } from "@sk-web-gui/ai";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-row justify-center items-center font-display gap-8">
      <h1>Laddar den digitala tolken</h1>
      <TypingSequence />
    </div>
  );
};
