import React, { useEffect, useState } from "react";


const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div className="flex gap-2 justify-start items-center text-white cursor-pointer" onClick={onClick}>
        <h6 className="text-red font-semibold uppercase underline">Try it out</h6>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 43 42" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.4388 42C32.8739 42 42.1438 32.7301 42.1438 21.295C42.1438 9.86001 32.8739 0.590088 21.4388 0.590088C10.0038 0.590088 0.733887 9.86001 0.733887 21.295C0.733887 32.7301 10.0038 42 21.4388 42ZM3.98164 24.1778H26.9846L20.1903 30.9722L24.4557 35.2376L38.5316 21.1617L24.4557 7.08578L20.1903 11.3512L26.9846 18.1456H3.98164V24.1778Z" fill="#F45844"/>
        </svg>
    </div>
  );
};

export default InstallPWA;