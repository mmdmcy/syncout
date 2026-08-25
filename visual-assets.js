function workoutGuideAsset(slug, dur = 2.4) {
  return {
    dur,
    frames: [1, 2, 3].map((frame) => `assets/workout-guide/${slug}/frame-${frame}.svg`)
  };
}

// These are copied from Workout Guide commit ba0b709cb20430361b2cb33aaadd20998164a916.
// Keep this allowlist small so the app does not depend on the external package at runtime.
const VISUAL_ASSETS = Object.freeze({
  pushup: workoutGuideAsset('push-up', 2.8),
  diamond_pushup: workoutGuideAsset('diamond-push-up', 2.8),
  decline_pushup: workoutGuideAsset('decline-push-up', 3),
  pike_pushup: workoutGuideAsset('pike-push-up', 3),
  squat: workoutGuideAsset('bodyweight-squat', 3),
  jump_squat: workoutGuideAsset('jump-squat', 2.4),
  lunge: workoutGuideAsset('forward-lunge', 3),
  glute_bridge: workoutGuideAsset('glute-bridge', 3),
  pilates_glute_bridge: workoutGuideAsset('glute-bridge', 3),
  plank: workoutGuideAsset('plank', 4),
  side_plank: workoutGuideAsset('side-plank', 4),
  mountain_climbers: workoutGuideAsset('mountain-climber', 1.6),
  hollow_hold: workoutGuideAsset('hollow-body-hold', 3),
  superman: workoutGuideAsset('superman', 3),
  leg_raises: workoutGuideAsset('lying-leg-raise', 3),
  table_row: workoutGuideAsset('inverted-row', 3),
  arm_circles: workoutGuideAsset('arm-circles', 3),
  leg_swings: workoutGuideAsset('leg-swings-stretch', 3),
  cat_cow: workoutGuideAsset('cat-cow-stretch', 4),
  forward_fold: workoutGuideAsset('seated-forward-fold-stretch', 4),
  hip_flexor_stretch: workoutGuideAsset('kneeling-hip-flexor-stretch', 4),
  childs_pose: workoutGuideAsset('childs-pose', 5),

  // Additional no-equipment exercises from the same reviewed asset set.
  burpee: workoutGuideAsset('burpee', 2.4),
  bear_crawl: workoutGuideAsset('bear-crawl', 2.4),
  wall_sit: workoutGuideAsset('wall-sit', 3),
  dead_bug: workoutGuideAsset('dead-bug', 3),
  calf_raise: workoutGuideAsset('calf-raise', 2.4),
  inchworm: workoutGuideAsset('inchworm', 3),
  fire_hydrant: workoutGuideAsset('fire-hydrant', 3),
  donkey_kick: workoutGuideAsset('donkey-kick', 3),
  clamshell: workoutGuideAsset('clamshell', 3)
});
