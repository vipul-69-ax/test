// Load industries.json in Node (ESM style)
import fs from 'fs';

interface Industry {
  name: string;
  id: string;
}

// Load and parse the JSON data
const data: Industry[] = JSON.parse(fs.readFileSync('industries.json', 'utf-8'));

/**
 * Converts a comma-separated list of names into id(name) format using the industries JSON.
 */
function convertNamesToIds(input: string): string {
  return input
    .split(',')
    .map(name => name.trim())
    .map(name => {
      const match = data.find(ind => ind.name.toLowerCase() === name.toLowerCase());
      return match ? `id(${match.id})` : `id(${name})`;
    })
    .join(',');
}

// Example usage
const result = convertNamesToIds("construction,real estate");
console.log(result); // Output: id(5567cd4773696439dd350000),id(5567cd477369645401010000)
