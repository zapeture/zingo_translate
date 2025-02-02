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

interface TargetCardProps {
  translation: string;
  targetLang: string;
  onTargetLangChange: (lang: string) => void;
  supportedLanguages: { code: string; name: string }[];
  error?: string;
}

export function TargetCard({
  translation,
  targetLang,
  onTargetLangChange,
  supportedLanguages,
  error,
}: TargetCardProps) {
  return (
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
            onValueChange={onTargetLangChange}
            name="target-language"
          >
            <SelectTrigger
              id="target-language"
              aria-label="Select target language"
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
  );
}
