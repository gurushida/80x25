// A cue corresponds to lines meant to be displayed
// at the same, stacked above each other like this:
//
//            Oh my goodness.
//     This is utterly ridiculous !
//
export type Cue = string[];

const MINIMUM_SEGMENT_DURATION_IN_TICKS = 80;

export function getDurationInTicks(cue: Cue): number {
    const totalLength = cue.join(',').length;
    const duration = Math.round(totalLength * 2.5);
    return duration < MINIMUM_SEGMENT_DURATION_IN_TICKS ? MINIMUM_SEGMENT_DURATION_IN_TICKS : duration;
}
