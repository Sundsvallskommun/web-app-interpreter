interface TranslationOptions {
  text: string[];
  sourcelanguage: string;
  targetlanguage: string;
}

type GetTranslation = (options: TranslationOptions) => Promise<string[]>;

export const getTranslation: GetTranslation = async ({
  text,
  sourcelanguage,
  targetlanguage,
}) => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/azure/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, sourcelanguage, targetlanguage }),
  }).then(async (res) => {
    const data = await res.json();
    return data.data;
  });
};
