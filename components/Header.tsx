export default function Header() {
  return (
    <header
      className="mb-8 text-center"
      role="banner"
      aria-label="Zingo Translate - Instant Language Translation Tool"
    >
      <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
        Zingo Translate
      </h1>
      <p className="text-muted-foreground">
        Translate text between languages instantly
      </p>
    </header>
  );
}
