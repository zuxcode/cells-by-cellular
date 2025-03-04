function Separator({ text = "Or" }: { text?: string }) {
    return (
      <div className="flex items-center gap-4">
        <div className="border-b flex-1 h-0" />
        <span className="text-muted-foreground" aria-hidden="true">
          {text}
        </span>
        <div className="border-b flex-1 h-0" />
      </div>
    );
  }
  
  export { Separator };
  