


import { useEffect } from 'react'

import { initializeEsbuild, transpileCode } from '@jsrunner/common';
import MonacoEditor, { Monaco } from '@monaco-editor/react'
import debounce from 'lodash-es/debounce';
import { useAppState } from '../context/useAppState';
import { editor } from 'monaco-editor'
import { monacoOptions } from '../constants/monaco-options';


const Editor = () => {
  const { setCode } = useAppState();
  useEffect(() => {
    initializeEsbuild().catch(console.error);
  }, []);

  const transpileAndRun = debounce(async (code?: string) => {
    if (!code) {
      return;
    }

    try {
      const output = await transpileCode(code);
      runCode(output);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Transpilation failed:', error.message);
        // setCode(error?.message);
      } else {
        console.log('Transpilation failed:', error)
        // setCode(error as string);
      }
    }
  });

  const runCode = async (code: string) => {
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
        setCode(error?.message);
      } else {
        console.log(error)
        setCode(error as string);
      }
    }

    console.log = originalConsoleLog; // Restore console.log
    setCode(logs.join("\n"))
    URL.revokeObjectURL(blobUrl);
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    import('../onedark.json')
      .then((data) => {
        monaco.editor.defineTheme('vs-dark', data as editor.IStandaloneThemeData)
      })
      .catch((e) => console.log(e))
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
  }


  return (
    <div className='py-4'>
      <MonacoEditor
        width={'100%'}
        height={'100%'}
        defaultLanguage="typescript"
        theme="vs-dark"
        onChange={(newValue) => transpileAndRun(newValue)}
        beforeMount={handleEditorWillMount}
        options={{ ...monacoOptions }}
      />
    </div>
  )
}

export default Editor
