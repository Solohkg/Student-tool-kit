"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { dict, Lang } from "@/src/lib/i18n";

export default function Home(){
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(()=>dict[lang],[lang]);
  return (<main className="container">
    <header className="grid" style={{gridTemplateColumns:"1fr auto",alignItems:"center"}}>
      <h1>{t.title}</h1>
      <button className="btn secondary" onClick={()=>setLang(lang==="en"?"zh":"en")}>{t.toggle}</button>
    </header>
    <p style={{color:"#a3a3a3"}}>{t.subtitle}</p>
    <div className="grid" style={{gridTemplateColumns:"auto auto",gap:12}}>
      <Link href="/app" className="btn">{t.openApp}</Link>
      <Link href="/pricing" className="btn secondary">{t.buyNow}</Link>
    </div>
  </main>);
}
