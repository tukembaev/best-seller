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
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm text-white hover:border-gray-500 transition"
      >
        <span>{selected ? selected.label : "Select"}</span>
        <ChevronDown size={16} className={`transition text-gray-400 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                opt.value === value ? "bg-gray-700 font-medium text-yellow-500" : "text-gray-300"
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
