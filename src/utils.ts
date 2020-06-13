    /**
     * Centers the given string by adding spaces until the given width is reached.
     */
    export function center(s: string, width: number) {
        const padding = width - s.length;
        if (padding < 0) {
            throw new Error(`Cannot center string '${s}' in ${width} characters`);
        }

        if (padding % 2 === 0) {
            return ' '.repeat(padding / 2) + s + ' '.repeat(padding / 2);
        } else {
            return ' '.repeat(padding / 2) + s + ' '.repeat((padding / 2) + 1);
        }
    }

