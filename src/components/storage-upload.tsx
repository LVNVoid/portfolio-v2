'use client';

import * as React from 'react';
import { Loader2, Upload } from 'lucide-react';

interface StorageUploadProps {
  name?: string;
  value?: string;
  onChange?: (url: string) => void;
  defaultValue?: string;
  folder?: 'projects' | 'certificates' | 'profile' | 'misc';
  placeholder?: string;
  className?: string;
}

export function StorageUpload({
  name,
  value,
  onChange,
  defaultValue = '',
  folder = 'misc',
  placeholder,
  className,
}: StorageUploadProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const url = value ?? inner;
  const setUrl = onChange ?? setInner;
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set('file', file);
      form.set('folder', folder);
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      {name && <input type="hidden" name={name} value={url} readOnly />}
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className={
            className ??
            'w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm font-mono text-xs'
          }
        />
        <label className="shrink-0 px-4 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2 cursor-pointer">
          {busy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>{busy ? '...' : 'Upload'}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={onPick}
            disabled={busy}
          />
        </label>
      </div>
      {error && <p className="text-[11px] font-mono text-destructive">{error}</p>}
    </div>
  );
}
