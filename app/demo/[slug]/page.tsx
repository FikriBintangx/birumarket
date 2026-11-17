import DemoSandboxClient from '@/components/demos/DemoSandboxClient';
import { DEFAULT_PRODUCTS } from '@/lib/catalog-data';

export function generateStaticParams() {
  return DEFAULT_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DemoSandboxClient slug={slug} />;
}
