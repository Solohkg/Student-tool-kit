export const dict = {
  en: {
    title: "Student Productivity Toolkit",
    subtitle: "Plan faster. Study smarter. $5/month subscription.",
    openApp: "Open the App",
    buyNow: "Subscribe $5/mo",
    toggle: "中文",
    pricingTitle: "Get access — $5/month",
    loginCta: "Continue with Email",
    thisWeek: "This Week",
    byCourse: "By Course",
    completed: "Completed",
    add: "Add"
  },
  zh: {
    title: "學生生產力工具包",
    subtitle: "更快規劃、更聰明學習。每月 $5 訂閱。",
    openApp: "開啟應用",
    buyNow: "訂閱 $5/月",
    toggle: "EN",
    pricingTitle: "取得使用權 — 每月 $5",
    loginCta: "以電郵登入",
    thisWeek: "本週",
    byCourse: "按課程",
    completed: "已完成",
    add: "新增"
  }
} as const;
export type Lang = keyof typeof dict;
