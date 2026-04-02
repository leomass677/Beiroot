import React, { useEffect } from "react";
import Router from "../route/router";
import ErrorBoundary from "../component/ErrorBoundary";

const App = () => {
  useEffect(() => {
    // Register service worker for PWA functionality
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }

    // Request notification permission (for future use)
    if ("Notification" in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="w-full h-screen">
        <Router />
      </div>
    </ErrorBoundary>
  );
};

export default App;
