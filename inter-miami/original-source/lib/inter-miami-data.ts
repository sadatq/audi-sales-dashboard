export type Match = {
  date: string; opponent: string; competition: string; venue: "Home" | "Away" | "Neutral";
  gf: number; ga: number; xg: number; xga: number; possession: number; shots: number; sot: number; passes: number;
};
export type Player = { name:string; role:string; goals:number; assists:number; rating:number; minutes:number };

export const sampleMatches: Match[] = [
 {date:"2026-02-22",opponent:"NYCFC",competition:"MLS",venue:"Home",gf:2,ga:2,xg:1.8,xga:1.1,possession:58,shots:14,sot:6,passes:548},
 {date:"2026-03-02",opponent:"Houston",competition:"MLS",venue:"Away",gf:4,ga:1,xg:2.7,xga:.8,possession:55,shots:17,sot:9,passes:516},
 {date:"2026-03-09",opponent:"Charlotte",competition:"MLS",venue:"Home",gf:1,ga:0,xg:1.5,xga:.6,possession:61,shots:13,sot:5,passes:602},
 {date:"2026-03-16",opponent:"Atlanta",competition:"MLS",venue:"Away",gf:2,ga:1,xg:1.7,xga:1.2,possession:57,shots:12,sot:5,passes:531},
 {date:"2026-03-29",opponent:"Philadelphia",competition:"MLS",venue:"Home",gf:2,ga:1,xg:2.2,xga:.9,possession:63,shots:16,sot:7,passes:638},
 {date:"2026-04-06",opponent:"Toronto",competition:"MLS",venue:"Home",gf:1,ga:1,xg:1.3,xga:1,possession:65,shots:15,sot:4,passes:655},
 {date:"2026-04-10",opponent:"LAFC",competition:"Champions Cup",venue:"Home",gf:3,ga:1,xg:2.5,xga:1.4,possession:59,shots:18,sot:8,passes:571},
 {date:"2026-04-19",opponent:"Columbus",competition:"MLS",venue:"Away",gf:0,ga:1,xg:.9,xga:1.6,possession:52,shots:9,sot:3,passes:487},
 {date:"2026-05-03",opponent:"New York RB",competition:"MLS",venue:"Home",gf:4,ga:1,xg:3.1,xga:.7,possession:62,shots:20,sot:11,passes:624},
 {date:"2026-05-10",opponent:"Minnesota",competition:"MLS",venue:"Away",gf:1,ga:4,xg:1.2,xga:2.8,possession:60,shots:13,sot:4,passes:589},
 {date:"2026-06-19",opponent:"Porto",competition:"Club World Cup",venue:"Neutral",gf:2,ga:1,xg:1.6,xga:1.3,possession:47,shots:10,sot:5,passes:462},
 {date:"2026-06-29",opponent:"Paris SG",competition:"Club World Cup",venue:"Neutral",gf:0,ga:4,xg:.5,xga:3,possession:32,shots:6,sot:2,passes:344},
];
export const samplePlayers: Player[] = [
 {name:"Lionel Messi",role:"RW",goals:18,assists:11,rating:8.42,minutes:1880},
 {name:"Luis Suárez",role:"ST",goals:10,assists:8,rating:7.61,minutes:1635},
 {name:"Tadeo Allende",role:"LW",goals:8,assists:3,rating:7.29,minutes:1310},
 {name:"Jordi Alba",role:"LB",goals:2,assists:9,rating:7.24,minutes:1712},
 {name:"Telasco Segovia",role:"CM",goals:6,assists:4,rating:7.18,minutes:1428},
];
