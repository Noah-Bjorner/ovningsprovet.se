export type PracticeSet = {
  description: string;
  slug: string;
  title: string;
};

export const practiceSets: PracticeSet[] = [
  {
    title: "Algebra Warmup",
    slug: "algebra-warmup",
    description: "Linear equations, graph reading, and short written answers.",
  },
  {
    title: "Biology Recall",
    slug: "biology-recall",
    description: "A quick pass through cells, systems, and vocabulary checks.",
  },
];

export function getPracticeSet(slug: string) {
  return practiceSets.find((set) => set.slug === slug) ?? practiceSets[0];
}
