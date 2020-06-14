import { Animation, PaintTask, AnimationStep, ImageAnimation } from "../animations";
import { TextSegment, getDurationInTicks } from "../dialog";
import { center } from "../utils";
import { WIDTH, HEIGHT } from "../screenbuffer";

export class TextAnimation implements Animation {

    private animation: ImageAnimation;

    /**
     * @param textSegments The segments to say
     * @param anchorLeft   The left and bottom positions of the text box anchor, which
     * @param anchorBottom is the bottom center of the bounding box
     */
    constructor(textSegments: TextSegment[], anchorLeft: number, anchorBottom: number) {
        const { width, height } = this.getBoundingBox(textSegments);
        const steps: AnimationStep[] = [];
        for (const segment of textSegments) {
            steps.push(this.createStep(segment, width, height))
        }

        this.animation = this.createAnimation(steps, anchorLeft, anchorBottom);
    }


    skipToNextTextSegment() {
        this.animation.skipToNextStep()
    }


    /**
     * Makes sure there is exactly one space on each side of the string,
     * which will help readability.
     */
    private normalizeLine(s: string): string {
        return ` ${s.trim()} `;
    }


    /**
     * Returns the dimension of the smallest box that can contain each
     * line of each given segment.
     */
    private getBoundingBox(textSegments: TextSegment[]): { width: number, height: number } {
        let width = 0;
        let height = 0;
        for (const segment of textSegments) {
            if (segment.length > height) {
                height = segment.length;
            }
            for (const line of segment) {
                const length = this.normalizeLine(line).length;
                if (length > width) {
                    width = length;
                }
            }
        }
        return { width, height };
    }


    private createAnimation(steps: AnimationStep[], anchorLeft: number, anchorBottom: number): ImageAnimation {
        const width = steps[0].image.width;
        const height = steps[0].image.height;
        let left = Math.round(anchorLeft - width / 2);
        let top = anchorBottom - height;

        // Let's make sure the text box fit in the screen
        if (left < 0) {
            left = 0;
        }
        if (left + width >= WIDTH) {
            left = WIDTH - 1 - width;
        }
        if (top < 0) {
            top = 0;
        }
        if (top + height >= HEIGHT - 1) {
            top = HEIGHT - 2 - height;
        }

        return new ImageAnimation(left, top, false, undefined, steps);
    }


    private createStep(segment: TextSegment, boxWidth: number, boxHeight: number): AnimationStep {
        const rows: string [] = [];
        const mask: string [] = [];

        const emptyLines = boxHeight - segment.length;
        for (let i = 0 ; i < emptyLines ; i++) {
            rows.push(' '.repeat(boxWidth));
            mask.push(' '.repeat(boxWidth));
        }

        for (const line of segment) {
            const normalized = this.normalizeLine(line);
            rows.push(center(normalized, boxWidth));
            mask.push(center('#'.repeat(normalized.length), boxWidth));
        }
        return {
            image: {
                width: boxWidth,
                height: boxHeight,
                rows,
                mask,
            },
            durationInTicks: getDurationInTicks(segment),
            offsetX: 0,
            offsetY: 0,
            hotspotFilter: undefined
        };
    }

    tick(): PaintTask[] | undefined {
        return this.animation.tick();
    }

}
