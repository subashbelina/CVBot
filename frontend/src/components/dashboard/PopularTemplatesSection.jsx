import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const PopularTemplatesSection = ({ variants, navigate }) => {
  return (
    <motion.div variants={variants}>
      <Card className="dashboard-glass-card shadow-2xl text-white">
        <CardHeader>
          <CardTitle className="text-white">Popular Templates</CardTitle>
          <CardDescription className="text-gray-100/80">
            Click a template to start your resume with that style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button
              onClick={() => navigate('/create?template=modern')}
              className="group text-left rounded-xl border border-cyan-200/40 bg-white/10 p-4 hover:bg-white/15 hover:border-cyan-300/70 transition-all"
            >
              <div className="aspect-[16/10] rounded-lg border border-cyan-300/60 bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-cyan-100">Modern</span>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-100 border border-cyan-300/40">
                  ATS Friendly
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-100/85">
                Clean layout with strong hierarchy for tech and product roles.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-200/80">Most used this week</span>
                <span className="text-sm text-cyan-200 group-hover:text-cyan-100">Use template -&gt;</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/create?template=classic')}
              className="group text-left rounded-xl border border-slate-200/40 bg-white/10 p-4 hover:bg-white/15 hover:border-slate-300/70 transition-all"
            >
              <div className="aspect-[16/10] rounded-lg border border-slate-300/60 bg-gradient-to-br from-gray-100 via-slate-200 to-zinc-300 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-100">Classic</span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-500/20 text-slate-100 border border-slate-300/40">
                  Traditional
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-100/85">
                Professional and timeless style for business and admin roles.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-200/80">Great for conservative industries</span>
                <span className="text-sm text-slate-200 group-hover:text-slate-100">Use template -&gt;</span>
              </div>
            </button>
          </div>

          <div className="mt-5">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate('/templates')}
            >
              Browse all templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PopularTemplatesSection;
