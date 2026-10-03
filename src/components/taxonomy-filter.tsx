'use client';

import * as React from 'react';

interface TaxonomyFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function TaxonomyFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className = '',
}: TaxonomyFilterProps) {
  return (
    <div
      aria-label="Filter specimens by taxonomy"
      className={`flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none ${className}`}
    >
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1 shrink-0">
        Filter Class:
      </span>
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 min-h-[44px] shrink-0 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              isSelected
                ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                : 'bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
