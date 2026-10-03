export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
        Unlocking Vitrine Drawer...
      </span>
    </div>
  );
}
