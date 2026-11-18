import { createClient, Client } from '@libsql/client';
import { DEFAULT_PRODUCTS } from './catalog-data';

const dbUrl =
  process.env.TURSO_DATABASE_URL ||
  (process.env.VERCEL ? 'file:/tmp/birumarket.db' : 'file:birumarket.db');
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

const client: Client = createClient({
  url: dbUrl,
  authToken,
});

export async function initDb() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      tech_stack TEXT NOT NULL,
      price INTEGER NOT NULL,
      is_portfolio INTEGER DEFAULT 0,
      thumbnail_url TEXT NOT NULL,
      preview_images TEXT,
      demo_url TEXT,
      github_url TEXT,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'ACTIVE',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const countRes = await client.execute('SELECT COUNT(*) as count FROM products');
  const count = Number(countRes.rows[0].count);

  if (count === 0) {
    for (const p of DEFAULT_PRODUCTS) {
      await client.execute({
        sql: `INSERT OR REPLACE INTO products (
                id, title, slug, category, tech_stack, price, is_portfolio,
                thumbnail_url, preview_images, demo_url, github_url, description, status
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          p.id,
          p.title,
          p.slug,
          p.category,
          JSON.stringify(p.tech_stack),
          p.price,
          p.is_portfolio ? 1 : 0,
          p.thumbnail_url,
          JSON.stringify(p.preview_images),
          p.demo_url,
          p.github_url,
          p.description,
          p.status,
        ],
      });
    }
  }
}

export default client;
