/**
 * export-analytics.ts — read-only, anonymized data export for the writeup.
 *
 * Usage (from repo root, with DATABASE_URL pointing at prod):
 *   npx tsx scripts/export-analytics.ts
 *
 * Writes CSVs to ./analytics-export/. Strips all PII:
 *   - player ids are remapped to sequential anon ids (p00001, ...)
 *   - problem ids are remapped (q00001, ...)
 *   - usernames, displayNames, sessionTokens, firebaseUids are DROPPED
 *   - submitted answer text and problem content/answers are DROPPED
 * Joins are preserved across files via the consistent anon ids.
 */
import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();
const OUT = join(process.cwd(), "analytics-export");

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = v instanceof Date ? v.toISOString() : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  // --- Build anonymization maps (stable, insertion-ordered) ---
  const players = await prisma.player.findMany({ orderBy: { createdAt: "asc" } });
  const problems = await prisma.problem.findMany({ orderBy: { createdAt: "asc" } });

  const pid = new Map<string, string>();
  players.forEach((p, i) => pid.set(p.id, `p${String(i + 1).padStart(5, "0")}`));
  const qid = new Map<string, string>();
  problems.forEach((q, i) => qid.set(q.id, `q${String(i + 1).padStart(5, "0")}`));

  // --- players.csv (no usernames / tokens / uids) ---
  const playerRows = players.map((p) => ({
    player: pid.get(p.id),
    rating: p.rating,
    ratingDeviation: p.ratingDeviation,
    volatility: p.volatility,
    gamesPlayed: p.gamesPlayed,
    confirmedTier: p.confirmedTier,
    isAuthenticated: p.firebaseUid != null,
    hasUsername: p.username != null,
    createdAt: p.createdAt,
    lastActiveAt: p.lastActiveAt,
  }));
  writeFileSync(join(OUT, "players.csv"), toCsv(playerRows));

  // --- problems.csv (no content / answer) ---
  const problemRows = problems.map((q) => ({
    problem: qid.get(q.id),
    rating: q.rating,
    ratingDeviation: q.ratingDeviation,
    volatility: q.volatility,
    difficulty: q.difficulty,
    answerType: q.answerType,
    source: q.source,
    sourceNumber: q.sourceNumber,
    excluded: q.excluded,
    createdAt: q.createdAt,
  }));
  writeFileSync(join(OUT, "problems.csv"), toCsv(problemRows));

  // --- attempts.csv (no submitted answer text) — the core behavioral log ---
  const attempts = await prisma.attempt.findMany({ orderBy: { createdAt: "asc" } });
  const attemptRows = attempts.map((a) => ({
    player: pid.get(a.playerId) ?? "",
    problem: qid.get(a.problemId) ?? "",
    correct: a.correct,
    ratingBefore: a.ratingBefore,
    ratingAfter: a.ratingAfter,
    createdAt: a.createdAt,
  }));
  writeFileSync(join(OUT, "attempts.csv"), toCsv(attemptRows));

  // --- reports.csv (no free-text details) ---
  const reports = await prisma.report.findMany({ orderBy: { createdAt: "asc" } });
  const reportRows = reports.map((r) => ({
    problem: r.problemId ? qid.get(r.problemId) ?? "" : "",
    type: r.type,
    createdAt: r.createdAt,
  }));
  writeFileSync(join(OUT, "reports.csv"), toCsv(reportRows));

  console.log(`Exported to ${OUT}/`);
  console.log(`  players.csv  : ${playerRows.length} rows`);
  console.log(`  problems.csv : ${problemRows.length} rows`);
  console.log(`  attempts.csv : ${attemptRows.length} rows`);
  console.log(`  reports.csv  : ${reportRows.length} rows`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
