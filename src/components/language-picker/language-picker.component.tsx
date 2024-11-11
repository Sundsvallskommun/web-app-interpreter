import { Combobox, cx } from "@sk-web-gui/react";
import { ChangeEvent, useState } from "react";
import languages from "../../assets/languagesbcp.json";

interface LanguagePickerProps {
  onSelect: (value: string) => void;
  value: string;
  rotate?: boolean;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  value: _value,
  readOnly,
  onSelect,
  rotate,
  size = "md",
}) => {
  const [value] = useState<string>(_value);
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
      onChange={handleSelect}
      className={cx(rotate ? "rotate-180" : "", "w-full")}
      size={size}
    >
      <Combobox.Input
        className={cx(
          "w-full",
          rotate ? "rotate-180 right-0 mr-[-50%] md:mr-[0]" : ""
        )}
        value={value}
        readOnly={readOnly}
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
            defaultChecked={value === language.code}
          >
            {language.name}
          </Combobox.Option>
        ))}

        {allLanguages.map((language) => (
          <Combobox.Option
            key={language.code}
            value={language.code}
            defaultChecked={value === language.code}
          >
            {language.name}
          </Combobox.Option>
        ))}
      </Combobox.List>
    </Combobox>
  );
};
