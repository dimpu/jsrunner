//Track timers to clean them up
export interface Timers {
  timeouts: NodeJS.Timeout[];
  intervals: NodeJS.Timeout[];
}

export const timers: Timers = {
  timeouts: [],
  intervals: [],
};

//Custom setTimeout and setInterval implementations
export const createSafeTimer = () => {
  const safeSetTimeout = (callback: (...args: unknown[]) => unknown, delay: number, ...args: unknown[]) => {
    const timeout = setTimeout(() => {
      callback(...args);
      // Remove from tracking array once completed
      const index = timers.timeouts.indexOf(timeout);
      if (index > -1) {
        timers.timeouts.splice(index, 1);
      }
    }, delay);
    timers.timeouts.push(timeout);
    return timeout;
  };

  const safeSetInterval = (callback: (...args: any) => any, delay: number, ...args: unknown[]) => {
    const interval = setInterval(() => {
      callback(...args);
    }, delay);
    timers.intervals.push(interval);
    return interval;
  };

  return { safeSetTimeout, safeSetInterval };
};

// Clean up all timers
export const cleanupTimers = () => {
  timers.timeouts.forEach(timeout => clearTimeout(timeout));
  timers.intervals.forEach(interval => clearInterval(interval));
  timers.timeouts = [];
  timers.intervals = [];
};
