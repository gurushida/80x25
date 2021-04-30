import { Animation, AnimationStep, ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { Cue, getDurationInTicks } from "@/dialog";
import { center } from "@/utils";
import { WIDTH, HEIGHT } from "@/screenBuffer";
import { ZIndex } from "@/zIndex";
import { PaintTask } from "@/paintTask";

export class TextAnimation implements Animation {

    private animation: ImageAnimation;

    /**
     * @param cues The cues to say
     * @param anchorLeft   The left and bottom positions of the text box anchor, which
     * @param anchorBottom is the bottom center of the bounding box
     */
    constructor(cues: Cue[], anchorLeft: number, anchorBottom: number) {
        const { width, height } = this.getBoundingBox(cues);
        const steps: AnimationStep[] = [];
        for (const cue of cues) {
            steps.push(this.createStep(cue, width, height))
        }

        this.animation = this.createAnimation(steps, anchorLeft, anchorBottom);
    }


    skipToNextCue() {
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
     * line of each given cue.
     */
    private getBoundingBox(cues: Cue[]): { width: number, height: number } {
        let width = 0;
        let height = 0;
        for (const cue of cues) {
            if (cue.length > height) {
                height = cue.length;
            }
            for (const line of cue) {
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

        return new ImageAnimation(left, top, ZIndex.TEXT, false, undefined, NO_LEFT_MOVEMENT, steps);
    }


    private createStep(cue: Cue, boxWidth: number, boxHeight: number): AnimationStep {
        const rows: string [] = [];
        const mask: string [] = [];

        const emptyLines = boxHeight - cue.length;
        for (let i = 0 ; i < emptyLines ; i++) {
            rows.push(' '.repeat(boxWidth));
            mask.push(' '.repeat(boxWidth));
        }

        for (const line of cue) {
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
            durationInTicks: getDurationInTicks(cue),
            offsetX: 0,
            offsetY: 0,
            hotspotFilter: undefined
        };
    }

    tick(): PaintTask[] | undefined {
        return this.animation.tick();
    }

}
