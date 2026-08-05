const STAND = F([
  [100, 42], [96, 60], [95, 96], [94, 130], [104, 60], [105, 96], [106, 130],
  [100, 100], [96, 122], [95, 150], [92, 180], [104, 122], [105, 150], [108, 180]
]);

const STAND_ARMS_UP = F([
  [100, 40], [96, 58], [94, 44], [92, 28], [104, 58], [106, 44], [108, 28],
  [100, 98], [96, 120], [95, 148], [92, 178], [104, 120], [105, 148], [108, 178]
]);

const ALL_FOURS = F([
  [94, 132], [96, 140], [95, 158], [92, 178], [104, 140], [103, 158], [100, 178],
  [146, 140], [148, 162], [150, 172], [152, 178], [154, 162], [156, 172], [158, 178]
]);

const EXERCISES = {

  pushup: {
    id: 'pushup', name: 'Push-Up', target: 'him',
    groups: ['push', 'chest', 'triceps'],
    muscles: ['Chest', 'Triceps', 'Front Delts'],
    type: 'reps', reps: 12, sets: 3, rest: 45,
    steps: [
      'Place hands slightly wider than shoulders, body in a straight line',
      'Lower your chest until it nearly touches the floor',
      'Press back up to full arm extension',
      'Keep your core tight, don\'t let hips sag'
    ],
    anim: { dur: 2.8, props: {}, kf: [
      { t: 0, p: F([[144, 132], [126, 140], [130, 161], [130, 178], [134, 140], [138, 161], [138, 178], [108, 140], [99, 158], [97, 169], [88, 178], [109, 158], [107, 169], [96, 178]]) },
      { t: 1, p: F([[144, 147], [126, 155], [131, 168], [130, 178], [134, 155], [139, 168], [138, 178], [108, 155], [99, 170], [97, 177], [88, 178], [109, 170], [107, 177], [96, 178]]) }
    ] }
  },

  diamond_pushup: {
    id: 'diamond_pushup', name: 'Diamond Push-Up', target: 'him',
    groups: ['push', 'triceps', 'chest'],
    muscles: ['Triceps', 'Inner Chest'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Form a diamond with your thumbs and index fingers under your chest',
      'Keep elbows tucked close to your sides',
      'Lower until your chest touches your hands',
      'Press back up, keeping elbows in'
    ],
    anim: { dur: 2.8, props: {}, kf: [
      { t: 0, p: F([[146, 130], [122, 140], [129, 160], [132, 178], [136, 140], [135, 160], [134, 178], [106, 140], [98, 158], [96, 169], [88, 178], [107, 158], [105, 169], [95, 178]]) },
      { t: 1, p: F([[146, 146], [122, 156], [133, 168], [132, 178], [136, 156], [131, 168], [134, 178], [106, 156], [98, 170], [96, 177], [88, 178], [107, 170], [105, 177], [95, 178]]) }
    ] }
  },

  decline_pushup: {
    id: 'decline_pushup', name: 'Decline Push-Up', target: 'him',
    groups: ['push', 'shoulders', 'chest'],
    muscles: ['Upper Chest', 'Front Delts'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Place your feet on a chair or sofa, hands on the floor',
      'Body stays in one straight line',
      'Lower your chest toward the floor',
      'Press up — the incline hits your upper chest and shoulders'
    ],
    anim: { dur: 3, props: { chair: { x: 156, y: 150, w: 40, h: 30 } }, kf: [
      { t: 0, p: F([[134, 168], [122, 170], [127, 175], [130, 178], [130, 170], [133, 175], [136, 178], [142, 166], [152, 160], [158, 155], [166, 150], [160, 160], [166, 155], [174, 150]]) },
      { t: 1, p: F([[134, 175], [122, 177], [132, 175], [130, 178], [130, 177], [136, 175], [136, 178], [142, 171], [152, 166], [158, 160], [166, 150], [160, 166], [166, 160], [174, 150]]) }
    ] }
  },

  pike_pushup: {
    id: 'pike_pushup', name: 'Pike Push-Up', target: 'him',
    groups: ['shoulders', 'push'],
    muscles: ['Shoulders', 'Upper Chest'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Start in a downward-dog shape, hips high, heels pressed down',
      'Bend your elbows and lower your head toward the floor',
      'Press back up until arms are straight',
      'The steeper the pike, the harder the shoulders work'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: F([[136, 126], [130, 134], [135, 152], [140, 178], [138, 134], [141, 152], [144, 178], [112, 108], [99, 142], [95, 160], [88, 178], [105, 142], [101, 160], [94, 178]]) },
      { t: 1, p: F([[134, 140], [126, 150], [138, 166], [140, 178], [134, 150], [142, 166], [144, 178], [114, 120], [100, 148], [96, 164], [88, 178], [106, 148], [102, 164], [94, 178]]) }
    ] }
  },

  chair_dips: {
    id: 'chair_dips', name: 'Chair Dips', target: 'him',
    groups: ['push', 'triceps'],
    muscles: ['Triceps', 'Front Delts'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Sit on the edge of a chair, hands gripping the edge beside your hips',
      'Walk feet forward, legs bent at 90 degrees',
      'Lower your hips until arms are at 90 degrees',
      'Press back up — triceps do the work'
    ],
    anim: { dur: 3, props: { chair: { x: 52, y: 128, w: 44, h: 52 } }, kf: [
      { t: 0, p: F([[66, 140], [78, 144], [75, 136], [72, 128], [86, 144], [83, 136], [80, 128], [120, 144], [136, 156], [144, 168], [156, 178], [140, 156], [148, 168], [160, 178]]) },
      { t: 1, p: F([[70, 154], [78, 160], [75, 144], [72, 128], [86, 160], [83, 144], [80, 128], [122, 158], [138, 168], [146, 176], [156, 178], [142, 168], [150, 176], [160, 178]]) }
    ] }
  },

  handstand_hold: {
    id: 'handstand_hold', name: 'Wall Handstand Hold', target: 'him',
    groups: ['shoulders'],
    muscles: ['Shoulders', 'Upper Back'],
    type: 'time', time: 30, sets: 3, rest: 45,
    steps: [
      'Kick up against a wall, hands on the floor about a foot from it',
      'Walk your feet up the wall until your body is vertical',
      'Pull your belly in, squeeze your glutes',
      'Keep looking at your hands'
    ],
    anim: { dur: 4, props: { wall: { x: 44 } }, kf: [
      { t: 0, p: F([[100, 162], [97, 150], [96, 164], [96, 178], [103, 150], [104, 164], [104, 178], [100, 92], [88, 84], [72, 72], [48, 60], [96, 86], [80, 74], [56, 62]]) },
      { t: 1, p: F([[100, 160], [97, 148], [96, 164], [96, 178], [103, 148], [104, 164], [104, 178], [100, 90], [88, 82], [72, 70], [48, 58], [96, 84], [80, 72], [56, 60]]) }
    ] }
  },

  squat: {
    id: 'squat', name: 'Bodyweight Squat', target: 'him',
    groups: ['legs'],
    muscles: ['Quads', 'Glutes'],
    type: 'reps', reps: 15, sets: 3, rest: 45,
    steps: [
      'Feet shoulder-width, toes slightly out',
      'Sit back and down until thighs are parallel to the floor',
      'Chest up, back straight, heels on the ground',
      'Drive up through your heels'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: STAND },
      { t: 1, p: F([[100, 64], [96, 84], [92, 104], [88, 130], [104, 84], [108, 104], [112, 130], [100, 118], [96, 136], [106, 166], [92, 180], [104, 136], [114, 166], [108, 180]]) }
    ] }
  },

  jump_squat: {
    id: 'jump_squat', name: 'Jump Squat', target: 'him',
    groups: ['legs'],
    muscles: ['Quads', 'Glutes', 'Calves'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Start in a deep squat',
      'Explode upward, swinging your arms overhead',
      'Land soft on your heels, straight back down into a squat',
      'Keep the pace quick and controlled'
    ],
    anim: { dur: 2.4, props: {}, kf: [
      { t: 0, p: F([[100, 64], [96, 84], [92, 104], [88, 130], [104, 84], [108, 104], [112, 130], [100, 118], [96, 136], [106, 166], [92, 180], [104, 136], [114, 166], [108, 180]]) },
      { t: 1, p: F([[100, 36], [96, 56], [92, 40], [88, 24], [104, 56], [108, 40], [112, 24], [100, 92], [96, 118], [98, 122], [90, 150], [104, 118], [106, 122], [98, 150]]) }
    ] }
  },

  lunge: {
    id: 'lunge', name: 'Lunge', target: 'him',
    groups: ['legs'],
    muscles: ['Quads', 'Glutes', 'Hamstrings'],
    type: 'reps', reps: 12, sets: 3, rest: 45, eachSide: true,
    steps: [
      'Step one leg forward, drop the back knee toward the floor',
      'Front knee stays over your ankle',
      'Torso stays upright',
      'Switch legs each set — shown here on one side'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: F([[104, 50], [100, 68], [96, 90], [90, 112], [108, 68], [112, 92], [118, 114], [104, 104], [92, 128], [84, 150], [74, 178], [122, 140], [128, 156], [136, 178]]) },
      { t: 1, p: F([[104, 52], [100, 70], [94, 92], [88, 116], [108, 70], [114, 94], [120, 118], [104, 122], [90, 150], [82, 166], [74, 178], [120, 152], [128, 168], [136, 178]]) }
    ] }
  },

  bulgarian_split: {
    id: 'bulgarian_split', name: 'Bulgarian Split Squat', target: 'him',
    groups: ['legs'],
    muscles: ['Quads', 'Glutes'],
    type: 'reps', reps: 8, sets: 3, rest: 45, eachSide: true,
    steps: [
      'Back foot on a chair, front foot planted in front of you',
      'Drop straight down until your front thigh is parallel',
      'Front knee tracks over your toes',
      'Push up through the front heel'
    ],
    anim: { dur: 3.2, props: { chair: { x: 52, y: 138, w: 40, h: 42 } }, kf: [
      { t: 0, p: F([[112, 50], [108, 68], [100, 88], [90, 100], [116, 68], [124, 88], [132, 98], [112, 100], [94, 138], [82, 138], [70, 140], [132, 138], [138, 154], [142, 180]]) },
      { t: 1, p: F([[112, 56], [108, 72], [100, 90], [90, 104], [116, 72], [124, 90], [132, 102], [112, 118], [92, 148], [80, 146], [70, 140], [130, 150], [136, 166], [142, 180]]) }
    ] }
  },

  glute_bridge: {
    id: 'glute_bridge', name: 'Glute Bridge', target: 'him',
    groups: ['legs', 'core'],
    muscles: ['Glutes', 'Hamstrings'],
    type: 'reps', reps: 15, sets: 3, rest: 45,
    steps: [
      'Lie on your back, knees bent, feet flat on the floor',
      'Drive your hips up until your body makes a straight line',
      'Squeeze your glutes at the top',
      'Lower with control'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: F([[104, 172], [108, 170], [106, 158], [100, 146], [116, 170], [114, 158], [108, 146], [128, 170], [136, 160], [138, 150], [144, 172], [134, 160], [136, 150], [142, 170]]) },
      { t: 1, p: F([[104, 172], [108, 170], [106, 158], [100, 146], [116, 170], [114, 158], [108, 146], [128, 142], [136, 150], [138, 146], [144, 172], [134, 150], [136, 146], [142, 170]]) }
    ] }
  },

  plank: {
    id: 'plank', name: 'Plank', target: 'him',
    groups: ['core'],
    muscles: ['Core', 'Shoulders'],
    type: 'time', time: 45, sets: 3, rest: 30,
    steps: [
      'Forearms on the floor, elbows under shoulders',
      'Body in one straight line from head to heels',
      'Squeeze abs and glutes, breathe steadily',
      'Don\'t let your hips sink'
    ],
    anim: { dur: 4, props: {}, kf: [
      { t: 0, p: F([[136, 146], [124, 152], [121, 177], [118, 178], [132, 152], [129, 177], [126, 178], [108, 152], [100, 162], [98, 171], [92, 178], [109, 162], [107, 171], [96, 178]]) },
      { t: 1, p: F([[136, 144], [124, 150], [121, 177], [118, 178], [132, 150], [129, 177], [126, 178], [108, 150], [100, 160], [98, 170], [92, 178], [109, 160], [107, 170], [96, 178]]) }
    ] }
  },

  side_plank: {
    id: 'side_plank', name: 'Side Plank', target: 'him',
    groups: ['core'],
    muscles: ['Obliques', 'Shoulders'],
    type: 'time', time: 30, sets: 2, rest: 30, eachSide: true,
    steps: [
      'Lie on your side, support your weight on one forearm',
      'Push your hips up into a straight line',
      'Stack your feet and reach your top arm to the ceiling',
      'Breathe and hold'
    ],
    anim: { dur: 4, props: {}, kf: [
      { t: 0, p: F([[140, 122], [134, 128], [134, 152], [136, 178], [140, 126], [140, 108], [142, 92], [112, 134], [102, 150], [98, 164], [92, 178], [122, 150], [118, 164], [112, 178]]) },
      { t: 1, p: F([[140, 120], [134, 126], [134, 152], [136, 178], [140, 124], [140, 106], [142, 90], [112, 132], [102, 148], [98, 163], [92, 178], [122, 148], [118, 163], [112, 178]]) }
    ] }
  },

  mountain_climbers: {
    id: 'mountain_climbers', name: 'Mountain Climbers', target: 'him',
    groups: ['core', 'cardio'],
    muscles: ['Core', 'Shoulders'],
    type: 'time', time: 40, sets: 3, rest: 30,
    steps: [
      'In plank position, hands under shoulders',
      'Drive one knee to your chest, then switch fast',
      'Keep hips low and core tight',
      'Go as fast as you can keep form'
    ],
    anim: { dur: 1.6, props: {}, kf: [
      { t: 0, p: F([[148, 146], [136, 150], [137, 164], [138, 178], [142, 150], [143, 164], [144, 178], [116, 152], [126, 148], [128, 136], [136, 132], [110, 156], [104, 166], [100, 178]]) },
      { t: 1, p: F([[148, 146], [136, 150], [137, 164], [138, 178], [142, 150], [143, 164], [144, 178], [116, 152], [110, 156], [104, 166], [100, 178], [126, 148], [128, 136], [136, 132]]) }
    ] }
  },

  hollow_hold: {
    id: 'hollow_hold', name: 'Hollow Body Hold', target: 'him',
    groups: ['core'],
    muscles: ['Abs', 'Lower Back'],
    type: 'time', time: 30, sets: 3, rest: 30,
    steps: [
      'Lie on your back, press your lower back into the floor',
      'Lift shoulders and legs off the floor',
      'Arms extended behind you',
      'Hold — the lower back stays glued to the floor'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: F([[108, 170], [114, 166], [104, 158], [92, 148], [122, 166], [112, 158], [100, 148], [130, 174], [136, 162], [138, 150], [142, 142], [140, 162], [142, 150], [146, 142]]) },
      { t: 1, p: F([[108, 167], [114, 163], [104, 155], [92, 145], [122, 163], [112, 155], [100, 145], [130, 171], [136, 159], [138, 147], [142, 139], [140, 159], [142, 147], [146, 139]]) }
    ] }
  },

  superman: {
    id: 'superman', name: 'Superman Hold', target: 'him',
    groups: ['back'],
    muscles: ['Lower Back', 'Rear Delts'],
    type: 'time', time: 30, sets: 3, rest: 30,
    steps: [
      'Lie face down, arms extended forward',
      'Lift arms, chest and legs off the floor',
      'Squeeze your lower back and glutes',
      'Hold, then lower slowly'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: F([[110, 172], [112, 166], [104, 158], [96, 148], [120, 166], [112, 158], [104, 148], [128, 170], [132, 164], [134, 156], [136, 146], [136, 164], [138, 156], [140, 146]]) },
      { t: 1, p: F([[110, 168], [112, 162], [102, 152], [92, 140], [120, 162], [110, 152], [100, 140], [128, 166], [132, 160], [134, 152], [136, 142], [136, 160], [138, 152], [140, 142]]) }
    ] }
  },

  leg_raises: {
    id: 'leg_raises', name: 'Leg Raises', target: 'him',
    groups: ['core'],
    muscles: ['Lower Abs', 'Hip Flexors'],
    type: 'reps', reps: 12, sets: 3, rest: 30,
    steps: [
      'Lie on your back, hands under your glutes, legs straight',
      'Lift your legs to vertical without swinging',
      'Lower slowly until your heels almost touch the floor',
      'Keep your lower back pressed down'
    ],
    anim: { dur: 3.2, props: {}, kf: [
      { t: 0, p: F([[96, 172], [104, 170], [100, 158], [96, 146], [112, 170], [108, 158], [104, 146], [128, 172], [136, 172], [138, 174], [144, 174], [140, 172], [142, 174], [148, 174]]) },
      { t: 1, p: F([[96, 172], [104, 170], [100, 158], [96, 146], [112, 170], [108, 158], [104, 146], [128, 172], [136, 132], [140, 104], [144, 88], [140, 132], [144, 104], [148, 88]]) }
    ] }
  },

  table_row: {
    id: 'table_row', name: 'Under-Table Row', target: 'him',
    groups: ['back'],
    muscles: ['Lats', 'Biceps'],
    type: 'reps', reps: 10, sets: 3, rest: 45,
    steps: [
      'Lie under a sturdy table, grip the edge, arms straight',
      'Pull your chest up to the table edge',
      'Squeeze your shoulder blades together at the top',
      'Lower with control — like an upside-down row'
    ],
    anim: { dur: 3.2, props: { table: { y: 120, x1: 96, x2: 180 } }, kf: [
      { t: 0, p: F([[104, 150], [110, 150], [110, 134], [100, 122], [118, 150], [114, 134], [106, 122], [140, 156], [150, 162], [156, 170], [162, 178], [152, 162], [158, 170], [164, 178]]) },
      { t: 1, p: F([[104, 158], [110, 158], [110, 142], [100, 122], [118, 158], [114, 142], [106, 122], [140, 162], [150, 166], [156, 172], [162, 178], [152, 166], [158, 172], [164, 178]]) }
    ] }
  },

  arm_circles: {
    id: 'arm_circles', name: 'Arm Circles', target: 'him',
    groups: ['warmup'],
    muscles: ['Shoulders'],
    type: 'time', time: 30, sets: 1, rest: 0,
    steps: [
      'Stand tall, arms straight out to your sides',
      'Make small circles forward for 15s, then backward',
      'Keep your core braced'
    ],
    anim: { dur: 2.2, props: {}, kf: [
      { t: 0, p: F([[100, 42], [96, 58], [88, 52], [78, 58], [104, 58], [112, 52], [122, 58], [100, 100], [96, 122], [95, 150], [92, 180], [104, 122], [105, 150], [108, 180]]) },
      { t: 1, p: F([[100, 42], [96, 58], [88, 56], [78, 50], [104, 58], [112, 56], [122, 50], [100, 100], [96, 122], [95, 150], [92, 180], [104, 122], [105, 150], [108, 180]]) }
    ] }
  },

  jumping_jacks: {
    id: 'jumping_jacks', name: 'Jumping Jacks', target: 'him',
    groups: ['warmup', 'cardio'],
    muscles: ['Whole Body'],
    type: 'time', time: 40, sets: 1, rest: 0,
    steps: [
      'Jump feet out wide while arms rise overhead',
      'Jump back to standing, arms down',
      'Keep a steady rhythm'
    ],
    anim: { dur: 1.6, props: {}, kf: [
      { t: 0, p: STAND },
      { t: 1, p: F([[100, 38], [96, 56], [92, 40], [88, 22], [104, 56], [108, 40], [112, 22], [100, 96], [88, 118], [84, 148], [74, 178], [112, 118], [116, 148], [126, 178]]) }
    ] }
  },

  leg_swings: {
    id: 'leg_swings', name: 'Leg Swings', target: 'him',
    groups: ['warmup'],
    muscles: ['Hamstrings', 'Hip Flexors'],
    type: 'time', time: 30, sets: 1, rest: 0, eachSide: true,
    steps: [
      'Hold a wall or chair for balance',
      'Swing one leg forward and back, keeping it straight',
      'Switch legs'
    ],
    anim: { dur: 2, props: {}, kf: [
      { t: 0, p: F([[100, 42], [96, 58], [94, 92], [92, 128], [104, 58], [106, 92], [108, 128], [100, 100], [96, 118], [94, 148], [90, 180], [104, 122], [105, 150], [108, 180]]) },
      { t: 1, p: F([[100, 42], [96, 58], [94, 92], [92, 128], [104, 58], [106, 92], [108, 128], [100, 100], [96, 118], [80, 132], [66, 120], [104, 122], [105, 150], [108, 180]]) }
    ] }
  },

  downward_dog: {
    id: 'downward_dog', name: 'Downward Dog', target: 'him',
    groups: ['stretch'],
    muscles: ['Hamstrings', 'Shoulders', 'Calves'],
    type: 'time', time: 30, sets: 1, rest: 0,
    steps: [
      'From all fours, lift your hips high',
      'Press heels toward the floor, arms straight',
      'Alternate pedaling your heels for a deeper calf stretch'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: F([[136, 126], [130, 134], [135, 152], [140, 178], [138, 134], [141, 152], [144, 178], [112, 108], [99, 142], [95, 160], [88, 178], [105, 142], [101, 160], [94, 178]]) },
      { t: 1, p: F([[134, 126], [128, 134], [134, 152], [140, 178], [136, 134], [140, 152], [144, 178], [112, 110], [97, 146], [92, 166], [84, 178], [104, 146], [99, 166], [94, 178]]) }
    ] }
  },

  forward_fold: {
    id: 'forward_fold', name: 'Forward Fold', target: 'him',
    groups: ['stretch'],
    muscles: ['Hamstrings', 'Lower Back'],
    type: 'time', time: 30, sets: 1, rest: 0,
    steps: [
      'Stand tall, then hinge at the hips',
      'Let your head hang toward your knees',
      'Grab opposite elbows and sway gently',
      'Bend knees slightly if you need to'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: STAND },
      { t: 1, p: F([[100, 112], [98, 122], [96, 148], [94, 172], [102, 122], [104, 148], [106, 172], [100, 118], [98, 140], [97, 160], [94, 180], [102, 140], [103, 160], [108, 180]]) }
    ] }
  },

  hip_flexor_stretch: {
    id: 'hip_flexor_stretch', name: 'Hip Flexor Stretch', target: 'him',
    groups: ['stretch'],
    muscles: ['Hip Flexors', 'Quads'],
    type: 'time', time: 30, sets: 1, rest: 0, eachSide: true,
    steps: [
      'Half-kneeling, one knee down',
      'Squeeze your glutes and push your hips forward',
      'Feel the stretch in the front of the back thigh',
      'Switch sides'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: F([[104, 52], [100, 68], [96, 90], [90, 112], [108, 68], [112, 92], [118, 114], [104, 106], [92, 130], [84, 152], [74, 178], [124, 142], [130, 156], [138, 178]]) },
      { t: 1, p: F([[104, 46], [100, 64], [96, 88], [90, 110], [108, 64], [112, 90], [118, 112], [104, 98], [92, 126], [84, 148], [74, 178], [124, 136], [130, 152], [138, 178]]) }
    ] }
  },

  cat_cow: {
    id: 'cat_cow', name: 'Cat-Cow', target: 'her',
    groups: ['mobility', 'core'],
    muscles: ['Spine', 'Core'],
    type: 'reps', reps: 10, sets: 2, rest: 20, slow: true,
    steps: [
      'Start on all fours, hands under shoulders, knees under hips',
      'Inhale: drop your belly, lift chest and tailbone (cow)',
      'Exhale: round your back up like an angry cat',
      'Move slowly with your breath'
    ],
    anim: { dur: 4, props: {}, kf: [
      { t: 0, p: F([[92, 128], [96, 136], [95, 158], [92, 178], [104, 136], [103, 158], [100, 178], [146, 132], [148, 160], [150, 172], [152, 178], [154, 160], [156, 172], [158, 178]]) },
      { t: 1, p: F([[92, 138], [96, 146], [95, 158], [92, 178], [104, 146], [103, 158], [100, 178], [146, 146], [148, 162], [150, 172], [152, 178], [154, 162], [156, 172], [158, 178]]) }
    ] }
  },

  pelvic_tilt: {
    id: 'pelvic_tilt', name: 'Pelvic Tilt', target: 'her',
    groups: ['core'],
    muscles: ['Abs', 'Lower Back'],
    type: 'reps', reps: 10, sets: 2, rest: 20, slow: true,
    steps: [
      'Lie on your back, knees bent, feet flat',
      'Press your lower back into the floor by tucking your pelvis',
      'Tiny lift of the hips — think small and controlled',
      'Release and repeat'
    ],
    anim: { dur: 3.5, props: {}, kf: [
      { t: 0, p: F([[96, 168], [106, 170], [102, 158], [98, 146], [114, 170], [110, 158], [106, 146], [128, 174], [138, 154], [140, 146], [144, 172], [136, 154], [138, 146], [142, 170]]) },
      { t: 1, p: F([[96, 168], [106, 170], [102, 158], [98, 146], [114, 170], [110, 158], [106, 146], [128, 166], [138, 152], [140, 144], [144, 172], [136, 152], [138, 144], [142, 170]]) }
    ] }
  },

  the_hundred: {
    id: 'the_hundred', name: 'The Hundred', target: 'her',
    groups: ['core'],
    muscles: ['Abs', 'Shoulders'],
    type: 'time', time: 40, sets: 1, rest: 0,
    steps: [
      'Lie on your back, lift shoulders and legs to 45 degrees',
      'Arms long, pumping up and down with small beats',
      'Breathe in for 5 pumps, out for 5 pumps',
      'Aim for 100 beats total'
    ],
    anim: { dur: 1.8, props: {}, kf: [
      { t: 0, p: F([[102, 160], [110, 158], [100, 148], [88, 138], [118, 158], [108, 148], [96, 138], [130, 170], [138, 152], [140, 140], [146, 128], [142, 152], [144, 140], [150, 128]]) },
      { t: 1, p: F([[102, 160], [110, 158], [98, 148], [84, 134], [118, 158], [106, 148], [92, 134], [130, 170], [138, 152], [140, 140], [146, 128], [142, 152], [144, 140], [150, 128]]) }
    ] }
  },

  roll_up: {
    id: 'roll_up', name: 'Roll-Up', target: 'her',
    groups: ['core'],
    muscles: ['Abs', 'Hamstrings'],
    type: 'reps', reps: 8, sets: 2, rest: 30, slow: true,
    steps: [
      'Lie on your back, arms overhead, legs straight',
      'Slowly roll your spine up, reaching toward your toes',
      'Peel vertebra by vertebra — no jerking',
      'Roll back down just as slowly'
    ],
    anim: { dur: 5, props: {}, kf: [
      { t: 0, p: F([[96, 170], [104, 168], [94, 160], [80, 152], [112, 168], [102, 160], [88, 152], [128, 172], [136, 168], [140, 170], [146, 168], [140, 168], [144, 170], [150, 168]]) },
      { t: 1, p: F([[100, 58], [96, 74], [90, 86], [86, 100], [104, 74], [110, 86], [114, 100], [100, 108], [104, 128], [106, 148], [110, 166], [112, 128], [114, 148], [118, 166]]) }
    ] }
  },

  leg_circles: {
    id: 'leg_circles', name: 'Leg Circles', target: 'her',
    groups: ['legs', 'core'],
    muscles: ['Hips', 'Inner Thighs'],
    type: 'reps', reps: 5, sets: 2, rest: 20, eachSide: true, slow: true,
    steps: [
      'Lie on your side, head propped on your arm',
      'Lift the top leg and draw big slow circles',
      'Keep your torso still — hips stay stacked',
      'Repeat in the other direction'
    ],
    anim: { dur: 6, props: {}, kf: [
      { t: 0, p: F([[96, 150], [104, 152], [108, 164], [112, 176], [112, 152], [116, 164], [120, 176], [130, 154], [138, 166], [142, 176], [148, 180], [128, 150], [144, 138], [152, 126]]) },
      { t: 0.33, p: F([[96, 150], [104, 152], [108, 164], [112, 176], [112, 152], [116, 164], [120, 176], [130, 154], [138, 166], [142, 176], [148, 180], [130, 148], [158, 138], [166, 128]]) },
      { t: 0.66, p: F([[96, 150], [104, 152], [108, 164], [112, 176], [112, 152], [116, 164], [120, 176], [130, 154], [138, 166], [142, 176], [148, 180], [136, 160], [162, 150], [168, 144]]) },
      { t: 1, p: F([[96, 150], [104, 152], [108, 164], [112, 176], [112, 152], [116, 164], [120, 176], [130, 154], [138, 166], [142, 176], [148, 180], [130, 154], [140, 156], [148, 158]]) }
    ] }
  },

  single_leg_stretch: {
    id: 'single_leg_stretch', name: 'Single Leg Stretch', target: 'her',
    groups: ['core'],
    muscles: ['Abs', 'Hip Flexors'],
    type: 'reps', reps: 12, sets: 2, rest: 20,
    steps: [
      'Lie on your back, head and shoulders lifted',
      'Bring one knee to your chest, hold the ankle with both hands',
      'Other leg extends long and low',
      'Switch — keep the ribcage pulled down'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: F([[100, 158], [108, 156], [112, 148], [120, 142], [116, 156], [114, 148], [118, 146], [126, 168], [124, 144], [128, 134], [138, 142], [118, 154], [116, 142], [120, 128]]) },
      { t: 1, p: F([[100, 158], [108, 156], [112, 148], [120, 142], [116, 156], [114, 148], [118, 146], [126, 168], [118, 154], [116, 142], [120, 128], [124, 144], [128, 134], [138, 142]]) }
    ] }
  },

  criss_cross: {
    id: 'criss_cross', name: 'Criss-Cross', target: 'her',
    groups: ['core'],
    muscles: ['Obliques', 'Abs'],
    type: 'reps', reps: 12, sets: 2, rest: 20,
    steps: [
      'Lie on your back, shoulders lifted, hands behind your head',
      'Bring one knee in and twist your opposite elbow toward it',
      'Extend the other leg long',
      'Switch sides with control'
    ],
    anim: { dur: 3, props: {}, kf: [
      { t: 0, p: F([[102, 150], [110, 150], [114, 142], [120, 136], [116, 152], [112, 146], [110, 140], [128, 166], [124, 140], [130, 134], [138, 142], [118, 152], [116, 142], [120, 128]]) },
      { t: 1, p: F([[102, 150], [110, 150], [114, 142], [120, 136], [116, 152], [112, 146], [110, 140], [128, 166], [118, 152], [116, 142], [120, 128], [124, 140], [130, 134], [138, 142]]) }
    ] }
  },

  pilates_glute_bridge: {
    id: 'pilates_glute_bridge', name: 'Glute Bridge', target: 'her',
    groups: ['glutes', 'core'],
    muscles: ['Glutes', 'Hamstrings'],
    type: 'reps', reps: 15, sets: 3, rest: 25,
    steps: [
      'Lie on your back, knees bent, feet hip-width apart',
      'Lift your hips one vertebra at a time',
      'Squeeze glutes at the top, keep ribs still',
      'Roll down slowly'
    ],
    anim: { dur: 4, props: {}, kf: [
      { t: 0, p: F([[104, 172], [108, 170], [106, 158], [100, 146], [116, 170], [114, 158], [108, 146], [128, 170], [136, 160], [138, 150], [144, 172], [134, 160], [136, 150], [142, 170]]) },
      { t: 1, p: F([[104, 172], [108, 170], [106, 158], [100, 146], [116, 170], [114, 158], [108, 146], [128, 142], [136, 150], [138, 146], [144, 172], [134, 150], [136, 146], [142, 170]]) }
    ] }
  },

  clam: {
    id: 'clam', name: 'Clam', target: 'her',
    groups: ['glutes'],
    muscles: ['Glute Medius', 'Hips'],
    type: 'reps', reps: 12, sets: 2, rest: 20, eachSide: true,
    steps: [
      'Lie on your side, knees bent and stacked, feet in line',
      'Keep heels together, open your top knee like a clam',
      'Don\'t roll your hips back',
      'Close slowly and repeat'
    ],
    anim: { dur: 3.2, props: {}, kf: [
      { t: 0, p: F([[96, 152], [104, 154], [108, 162], [112, 172], [112, 154], [116, 162], [120, 172], [132, 160], [142, 166], [146, 172], [152, 176], [140, 158], [144, 164], [150, 168]]) },
      { t: 1, p: F([[96, 152], [104, 154], [108, 162], [112, 172], [112, 154], [116, 162], [120, 172], [132, 160], [142, 166], [146, 172], [152, 176], [134, 140], [144, 148], [150, 156]]) }
    ] }
  },

  bird_dog: {
    id: 'bird_dog', name: 'Bird Dog', target: 'her',
    groups: ['core', 'back'],
    muscles: ['Core', 'Lower Back', 'Glutes'],
    type: 'reps', reps: 10, sets: 2, rest: 20, eachSide: true,
    steps: [
      'Start on all fours, spine neutral',
      'Reach one arm forward and the opposite leg back',
      'Keep hips level, don\'t let them twist',
      'Hold a breath, return, switch'
    ],
    anim: { dur: 4, props: {}, kf: [
      { t: 0, p: ALL_FOURS },
      { t: 1, p: F([[92, 126], [96, 138], [86, 132], [74, 128], [104, 138], [103, 158], [100, 178], [146, 136], [158, 130], [166, 128], [174, 124], [154, 138], [156, 158], [158, 178]]) }
    ] }
  },

  mermaid: {
    id: 'mermaid', name: 'Mermaid Stretch', target: 'her',
    groups: ['mobility', 'stretch'],
    muscles: ['Obliques', 'Spine'],
    type: 'time', time: 20, sets: 2, rest: 10, eachSide: true,
    steps: [
      'Sit tall with legs bent to one side',
      'Reach one arm up and over into a side bend',
      'Feel the stretch along your side ribcage',
      'Breathe into it, then switch sides'
    ],
    anim: { dur: 4.5, props: {}, kf: [
      { t: 0, p: F([[110, 50], [106, 68], [100, 52], [94, 38], [114, 68], [120, 52], [126, 38], [110, 118], [112, 138], [114, 156], [116, 178], [114, 138], [116, 156], [118, 178]]) },
      { t: 1, p: F([[122, 54], [116, 72], [110, 58], [104, 44], [122, 74], [128, 60], [134, 46], [112, 120], [112, 140], [114, 158], [116, 178], [114, 140], [116, 158], [118, 178]]) }
    ] }
  },

  childs_pose: {
    id: 'childs_pose', name: 'Child\'s Pose', target: 'her',
    groups: ['stretch'],
    muscles: ['Lower Back', 'Hips'],
    type: 'time', time: 30, sets: 1, rest: 0,
    steps: [
      'Kneel, big toes together, knees apart',
      'Sit your hips back onto your heels',
      'Reach arms forward and let your forehead rest',
      'Breathe deeply into your lower back'
    ],
    anim: { dur: 5, props: {}, kf: [
      { t: 0, p: F([[110, 106], [108, 120], [100, 110], [90, 100], [118, 120], [110, 110], [100, 100], [110, 152], [120, 160], [124, 170], [112, 180], [104, 160], [100, 170], [104, 180]]) },
      { t: 1, p: F([[110, 104], [108, 118], [100, 108], [90, 98], [118, 118], [110, 108], [100, 98], [110, 150], [120, 158], [124, 168], [112, 180], [104, 158], [100, 168], [104, 180]]) }
    ] }
  }
};

