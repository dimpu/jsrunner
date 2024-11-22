
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
  wordWrap: 'on',
  fontFamily: "Fira Code, monospace", // Set your desired font family
  fontSize: 14, // Optional: Adjust the font size
  fontLigatures: true, // Optional: Enable font ligatures (if supported by the font)
}
