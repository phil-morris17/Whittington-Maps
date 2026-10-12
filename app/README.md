# Whittington Trail app and Churchyard Survey

Two pages that work together, built to sit in the `Whittington-Maps` GitHub repository.

| File | What it is |
|---|---|
| `index.html` | **Whittington Trail** — the visitor app: 13 trail stops with stories, facts and quizzes, a map, and the History Has a Voice films |
| `recorder.html` | **Churchyard Survey** — the volunteer field tool for recording GPS points |
| `manifest.webmanifest`, `sw.js`, icons | Make the app installable and let it work offline |
| `stops.json` | *(you add this later)* — trail stop positions, exported from the survey tool |

## Putting it online

1. In the `Whittington-Maps` repo on GitHub, create a folder called `app` and upload every file from this folder into it.
2. After a minute or two the pages are live at:
   - App: `https://phil-morris17.github.io/Whittington-Maps/app/`
   - Survey tool: `https://phil-morris17.github.io/Whittington-Maps/app/recorder.html`
3. On a phone, open the app link, then **Add to Home Screen** (Safari: Share button; Chrome: ⋮ menu). It now opens like an app and works without signal.

GPS only works on a secure (https) address, which GitHub Pages provides.

## Recording trail stop positions

Only St Bartholomew's has a position so far. To add the rest:

1. Open the survey tool, choose **Trail stop**, pick the stop, stand where a visitor would look at it, and **Take reading**, then **Save point**.
2. When done, tap **Download stops.json for the app** and upload that file into the `app` folder on GitHub (replacing any older one).

The app picks the positions up automatically. "You are here" and distances then work for every stop.

## Recording churchyard areas

- Choose **Churchyard area**, pick the area or named section (South Door, BGS, Croft and so on), and record its corners **walking clockwise**, one point per corner. The plan joins them in number order.
- Record a few **Landmarks** (Lych Gate, church corners, gates) on each visit. They let us check GPS drift.
- Points stay on the phone until exported. At the end of each session use **Download CSV for Airtable** (or **Share CSV** to email it).
- To combine volunteers' work, open one phone's tool and use **Merge another volunteer's CSV**. Points are matched by an internal record key, so nothing is duplicated. If two people used the same point number for one section, the list flags it.
- The CSV columns import straight into a new Airtable table. **Download GeoJSON** gives points and area outlines for QGIS or the churchyard map.

## Updating the app later

If you change any file, open `sw.js` and change `wt-v1` to `wt-v2` (and so on). Otherwise phones keep showing the cached copy.

## Churchyard area outlines

`areas.json` holds the surveyed outline of each named section (South Door, BGS, Croft and so on), tidied so neighbouring sections share an edge instead of overlapping. The survey tool draws them on its plan and tells you which section each reading falls in. The same outlines are in `data/churchyard-areas.geojson` (for QGIS or the churchyard map) and `data/churchyard-areas.swift`. West Door is not yet surveyed.
