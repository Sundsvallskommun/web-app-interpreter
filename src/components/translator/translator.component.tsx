import { useSpeechToTextTranslation } from "@sk-web-gui/ai";
import { cx } from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as randomUUID } from "uuid";
import { useAppStore } from "../../hooks/appStore";
import { getTranslation } from "../../services/azure.service";
import { TranslatorEntry } from "./components/translator-entry.component";
import { TranslatorFooter } from "./components/translator-footer.component";
import { TranslatorRecording } from "./components/translator-recording.component";

interface TranslatorProps {
  id: 1 | 2;
  onRestart?: () => void;
}

export const Translator: React.FC<TranslatorProps> = ({ id, onRestart }) => {
  const [languages, history, updateHistory, busy, setBusy] = useAppStore(
    (state) => [
      state.languages,
      state.history,
      state.updateHistoryEntry,
      state.busy,
      state.setBusy,
    ]
  );

  const otherId = id === 1 ? 2 : 1;
  const sourcelang = languages[id];
  const targetlang = languages[otherId].split("-")[0];

  const { t } = useTranslation("translation", {
    lng: id === 1 ? languages[1].split("-")[0] : languages[2].split("-")[0],
  });

  const scrollRef = useRef<HTMLUListElement>(null);

  const { transcript, translation, done, reset, start, stop, listening } =
    useSpeechToTextTranslation(sourcelang, targetlang, false);

  const [messageId, setMessageId] = useState<string>(randomUUID());

  useEffect(() => {
    if ((listening && !busy[id]) || (transcript.length > 0 && !busy[id])) {
      setBusy(id, true);
    }
  }, [listening]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, scrollRef]);

  useEffect(() => {
    const translatedHistory = history[id].filter(
      (entry) => entry.origin === otherId
    );
    if (translatedHistory?.length > 0) {
      for (let index = 0; index < translatedHistory.length; index++) {
        if (translatedHistory[0].language !== sourcelang) {
          getTranslation({
            text: [translatedHistory[index].text],
            sourcelanguage: translatedHistory[0].language,
            targetlanguage: sourcelang,
          }).then((res) => {
            if (res[0] !== translatedHistory[index].text) {
              updateHistory(
                id,
                otherId,
                sourcelang,
                res[0],
                translatedHistory[index].id
              );
            }
          });
        }
      }
    }
  }, [sourcelang]);

  return (
    <div
      className="w-full h-full flex flex-col relative gap-0 shadow-100 bg-background-content"
      style={{ transform: id === 2 ? "rotate(180deg)" : undefined }}
    >
      <div className="flex justify-end mt-24 pl-12 md:pl-24 pr-24 md:pr-40">
        <span
          className={`text-large font-bold ${
            id === 1 ? "text-vattjom-text" : "text-juniskar-text"
          }`}
        >
          {id === 1 ? t("common:person_a") : t("common:person_b")}
        </span>
      </div>
      <ul
        className="grow mt-12 pl-12 md:pl-24 pr-24 md:pr-40 overflow-y-auto flex flex-col gap-12 md:gap-24 pb-12 md:pb-24 pt-4"
        ref={scrollRef}
      >
        {busy[otherId] && (
          <li className={cx("w-full flex", "justify-start")}>
            <TranslatorEntry busy user={id === 1 ? 2 : 1} />
          </li>
        )}
        {history[id].map((entry) => (
          <li
            key={entry.id}
            className={cx(
              "w-full flex",
              id === entry.origin ? "justify-end" : "justify-start"
            )}
          >
            <TranslatorEntry entry={entry} user={id} />
          </li>
        ))}
      </ul>
      {listening || transcript.length > 0 ? (
        <TranslatorRecording
          stop={stop}
          start={start}
          transcript={transcript}
          setMessageId={setMessageId}
          updateHistory={updateHistory}
          otherId={otherId}
          id={id}
          languages={languages}
          translation={translation}
          messageId={messageId}
          done={done}
          reset={reset}
          listening={listening}
          setBusy={setBusy}
        />
      ) : (
        <></>
      )}

      <TranslatorFooter
        user={id}
        transcript={transcript}
        onClick={() => start()}
        listening={listening}
        busy={busy[otherId]}
        onRestart={onRestart}
        language={sourcelang.split("-")[0]}
      />
    </div>
  );
};
