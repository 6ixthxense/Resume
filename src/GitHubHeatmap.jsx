import React from "react";
import { motion } from "framer-motion";
import { Activity, RefreshCw } from "lucide-react";
import { ActivityCalendar } from 'react-activity-calendar';
import contributions from "./data/github-contributions.json";

const GITHUB_USERNAME = "6ixthxense";

export default function GitHubHeatmap({ isDark = true, lang = "en" }) {

    // Custom theme to match the app's emerald/green vibe
    const themeData = {
        dark: ['#1e293b', '#064e3b', '#065f46', '#059669', '#34d399'],
        light: ['#f1f5f9', '#d1fae5', '#6ee7b7', '#10b981', '#047857'],
    };

    // Calculate last updated date
    const lastUpdated = new Date(contributions.lastUpdated).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <motion.section
            id="github"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-6 sm:p-8 ${isDark
                ? "bg-white/[0.02] border-white/10"
                : "bg-white/60 border-white/30"
                } border rounded-[32px]`}
        >
            <div className="flex items-center gap-3 mb-6">
                <div
                    className={`p-2.5 ${isDark ? "bg-emerald-500/10" : "bg-emerald-100"
                        } rounded-xl`}
                >
                    <Activity
                        className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"
                            }`}
                    />
                </div>
                <div>
                    <h3
                        className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-800"
                            }`}
                    >
                        {lang === "th" ? "กิจกรรม GitHub" : "GitHub Activity"}
                    </h3>
                    <p
                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"
                            } flex items-center gap-1.5`}
                    >
                        @{GITHUB_USERNAME}
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span className="flex items-center gap-1 opacity-70" title="Last updated">
                            <RefreshCw className="w-3 h-3" /> {lastUpdated}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center overflow-x-auto pb-2 min-h-[120px]">
                <ActivityCalendar
                    data={contributions.activities}
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    colorScheme={isDark ? 'dark' : 'light'}
                    theme={themeData}
                    labels={{
                        totalCount: lang === 'th' ? '{{count}} รายการในปีที่ผ่านมา' : '{{count}} contributions in the last year',
                        legend: {
                            less: lang === 'th' ? 'น้อย' : 'Less',
                            more: lang === 'th' ? 'มาก' : 'More',
                        },
                        months: lang === 'th' ? [
                            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
                            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
                        ] : undefined,
                        weekdays: lang === 'th' ? [
                            'อา', '', 'จ', '', 'พ', '', 'ศ',
                        ] : undefined,
                    }}
                    totalCount={contributions.totalContributions}
                />
            </div>
        </motion.section>
    );
}
