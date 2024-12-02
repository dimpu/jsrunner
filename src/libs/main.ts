export const transpileAndRunWithWorker = async (tsCode: string, timeoutDuration = 5000) => {
  if (!tsCode) return '';

  const worker = new Worker('./worker.js');
  const logs: string[] = [];

  const workerPromise = (action: string, code: string) =>
    new Promise((resolve, reject) => {
      worker.onmessage = event => {
        const { type, success, result, error, message } = event.data;

        if (type === 'log') {
          logs.push(message); // Collect logs
        } else if (success) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      };

      worker.onerror = error => {
        reject(new Error('Worker Error: ' + error.message));
      };

      worker.postMessage({ action, code, timeoutDuration });
    });

  try {
    // Step 1: Transpile the TypeScript code
    const transpiledCode = (await workerPromise('transpile', tsCode)) as string;

    // Step 2: Run the JavaScript code
    await workerPromise('execute', transpiledCode);

    worker.terminate();
    console.log('Execution Logs:', logs.join('\n')); // Display logs
    // return 'Execution completed successfully';
    return logs.join('\n');
  } catch (error) {
    worker.terminate();
    if (error instanceof Error) {
      console.error('Error in transpileAndRunWithWorker:', error.message);
      return error.message;
    }
    return error;
  }
};

/*
import { cleanupTimers, createSafeTimer, timers } from './timer-optimizers';
import { transpileModule, ScriptTarget, ModuleKind } from 'typescript';

const originalSetTimeout = window.setTimeout;
const originalSetInterval = window.setInterval;

const transpileCode = (tsCode: string) => {
  let code;
  try {
    code = transpileModule(tsCode, {
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ESNext,
      },
    });
  } catch (e) {
    console.error('Transpilation Error', e);
  }
  return code?.outputText;
};

export const transpileAndRun = async (code?: string, timeoutDuration = 5000) => {
  if (!code) {
    return '';
  }
  const result = transpileCode(code);

  // Wrap the code with custom timer implementations
  const wrappedCode = `
    const { safeSetTimeout, safeSetInterval } = (${createSafeTimer.toString()})();
    // Override global timer functions
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    window.setTimeout = safeSetTimeout;
    window.setInterval = safeSetInterval;

    ${result}
  `;

  try {
    // const output = await transpileCode(wrappedCode);

    // Create a promise that will reject after the timeout
    const timeoutPromise = new Promise((_, reject) => {
      const timeout = setTimeout(() => {
        cleanupTimers();
        reject(new Error('Execution timed out'));
      }, timeoutDuration);
      timers.timeouts.push(timeout);
    });

    const result = await Promise.race([runCode(wrappedCode), timeoutPromise]);
    // Restore original timer functions
    window.setTimeout = originalSetTimeout;
    window.setInterval = originalSetInterval;

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Transpilation failed:', error.message);
    } else {
      console.log('Transpilation failed:', error);
    }
  }
};

export const runCode = async (code: string) => {
  const blob = new Blob([code], { type: 'application/javascript' });
  const blobUrl = URL.createObjectURL(blob);

  const logs: string[] = [];
  const originalConsoleLog = console.log;

  console.log = message => logs.push(message); // Capture console.log output

  try {
    await import(blobUrl);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return error?.message;
    } else {
      console.log(error);
      return error;
    }
  }
  console.log = originalConsoleLog; // Restore console.log
  URL.revokeObjectURL(blobUrl);
  return logs.join('\n');
};

*/
