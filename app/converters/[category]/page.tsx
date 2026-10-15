import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, getCategory } from '@/lib/converters'
import { categoryUrl } from '@/lib/converters/seo'
import ConverterPageBody from '@/components/converters/ConverterPageBody'

interface PageProps {
  params: Promise<{ category: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) return {}
  const title = `${cat.title} | Free Online ${cat.short} Conversion`
  return {
    title,
    description: cat.description,
    alternates: { canonical: categoryUrl(cat.id) },
    authors: [{ name: 'CalcFlow Editorial Team', url: 'https://calculatorz.tools/about/' }],
    openGraph: { title: `${cat.title} | CalcFlow`, description: cat.description, url: categoryUrl(cat.id), type: 'website', siteName: 'CalcFlow' },
  }
}

export default async function ConverterCategoryPage({ params }: PageProps) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()
  return <ConverterPageBody category={cat} />
}
