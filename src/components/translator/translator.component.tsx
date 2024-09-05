import { useSpeechToTextTranslation } from "@sk-web-gui/ai";
import { useEffect, useRef, useState } from "react";
import { v4 as randomUUID } from "uuid";
import { useAppStore } from "../../hooks/appStore";
import { TranslatorFooter } from "./components/translator-footer.component";
import { TranslatorEntry } from "./components/translator-entry.component";
import { cx } from "@sk-web-gui/react";

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

  return (
    <div
      className="w-full h-full flex flex-col gap-0 rounded-cards shadow-100"
      style={{ transform: id === 2 ? "rotate(180deg)" : undefined }}
    >
      <ul
        className="grow mt-24 pl-24 pr-40 overflow-y-auto flex flex-col gap-24 pb-24"
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
