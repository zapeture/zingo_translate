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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface SourceCardProps {
  sourceText: string;
  sourceLang: string;
  onSourceTextChange: (text: string) => void;
  onSourceLangChange: (lang: string) => void;
  supportedLanguages: { code: string; name: string }[];
}

export function SourceCard({
  sourceText,
  sourceLang,
  onSourceTextChange,
  onSourceLangChange,
  supportedLanguages,
}: SourceCardProps) {
  return (
    <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold" id="source-text-title">
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
                Enter the text you want to translate and select its language.
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
            onValueChange={onSourceLangChange}
            name="source-language"
          >
            <SelectTrigger
              id="source-language"
              aria-label="Select source language"
            >
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
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
          onChange={(e) => onSourceTextChange(e.target.value)}
          className="min-h-[200px] resize-y"
          aria-label="Text to translate"
          aria-describedby="source-text-title"
        />
      </CardContent>
    </Card>
  );
}
