// Track timers to clean them up
// export interface Timers {
//   timeouts: NodeJS.Timeout[];
//   intervals: NodeJS.Timer[];
// }

export const timers = {
  timeouts: [],
  intervals: [],
};

// Custom setTimeout and setInterval implementations
export const createSafeTimer = () => {
  const safeSetTimeout = (callback: Function, delay: number, ...args: any[]) => {
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

  const safeSetInterval = (callback: Function, delay: number, ...args: any[]) => {
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
