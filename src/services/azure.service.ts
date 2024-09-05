import { getAzureToken } from "@sk-web-gui/ai";

interface TranslationOptions {
  text: string;
  sourcelanguage: string;
  targetlanguage: string;
}

type GetTranslation = (options: TranslationOptions) => Promise<string>;

export const getTranslation: GetTranslation = async ({
  text,
  sourcelanguage,
  targetlanguage,
}) => {
  const url =
    "https://api-eur.cognitive.microsofttranslator.com/translate?api-version=3.0";
  const tokens = await getAzureToken();
  const headers = {
    Authorization: `Bearer ${tokens.authToken}`,
    "Ocp-Apim-Subscription-Region": tokens.region,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(
      `${url}&from=${sourcelanguage}&to=${targetlanguage}`,
      { headers, body: JSON.stringify({ Text: text }), method: "POST" }
    );
    const data = res.json();
    if (data) {
      console.log(data);
      return Promise.resolve("hej");
    }
  } catch (e) {
    Promise.reject(e);
  }
};
