import { useState } from "react";
import { ModelContext } from "./ContextData";

const ModelContextProvider = ({ children }: { children: JSX.Element }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isApiCallInQue, setIsApiCallInQue] = useState(false);


  return (
    <ModelContext.Provider value={{ isModelOpen, setIsModelOpen , isApiCallInQue , setIsApiCallInQue}}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
