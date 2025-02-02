"use client";

import { useState } from "react";
import { getTranslation } from "@/app/actions";
import { languages } from "google-translate-api-x";
import { SourceCard } from "@/components/SourceCard";
import { TargetCard } from "@/components/TargetCard";
import { TranslateButton } from "@/components/TranslateButton";

export const SUPPORTED_LANGUAGES: { code: string; name: string }[] =
  Object.entries(languages).map(([code, name]) => ({
    code,
    name,
  }));

export default function TranslationSection() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError("Please enter some text to translate");
      return;
    }

    if (!sourceLang || !targetLang) {
      setError("Please select both source and target languages");
      return;
    }

    if (sourceLang === targetLang) {
      setError("Source and target languages must be different");
      return;
    }

    setIsLoading(true);
    setError("");
    setTranslation("");

    try {
      const result = await getTranslation(sourceLang, targetLang, sourceText);
      if (result.text) {
        setTranslation(result.text);
      } else {
        setError(result.error || "Translation failed. Please try again.");
      }
    } catch (e) {
      console.error("Translation error:", e);
      setError("An error occurred during translation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8" role="main" aria-label="Translation Interface">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SourceCard
          sourceText={sourceText}
          sourceLang={sourceLang}
          onSourceTextChange={setSourceText}
          onSourceLangChange={setSourceLang}
          supportedLanguages={SUPPORTED_LANGUAGES}
        />
        <TargetCard
          translation={translation}
          targetLang={targetLang}
          onTargetLangChange={setTargetLang}
          supportedLanguages={SUPPORTED_LANGUAGES}
          error={error}
        />
      </div>
      <TranslateButton
        onClick={handleTranslate}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
