import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <p className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-200">
          CVBot
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Build a job-ready resume with AI in minutes
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
          Create ATS-friendly resumes, get AI writing suggestions, and export polished templates for any role.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/create"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
          >
            Create Resume
          </Link>
          <Link
            to="/templates"
            className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Browse Templates
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl border border-indigo-300/30 px-5 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <SparklesIcon className="h-6 w-6 text-cyan-300" />
          <h2 className="mt-3 text-base font-semibold">AI content suggestions</h2>
          <p className="mt-2 text-sm text-slate-300">Improve summaries, bullets, and role-fit language quickly.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <DocumentTextIcon className="h-6 w-6 text-fuchsia-300" />
          <h2 className="mt-3 text-base font-semibold">Professional templates</h2>
          <p className="mt-2 text-sm text-slate-300">Choose modern, classic, minimalist, and executive formats.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ChartBarIcon className="h-6 w-6 text-emerald-300" />
          <h2 className="mt-3 text-base font-semibold">Track resume activity</h2>
          <p className="mt-2 text-sm text-slate-300">Monitor updates and manage resumes from one dashboard.</p>
        </article>
      </section>
    </main>
  );
}

export default Home;