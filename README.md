# syncout

**Two workouts, one screen.**

A zero-dependency web app for home bodyweight training. Run it on your
computer, open it on your phone or TV, and train side by side:
your muscle-building workout on one side, pilates on the other.

Built around a broad-shouldered, lean-strength goal: wide back, defined arms,
and a lean waist — no equipment, just your body and a floor. Your partner gets a
pilates flow that needs nothing but a yoga mat.

## Features

- **Split screen mode** — your workout and her pilates run side by side with
  independent timers and plans. Stacks vertically on narrow screens.
- **Animated demonstrations** — every exercise has a looping stick-figure
  animation plus step-by-step text cues.
- **Fixed routines and a duration-based generator** — pick a routine, or tell
  it how long you want to train (10–45 min) and it builds a plan with
  sets × reps, rest breaks and countdown timers.
- **Muscle targets** — each exercise is tagged (chest, shoulders, back, core,
  legs, glutes, triceps…).
- **TV-friendly UI** — scales from phone to 4K TV with large, high-contrast
  controls and sound cues (Web Audio beeps for start/rest/finish).

## Quick start

Requires [Node.js](https://nodejs.org) 18+.

```sh
node server.js
```

The server prints URLs you can open on your phone and TV (same Wi-Fi):

```
Your device:    http://192.168.1.23:3000
```

Open one URL on your computer, another on your iPhone/TV — no installs.

## Project structure

```
syncout/
├── index.html     # app shell (home / setup / workout views)
├── styles.css     # responsive dark theme
├── app.js         # views, plan generator, timers, split screen
├── exercises.js   # exercise database (muscles, steps, animation data)
├── anim.js        # canvas stick-figure animation engine
├── visual-assets.js # optional frame-based exercise demonstrations
├── assets/         # third-party visual assets and notices
└── server.js      # static file server for the app files only (Node built-ins only)
```

## Adding your own exercises

Each exercise lives in `exercises.js` as plain data: name, target mode,
muscles, sets/reps or duration, step-by-step cues, and a list of keyframes.
Keyframes are poses of a 14-joint skeleton (`head`, shoulders, elbows,
wrists, hip, knees, ankles) in a 200×200 canvas space — the app tweens
between them. Copy an existing entry, tweak the pose coordinates, and it
plays.

## Roadmap ideas

- More exercises per muscle group and progressions
- Saved history / streaks
- Optional voice prompts ("next exercise", "rest 30 seconds")

## License

The app source code and original exercise data are MIT-licensed — see
[LICENSE](LICENSE).

The selected third-party visual assets under
[assets/workout-guide](assets/workout-guide) remain licensed separately under
CC BY-SA 4.0. See the included
[license notice](assets/workout-guide/LICENSE-ASSETS) and
[attribution](assets/workout-guide/ATTRIBUTION.md) for the required credit,
upstream sources, and license terms.
