

import * as esbuild from 'esbuild-wasm';

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



export const transpileAndRun = async (code?: string) => {
  if (!code) {
    return '';
  }

  try {
    const output = await transpileCode(code);
    const result = runCode(output);
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
