import { useEffect, useRef } from "react";
const useIdleLogout = (timeout = 30000) => { // Default: 5 minutes (300000 ms)
const timerRef = useRef(null);
  const resetTimer = () => {    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {        
      handleLogout();
    }, timeout);
  };
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.reload(); 
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const resetUserActivity = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, resetUserActivity));
    resetTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetUserActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return null; // This hook does not render anything
};
export default useIdleLogout
