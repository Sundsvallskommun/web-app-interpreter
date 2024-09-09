import { useSpeechToTextTranslation } from "@sk-web-gui/ai";
import { useEffect, useRef, useState } from "react";
import { v4 as randomUUID } from "uuid";
import { useAppStore } from "../../hooks/appStore";
import { TranslatorFooter } from "./components/translator-footer.component";
import { TranslatorEntry } from "./components/translator-entry.component";
import { cx } from "@sk-web-gui/react";
import { getTranslation } from "../../services/azure.service";

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

  const scrollRef = useRef<HTMLUListElement>(null);

  const { transcript, translation, done, reset, start, stop, listening } =
    useSpeechToTextTranslation(sourcelang, targetlang, false);

  const [messageId, setMessageId] = useState<string>(randomUUID());

  useEffect(() => {
    if (transcript) {
      updateHistory(id, id, languages[id], transcript, messageId);
      if (!translation) {
        updateHistory(otherId, id, languages[otherId], "", messageId);
      }
    }
  }, [transcript]);

  useEffect(() => {
    if (translation) {
      updateHistory(otherId, id, languages[otherId], translation, messageId);
    }
  }, [translation]);

  useEffect(() => {
    if (done && !listening) {
      reset();
      setMessageId(randomUUID());
    }
  }, [done, listening]);

  useEffect(() => {
    if (listening && !busy[id]) {
      setBusy(id, true);
    } else if (!listening && busy[id]) {
      setBusy(id, false);
    }
  }, [listening]);

  useEffect(() => {
    if (listening && !busy[id]) {
      stop();
    }
  }, [busy]);

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
      className="w-full h-full flex flex-col gap-0 rounded-cards shadow-100"
      style={{ transform: id === 2 ? "rotate(180deg)" : undefined }}
    >
      <ul
        className="grow mt-12 md:mt-24 pl-12 md:pl-24 pr-24 md:pr-40 overflow-y-auto flex flex-col gap-12 md:gap-24 pb-12 md:pb-24"
        ref={scrollRef}
      >
        {history[id].map((entry, index) => (
          <li
            key={entry.id}
            className={cx(
              "w-full flex",
              id === entry.origin ? "justify-end" : "justify-start"
            )}
          >
            <TranslatorEntry
              entry={entry}
              user={id}
              last={index === history[id].length - 1}
            />
          </li>
        ))}
      </ul>
      <TranslatorFooter
        user={id}
        onClick={() => (listening ? stop() : start())}
        listening={listening}
        busy={busy[otherId]}
        onRestart={onRestart}
        language={sourcelang.split("-")[0]}
      />
    </div>
  );
};
