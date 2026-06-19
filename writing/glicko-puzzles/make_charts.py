"""
Reproducible charts for the Glicko Puzzles writeup.
Run from this directory:  python3 make_charts.py
Reads anonymized CSVs in ./data/, writes PNGs to ./images/.
"""
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter

plt.rcParams.update({
    "figure.dpi": 130,
    "font.size": 11,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.alpha": 0.25,
    "axes.titleweight": "bold",
    "figure.autolayout": True,
})
INK = "#1f2937"
ACCENT = "#4f46e5"     # indigo
ACCENT2 = "#0891b2"    # cyan
WARN = "#d97706"       # amber
GOOD = "#059669"       # green
GREY = "#9ca3af"

DATA = "data"
OUT = "images"

players = pd.read_csv(f"{DATA}/players.csv", parse_dates=["createdAt", "lastActiveAt"])
attempts = pd.read_csv(f"{DATA}/attempts.csv", parse_dates=["createdAt"])
problems = pd.read_csv(f"{DATA}/problems.csv", parse_dates=["createdAt"])


# ---------------------------------------------------------------- 1. GROWTH
def chart_growth():
    fig, ax = plt.subplots(figsize=(8, 4.2))
    end = pd.Timestamp("2026-04-02", tz="UTC")
    s = players.set_index("createdAt").resample("D").size()
    s = s[s.index < end]
    a = attempts.set_index("createdAt").resample("D").size().reindex(s.index, fill_value=0)

    ax.bar(s.index, s.values, width=0.8, color=ACCENT, label="New signups")
    ax.set_ylabel("New signups / day", color=ACCENT)
    ax.tick_params(axis="y", labelcolor=ACCENT)

    ax2 = ax.twinx()
    ax2.spines["top"].set_visible(False)
    ax2.plot(a.index, a.values, color=WARN, lw=2, marker="o", ms=3, label="Attempts")
    ax2.set_ylabel("Problem attempts / day", color=WARN)
    ax2.tick_params(axis="y", labelcolor=WARN)
    ax2.grid(False)

    post = pd.Timestamp("2026-03-09", tz="UTC")
    ax.axvline(post, color=INK, ls="--", lw=1)
    ax.annotate("AoPS forum posts\n(Mar 9, evening)", xy=(post, s.max() * 0.93),
                xytext=(post + pd.Timedelta(days=4), s.max() * 0.82),
                fontsize=9, color=INK,
                arrowprops=dict(arrowstyle="->", color=INK, lw=1))
    ax.set_title("One forum post, one weekend: launch spike and decay")
    ax.set_xlabel("")
    fig.savefig(f"{OUT}/growth.png", bbox_inches="tight")
    plt.close(fig)


# ---------------------------------------------------------------- 2. FUNNEL
def chart_funnel():
    n = len(players)
    stages = [
        ("Signed up", n),
        ("Played ≥ 1", int((players.gamesPlayed >= 1).sum())),
        ("Played ≥ 10", int((players.gamesPlayed >= 10).sum())),
        ("Played ≥ 50", int((players.gamesPlayed >= 50).sum())),
        ("Signed in (Google)", int(players.isAuthenticated.sum())),
    ]
    labels = [s[0] for s in stages]
    vals = [s[1] for s in stages]
    pct = [v / n * 100 for v in vals]
    colors = [ACCENT, ACCENT2, ACCENT2, WARN, GOOD]

    fig, ax = plt.subplots(figsize=(8, 4))
    y = np.arange(len(stages))[::-1]
    ax.barh(y, vals, color=colors, height=0.62)
    for yi, v, p in zip(y, vals, pct):
        ax.text(v + n * 0.012, yi, f"{v:,}  ({p:.0f}%)", va="center", fontsize=10, color=INK)
    ax.set_yticks(y)
    ax.set_yticklabels(labels)
    ax.set_xlim(0, n * 1.18)
    ax.grid(axis="y")
    ax.set_title("The activation cliff: 64% of signups never solve a problem")
    ax.set_xlabel("Players")
    fig.savefig(f"{OUT}/funnel.png", bbox_inches="tight")
    plt.close(fig)


# ----------------------------------------------------- 3. CALIBRATION S-CURVE
def chart_calibration():
    pr = problems[["problem", "rating"]].rename(columns={"rating": "pRating"})
    a = attempts.merge(pr, on="problem", how="left")
    a["gap"] = a["ratingBefore"] - a["pRating"]   # player minus (current) problem rating
    edges = np.arange(-450, 451, 50)
    a["bin"] = pd.cut(a["gap"], edges)
    grp = a.groupby("bin", observed=True).agg(p=("correct", "mean"), n=("correct", "size")).reset_index()
    grp["mid"] = grp["bin"].apply(lambda b: b.mid)
    grp = grp[grp["n"] >= 20]

    fig, ax = plt.subplots(figsize=(8, 4.4))
    ax.axhline(0.5, color=GREY, ls=":", lw=1)
    ax.axvline(0, color=GREY, ls=":", lw=1)
    # logistic the rating math assumes (ELO 400-scale)
    xs = np.linspace(-450, 450, 200)
    ax.plot(xs, 1 / (1 + 10 ** (-xs / 400)), color=GREY, lw=1.6, ls="--",
            label="Glicko/ELO expected (400-scale)")
    ax.scatter(grp["mid"], grp["p"], s=grp["n"] / 8 + 15, color=ACCENT, zorder=5,
               label="Observed solve rate (size ∝ n)")
    ax.plot(grp["mid"], grp["p"], color=ACCENT, lw=1, alpha=0.5)
    ax.yaxis.set_major_formatter(PercentFormatter(1.0))
    ax.set_xlabel("Player rating  −  problem rating  (Elo points)")
    ax.set_ylabel("P(solved)")
    ax.set_title("The ratings are valid: solve rate rises monotonically with the gap")
    ax.legend(loc="upper left", fontsize=9, frameon=False)
    fig.savefig(f"{OUT}/calibration.png", bbox_inches="tight")
    plt.close(fig)


