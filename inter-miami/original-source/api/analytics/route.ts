import { env } from "cloudflare:workers";
import { sampleMatches, samplePlayers, type Match } from "@/lib/inter-miami-data";

function binding() {
  if (!env.DB) throw new Error("SQL database is unavailable");
  return env.DB;
}

async function seedIfEmpty(db: D1Database) {
  const matchCount = await db.prepare("SELECT COUNT(*) AS total FROM matches").first<{ total:number }>();
  if ((matchCount?.total ?? 0) === 0) {
    const statements = sampleMatches.map((m) => db.prepare(`INSERT INTO matches (match_date, opponent, competition, venue, goals_for, goals_against, expected_goals, expected_goals_against, possession, shots, shots_on_target, passes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(m.date,m.opponent,m.competition,m.venue,m.gf,m.ga,m.xg,m.xga,m.possession,m.shots,m.sot,m.passes));
    await db.batch(statements);
  }
  const playerCount = await db.prepare("SELECT COUNT(*) AS total FROM players").first<{ total:number }>();
  if ((playerCount?.total ?? 0) === 0) {
    const statements = samplePlayers.map((p) => db.prepare("INSERT INTO players (name, role, goals, assists, rating, minutes) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(p.name,p.role,p.goals,p.assists,p.rating,p.minutes));
    await db.batch(statements);
  }
}

export async function GET() {
  try {
    const db=binding(); await seedIfEmpty(db);
    const { results:matchRows } = await db.prepare(`SELECT match_date AS date, opponent, competition, venue, goals_for AS gf, goals_against AS ga, expected_goals AS xg, expected_goals_against AS xga, possession, shots, shots_on_target AS sot, passes FROM matches ORDER BY match_date`).all();
    const { results:playerRows } = await db.prepare("SELECT name, role, goals, assists, rating, minutes FROM players ORDER BY (goals + assists) DESC, rating DESC").all();
    return Response.json({ matches:matchRows, players:playerRows, source:"Cloudflare D1 SQL" });
  } catch (error) {
    return Response.json({ error:error instanceof Error?error.message:"Unable to query analytics database" },{status:500});
  }
}

export async function POST(request:Request) {
  try {
    const payload=await request.json() as { matches?:Match[] };
    if (!Array.isArray(payload.matches)||payload.matches.length===0||payload.matches.length>500) return Response.json({error:"Provide 1–500 valid matches"},{status:400});
    for (const m of payload.matches) {
      if (!m.date||!m.opponent||!m.competition||!["Home","Away","Neutral"].includes(m.venue)||[m.gf,m.ga,m.xg,m.xga,m.possession,m.shots,m.sot,m.passes].some(v=>!Number.isFinite(Number(v)))) return Response.json({error:`Invalid match row: ${m.opponent||"unknown opponent"}`},{status:400});
    }
    const db=binding();
    const inserts=payload.matches.map(m=>db.prepare(`INSERT INTO matches (match_date, opponent, competition, venue, goals_for, goals_against, expected_goals, expected_goals_against, possession, shots, shots_on_target, passes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(m.date,m.opponent,m.competition,m.venue,Number(m.gf),Number(m.ga),Number(m.xg),Number(m.xga),Number(m.possession),Number(m.shots),Number(m.sot),Number(m.passes)));
    await db.batch([db.prepare("DELETE FROM matches"),...inserts]);
    return Response.json({ imported:payload.matches.length },{status:201});
  } catch (error) {
    return Response.json({error:error instanceof Error?error.message:"Unable to import matches"},{status:500});
  }
}
