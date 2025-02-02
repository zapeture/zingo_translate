"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { useState } from "react";
import { getTranslation } from "@/app/actions";
import { languages } from "google-translate-api-x";

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
        {/* Source Text Card */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-xl font-semibold"
                id="source-text-title"
              >
                Original Text
              </CardTitle>
              <HoverCard openDelay={200} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Show information about original text"
                    type="button"
                    className="cursor-pointer"
                  >
                    <Info className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  align="start"
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl w-64"
                >
                  <p role="tooltip">
                    Enter the text you want to translate and select its
                    language.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source-language">Source Language</Label>
              <Select
                value={sourceLang}
                onValueChange={setSourceLang}
                name="source-language"
              >
                <SelectTrigger
                  id="source-language"
                  aria-label="Select source language"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="source-text"
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[200px] resize-y"
              aria-label="Text to translate"
              aria-describedby="source-text-title"
            />
          </CardContent>
        </Card>

        {/* Translation Card */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="text-xl font-semibold" id="translation-title">
              Translation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target-language">Target Language</Label>
              <Select
                value={targetLang}
                onValueChange={setTargetLang}
                name="target-language"
              >
                <SelectTrigger
                  id="target-language"
                  aria-label="Select target language"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="translation-text"
              readOnly
              value={translation}
              placeholder="Translation will appear here..."
              className="min-h-[200px] resize-y bg-muted"
              aria-label="Translated text"
              aria-describedby="translation-title"
            />
            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button
          size="lg"
          onClick={handleTranslate}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 px-8 py-6 text-lg font-semibold"
          aria-label={isLoading ? "Translating..." : "Translate text"}
        >
          {isLoading ? (
            <span className="flex items-center gap-2" role="status">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Translating...
            </span>
          ) : (
            "Translate"
          )}
        </Button>
        {error && (
          <p
            className="text-destructive text-sm mt-4 bg-destructive/10 p-3 rounded-lg inline-block"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
