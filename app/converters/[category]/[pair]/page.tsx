import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allPairs, getPair } from '@/lib/converters'
import { pairContent, pairUrl } from '@/lib/converters/seo'
import ConverterPageBody from '@/components/converters/ConverterPageBody'

interface PageProps {
  params: Promise<{ category: string; pair: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return allPairs().map(p => ({ category: p.category.id, pair: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, pair } = await params
  const entry = getPair(category, pair)
  if (!entry) return {}
  const pc = pairContent(entry)
  return {
    title: pc.title,
    description: pc.description,
    alternates: { canonical: pairUrl(entry) },
    authors: [{ name: 'CalcFlow Editorial Team', url: 'https://calculatorz.tools/about/' }],
    openGraph: { title: `${pc.h1} | CalcFlow`, description: pc.description, url: pairUrl(entry), type: 'website', siteName: 'CalcFlow' },
  }
}

export default async function ConverterPairPage({ params }: PageProps) {
  const { category, pair } = await params
  const entry = getPair(category, pair)
  if (!entry) notFound()
  return <ConverterPageBody category={entry.category} entry={entry} />
}
