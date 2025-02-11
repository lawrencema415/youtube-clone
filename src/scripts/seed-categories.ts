import { db } from "@/db";
import { categories } from "@/db/schema";

// bun .\src\scripts\seed-categories.ts
// cannot run script with node because of imports

const categoryNames = [
  'Cars and Vehicles',
  'Comedy',
  'Education',
  'Gaming',
  'Film and Animation',
  'Entertainment',
  'Music',
  'Sports',
  'Pets and Animals',
  'People and Blogs',
  'News and Politics',
  'Travel and Events',
  'How to and Style',
]

async function main() {
  console.log('seeding categories');

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`
    }));

    await db.insert(categories).values(values);

    console.log('Categories, seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error)

    process.exit(1)
  }
}

main();
