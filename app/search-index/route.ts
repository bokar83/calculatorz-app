import { buildSearchIndex } from '@/lib/search/build-index'

export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildSearchIndex())
}
