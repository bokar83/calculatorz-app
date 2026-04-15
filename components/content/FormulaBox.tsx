interface FormulaBoxProps {
  formula: string
}

export default function FormulaBox({ formula }: FormulaBoxProps) {
  return (
    <div className="mt-5">
      <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#6B7280] mb-2">Formula</h3>
      <div
        className="px-4 py-3 rounded-lg"
        style={{ background: '#F0FDFA', border: '1.5px solid #CCFBF1' }}
      >
        <code className="font-mono text-[14px] font-bold text-[#0D5C57]">{formula}</code>
      </div>
    </div>
  )
}
