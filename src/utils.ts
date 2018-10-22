'use strict';

const DAY = 1000 * 60 * 60 * 24;

export function dayBefore(now: Date) {
    return new Date(now.getTime() - DAY);
}