const ROUTINES = {
  him: [
    {
      id: 'toji_full', name: 'Toji Full Body', desc: 'Everything — the classic V-shape builder.',
      items: ['arm_circles', 'jumping_jacks', 'pushup', 'pike_pushup', 'table_row', 'squat', 'lunge', 'diamond_pushup', 'plank', 'hollow_hold', 'downward_dog', 'childs_pose']
    },
    {
      id: 'chest_shoulders', name: 'Chest & Shoulders', desc: 'Broaden the frame — the cape look.',
      items: ['arm_circles', 'decline_pushup', 'pushup', 'pike_pushup', 'handstand_hold', 'diamond_pushup', 'chair_dips', 'side_plank', 'downward_dog']
    },
    {
      id: 'back_core', name: 'Back & Core', desc: 'Build the V — lats and a tight waist.',
      items: ['arm_circles', 'table_row', 'superman', 'plank', 'mountain_climbers', 'leg_raises', 'hollow_hold', 'side_plank', 'childs_pose', 'hip_flexor_stretch']
    },
    {
      id: 'leg_day', name: 'Leg Day', desc: 'Squats, lunges, bridges — sturdy pillars.',
      items: ['leg_swings', 'squat', 'jump_squat', 'lunge', 'bulgarian_split', 'glute_bridge', 'hollow_hold', 'forward_fold', 'hip_flexor_stretch']
    },
    {
      id: 'quick15', name: 'Quick 15', desc: 'Short and sharp — 15 minutes anywhere.',
      items: ['jumping_jacks', 'pushup', 'squat', 'table_row', 'mountain_climbers', 'plank', 'downward_dog']
    }
  ],
  her: [
    {
      id: 'pilates_basics', name: 'Pilates Basics', desc: 'Learn the moves, build the habit.',
      items: ['cat_cow', 'pelvic_tilt', 'the_hundred', 'roll_up', 'single_leg_stretch', 'criss_cross', 'pilates_glute_bridge', 'childs_pose']
    },
    {
      id: 'core_glutes', name: 'Core & Glutes', desc: 'Strong centre, lifted glutes.',
      items: ['cat_cow', 'pelvic_tilt', 'the_hundred', 'pilates_glute_bridge', 'clam', 'bird_dog', 'leg_circles', 'criss_cross', 'mermaid']
    },
    {
      id: 'full_flow', name: 'Full Body Flow', desc: 'Everything in one smooth session.',
      items: ['cat_cow', 'roll_up', 'the_hundred', 'single_leg_stretch', 'criss_cross', 'pilates_glute_bridge', 'clam', 'bird_dog', 'leg_circles', 'mermaid', 'childs_pose']
    }
  ]
};

const GENERATOR_POOLS = {
  him: {
    warmup: ['arm_circles', 'jumping_jacks', 'leg_swings', 'squat'],
    push: ['pushup', 'diamond_pushup', 'decline_pushup', 'chair_dips'],
    shoulders: ['pike_pushup', 'handstand_hold', 'decline_pushup'],
    back: ['table_row', 'superman', 'decline_pushup'],
    legs: ['squat', 'jump_squat', 'lunge', 'bulgarian_split', 'glute_bridge'],
    core: ['plank', 'mountain_climbers', 'hollow_hold', 'leg_raises', 'side_plank'],
    stretch: ['downward_dog', 'forward_fold', 'hip_flexor_stretch', 'childs_pose']
  },
  her: {
    warmup: ['cat_cow', 'pelvic_tilt'],
    core: ['the_hundred', 'roll_up', 'single_leg_stretch', 'criss_cross'],
    glutes: ['pilates_glute_bridge', 'clam', 'bird_dog'],
    legs: ['leg_circles', 'single_leg_stretch'],
    stretch: ['mermaid', 'childs_pose', 'cat_cow']
  }
};
