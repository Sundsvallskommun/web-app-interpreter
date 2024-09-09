import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Header,
  Icon,
} from "@sk-web-gui/react";
import { ArrowRight } from "lucide-react";
import { Card } from "../components/card/card.component";
import { LanguagePicker } from "../components/language-picker/language-picker.component";
import { useAppStore } from "../hooks/appStore";
import { useAutoTranslation } from "../hooks/useAutoTranslation.hook";
import { useEffect } from "react";

interface StartProps {
  onNext: () => void;
}

export const Start: React.FC<StartProps> = ({ onNext }) => {
  const [languages, setLanguage] = useAppStore((state) => [
    state.languages,
    state.setLanguage,
  ]);

  const myLanguage = languages[1].split("-")[0];
  const { t, i18n } = useAutoTranslation();

  useEffect(() => {
    i18n.changeLanguage(myLanguage);
  }, [myLanguage, i18n]);

  return (
    <div className="w-full h-screen flex flex-col p-0 m-0 items-center">
      <Header
        title={t("common:digital_interpreter")}
        wrapperClasses="py-12 w-full"
        className="max-w-content"
      ></Header>
      <main className="max-w-content w-full flex flex-col mt-68 gap-80 px-24 md:px-40 pb-40 items-center">
        <header className="w-full flex flex-col items-center gap-40 text-center">
          <h1 className="text-display-2-sm md:text-display-2-md xl:text-display-2-lg font-display">
            {t("common:hi")}
          </h1>
          <span className="text-h4-sm md:text-h4-md lg:text-h4-lg font-header">
            {t("common:choose_languages")}
          </span>
        </header>
        <div className="flex gap-40 flex-wrap items-center w-full">
          <Card className="bg-bjornstigen-background-100 grow shrink">
            <div>
              <Avatar initials="A" color="bjornstigen" rounded />
            </div>
            <FormControl className="max-w-full pr-32">
              <FormLabel>{t("common:your_language")}</FormLabel>
              <LanguagePicker
                value={languages[1]}
                onSelect={(value) => setLanguage(1, value)}
              />
            </FormControl>
          </Card>
          <Card className="bg-background-200 grow shrink">
            <div>
              <Avatar
                initials="B"
                className="text-light-primary bg-primary-surface "
                color="primary"
                rounded
              />
            </div>
            <FormControl className="max-w-full pr-32">
              <FormLabel>{t("common:counterpart_language")}</FormLabel>
              <LanguagePicker
                value={languages[2]}
                onSelect={(value) => setLanguage(2, value)}
              />
            </FormControl>
          </Card>
        </div>
        <Button
          size="lg"
          variant="primary"
          color="vattjom"
          rightIcon={<Icon icon={<ArrowRight />} />}
          onClick={() => onNext && onNext()}
          className="w-fit"
        >
          {t("common:start")}
        </Button>
      </main>
    </div>
  );
};
