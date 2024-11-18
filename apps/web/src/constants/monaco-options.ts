
import { editor } from 'monaco-editor'

export const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
  lineNumbers: 'off',
  dragAndDrop: true,
  minimap: {
    enabled: false
  },
  overviewRulerLanes: 0,
  scrollbar: {
    vertical: 'hidden'
  },
  fontSize: 12,
  wordWrap: 'on'
}
