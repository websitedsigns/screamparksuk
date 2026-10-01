import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Ghost,
  Search,
  Trophy,
  MapPin,
  ChevronRight,
  X,
  RotateCcw,
  CalendarDays,
  Clock3,
  ArrowUpDown,
  ImageOff
} from "lucide-react";

import "./styles.css";

/*
|--------------------------------------------------------------------------
| LOGO SYSTEM
|--------------------------------------------------------------------------
|
| Put your logos in:
|
| public/
|   logos/
|     parks/
|       tulleys.png
|       farmaggedon.png
|       dr-frights.png
|       thorpe-park.png
|       alton-towers.png
|
|   logos/
|     mazes/
|       tulleys/
|         the-chop-shop.png
|         the-haunted-hayride.png
|         the-creepy-cottage.png
|
| You can use .png, .jpg, .jpeg, .webp or .svg.
|
*/

const LOGO_BASE = "./logos";

const parkLogo = (id) => `${LOGO_BASE}/parks/${id}.png`;

const mazeLogo = (parkId, mazeId) =>
  `${LOGO_BASE}/mazes/${parkId}/${mazeId}.png`;

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const maze = (name, parkId) => ({
  id: slugify(name),
  name,
  logo: mazeLogo(parkId, slugify(name))
});

/*
|--------------------------------------------------------------------------
| PARK / EVENT DATA
|--------------------------------------------------------------------------
*/

