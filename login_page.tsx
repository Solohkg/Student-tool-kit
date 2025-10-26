"use client";
import { useState } from "react";
export default function Login(){
  const [email,setEmail]=useState("");
  const submit = async () => {
    const res = await fetch("/api/auth/signin/email", {
      method:"POST",
      headers:{"content-type":"application/x-www-form-urlencoded"},
      body: new URLSearchParams({ callbackUrl:"/app", csrfToken:"", email })
    });
    if (res.ok) alert("Check your email inbox for the sign-in link.");
  };
  return (<main className="container">
    <h1>Sign in</h1>
    <div className="grid" style={{maxWidth:420}}>
      <input className="field" placeholder="you@school.edu" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="btn" onClick={submit}>Continue with Email</button>
    </div>
  </main>);
}
