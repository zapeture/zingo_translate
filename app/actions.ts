"use server";

import { translate } from "google-translate-api-x";

export async function getTranslation(
  from_language: string,
  to_language: string,
  text: string,
) {
  // Validate inputs
  if (!from_language || !to_language || !text) {
    console.error("Missing required parameters");
    return { error: "Missing required parameters" };
  }

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    console.error("NEXT_PUBLIC_SITE_URL is not set");
    return { error: "Configuration error" };
  }

  // console.log("Translation attempt:", { from_language, to_language, text });

  try {
    const result = await translate(text, {
      from: from_language,
      to: to_language,
      forceBatch: false,
      autoCorrect: true,
    });

    if (!result?.text) {
      console.error("No text in translation result");
      return { error: "Translation failed" };
    }

    return {
      text: result.text,
      corrected: null,
    };
  } catch (error) {
    console.error("Translation error:", error);
    return { error: "Language not supported or invalid input" };
  }
}