const PARKS = [
  {
    id: "tulleys",
    name: "Tulleys Shocktober Fest",
    location: "West Sussex",
    category: "Scream Park",
    dates: "October 2026",
    logo: parkLogo("tulleys"), 
    description:
      "Festival-style scream park with multiple scare attractions, street food, bars, live music and shows.",
    mazes: [
      "The Chop Shop",
      "The Haunted Hayride",
      "The Creepy Cottage",
      "The Cellar Returns",
      "Electrick Circus",
      "Doom Town",
      "Wastelands",
      "Purgatory",
      "Appleton County Farm",
      "Appleton Saw Mill",
      "Coven of 13",
      "Hellements"
    ].map((name) => maze(name, "tulleys"))
  },

  {
    id: "farmaggedon",
    name: "Farmaggedon",
    location: "Lancashire",
    category: "Scream Park",
    dates: "October 2026",
    logo: parkLogo("farmaggedon"),
    description:
      "Five award-winning scare houses with street theatre, live music, food, bars and Fear Go Round.",
    mazes: [
      "Beast of Terror",
      "Meat Locker",
      "The Facility",
      "Maze of Death",
      "Hellucination"
    ].map((name) => maze(name, "farmaggedon"))
  },

  {
    id: "drfrights",
    name: "Dr. Frights",
    location: "Northamptonshire",
    category: "Scream Park",
    dates: "October 2026",
    logo: parkLogo("drfrights"),
    description:
      "Seven award-winning scare houses with street theatre, live music, food, bars and Fear Go Round.",
    mazes: [
      "Black Death",
      "Maid to Kill",
      "Lights Out",
      "Blood Bayou",
      "Trick or Treat Street",
      "Terror Below",
      "Killer Clowns: Super Happy Fun World"
    ].map((name) => maze(name, "drfrights"))
  },

  {
    id: "thorpe",
    name: "Thorpe Park Fright Nights",
    location: "Surrey",
    category: "Theme Park Halloween",
    dates: "2 Oct – 1 Nov 2026",
    logo: parkLogo("thorpe"),
    description:
      "25 Years of Fear with five scare mazes, scare zones, shows and rides after dark.",
    mazes: [
      "Tenement",
      "Trailers",
      "DeadBeat",
      "Stitches",
      "Survival Games"
    ].map((name) => maze(name, "thorpe"))
  },

  {
    id: "alton",
    name: "Alton Towers Scarefest",
    location: "Staffordshire",
    category: "Theme Park Halloween",
    dates: "26 Sep – 1 Nov 2026",
    logo: parkLogo("alton"),
    description:
      "Large Halloween event mixing thrill mazes, family experiences, rides in darkness and live entertainment.",
    mazes: [
      "Final Exhibit",
      "Edge of the Forest",
      "Altonville Mine Tours: Tiny's Revenge",
      "COMPOUND"
    ].map((name) => maze(name, "alton"))
  },

  {
    id: "fear",
    name: "FEAR Scream Park",
    location: "Avon Valley",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("fear"),
    description:
      "A dedicated scare attraction experience with multiple horror mazes and Halloween entertainment.",
    mazes: [
      "Seeds of Evil",
      "Malefica: Into Darkness",
      "X4",
      "The Core",
      "Vita Nova"
    ].map((name) => maze(name, "fear"))
  },

  {
    id: "cursed",
    name: "Village of the Cursed",
    location: "Essex",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("cursed"),
    description: "Essex’s No.1 Horror Experience",
    mazes: [
      "DOOMentia",
      "HMP Strangleways",
      "INN-ForMassMurder",
      "Tainted Blood",
      "The Final Cut",
      "The Inner Sanctum",
      "The Station"
    ].map((name) => maze(name, "cursed"))
  },

  {
    id: "primevil",
    name: "PrimEvil",
    location: "Norfolk",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("primevil"),
    description: "Multi-maze Halloween scare event.",
    mazes: ["The Asylum", "The Haunting", "The Woods"].map((name) =>
      maze(name, "primevil")
    )
  },

  {
    id: "psychopath",
    name: "Psychopath",
    location: "Newcastle",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("psychopath"),
    description: "Multi-maze Halloween scare event.",
    mazes: [
      "I Scream",
      "Psycho Torium",
      "One last Rampage",
      "Isolation",
      "Dolls House: The Factory",
      "Flight Path 666",
      "Psychopath VR",
      "Crawl Space",
      "Vandalised",
      "Origin of Evil",
      "The Darkness",
      "Cutthroat Island"
    ].map((name) => maze(name, "psychopath"))
  },

  {
    id: "scarekingdom",
    name: "Scare Kingdom Scream Park",
    location: "Lancashire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("scarekingdom"),
    description:
      "Halloween scare park with immersive attractions and entertainment.",
    mazes: [
      "ManorMortis",
      "Gothica",
      "Warehouse 669",
      "Interrogation",
      "Body Snatchers",
      "Carnihell"
    ].map((name) => maze(name, "scarekingdom"))
  },

  {
    id: "screamfest",
    name: "Screamfest",
    location: "Staffordshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("screamfest"),
    description: "Halloween scare event with multiple attractions.",
    mazes: [
      "Mutation Damnation",
      "Hellcatraz",
      "Insomnia",
      "Freakout On Tour",
      "Hellboy Joes Zombie tour",
      "Area 52"
    ].map((name) => maze(name, "screamfest"))
  },

{
    id: "statfold",
    name: "Statfold Scream Park",
    location: "Staffordshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("statfold"),
    description: "Halloween scare event with multiple attractions.",
    mazes: [
      "Killbilly Hoedown Showdown",
      "End of The Line",
      "The Offering",
    ].map((name) => maze(name, "statfold"))
  },


  {
    id: "howl",
    name: "The Howl Scream Park",
    location: "Bedfordshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("howl"),
    description:
      "Immersive horror experience with multiple scare attractions.",
    mazes: [
      "Shriek Easy",
      "Red",
      "Howl Valley High",
      "Noxious Alley",
      "Full Moon Manor",
      "The Shed",
      "Squealers Yard"
    ].map((name) => maze(name, "howl"))
  },

  {
    id: "xtreme",
    name: "Xtreme Scream Park",
    location: "Leicestershire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("xtreme"),
    description:
      "Halloween scare attraction with multiple themed experiences.",
    mazes: [
      "The Witches of Hardluck wood",
      "The Village",
      "Spores",
      "The Pie Factory",
      "Ashhell Penitentiary",
      "Circus Vs Circused",
      "BlutLust",
      "The Village"
    ].map((name, index, array) =>
      maze(
        index === array.findIndex((item) => item === name)
          ? name
          : `${name} ${index + 1}`,
        "xtreme"
      )
    )
  },

  {
    id: "york",
    name: "York Maze Hallowscream",
    location: "Yorkshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("york"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: [
      "Necropolis",
      "The Singularity",
      "Cornys Cornevils",
      "Corntagion",
      "The FleshPot",
      "Rednecks Revenge"
    ].map((name) => maze(name, "york"))
  },

  {
    id: "scaregrounds",
    name: "Yorkshire Scaregrounds",
    location: "Yorkshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("scaregrounds"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: [
      "Mutation: Be Afraid>",
      "Body Stitchers",
      "House of Bourbon",
      "Old Mercy: Dead on Arrival",
      "Carnival of Carnage"
    ].map((name) => maze(name, "scaregrounds"))
  },

  {
    id: "blackpool",
    name: "Blackpool Pleasure Beach Journey To Hell",
    location: "Lancashire",
    category: "Theme Park Halloween",
    dates: "October",
    logo: parkLogo("blackpool"),
    description: "Halloween season at the famous seaside theme park.",
    mazes: [
      "Twisted Tunnels",
      "Abyss",
      "New Attraction 1",
      "New Attraction 2"
    ].map((name) => maze(name, "blackpool"))
  },

  {
    id: "leeds",
    name: "Leeds Scare Maze",
    location: "Yorkshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("leeds"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: ["Horror Motel"].map((name) => maze(name, "leeds"))
  },

  {
    id: "stourbridge",
    name: "Stourbridge Scare Maze",
    location: "Midlands",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("stourbridge"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: ["Stourbridge Scare Maze"].map((name) =>
      maze(name, "stourbridge")
    )
  },

  {
    id: "walsall",
    name: "Walsall Scare Maze",
    location: "Midlands",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("walsall"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: ["Walsall Scare Maze"].map((name) => maze(name, "walsall"))
  },

  {
    id: "scarecity",
    name: "Scare City",
    location: "Lancashire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("scarecity"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: [
      "Cutthroat",
      "Devils Orphanage",
      "Carnevalley",
      "The Skinning Shed",
      "RestBite"
    ].map((name) => maze(name, "scarecity"))
  },

  {
    id: "realm",
    name: "The Nightmare Realm",
    location: "London",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("realm"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: ["Avery Hill"].map((name) => maze(name, "realm"))
  },

  {
    id: "horrormania",
    name: "Horrormania",
    location: "Cambridgeshire",
    category: "Scream Park",
    dates: "October",
    logo: parkLogo("horrormania"),
    description:
      "Halloween attraction combining maze-based scares and seasonal entertainment.",
    mazes: [
      "Taylor Swift Goes Nuts",
      "Camp Crystal Lake",
      "Grindhouse",
      "Stinkyface World",
      "Twenty Eight Years Later",
      "Peppa Pig with Chainsaws",
      "Clown City",
      "Undead Vikings",
      "Children of the Corn",
      "Deadflix and Kills",
      "The House"
    ].map((name) => maze(name, "horrormania"))
  }
];

/*
|--------------------------------------------------------------------------
| LOGO COMPONENTS
|--------------------------------------------------------------------------
*/

function LogoImage({
  src,
  alt,
  className = "",
  fallback = "maze"
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`logo-fallback ${fallback} ${className}`}>
        <span>🎃</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`logo-image ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

function ParkLogo({ park, size = "medium" }) {
  return (
    <LogoImage
      src={park.logo}
      alt={`${park.name} logo`}
      className={`park-logo park-logo-${size}`}
      fallback="park"
    />
  );
}

function MazeLogo({ mazeItem }) {
  return (
    <LogoImage
      src={mazeItem.logo}
      alt={`${mazeItem.name} logo`}
      className="maze-logo"
      fallback="maze"
    />
  );
}

/*
|--------------------------------------------------------------------------
| RATINGS
|--------------------------------------------------------------------------
*/

const blank = () => ({
  mazes: {},
  food: 0,
  entertainment: 0,
  feel: 0,
  parkQuality: 0,
  visitDate: "",
  review: ""
});

const load = () => {
  try {
    return JSON.parse(localStorage.getItem("spuk-v2") || "{}");
  } catch {
    return {};
  }
};

const save = (x) =>
  localStorage.setItem("spuk-v2", JSON.stringify(x));

const avg = (a) => {
  const v = a.map(Number).filter((x) => x > 0);

  return v.length
    ? v.reduce((x, y) => x + y, 0) / v.length
    : 0;
};

function calc(r, p) {
  const mazeScores = p.mazes
    .map((mazeItem) => {
      const m = r?.mazes?.[mazeItem.id];

      if (!m || !(m.scare && m.actors && m.theming)) {
        return 0;
      }

      return (m.scare + m.actors + m.theming) / 3;
    })
    .filter(Boolean);

  const mazeScore = avg(mazeScores);

  const park = avg([
    r?.food,
    r?.entertainment,
    r?.feel
  ]);

  const overall =
    mazeScore && park
      ? (mazeScore + park) / 2
      : 0;

  return {
    maze: mazeScore,
    park,
    overall,
    percent: overall * 10,
    complete: mazeScores.length
  };
}

/*
|--------------------------------------------------------------------------
| RATING COMPONENTS
|--------------------------------------------------------------------------
*/

function Pumpkin({ value, set }) {
  return (
    <div className="pumpkins">
      {Array.from({ length: 10 }, (_, i) => (
        <button
          key={i}
          className={i < value ? "on" : ""}
          onClick={() => set(i + 1)}
          type="button"
        >
          🎃
        </button>
      ))}

      <b>{value ? `${value}/10` : "—"}</b>
    </div>
  );
}

function Stars({ value, set }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          className={i < value ? "on" : ""}
          onClick={() => set(i + 1)}
          type="button"
        >
          ★
        </button>
      ))}

      <b>{value ? `${value}/5` : "—"}</b>
    </div>
  );
}

function Slider({ label, value, set }) {
  return (
    <div className="slider">
      <div>
        <b>{label}</b>
        <strong>{value || "—"}/10</strong>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        value={value || 0}
        onChange={(e) => set(+e.target.value)}
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| APP
|--------------------------------------------------------------------------
*/

function App() {
  const [ratings, setRatings] = useState(load);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("score");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () =>
      PARKS.filter(
        (p) =>
          (filter === "All" || p.category === filter) &&
          `${p.name} ${p.location}`
            .toLowerCase()
            .includes(search.toLowerCase())
      ).sort((a, b) =>
        sort === "score"
          ? calc(ratings[b.id], b).overall -
            calc(ratings[a.id], a).overall
          : a.name.localeCompare(b.name)
      ),
    [ratings, search, sort, filter]
  );

  const ranked = useMemo(
    () =>
      PARKS.map((p) => ({
        ...p,
        s: calc(ratings[p.id], p)
      }))
        .filter((p) => p.s.overall > 0)
        .sort((a, b) => b.s.overall - a.s.overall),
    [ratings]
  );

  const current = PARKS.find((p) => p.id === selected);

  const r = current
    ? ratings[current.id] || blank()
    : null;

  const s = current
    ? calc(r, current)
    : null;

  const update = (patch) => {
    const next = {
      ...ratings,
      [current.id]: {
        ...r,
        ...patch
      }
    };

    setRatings(next);
    save(next);
  };

  const mazeUpdate = (id, patch) =>
    update({
      mazes: {
        ...r.mazes,
        [id]: {
          ...(r.mazes[id] || {}),
          ...patch
        }
      }
    });

  const reset = () => {
    if (confirm("Reset all Scream Parks UK ratings?")) {
      setRatings({});
      save({});
    }
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header>
        <div className="header-inner">

          <button
            className="brand"
            onClick={() => setTab("home")}
          >
            <span>🎃</span>

            <div>
              <h1>
                SCREAM PARKS <em>UK</em>
              </h1>

              <small>
                THE HOME OF YOUR HALLOWEEN RATINGS
              </small>
            </div>
          </button>

          <button
            className="reset"
            onClick={reset}
          >
            <RotateCcw size={15} />
            Reset
          </button>

        </div>
      </header>

      {/* NAV */}

      <nav>
        <button
          className={tab === "home" ? "active" : ""}
          onClick={() => setTab("home")}
        >
          <Ghost size={17} />
          Parks
        </button>

        <button
          className={tab === "leaderboard" ? "active" : ""}
          onClick={() => setTab("leaderboard")}
        >
          <Trophy size={17} />
          Leaderboard
        </button>
      </nav>

      {/* HOME */}

      {tab === "home" && (
        <main>

          <section className="hero">
            <div>
              <label>HALLOWEEN 2026</label>

              <h2>
                Find the UK's
                <br />
                <span>ultimate scream.</span>
              </h2>

              <p>
                Rate every maze, compare the atmosphere
                and build your own definitive UK Halloween
                leaderboard.
              </p>
            </div>

            <div className="score-explainer">
              <div>
                <span>01</span>
                <b>MAZES</b>
                <small>
                  Scariness + Actors + Theming
                </small>
              </div>

              <div>
                <span>02</span>
                <b>PARK</b>
                <small>
                  Food + Entertainment + Feel
                </small>
              </div>

              <div>
                <span>03</span>
                <b>FINAL</b>
                <small>
                  Average → percentage
                </small>
              </div>
            </div>
          </section>

          {/* STATS */}

          <section className="stats">
            <div>
              <strong>{PARKS.length}</strong>
              <span>Attractions</span>
            </div>

            <div>
              <strong>
                {PARKS.reduce(
                  (a, p) => a + p.mazes.length,
                  0
                )}
              </strong>
              <span>Mazes listed</span>
            </div>

            <div>
              <strong>{ranked.length}</strong>
              <span>You have rated</span>
            </div>

            <div>
              <strong>
                {ranked[0]
                  ? `${ranked[0].s.percent.toFixed(0)}%`
                  : "—"}
              </strong>

              <span>Your #1</span>
            </div>
          </section>

          {/* SEARCH */}

          <section className="toolbar">

            <div className="search">
              <Search size={17} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search attraction or location"
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Scream Park</option>
              <option>Theme Park Halloween</option>
              <option>Family Halloween</option>
            </select>

            <button
              className="sort"
              onClick={() =>
                setSort(
                  sort === "score"
                    ? "name"
                    : "score"
                )
              }
            >
              <ArrowUpDown size={15} />

              {sort === "score"
                ? "Top rated"
                : "A–Z"}
            </button>

          </section>

          {/* PARK CARDS */}

          <section className="cards">

            {filtered.map((p) => {
              const x = calc(
                ratings[p.id],
                p
              );

              return (
                <article
                  className="card"
                  key={p.id}
                  onClick={() =>
                    setSelected(p.id)
                  }
                >

                  <div className="card-cover">

                    <ParkLogo
                      park={p}
                      size="large"
                    />

                    <span>{p.category}</span>

                    <strong>
                      {x.overall
                        ? `${x.percent.toFixed(0)}%`
                        : "RATE ME"}
                    </strong>

                  </div>

                  <div className="card-body">

                    <div className="card-title-row">

                      <ParkLogo
                        park={p}
                        size="small"
                      />

                      <div>
                        <h3>{p.name}</h3>

                        <p>
                          <MapPin size={14} />
                          {p.location}
                        </p>
                      </div>

                    </div>

                    <p className="desc">
                      {p.description}
                    </p>

                    <div className="chips">
                      <span>
                        🎃{" "}
                        {x.maze
                          ? x.maze.toFixed(1)
                          : "—"}{" "}
                        maze
                      </span>

                      <span>
                        ★{" "}
                        {x.park
                          ? x.park.toFixed(1)
                          : "—"}{" "}
                        park
                      </span>

                      <span>
                        {p.mazes.length} mazes
                      </span>
                    </div>

                    <footer>
                      <span>{p.dates}</span>
                      <ChevronRight size={17} />
                    </footer>

                  </div>

                </article>
              );
            })}

          </section>

        </main>
      )}

      {/* LEADERBOARD */}

      {tab === "leaderboard" && (
        <main>

          <section className="leader-head">
            <label>YOUR RATINGS</label>

            <h2>Halloween leaderboard</h2>

            <p>
              Your parks ranked by the Scream Parks UK
              scoring system.
            </p>
          </section>

          {!ranked.length ? (
            <div className="empty">
              <Trophy size={45} />

              <h3>
                Your leaderboard is empty
              </h3>

              <p>
                Rate your first attraction to
                start building it.
              </p>
            </div>
          ) : (
            <div className="leader">

              {ranked.map((p, i) => (
                <div
                  className="leader-row"
                  key={p.id}
                  onClick={() =>
                    setSelected(p.id)
                  }
                >

                  <b>#{i + 1}</b>

                  <ParkLogo
                    park={p}
                    size="tiny"
                  />

                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.location}</small>
                  </div>

                  <span>
                    🎃 {p.s.maze.toFixed(1)}
                  </span>

                  <span>
                    ★ {p.s.park.toFixed(1)}
                  </span>

                  <strong className="pct">
                    {p.s.percent.toFixed(0)}%
                  </strong>

                </div>
              ))}

            </div>
          )}

        </main>
      )}

      {/* MODAL */}

      {current && (
        <div
          className="overlay"
          onClick={() => setSelected(null)}
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close"
              onClick={() =>
                setSelected(null)
              }
            >
              <X />
            </button>

            {/* MODAL HEADER */}

            <div className="modal-top">

              <div className="modal-brand">

                <ParkLogo
                  park={current}
                  size="modal"
                />

                <div>

                  <label>
                    {current.category}
                  </label>

                  <p>
                    <MapPin size={14} />
                    {current.location}
                  </p>

                  <h2>{current.name}</h2>

                  <small>
                    {current.description}
                  </small>

                </div>

              </div>

              <div className="overall">

                <strong>
                  {s.overall
                    ? `${s.percent.toFixed(0)}%`
                    : "—"}
                </strong>

                <span>OVERALL</span>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="summary">

              <div>
                <span>MAZE SCORE</span>

                <b>
                  {s.maze
                    ? s.maze.toFixed(1)
                    : "—"}

                  <small>/10</small>
                </b>
              </div>

              <div>
                <span>PARK SCORE</span>

                <b>
                  {s.park
                    ? s.park.toFixed(1)
                    : "—"}

                  <small>/10</small>
                </b>
              </div>

              <div>
                <span>COMPLETION</span>

                <b>
                  {s.complete}
                  <small>
                    /{current.mazes.length} mazes
                  </small>
                </b>
              </div>

            </div>

            {/* MAZES */}

            <div className="section-title">

              <span>01</span>

              <div>
                <h3>Rate the mazes</h3>

                <p>
                  Each maze contributes equally
                  to your Maze Score.
                </p>
              </div>

            </div>

            <div className="maze-list">

              {current.mazes.map(
                (mazeItem, i) => {

                  const q =
                    r.mazes[mazeItem.id] || {};

                  return (
                    <div
                      className="maze"
                      key={mazeItem.id}
                    >

                      {/* MAZE LOGO + NAME */}

                      <div className="maze-name">

                        <MazeLogo
                          mazeItem={mazeItem}
                        />

                        <div className="maze-heading">

                          <span>
                            MAZE{" "}
                            {String(i + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <h4>
                            {mazeItem.name}
                          </h4>

                        </div>

                      </div>

                      {/* SCARINESS */}

                      <div className="rating-line">

                        <label>
                          🎃 Scariness
                        </label>

                        <Pumpkin
                          value={q.scare || 0}
                          set={(v) =>
                            mazeUpdate(
                              mazeItem.id,
                              { scare: v }
                            )
                          }
                        />

                      </div>

                      {/* ACTORS */}

                      <div className="rating-line">

                        <label>Actors</label>

                        <Slider
                          label=""
                          value={q.actors || 0}
                          set={(v) =>
                            mazeUpdate(
                              mazeItem.id,
                              { actors: v }
                            )
                          }
                        />

                      </div>

                      {/* THEMING */}

                      <div className="rating-line">

                        <label>
                          Theming / immersiveness
                        </label>

                        <Slider
                          label=""
                          value={q.theming || 0}
                          set={(v) =>
                            mazeUpdate(
                              mazeItem.id,
                              { theming: v }
                            )
                          }
                        />

                      </div>

                      {/* MAZE SCORE */}

                      <div className="maze-score">

                        Maze score

                        <b>
                          {q.scare &&
                          q.actors &&
                          q.theming
                            ? (
                                (q.scare +
                                  q.actors +
                                  q.theming) /
                                3
                              ).toFixed(1)
                            : "—"}
                          /10
                        </b>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

            {/* PARK */}

            <div className="section-title">

              <span>02</span>

              <div>
                <h3>Rate the whole park</h3>

                <p>
                  These scores form your Park Score.
                </p>
              </div>

            </div>

            <div className="park-grid">

              <Slider
                label="Food & drink"
                value={r.food}
                set={(v) =>
                  update({ food: v })
                }
              />

              <Slider
                label="Entertainment"
                value={r.entertainment}
                set={(v) =>
                  update({
                    entertainment: v
                  })
                }
              />

              <Slider
                label="Overall feel / atmosphere"
                value={r.feel}
                set={(v) =>
                  update({ feel: v })
                }
              />

            </div>

            {/* QUALITY */}

            <div className="quality">

              <div>

                <b>Overall park quality</b>

                <small>
                  Separate 5-star quality rating
                </small>

              </div>

              <Stars
                value={r.parkQuality}
                set={(v) =>
                  update({
                    parkQuality: v
                  })
                }
              />

            </div>

            {/* VISIT */}

            <div className="visit">

              <div>

                <CalendarDays size={17} />

                <label>
                  Visit date

                  <input
                    type="date"
                    value={r.visitDate}
                    onChange={(e) =>
                      update({
                        visitDate:
                          e.target.value
                      })
                    }
                  />

                </label>

              </div>

              <div>

                <Clock3 size={17} />

                <label>
                  Review

                  <textarea
                    value={r.review}
                    onChange={(e) =>
                      update({
                        review:
                          e.target.value
                      })
                    }
                    placeholder="What stood out about your visit?"
                  />

                </label>

              </div>

            </div>

            {/* FINAL SCORE */}

            <div className="final">

              <div>

                <span>
                  SCREAM PARKS UK FINAL SCORE
                </span>

                <strong>
                  {s.overall
                    ? `${s.percent.toFixed(0)}%`
                    : "Complete your ratings"}
                </strong>

              </div>

              <div>

                <small>
                  (
                  {s.maze
                    ? s.maze.toFixed(1)
                    : "—"}{" "}
                  +{" "}
                  {s.park
                    ? s.park.toFixed(1)
                    : "—"}
                  ) ÷ 2
                </small>

                <b>
                  {s.overall
                    ? s.overall.toFixed(1)
                    : "—"}
                  /10
                </b>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);