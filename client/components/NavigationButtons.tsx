import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

const NavigationButtons = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = window.history.length > 1;
  const canGoForward = window.history.length > 1;

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  const handleForward = () => {
    if (canGoForward) {
      navigate(1);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-2">
      {/* Back Button */}
      <button
        onClick={handleBack}
        disabled={!canGoBack}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          canGoBack
            ? "bg-sky-500 dark:bg-sky-400 text-white dark:text-slate-900 hover:bg-sky-600 dark:hover:bg-sky-300"
            : "bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed"
        }`}
        aria-label="Go back"
        title="Go back"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Home Button */}
      <button
        onClick={handleHome}
        className="p-3 rounded-full bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-900 shadow-lg hover:bg-emerald-600 dark:hover:bg-emerald-300 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="Go to home"
        title="Go to home"
      >
        <Home className="h-5 w-5" />
      </button>

      {/* Forward Button */}
      <button
        onClick={handleForward}
        disabled={!canGoForward}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          canGoForward
            ? "bg-sky-500 dark:bg-sky-400 text-white dark:text-slate-900 hover:bg-sky-600 dark:hover:bg-sky-300"
            : "bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed"
        }`}
        aria-label="Go forward"
        title="Go forward"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
});

NavigationButtons.displayName = "NavigationButtons";

export { NavigationButtons };
