import { useState } from 'react';
import AppProvider from './context/AppProvider';
import Split from 'react-split';
import Editor from './components/editor';
import Output from './components/output';
import { Navbar } from './components/nav-bar';
// import FileNameTabs from './components/filename-tabs';

function App() {
  const [sizes, setSizes] = useState(() => {
    const sizes = window.localStorage.getItem('split-sizes');
    if (sizes) return JSON.parse(sizes);
    return [50, 50];
  });

  function handleDragEnd(e: number[]) {
    const [left, right] = e;
    setSizes([left, right]);
    window.localStorage.setItem('split-sizes', JSON.stringify([left, right]));
  }

  return (
    <AppProvider>
      <div className="h-screen w-screen bg-slate-800">
        <Navbar />
        {/* <FileNameTabs /> */}
        <Split
          className={'flex h-full overflow-visible'}
          sizes={sizes}
          gutterSize={5}
          cursor="col-resize"
          onDragEnd={handleDragEnd}
          gutterAlign="center"
          direction="horizontal"
          gutterStyle={() => ({
            // background: 'rgb(148 163 184)',
            height: '100%',
            width: '5px',
            borderLeft: '1px solid rgb(148 163 184)',
          })}
        >
          <Editor />
          <Output />
        </Split>
      </div>
    </AppProvider>
  );
}

export default App;
