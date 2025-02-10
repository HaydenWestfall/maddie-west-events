import { createContext, useContext, useState } from "react";
import { TransitionState } from "../utility";

// Create the context without a default value
const MWETransitionContext = createContext(null as any);

// Custom hook to use the transition context
export const useMWETransitionContext = () => {
  const mWETransitionContext = useContext(MWETransitionContext);
  if (!mWETransitionContext) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return mWETransitionContext;
};

// Provider component
export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState<TransitionState>(TransitionState.Inactive);
  const [appInitialized, setAppInitialized] = useState(false);

  // Function to call when transition ends
  const updateTransitioningState = (state: TransitionState) => {
    setIsTransitioning(state);
  };

  const initializeApplication = () => {
    setAppInitialized(true);
  };

  return (
    <MWETransitionContext.Provider
      value={{ isTransitioning, appInitialized, updateTransitioningState, initializeApplication }}
    >
      {children}
    </MWETransitionContext.Provider>
  );
};
