import { useState } from "react";
import { ModelContext } from "./ContextData";

const ModelContextProvider = ({ children }: { children: JSX.Element }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <ModelContext.Provider value={{ isModelOpen, setIsModelOpen }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
