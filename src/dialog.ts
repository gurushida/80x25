export type TextSegment = string[];


const MINIMUM_SEGMENT_DURATION_IN_TICKS = 80;

export function getDurationInTicks(segment: TextSegment): number {
    const totalLength = segment.join(',').length;
    const duration = Math.round(totalLength * 2.5);
    return duration < MINIMUM_SEGMENT_DURATION_IN_TICKS ? MINIMUM_SEGMENT_DURATION_IN_TICKS : duration;
}
