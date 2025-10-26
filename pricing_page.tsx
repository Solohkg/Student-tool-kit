"use client";
import { useState } from "react";
export default function Pricing(){
  const [loading,setLoading]=useState(false);
  const checkout = async () => {
    setLoading(true);
    const r = await fetch("/api/stripe/checkout", { method:"POST" });
    const j = await r.json();
    if (j.url) window.location.href = j.url; else alert(j.error || "Failed");
  };
  return (<main className="container">
    <h1>Get access — $5/month</h1>
    <p style={{color:"#a3a3a3"}}>One simple subscription. Cancel anytime.</p>
    <button disabled={loading} onClick={checkout} className="btn">{loading? "Redirecting..." : "Subscribe $5/mo"}</button>
  </main>);
}
