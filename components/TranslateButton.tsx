import { Button } from "@/components/ui/button";

interface TranslateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  error?: string;
}

export function TranslateButton({
  onClick,
  isLoading,
  error,
}: TranslateButtonProps) {
  return (
    <div className="mt-8 text-center">
      <Button
        size="lg"
        onClick={onClick}
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
  );
}
