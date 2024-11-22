

import * as esbuild from 'esbuild-wasm';
import { cleanupTimers, createSafeTimer, timers } from './timer-optimizers';

(window as any).isInitialized = false;

export async function initializeEsbuild() {
  if (!(window as any).isInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm', // Use the CDN for the WASM file
      worker: true, // Optional: Use Web Workers for better performance
    });
    (window as any).isInitialized = true;
  }
}

export async function transpileCode(inputCode: string) {
  if (!(window as any).isInitialized) {
    throw new Error('Esbuild is not initialized. Call `initializeEsbuild` first.');
  }
  const result = await esbuild.transform(inputCode, {
    loader: 'tsx', // Or 'ts' if no JSX
    target: 'es2015',
  });

  return result.code;
}



export const transpileAndRun = async (code?: string, timeoutDuration = 5000) => {
  if (!code) {
    return '';
  }

  // Wrap the code with custom timer implementations
  const wrappedCode = `
    const { safeSetTimeout, safeSetInterval } = (${createSafeTimer.toString()})();
    // Override global timer functions
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    window.setTimeout = safeSetTimeout;
    window.setInterval = safeSetInterval;

    ${code}
  `;

  try {
    const output = await transpileCode(code);

    // Create a promise that will reject after the timeout
    const timeoutPromise = new Promise((_, reject) => {
      const timeout = setTimeout(() => {
        cleanupTimers();
        reject(new Error('Execution timed out'));
      }, timeoutDuration);
      timers.timeouts.push(timeout);
    });

    const result = await Promise.race([
      runCode(output),
      timeoutPromise
    ]);
    // Restore original timer functions
    window.setTimeout = (window as any)?.originalSetTimeout;
    window.setInterval = (window as any)?.originalSetInterval;

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Transpilation failed:', error.message);
    } else {
      console.log('Transpilation failed:', error)
    }
  }
};

export const runCode = async (code: string) => {
  const blob = new Blob([code], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);

  const logs: string[] = [];
  const originalConsoleLog = console.log;

  console.log = (message) => logs.push(message); // Capture console.log output

  try {
    await import(blobUrl);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return error?.message;
    } else {
      console.log(error)
      return error;
    }
  }
  console.log = originalConsoleLog; // Restore console.log
  URL.revokeObjectURL(blobUrl);
  return logs.join("\n");
}
