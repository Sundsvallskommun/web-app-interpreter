import { useAppStore } from "../../hooks/appStore";
import { useAutoTranslation } from "../../hooks/useAutoTranslation.hook";
import { Icon } from "@sk-web-gui/react";
import { TriangleAlert } from "lucide-react";

export const WarningBox: React.FC = () => {
  const [languages] = useAppStore((state) => [state.languages]);
  const language = languages[2].split("-")[0];
  const { t } = useAutoTranslation("common", {
    lng: language,
  });

  return (
    <div className="max-w-[580px] rounded-button px-24 pt-24 pb-32 w-full bg-warning-background-300">
      <div className="flex gap-10 w-full justify-center items-center">
        <Icon icon={<TriangleAlert />} />
        <h2>{t("common:warning_headline")}</h2>
      </div>
      <p className="text-large text-center">{t("common:warning_text")}</p>
    </div>
  );
};
