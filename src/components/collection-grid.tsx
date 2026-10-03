'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

      <AnimatePresence mode="popLayout">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 text-center rounded border border-dashed border-border text-muted-foreground font-mono text-xs"
          >
            No specimens matching current taxonomy classification.
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpecimenCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
