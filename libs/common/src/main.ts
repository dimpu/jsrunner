

import * as esbuild from 'esbuild-wasm';

let isInitialized = false;

export async function initializeEsbuild() {
  if (!isInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm', // Use the CDN for the WASM file
      worker: true, // Optional: Use Web Workers for better performance
    });
    isInitialized = true;
  }
}

export async function transpileCode(inputCode: string) {
  if (!isInitialized) {
    throw new Error('Esbuild is not initialized. Call `initializeEsbuild` first.');
  }
  const result = await esbuild.transform(inputCode, {
    loader: 'tsx', // Or 'ts' if no JSX
    target: 'es2015',
  });

  return result.code;
}
