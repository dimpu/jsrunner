import { useAppStore } from '@/store';

const FileNameTabs = () => {
  const { tabs, deleteTab, addTab, selectedTabIndex } = useAppStore();
  return (
    <div className="w-full h-[36px] leading-[36px] border-b border-solid border-slate-400 flex overflow-x-scroll">
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          className={`h-[calc(100% + 1px)] overflow-y-visible relative bg-slate-800 px-2 flex justify-between w-[190px] text-white border-r border-solid border-slate-400 cursor-pointer ${i === selectedTabIndex ? 'border-b border-b-transparent' : ''}`}
        >
          <span className="font-semibold">{tab.title}</span>
          <span
            onClick={() => deleteTab(tab.id)}
            className="ml-2 leading-[36px] font-semibold text-sm text-slate-50"
          >
            X
          </span>
        </div>
      ))}

      <div
        className="px-2 text-white  cursor-pointer"
        onClick={() => addTab({ id: Date.now().toString(), title: `Untitled-${tabs?.length}` })}
      >
        +
      </div>
    </div>
  );
};

export default FileNameTabs;
