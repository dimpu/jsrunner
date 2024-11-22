

import InstallPWA from "../install-pwa";
import Logo from "./logo.svg?react";

export const Navbar = () => {
  return (<nav className="h-10 border-b border-solid border-slate-400">
    <div className="py-2 px-5 flex flex-row justify-between">
      <div className="flex text-amber-400 text-lg">
        <span
          style={{
            fontSize: '2rem',
            lineHeight: '1rem'
          }}
        >{'{'}</span>
        <Logo />
        <span
          style={{
            fontSize: '2rem',
            lineHeight: '1rem'
          }}
        >{'}'}</span>
      </div>
      <InstallPWA />
    </div>
  </nav>)

}
