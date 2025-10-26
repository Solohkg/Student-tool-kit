"use client";
import { useMemo, useState } from "react";
type Task = { id:string; title:string; course:string; type:string; deadline:string; priority:string; status:string };
export default function AppPage(){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [form,setForm]=useState({ title:"", course:"", type:"Assignment", deadline:"", priority:"Medium" });
  const thisWeek = useMemo(()=>{ const now=new Date(); const end=new Date(now.getTime()+7*86400000); return tasks.filter(t=>{ const d=new Date(t.deadline); return d>=now && d<=end; }); },[tasks]);
  const byCourse = useMemo(()=>{ const m:Record<string,Task[]>={}; tasks.forEach(t=> (m[t.course] ||= []).push(t)); return m; },[tasks]);
  const completed = tasks.filter(t=>t.status==="Done");
  const addTask = () => { if(!form.title||!form.course||!form.deadline) return; setTasks(p=>[{ id:crypto.randomUUID(), status:'Todo', ...form }, ...p]); setForm({ title:'', course:'', type:'Assignment', deadline:'', priority:'Medium' }); };
  return (<main className="container">
    <h1>Simple & Smart Planner</h1><p style={{color:'#a3a3a3'}}>Input once → auto-sorted views.</p>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr 1fr auto', gap:8, maxWidth:960}}>
      <input className="field" placeholder="Task title" value={form.title} onChange={e=>setForm(v=>({...v,title:e.target.value}))}/>
      <input className="field" placeholder="Course" value={form.course} onChange={e=>setForm(v=>({...v,course:e.target.value}))}/>
      <select className="field" value={form.type} onChange={e=>setForm(v=>({...v,type:e.target.value}))}><option>Assignment</option><option>Exam</option><option>Project</option></select>
      <input type="date" className="field" value={form.deadline} onChange={e=>setForm(v=>({...v,deadline:e.target.value}))}/>
      <button className="btn" onClick={addTask}>Add</button>
    </div>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr', marginTop:16}}>
      <div className="card"><h3>This Week</h3><ul>{thisWeek.map(t=><li key={t.id}>{t.title} — {t.course} — {new Date(t.deadline).toLocaleDateString()}</li>)}</ul>{thisWeek.length===0&&<p style={{color:'#a3a3a3'}}>No tasks this week.</p>}</div>
      <div className="card"><h3>By Course</h3>{Object.keys(byCourse).length===0&&<p style={{color:'#a3a3a3'}}>No tasks yet.</p>}{Object.entries(byCourse).map(([c,list])=>(<div key={c}><div style={{fontWeight:600}}>{c}</div><ul>{list.map(t=><li key={t.id}>{t.title} — {t.type} — {new Date(t.deadline).toLocaleDateString()}</li>)}</ul></div>))}</div>
      <div className="card"><h3>Completed</h3><ul>{completed.map(t=><li key={t.id}>{t.title} — {t.course}</li>)}</ul>{completed.length===0&&<p style={{color:'#a3a3a3'}}>Nothing completed yet.</p>}</div>
    </div>
  </main>);
}
