import MonacoEditor from '@monaco-editor/react'
import { useAppState } from '../context/useAppState'
import { monacoOptions } from '../constants/monaco-options';
import Logo from "./nav-bar/logo.svg?react";

const outputOptions = {
  ...monacoOptions,
  readOnly: true, // Output editor should be read-only
  automaticLayout: true,
  minimap: {
    enabled: false
  },
};


const Output = () => {
  const { code } = useAppState();
  return (
    <div className='py-4 h-full'>
      <MonacoEditor
        width={'100%'}
        language="typescript"
        theme="vs-dark"
        value={code}
        options={outputOptions}
        loading={<Logo />}
      />
    </div>
  )
}

export default Output