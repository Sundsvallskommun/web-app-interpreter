import { User } from "@/src/types/user.type";
import { Button, cx, Icon, useThemeQueries } from "@sk-web-gui/react";
import { Mic, Pause } from "lucide-react";
import { useAppStore } from "../../../hooks/appStore";
import { useAutoTranslation } from "../../../hooks/useAutoTranslation.hook";
import { LanguagePicker } from "../../language-picker/language-picker.component";

interface TranslatorFooterProps {
  user: User;
  listening?: boolean;
  busy?: boolean;
  onClick?: () => void;
  onRestart?: () => void;
  language?: string;
}

export const TranslatorFooter: React.FC<TranslatorFooterProps> = ({
  user,
  listening,
  busy,
  onClick,
  onRestart,
  language = "sv",
}) => {
  const [languages, setLanguage] = useAppStore((state) => [
    state.languages,
    state.setLanguage,
  ]);

  const { t } = useAutoTranslation("common", { lng: language });

  const { isMaxSmallDevice } = useThemeQueries();

  const sourcelang = languages[user];

  const handleSelect = (value: string) => {
    setLanguage(user, value);
  };
  return (
    <footer
      className={cx(
        "flex-wrap md:flex-nowrap justify-center md:justify-between w-full grow-0 gap-16 shrink-0 rounded-b-cards flex  items-end pt-16 pb-24 px-24 border-t-divider border-t-1"
      )}
    >
      <div
        className={cx(
          "flex md:hidden w-full grow flex-col justify-center items-center gap-4 text-center"
        )}
      >
        <Button
          size={isMaxSmallDevice ? "md" : "lg"}
          rounded
          color="vattjom"
          iconButton
          className={cx(
            !isMaxSmallDevice ? "!h-54 !w-54 !max-w-54 !max-h-54" : ""
          )}
          disabled={busy}
          onClick={() => onClick()}
        >
          <Icon icon={listening ? <Pause /> : <Mic />} />
        </Button>
        <span className="text-small text-body">
          {busy
            ? t("common:waiting_for_counterpart")
            : listening
            ? t("common:press_to_paus")
            : t("common:press_to_talk")}
        </span>
      </div>
      <div className="w-[12em] flex justify-center md:justify-start">
        <LanguagePicker
          value={sourcelang}
          onSelect={handleSelect}
          rotate
          size={isMaxSmallDevice ? "sm" : "md"}
        />
      </div>
      <div
        className={cx(
          "hidden md:flex grow flex-col justify-center items-center gap-8 text-center"
        )}
      >
        <Button
          size={isMaxSmallDevice ? "md" : "lg"}
          rounded
          color="vattjom"
          iconButton
          className={cx(
            !isMaxSmallDevice ? "!h-54 !w-54 !max-w-54 !max-h-54" : ""
          )}
          disabled={busy}
          onClick={() => onClick()}
        >
          <Icon icon={listening ? <Pause /> : <Mic />} />
        </Button>
        <span className="text-base text-body">
          {busy
            ? t("common:waiting_for_counterpart")
            : listening
            ? t("common:press_to_paus")
            : t("common:press_to_talk")}
        </span>
      </div>
      <div
        className={cx(
          user !== 1 && isMaxSmallDevice ? "hidden" : "flex",
          "w-[12em] justify-center md:justify-end"
        )}
      >
        {user === 1 && (
          <Button
            variant="tertiary"
            onClick={onRestart}
            size={isMaxSmallDevice ? "sm" : "md"}
          >
            {t("common:quit")}
          </Button>
        )}
      </div>
    </footer>
  );
};
