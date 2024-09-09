import { TypingSequence } from "@sk-web-gui/ai";

interface LoadingScreenProps {
  text?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  text = "Laddar den digitala tolken",
}) => {
  return (
    <div className="h-full w-full flex flex-row justify-center items-center font-display gap-8">
      <h1>{text}</h1>
      <TypingSequence />
    </div>
  );
};
