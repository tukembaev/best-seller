// components/CustomSelect.jsx
"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function CustomSelect({ options, value, onChange, className }) {
  const [open, setOpen] = useState(false)

  const selected = options.find(o => o.value === value)

  return (
    <div className={`relative ${className || ""}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-700 hover:border-slate-300 transition"
      >
        <span>{selected ? selected.label : "Select"}</span>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-10">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                opt.value === value ? "bg-slate-50 font-medium text-slate-800" : "text-slate-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
