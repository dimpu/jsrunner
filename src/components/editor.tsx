import { useEffect, useRef, useState } from 'react';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import debounce from 'lodash-es/debounce';
import { useAppState } from '../context/useAppState';
import { editor } from 'monaco-editor';
import { monacoOptions } from '../constants/monaco-options';
import Logo from './nav-bar/logo.svg?react';
import { transpileAndRunWithWorker } from '@/libs/main';

const LOCAL_RAW_CODE = 'LOCAL_RAW_CODE';

const Editor = () => {
  const monacoRef = useRef<editor.IStandaloneCodeEditor>();
  const [rawCode, setRawCode] = useState('');
  const { setCode } = useAppState();

  useEffect(() => {
    const localRawCode = localStorage.getItem(LOCAL_RAW_CODE);
    if (localRawCode) {
      setRawCode(localRawCode);
      transpileAndRunDebounce(localRawCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transpileAndRunDebounce = debounce(async (code: string) => {
    if (!code) {
      setCode('');
      return;
    }
    localStorage.setItem(LOCAL_RAW_CODE, code);

    try {
      const output = await transpileAndRunWithWorker(code);
      setCode(output as string);
    } catch (e) {
      setCode(e as string);
    }
  }, 100);

  const handleEditorWillMount = (monaco: Monaco) => {
    import('../onedark.json')
      .then(data => {
        monaco.editor.defineTheme('vs-dark', data as editor.IStandaloneThemeData);
      })
      .catch(e => console.log(e));
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  };

  const handleMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monacoRef.current = editor;
    editor.focus();
    monacoRef.current.updateOptions({ contextmenu: false });
    monacoRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {});

    // (window as any).require.config({
    //   paths: {
    //     "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim"
    //   }
    // });

    // (window as any).require(["monaco-vim"], function (MonacoVim: any) {
    //   const statusNode = document.querySelector(".status-node");
    //   MonacoVim.initVimMode(editor, statusNode);
    // });
  };

  return (
    <div className="py-4 relative">
      <legend className="absolute top-0 right-2 z-50">
        <code className="status-node text-slate-400"></code>
      </legend>
      <MonacoEditor
        defaultValue={rawCode}
        width={'100%'}
        height={'100%'}
        defaultLanguage="typescript"
        theme="vs-dark"
        onChange={newValue => transpileAndRunDebounce(newValue!)}
        onMount={handleMount}
        beforeMount={handleEditorWillMount}
        options={{ ...monacoOptions }}
        loading={<Logo />}
      />
    </div>
  );
};

export default Editor;
