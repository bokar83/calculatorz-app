interface RefTableProps {
  table?: { headers: string[]; rows: string[][] }
}

export default function RefTable({ table }: RefTableProps) {
  if (!table) return null

  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[400px] text-[13px] border-collapse">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2 text-left font-bold text-[11px] uppercase tracking-wide"
                style={{
                  background: '#0C3547',
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.5px',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr
              key={ri}
              className="hover:bg-[#F0FDFA] transition-colors"
              style={{ background: ri % 2 === 0 ? '#fff' : '#F8FAFB' }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3 py-2 text-[#1A1F36]"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
