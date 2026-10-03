'use client';

import * as React from 'react';
import type { Project } from '@/schemas/project-schema';
import { SpecimenCard } from '@/components/specimen-card';
import { TaxonomyFilter } from '@/components/taxonomy-filter';

interface CollectionGridProps {
  initialProjects: Project[];
}

export function CollectionGrid({ initialProjects }: CollectionGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [initialProjects]);

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === 'ALL') return initialProjects;
    return initialProjects.filter((p) => p.category === selectedCategory);
  }, [initialProjects, selectedCategory]);

  return (
    <div className="space-y-6">
      <TaxonomyFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded border border-dashed border-border text-muted-foreground font-mono text-xs">
          No specimens matching current taxonomy classification.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <SpecimenCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
