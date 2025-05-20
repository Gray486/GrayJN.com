import { createContext, useContext, useState } from "react";
import Home from "./pages/home/Home";

export type PageKey = "home";

/** Gets the JSX element for a page from its respective {@link PageKey}. */
export const getPageFromKey = (pageKey: PageKey) => {
    if (pageKey == "home") return <Home />;
    /** If page key is none of the above, set page key to home, and return Home page. */
    usePage().setPageKey("home")
    return <Home />;
}

const PageContext = createContext<
  { pageKey: PageKey; setPageKey: (k: PageKey) => void } | undefined
>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const urlParam = new URLSearchParams(window.location.search).get("page") as PageKey | null;
  const defaultKey = urlParam ?? "" as PageKey;

  const [pageKey, setPageKey] = useState<PageKey>(defaultKey);

  return (
    <PageContext.Provider value={{ pageKey, setPageKey }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) throw new Error("usePage must be used within a PageProvider");

  const setPageKey = (key: PageKey) => {
    context.setPageKey(key);
    const url = new URL(window.location.href);
    url.searchParams.set("page", key);
    window.history.pushState({}, "", url.toString());
  };

  return { pageKey: context.pageKey, setPageKey };
};