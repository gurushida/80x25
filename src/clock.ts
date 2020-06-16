import { Runnable } from "./runnable";


interface ScheduledTask {
    runnable: Runnable;
    when: number;
    rescheduleDelay: number;
}


export class Clock {

    public static clock = new Clock();

    currentTick: number;

    timerId: NodeJS.Timeout | undefined;
    scheduledTasks: ScheduledTask[];

    private constructor() {
        this.currentTick = 0;
        this.scheduledTasks = [];
    }


    play() {
        if (!this.timerId) {
            this.timerId = global.setInterval(() => this.tick(), 20);
        }
    }


    pause() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }


    tick() {
        this.currentTick = this.currentTick + 1;
        for (const task of this.scheduledTasks) {
            if (task.when === this.currentTick) {
                task.runnable();
                if (task.rescheduleDelay !== -1) {
                    task.when = this.currentTick + 1 + task.rescheduleDelay;
                } else {
                    task.when = -1;
                }
            }
        }
        // Remove old tasks
        this.scheduledTasks = this.scheduledTasks.filter(task => task.when > this.currentTick);
    }


    repeat(delayBetweenCallsInTicks: number, runnable: Runnable) {
        const scheduledTask: ScheduledTask = {
            runnable,
            when: this.currentTick + 1 + delayBetweenCallsInTicks,
            rescheduleDelay: delayBetweenCallsInTicks,
        };
        this.scheduledTasks.push(scheduledTask);
    }


    scheduleOnce(delayBeforeExecution: number, runnable: Runnable) {
        const scheduledTask: ScheduledTask = {
            runnable,
            when: this.currentTick + 1 + delayBeforeExecution,
            rescheduleDelay: -1,
        };
        this.scheduledTasks.push(scheduledTask);
    }


    defer(runnable: Runnable) {
        this.scheduleOnce(0, runnable);
    }

}