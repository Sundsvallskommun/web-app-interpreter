import { useEffect, useState } from "react";
import {
  FallbackNs,
  useTranslation,
  UseTranslationOptions,
} from "react-i18next";
import { getTranslation } from "../services/azure.service";
import { FlatNamespace, KeyPrefix } from "i18next";
import { $Tuple } from "react-i18next/helpers";

export const useAutoTranslation = <
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  ns?: string | string[],
  options?: UseTranslationOptions<KPrefix>
) => {
  const [ready, setReady] = useState<boolean>(true);

  const { t, i18n, ready: _ready } = useTranslation(ns, options);
  const language = options?.lng || i18n.language;

  useEffect(() => {
    if (
      !i18n.languages.includes(language) ||
      language !== i18n.resolvedLanguage
    ) {
      const namespaces = Object.keys(i18n.getDataByLanguage("en"));

      for (let index = 0; index < namespaces.length; index++) {
        const namespace = i18n.getResourceBundle("en", namespaces[index]);

        getTranslation({
          text: Object.values(namespace),
          sourcelanguage: "en",
          targetlanguage: language,
        })
          .then((res) => {
            setReady(false);
            const newLanguage = res.reduce((newNamespace, text, index) => {
              return { ...newNamespace, [Object.keys(namespace)[index]]: text };
            }, {});
            i18n.addResourceBundle(language, namespaces[index], newLanguage);
            setReady(true);
          })
          .catch((e) => {
            console.log("error: ", e);
          });
      }
    }
  }, [i18n, language]);

  return { t, i18n, ready: ready && _ready };
};
