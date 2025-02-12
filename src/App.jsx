import './App.css'
import Home from './pages/Home'
import React, { useEffect, useRef, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorMessages from './pages/ErrorMessages'
import Details from './pages/Details'
import BookmarksContext from './BookmarksContext'
import Bookmarks from './pages/Bookmarks'
import MyShop from './pages/MyShop'

function App() {
  const [canInstall, setCanInstall] = useState(false);
  const deferredPrompt = useRef(null);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt.current)
    {
      return;
    }

    const result = await deferredPrompt.current.prompt();
    console.log(`Installation ${result.outcome}`);

    deferredPrompt.current = null;
    setCanInstall(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorMessages />,
    },
    {
      path: "/details/:slug",
      element: <Details />,
    },
    {
      path: "/bookmarks",
      element: <Bookmarks />,
    },
    {
      path: "/myshop",
      element: <MyShop />,
    },
  ], { basename: "/games-directory" });

  useEffect(() => {
    if (dataLoaded)
    {
      console.log("Sauvegarde", bookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(savedBookmarks);
    console.log("Chargement:", savedBookmarks);
    setDataLoaded(true);
  }, []);

  return (
    <>
      <BookmarksContext.Provider value={{bookmarks, setBookmarks}}>
        {canInstall && (
          <div className='bg-gray-300 shadow-gray-700 p-4 flex items-center'>
            <div className='flex-grow text-center'>
              Voulez-vous installer l'application sur votre appareil ?
            </div>
            <button
              className='px-4 py-2 rounded text-white bg-teal-600'
              onClick={handleInstallClick}
            >
              Installer
            </button>
          </div>
        )}
        <RouterProvider router={router}></RouterProvider>
      </BookmarksContext.Provider>
    </>
  )
}

export default App
