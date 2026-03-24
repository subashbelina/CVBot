import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const AnalyticsOverviewSection = ({ variants, resumes }) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const months = [];
    const monthIndexMap = new Map();

    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = date.toLocaleString('en-US', { month: 'short' });
      months.push({ key, name: label, created: 0, updated: 0 });
      monthIndexMap.set(key, months.length - 1);
    }

    resumes.forEach((resume) => {
      if (resume.createdAt) {
        const createdDate = new Date(resume.createdAt);
        const createdKey = `${createdDate.getFullYear()}-${createdDate.getMonth()}`;
        const idx = monthIndexMap.get(createdKey);
        if (idx !== undefined) months[idx].created += 1;
      }

      if (resume.updatedAt) {
        const updatedDate = new Date(resume.updatedAt);
        const updatedKey = `${updatedDate.getFullYear()}-${updatedDate.getMonth()}`;
        const idx = monthIndexMap.get(updatedKey);
        if (idx !== undefined) months[idx].updated += 1;
      }
    });

    return months;
  }, [resumes]);

  const maxValue = Math.max(
    1,
    ...chartData.map((item) => Math.max(item.created, item.updated))
  );

  return (
    <motion.div variants={variants}>
      <Card className="dashboard-glass-card shadow-2xl text-white">
        <CardHeader>
          <CardTitle className="text-white">Analytics Overview</CardTitle>
          <CardDescription className="text-gray-100/80">
            Track your resume performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-4 flex items-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="text-cyan-100">Created</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
                <span className="text-fuchsia-100">Updated</span>
              </div>
            </div>
            <div className="grid h-[230px] grid-cols-6 items-end gap-2 sm:gap-3">
              {chartData.map((point) => {
                const createdHeight = point.created === 0 ? 0 : Math.max(8, (point.created / maxValue) * 100);
                const updatedHeight = point.updated === 0 ? 0 : Math.max(8, (point.updated / maxValue) * 100);

                return (
                  <div key={point.key} className="flex h-full flex-col items-center justify-end gap-2">
                    <div className="flex h-full items-end gap-1.5">
                      <div
                        className="w-3 rounded-t-md bg-cyan-300/90 shadow-[0_0_12px_rgba(103,232,249,0.55)] sm:w-4"
                        style={{ height: `${createdHeight}%` }}
                        title={`${point.name} created: ${point.created}`}
                      />
                      <div
                        className="w-3 rounded-t-md bg-fuchsia-300/90 shadow-[0_0_12px_rgba(240,171,252,0.55)] sm:w-4"
                        style={{ height: `${updatedHeight}%` }}
                        title={`${point.name} updated: ${point.updated}`}
                      />
                    </div>
                    <span className="text-xs text-gray-100/85">{point.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsOverviewSection;
