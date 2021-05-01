import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { invariant } from "@/utils";
import { ZIndex } from "@/zIndex";
import { SPR_LAMP_OFF } from "../generated/images/SPR_LAMP_OFF";
import { SPR_LAMP_ON } from "../generated/images/SPR_LAMP_ON";

class LampAnimation extends ImageAnimation {

    private MORSE: Record<string,string> = {
        'A': '.-',
        'B': '-...',
        'C': '-.-.',
        'D': '-..',
        'E': '.',
        'F': '..-.',
        'G': '--.',
        'H': '....',
        'I': '..',
        'J': '.---',
        'K': '-.-',
        'L': '.-..',
        'M': '--',
        'N': '-.',
        'O': '---',
        'P': '.--.',
        'Q': '--.-',
        'R': '.-.',
        'S': '...',
        'T': '-',
        'U': '..-',
        'V': '...-',
        'W': '.--',
        'X': '-..-',
        'Y': '-.--',
        'Z': '--..',
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
    };

    private onOffIndex = 0
    private onOffData: boolean[] = [ false ];

    constructor(initialLeft: number, initialTop: number) {
        super(initialLeft, initialTop, ZIndex.BEHIND_GUY, true, undefined,
            NO_LEFT_MOVEMENT,
            [
                {
                    image: SPR_LAMP_OFF,
                    durationInTicks: 1000,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
        this.say('sos I am a djinn trapped in this lamp Help me and I will grant you one wish');
    }

    private lampOn: boolean = false;
    private nTicks = 0;

    getImage() {
        return this.lampOn ? SPR_LAMP_ON : SPR_LAMP_OFF;
    }

    tick() {
        this.tickMessage();
        return super.tick();
    }

    private tickMessage() {
        this.nTicks++;
        if ((this.nTicks % 5) === 0) {
            this.onOffIndex++;
            this.lampOn = this.onOffData[this.onOffIndex % this.onOffData.length];
        }
    }

    say(message: string) {
        this.onOffData = this.generateOnOffData(message);
        this.onOffIndex = 0;
    }

    private generateOnOffData(message: string): boolean[] {
        const res: boolean[] = [];
        const msg = ' ' + message.toUpperCase() + ' ';
        for (let i = 0 ; i < msg.length ; i++) {
            const char = msg.charAt(i);
            if (char === ' ') {
                res.push(false);
                res.push(false);
                res.push(false);
                res.push(false);
                res.push(false);
                res.push(false);
            } else {
                const code = this.MORSE[char];
                invariant(code, `Bad character: ${char}`);
                for (let j = 0 ; j < code.length ; j++) {
                    if (code[j] === '.') {
                        res.push(true);
                        res.push(true);
                        res.push(false);
                        res.push(false);
                    } else {
                        res.push(true);
                        res.push(true);
                        res.push(true);
                        res.push(true);
                        res.push(true);
                        res.push(false);
                        res.push(false);
                    }
                }
                res.push(false);
                res.push(false);
            }
        }

        return res;
    }

}


export const ANIM_LAMP = new LampAnimation(50, 5);
