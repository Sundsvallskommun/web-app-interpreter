import { Divider } from "@sk-web-gui/react";
import { Suspense, useEffect, useState } from "react";
import { ChooseLanguage } from "../components/choose-language/choose-language.component";
import { LoadingScreen } from "../components/loading-screen/loading-screen.component";

interface StartProps {
  onNext: () => void;
}

export const Start: React.FC<StartProps> = ({ onNext }) => {
  const [ready, setReady] = useState<{ [user: number]: boolean }>({
    1: false,
    2: false,
  });

  useEffect(() => {
    if (ready[1] && ready[2]) {
      onNext && onNext();
    }
  }, [ready]);

  return (
    <div className="w-full h-screen max-h-screen flex flex-col p-0 m-0 items-center">
      <main className="max-w-content w-full h-full flex flex-col gap-24 md:gap-40 px-24 md:px-40 py-16 md:py-32 items-center">
        <div className="h-1/2 w-full rotate-180">
          <Suspense fallback={<LoadingScreen />}>
            <ChooseLanguage
              user={2}
              ready={ready[2]}
              onReady={() => setReady((ready) => ({ ...ready, 2: !ready[2] }))}
            />
          </Suspense>
        </div>

        <div className="w-full h-1">
          <Divider />
        </div>
        <div className="h-1/2 w-full">
          <Suspense fallback={<LoadingScreen />}>
            <ChooseLanguage
              user={1}
              ready={ready[1]}
              onReady={() => setReady((ready) => ({ ...ready, 1: !ready[1] }))}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
};
