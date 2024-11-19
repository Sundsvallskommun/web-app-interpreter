import { UserLanguage } from "@/src/hooks/appStore";
import { useAutoTranslation } from "../../../hooks/useAutoTranslation.hook";
import { User } from "@/src/types/user.type";
import { textToSpeech } from "@sk-web-gui/ai";
import { Button, Divider, Icon } from "@sk-web-gui/react";
import { X, Volume2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { v4 as randomUUID } from "uuid";

interface TranslatorRecordningProps {
  stop: () => void;
  start: () => void;
  transcript: string;
  setMessageId: Dispatch<SetStateAction<string>>;
  updateHistory: (
    user: User,
    origin: User,
    language: string,
    text: string,
    id: string
  ) => void;
  otherId: 1 | 2;
  id: 1 | 2;
  languages: UserLanguage;
  translation: string;
  messageId: string;
  done: boolean;
  reset: () => void;
  listening: boolean;
  setBusy: (user: User, busy: boolean) => void;
}

export const TranslatorRecording: React.FC<TranslatorRecordningProps> = ({
  start,
  stop,
  transcript,
  setMessageId,
  updateHistory,
  otherId,
  id,
  languages,
  translation,
  messageId,
  done,
  reset,
  listening,
  setBusy,
}) => {
  const { t } = useAutoTranslation("common", {
    lng: languages[id].split("-")[0],
  });

  const sendEntry = () => {
    if (transcript) {
      updateHistory(id, id, languages[id], transcript, messageId);
      if (!translation) {
        updateHistory(otherId, id, languages[otherId], "", messageId);
      }
      if (translation) {
        updateHistory(otherId, id, languages[otherId], translation, messageId);
      }
      if (done && !listening) {
        stop();
        reset();
        setMessageId(randomUUID());
        setBusy(id, false);
      }
    }
  };

  return (
    <div className="absolute z-50 flex justify-center pb-100 bg-transparent w-full bottom-0">
      <div className="max-w-[770px] w-full h-fit p-16 mb-40 bg-background-content dark:bg-background-100 rounded-button shadow-50 flex flex-col gap-24">
        <div className="flex justify-between gap-12">
          <div>
            <Button
              variant="tertiary"
              onClick={() =>
                textToSpeech(transcript, { language: languages[id] })
              }
              iconButton
            >
              <Icon icon={<Volume2 />} />
            </Button>
          </div>
          {transcript.length > 0 ? (
            <p className="max-w-[610px] w-full pt-12">{transcript}</p>
          ) : (
            <></>
          )}

          <div>
            <Button
              onClick={() => {
                stop();
                reset();
                setMessageId(randomUUID());
                setBusy(id, false);
              }}
              variant="ghost"
              iconButton
            >
              <Icon icon={<X />} />
            </Button>
          </div>
        </div>
        <div className="px-40 w-full flex flex-col gap-24">
          <div className="w-full flex justify-center">
            <Button
              onClick={() => {
                stop();
                reset();
                setMessageId(randomUUID());
                start();
              }}
              className="w-fit"
              variant="tertiary"
              disabled={transcript.length === 0}
            >
              {t("common:restart_recording")}
            </Button>
          </div>
          <Divider />
          <div className="w-full flex justify-center">
            <Button
              disabled={transcript.length === 0}
              onClick={sendEntry}
              className="w-full"
              variant="primary"
              color={id === 1 ? "vattjom" : "juniskar"}
            >
              {t("common:send_recording")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
