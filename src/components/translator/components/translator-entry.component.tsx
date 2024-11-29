import { InterpreterEntry } from "@/src/types/interpreter.type";
import { User } from "@/src/types/user.type";
import { textToSpeech, TypingBubble } from "@sk-web-gui/ai";
import { Avatar, Button, cx, Icon } from "@sk-web-gui/react";
import { useTranslation } from "react-i18next";
import { Volume2 } from "lucide-react";

interface TranslatorEntryProps {
  entry?: InterpreterEntry;
  user: User;
  busy?: boolean;
}

export const TranslatorEntry: React.FC<TranslatorEntryProps> = ({
  entry,
  user,
  busy,
}) => {
  const { t } = useTranslation("translation", {
    lng: entry?.language?.split("-")[0],
  });

  return (
    <div
      className={cx(
        "flex rounded-button gap-20 md:gap-40 p-12 shadow-50 bg-background-content dark:bg-background-100",
        "max-w-full md:max-w-[85%]"
      )}
    >
      <div className="flex gap-16">
        <div>
          <Avatar
            color={(entry?.origin ?? user) === 1 ? "vattjom" : "juniskar"}
            initials={(entry?.origin ?? user) === 1 ? "A" : "B"}
            rounded
            size="md"
          />
        </div>
        <div className="flex flex-col gap-6">
          {(entry?.origin ?? user) === 1 ? (
            <p className="font-bold text-vattjom-text">
              {t("common:person_a")}
            </p>
          ) : (
            <p className="font-bold text-juniskar-text">
              {t("common:person_b")}
            </p>
          )}
          {busy ? <TypingBubble /> : entry ? entry.text : ""}
        </div>
        {!busy && user !== entry?.origin && (
          <div>
            <Button
              variant="tertiary"
              onClick={() =>
                textToSpeech(entry?.text, { language: entry.language })
              }
              iconButton
            >
              <Icon icon={<Volume2 />} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
