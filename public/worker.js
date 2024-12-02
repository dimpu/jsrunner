
importScripts('https://cdnjs.cloudflare.com/ajax/libs/typescript/4.9.5/typescript.min.js');

onmessage = function (event) {
  const { code, action, timeoutDuration } = event.data;

  const logs = [];
  const originalConsoleLog = console.log;

  // Redirect console.log
  console.log = (message) => {
    logs.push(message);
    postMessage({ type: 'log', message });
  };

  if (action === 'transpile') {
    try {
      const transpiledCode = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
        },
      });
      postMessage({ success: true, result: transpiledCode.outputText });
    } catch (error) {
      postMessage({ success: false, error: error.message });
    }
  } else if (action === 'execute') {
    try {
      const blob = new Blob([code], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      const timeout = setTimeout(() => {
        postMessage({ success: false, error: 'Execution timed out' });
      }, timeoutDuration);

      importScripts(blobUrl);
      clearTimeout(timeout);

      postMessage({ success: true, logs });
    } catch (error) {
      postMessage({ success: false, error: error.message });
    }
  }

  // Restore original console.log
  console.log = originalConsoleLog;
};

