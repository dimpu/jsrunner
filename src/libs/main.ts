let worker: Worker;

export const transpileAndRunWithWorker = async (tsCode: string, timeoutDuration = 5000) => {
  if (!tsCode) return '';

  if (worker) worker.terminate();

  worker = new Worker('./worker.js');
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
    console.log('Execution Logs:', JSON.stringify(logs[0], null, 2)); // Display logs
    console.log(logs.join('\n'));
    return JSON.stringify(logs[0], null, 2);
  } catch (error) {
    worker.terminate();
    if (error instanceof Error) {
      console.error('Error in transpileAndRunWithWorker:', error.message);
      return error.message;
    }
    return error;
  }
};
