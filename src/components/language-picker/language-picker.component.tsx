import { Combobox, cx } from "@sk-web-gui/react";
import { ChangeEvent } from "react";
import languages from "../../assets/languagesbcp.json";

interface LanguagePickerProps {
  onSelect: (value: string) => void;
  value: string;
  rotate?: boolean;
  size?: "sm" | "md" | "lg";
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  value,
  onSelect,
  rotate,
  size = "md",
}) => {
  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    onSelect(event.target.value);
  };

  const allLanguages = [
    ...languages.other.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : 0
    ),
  ];

  return (
    <Combobox
      multiple={false}
      onChange={(e) => handleSelect(e)}
      className={cx(rotate ? "rotate-180" : "", "w-full")}
      size={size}
    >
      <Combobox.Input
        className={cx(
          rotate ? "max-w-[10em] md:max-w-[12em] rotate-180" : "",
          "w-full"
        )}
        readOnly
        value={allLanguages.find((lng) => lng.code === value)?.name}
      />
      <Combobox.List
        className={cx(
          "w-full",
          rotate ? "rotate-180 right-0 mr-[-50%] md:mr-[0]" : ""
        )}
        size="lg"
      >
        {languages.suggested.map((language) => (
          <Combobox.Option
            key={language.code + "preferred"}
            value={language.code}
            checked={value === language.code}
          >
            {language.name}
          </Combobox.Option>
        ))}

        {allLanguages.map((language) => (
          <Combobox.Option
            key={language.code}
            value={language.code}
            checked={value === language.code}
          >
            {language.name}
          </Combobox.Option>
        ))}
      </Combobox.List>
    </Combobox>
  );
};
