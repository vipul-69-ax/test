import { industry_data } from '../data/industries'

export function convertNamesToIds(input: string): string {
  return input
    .split(',')
    .map(name => name.trim())
    .map(name => {
      const match = industry_data.find(ind => ind.name.toLowerCase() === name.toLowerCase());
      return match ? match.id : null;
    })
    .filter(id => id !== null) // remove unmatched names
    .join(','); // clean join without leading/trailing commas
}

