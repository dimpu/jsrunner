
self.onmessage = (event) => {
  const { code } = event.data;

  try {
    // Capture `console.log` output
    const logs = [];
    const originalConsoleLog = console.log;

    console.log = (message) => logs.push(message);

    // Execute the code
    new Function(code)();

    // Restore the original console.log
    console.log = originalConsoleLog;

    // Send logs back to the main thread
    self.postMessage({ success: true, logs });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
