"use client"

import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export function LanguageToggleButton() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const lang = searchParams.get("lang") || "ar"
  const dir = lang === "ar" ? "rtl" : "ltr"

  function toggleLanguage() {
    const nextLang = lang === "ar" ? "en" : "ar"
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("lang", nextLang)
    navigate(`?${params.toString()}`, { replace: true })
  }

  return (
    <button
      type="button"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 1000,
        padding: "8px 16px",
        background: dir === "rtl" ? "#e5e7eb" : "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        cursor: "pointer",
      }}
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {lang === "ar" ? "English" : "العربية"}
    </button>
  )
}
