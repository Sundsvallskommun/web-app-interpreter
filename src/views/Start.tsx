import {
  Button,
  FormControl,
  FormLabel,
  Header,
  Icon,
} from "@sk-web-gui/react";
import { ArrowRight, TriangleAlert } from "lucide-react";
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

  const counterpartsLanguage = languages[2].split("-")[0];
  const { t, i18n } = useAutoTranslation();

  useEffect(() => {
    i18n.changeLanguage(counterpartsLanguage);
  }, [counterpartsLanguage, i18n]);

  return (
    <div className="w-full h-screen flex flex-col p-0 m-0 items-center">
      <Header
        title={t("common:digital_interpreter")}
        wrapperClasses="py-12 w-full"
        className="max-w-content"
      ></Header>
      <main className="max-w-content w-full flex flex-col mt-68 xs:gap-40 sm:gap-72 px-24 md:px-40 pb-40 items-center">
        <header className="w-full flex flex-col items-center gap-40 text-center">
          <h1 className="text-display-2-sm md:text-display-2-md xl:text-display-2-lg font-display">
            {t("common:digital_interpreter")}
          </h1>
          <span className="text-h4-sm md:text-h4-md lg:text-h4-lg font-header">
            {t("common:choose_languages")}
          </span>
        </header>
        <div className="flex gap-40 flex-col max-w-[580px] items-center w-full">
          <FormControl className="w-full">
            <FormLabel className="text-vattjom-text">
              {t("common:person_a")}
            </FormLabel>
            <LanguagePicker
              value={languages[1]}
              onSelect={(value) => setLanguage(1, value)}
            />
          </FormControl>

          <FormControl className="w-full">
            <FormLabel className="text-juniskar-text">
              {t("common:person_b")}
            </FormLabel>
            <LanguagePicker
              value={languages[2]}
              onSelect={(value) => setLanguage(2, value)}
            />
          </FormControl>
        </div>
        <div className="flex flex-col xs:gap-40 sm:gap-72">
          <Button
            size="lg"
            variant="primary"
            color="primary"
            rightIcon={<Icon icon={<ArrowRight />} />}
            onClick={() => onNext && onNext()}
            className="max-w-[580px] w-full xs:order-last sm:order-first"
          >
            {t("common:start")}
          </Button>

          <div className="max-w-[580px] rounded-button px-24 pt-24 pb-32 w-full bg-warning-background-300">
            <div className="flex gap-10 w-full justify-center items-center">
              <Icon icon={<TriangleAlert />} />
              <h2>{t("common:warning_headline")}</h2>
            </div>
            <p className="text-large text-center">{t("common:warning_text")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
