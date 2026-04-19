interface JsonLdProps {
  schema: object
}

// Safe: schema is always a server-side data object serialized by JSON.stringify, never user input
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
