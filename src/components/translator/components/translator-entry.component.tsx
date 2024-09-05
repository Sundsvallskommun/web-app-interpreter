import { InterpreterEntry } from "@/src/types/interpreter.type";
import { User } from "@/src/types/user.type";
import { textToSpeech, TypingBubble } from "@sk-web-gui/ai";
import { Avatar, Button, cx, Icon } from "@sk-web-gui/react";
import { useTranslation } from "react-i18next";
import { Volume2 } from "lucide-react";

interface TranslatorEntryProps {
  entry: InterpreterEntry;
  user: User;
  last?: boolean;
}

export const TranslatorEntry: React.FC<TranslatorEntryProps> = ({
  entry,
  user,
  last,
}) => {
  const { t } = useTranslation("translation", {
    lng: entry.language.split("-")[0],
  });

  return (
    <div
      className={cx(
        "flex rounded-button gap-40 p-16",
        "max-w-[85%]",
        entry.origin === 1
          ? "bg-background-200"
          : "bg-bjornstigen-background-100"
      )}
    >
      <div className="flex gap-16">
        {user !== entry.origin && (
          <div>
            <Avatar
              color={entry.origin === 1 ? "primary" : "bjornstigen"}
              initials={t("common:counterpart").charAt(0)}
              rounded
              size="md"
            />
          </div>
        )}
        <div className="flex flex-col gap-6">
          {user !== entry.origin && <small>{t("common:counterpart")}</small>}
          {entry.text}
          {last && !entry.text && <TypingBubble />}
        </div>
        {user !== entry.origin && (
          <div>
            <Button
              variant="tertiary"
              onClick={() =>
                textToSpeech(entry.text, { language: entry.language })
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
