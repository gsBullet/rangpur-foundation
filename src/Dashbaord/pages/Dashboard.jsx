import React from 'react'
import { activities, barData, donors, GreenBtn, GreenTooltip, monthlyData, pieData, projects, StatCard, WelcomeBanner } from './DashboardContext';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
   return (
      <div className="p-7 flex flex-col gap-6">
  
        <WelcomeBanner />
  
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-5">
          <StatCard icon="💰" label="মোট ডোনেশন (এ বছর)" value="3840000" sub="গত মাসের চেয়ে ১২% বেশি"  topColor="#16a34a" delay={0}   />
          <StatCard icon="🎓" label="শিক্ষিত শিশু"         value="5280"    sub="চলতি বছরে ৬৮০ নতুন"    topColor="#3b82f6" delay={80}  />
          <StatCard icon="🤝" label="সক্রিয় স্বেচ্ছাসেবী"  value="347"     sub="১২টি জেলায় সক্রিয়"      topColor="#f59e0b" delay={160} />
          <StatCard icon="🏥" label="স্বাস্থ্য সুবিধাভোগী"  value="12900"   sub="৩৮টি ক্যাম্প সম্পন্ন"    topColor="#ec4899" delay={240} />
        </div>
  
        {/* Area + Pie */}
        <div className="grid grid-cols-3 gap-5">
          {/* Area – 2/3 width */}
          <div className="col-span-2 anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "320ms" }}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="font-dis text-green-900 font-bold text-lg leading-tight">মাসিক ডোনেশন প্রবাহ</p>
                <p className="font-bn text-gray-400 text-xs mt-0.5">টাকার পরিমাণ (হাজারে)</p>
              </div>
              <span className="font-bn text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">২০২৪–২৫</span>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.2}  />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="month" tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`} />
                <Tooltip content={<GreenTooltip />} />
                <Area type="monotone" dataKey="amount" name="ডোনেশন" stroke="#16a34a" strokeWidth={2.5} fill="url(#ag)" dot={{ fill:"#16a34a", r:3 }} activeDot={{ r:5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
  
          {/* Pie – 1/3 */}
          <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "400ms" }}>
            <p className="font-dis text-green-900 font-bold text-base leading-tight">কার্যক্রম বিভাজন</p>
            <p className="font-bn text-gray-400 text-xs mb-4 mt-0.5">বরাদ্দের শতকরা হার</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v, n) => [`${v}%`, n]}
                  contentStyle={{ fontFamily:"'Hind Siliguri'", fontSize:11, borderRadius:8, border:"none", background:"#14532d", color:"white" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-3">
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.color }} />
                  <p className="font-bn text-xs text-gray-500 flex-1">{p.name}</p>
                  <p className="font-bn text-xs font-bold text-green-800">{p.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Donors table + Activity feed */}
        <div className="grid grid-cols-3 gap-5">
          {/* Table 2/3 */}
          <div className="col-span-2 anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "480ms" }}>
            <div className="flex justify-between items-center mb-5">
              <p className="font-dis text-green-900 font-bold text-base">সাম্প্রতিক ডোনার</p>
              <GreenBtn small>সব দেখুন</GreenBtn>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {["ডোনার","এলাকা","পরিমাণ","ধরন","সময়"].map(h => (
                    <th key={h} className="font-bn text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-2 first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {donors.map((d, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-green-50/50 transition-colors">
                    <td className="py-3 pl-0 pr-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-base flex-shrink-0">{d.av}</div>
                        <p className="font-bn text-sm font-semibold text-green-900 whitespace-nowrap">{d.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-bn text-xs text-gray-500 whitespace-nowrap">{d.area}</td>
                    <td className="py-3 px-2 font-bn text-sm font-bold text-green-600 whitespace-nowrap">৳{d.amount.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <span className={`font-bn text-xs font-semibold px-2.5 py-1 rounded-full ${d.type === "মাসিক" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {d.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bn text-xs text-gray-400 whitespace-nowrap">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Activity 1/3 */}
          <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "560ms" }}>
            <p className="font-dis text-green-900 font-bold text-base mb-5">সাম্প্রতিক কার্যক্রম</p>
            <div className="flex flex-col">
              {activities.map((a, i) => (
                <div key={i} className="activity-line relative flex gap-3 pb-5 last:pb-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 z-10 ${a.bg}`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="font-bn text-xs text-gray-600 leading-relaxed">{a.text}</p>
                    <p className="font-bn text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Projects grid */}
        <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "640ms" }}>
          <div className="flex justify-between items-center mb-5">
            <p className="font-dis text-green-900 font-bold text-base">চলমান প্রকল্প</p>
            <GreenBtn small>সব প্রকল্প</GreenBtn>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-gray-50 hover:bg-green-50 border border-transparent hover:border-green-200 rounded-2xl p-4 transition-all duration-200 cursor-default"
              >
                <p className="font-bn text-sm font-bold text-green-900 mb-3 leading-snug">{p.name}</p>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bn text-xs text-gray-400">অগ্রগতি</span>
                  <span className="font-bn text-xs font-bold text-green-600">{p.pct}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full anim-barslide"
                    style={{
                      width: `${p.pct}%`,
                      background: p.pct > 80
                        ? "linear-gradient(90deg,#15803d,#22c55e)"
                        : "linear-gradient(90deg,#16a34a,#4ade80)"
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className={`font-bn text-xs font-semibold px-2.5 py-0.5 rounded-full ${p.status === "প্রায় সম্পন্ন" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {p.status}
                  </span>
                  <span className="font-bn text-xs text-gray-400">👤 {p.ben}</span>
                </div>
                <p className="font-bn text-xs text-gray-400 mt-2">বাজেট: {p.budget}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Bar Chart */}
        <div className="anim-fadeup bg-white rounded-2xl p-6 shadow-sm" style={{ animationDelay: "720ms" }}>
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="font-dis text-green-900 font-bold text-base">ত্রৈমাসিক কার্যক্রম তুলনা</p>
              <p className="font-bn text-gray-400 text-xs mt-0.5">সুবিধাভোগীর সংখ্যা (জন)</p>
            </div>
            <div className="flex items-center gap-4">
              {[["#16a34a","শিক্ষা"],["#4ade80","স্বাস্থ্য"],["#bbf7d0","নারী"]].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: c }} />
                  <span className="font-bn text-xs text-gray-500">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={18} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="q" tick={{ fontFamily:"'Hind Siliguri'", fontSize:12, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily:"'Hind Siliguri'", fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<GreenTooltip />} />
              <Bar dataKey="শিক্ষা"    fill="#16a34a" radius={[5,5,0,0]} />
              <Bar dataKey="স্বাস্থ্য" fill="#4ade80" radius={[5,5,0,0]} />
              <Bar dataKey="নারী"      fill="#bbf7d0" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
      </div>
    );
}

export default Dashboard