# ------------------------------------------------- 4. PROBLEM RD CONVERGENCE
def chart_convergence():
    natt = attempts.groupby("problem").size().rename("n")
    p = problems.merge(natt, on="problem", how="left").fillna({"n": 0})
    bins = [-1, 0, 2, 5, 10, 25, 9999]
    labels = ["0", "1–2", "3–5", "6–10", "11–25", "25+"]
    p["b"] = pd.cut(p["n"], bins, labels=labels)
    g = p.groupby("b", observed=True).ratingDeviation.mean()

    fig, ax = plt.subplots(figsize=(7.6, 4.2))
    bars = ax.bar(range(len(g)), g.values, color=ACCENT2, width=0.62)
    ax.axhline(150, color=WARN, ls="--", lw=1.4)
    ax.text(len(g) - 0.5, 152, "seed RD = 150 (no evidence)", color=WARN,
            ha="right", va="bottom", fontsize=9)
    for i, v in enumerate(g.values):
        ax.text(i, v + 1.5, f"{v:.0f}", ha="center", fontsize=9, color=INK)
    ax.set_xticks(range(len(g)))
    ax.set_xticklabels(g.index)
    ax.set_xlabel("Attempts a problem has received")
    ax.set_ylabel("Mean rating deviation (RD)")
    ax.set_title("Glicko learning: a problem's uncertainty shrinks with evidence")
    ax.set_ylim(80, 160)
    fig.savefig(f"{OUT}/convergence.png", bbox_inches="tight")
    plt.close(fig)


# ------------------------------------------- 5. DIFFICULTY RECOVERY (external)
def chart_difficulty_recovery():
    natt = attempts.groupby("problem").size().rename("n")
    p = problems.merge(natt, on="problem", how="left").fillna({"n": 0})
    p = p[p["n"] >= 3].copy()  # only problems with some evidence

    def family(src):
        if not isinstance(src, str):
            return "Other"
        if "AMC 8" in src:
            return "AMC 8"
        if "AMC 10" in src:
            return "AMC 10"
        if "AMC 12" in src:
            return "AMC 12"
        if "AIME" in src:
            return "AIME"
        return "Other"

    p["fam"] = p["source"].apply(family)
    order = ["AMC 8", "AMC 10", "AMC 12", "AIME"]
    data = [p[p.fam == f].rating.values for f in order]

    fig, ax = plt.subplots(figsize=(7.6, 4.4))
    bp = ax.boxplot(data, vert=True, patch_artist=True, widths=0.55,
                    medianprops=dict(color=INK, lw=1.6), showfliers=False)
    palette = [ACCENT, ACCENT2, WARN, GOOD]
    for patch, c in zip(bp["boxes"], palette):
        patch.set_facecolor(c)
        patch.set_alpha(0.65)
    ax.set_xticklabels([f"{f}\n(n={len(d)})" for f, d in zip(order, data)])
    ax.set_ylabel("Converged problem rating")
    ax.set_title("Earned, not assigned: ratings recover the known contest hierarchy")
    fig.savefig(f"{OUT}/difficulty_recovery.png", bbox_inches="tight")
    plt.close(fig)


# ------------------------------------------------- 6. ENGAGEMENT DISTRIBUTION
def chart_engagement():
    gp = attempts.groupby("player").size()
    fig, ax = plt.subplots(figsize=(7.6, 4))
    ax.hist(gp.values, bins=np.arange(0, 80, 2), color=ACCENT, alpha=0.85)
    ax.axvline(gp.median(), color=INK, ls="--", lw=1.2)
    ax.text(gp.median() + 1, ax.get_ylim()[1] * 0.85,
            f"median = {gp.median():.0f}", color=INK, fontsize=9)
    ax.set_xlabel("Problems attempted (per player who played)")
    ax.set_ylabel("Players")
    ax.set_title("A short, heavy-tailed session: most play a handful, a few grind 200+")
    fig.savefig(f"{OUT}/engagement.png", bbox_inches="tight")
    plt.close(fig)


for fn in (chart_growth, chart_funnel, chart_calibration, chart_convergence,
           chart_difficulty_recovery, chart_engagement):
    fn()
    print("ok:", fn.__name__)
print("charts written to", OUT)
