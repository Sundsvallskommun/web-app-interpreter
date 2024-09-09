import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Icon,
} from "@sk-web-gui/react";
import { ArrowRight, Check } from "lucide-react";
import { useAppStore } from "../../hooks/appStore";
import { useAutoTranslation } from "../../hooks/useAutoTranslation.hook";
import { Card } from "../card/card.component";
import { LanguagePicker } from "../language-picker/language-picker.component";

interface ChooseLanguageProps {
  user: 1 | 2;
  onReady: () => void;
  ready: boolean;
}

export const ChooseLanguage: React.FC<ChooseLanguageProps> = ({
  user,
  onReady,
  ready,
}) => {
  const [languages, setLanguage] = useAppStore((state) => [
    state.languages,
    state.setLanguage,
  ]);

  const myLanguage = languages[user].split("-")[0];

  const { t } = useAutoTranslation("common", { lng: myLanguage });

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <header className="w-full flex flex-col items-center gap-8 md:gap-40 text-center">
        <h1 className="text-display-2-sm md:text-display-2-md xl:text-display-2-lg font-display">
          {t("common:hi")}
        </h1>
        <span className="text-h4-sm md:text-h4-md lg:text-h4-lg font-header">
          {t("common:choose_language")}
        </span>
      </header>
      <div className="flex gap-40 flex-wrap items-center w-full">
        <Card className="bg-bjornstigen-background-100 grow shrink">
          <div>
            <Avatar
              initials={user === 1 ? "A" : "B"}
              color={user === 1 ? "bjornstigen" : "primary"}
              rounded
            />
          </div>
          <FormControl className="max-w-full pr-32">
            <FormLabel>{t("common:your_language")}</FormLabel>
            <LanguagePicker
              value={languages[user]}
              onSelect={(value) => setLanguage(user, value)}
              disabled={ready}
            />
          </FormControl>
        </Card>
      </div>
      <div className="w-full flex flex-col items-end gap-8">
        <Button
          size="lg"
          variant="primary"
          color={ready ? "success" : "vattjom"}
          aria-describedby={`ready-btn-desc-${user}`}
          rightIcon={<Icon icon={ready ? <Check /> : <ArrowRight />} />}
          onClick={() => onReady()}
          className="w-fit"
        >
          {t("common:start")}
        </Button>
        <div className="h-24" id={`ready-btn-desc-${user}`}>
          {ready && t("common:waiting_for_counterpart")}
        </div>
      </div>
    </div>
  );
};
