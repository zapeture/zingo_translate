import { translate } from "google-translate-api-browser";

// Get a translation of the text from the from_language to the to_language
export async function getTranslation(
  from_language: string,
  to_language: string,
  text: string,
) {
  try {
    const result = await translate(text, {
      from: from_language,
      to: to_language,
      corsUrl: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    });

    if (!result) {
      console.error("No result from translation");
      return null;
    }

    return result.text;
  } catch (error) {
    console.error(error);
    return null;
  }
}
