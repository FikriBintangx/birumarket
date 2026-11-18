import { MetadataRoute } from 'next';
import { DEFAULT_PRODUCTS } from '@/lib/catalog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://birumarket.web.id';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = DEFAULT_PRODUCTS.map((item) => ({
    url: `${baseUrl}/demo/${item.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
