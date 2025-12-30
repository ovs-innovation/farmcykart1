import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

//internal import
import Main from "@/layout/Main";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/context/SidebarContext";
import ThemeSuspense from "@/components/theme/ThemeSuspense";
import { routes } from "@/routes";
import SettingServices from "@/services/SettingServices";
import { getPalette } from "@/utils/themeColors";
const Page404 = lazy(() => import("@/pages/404"));

const Layout = () => {
  const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
  let location = useLocation();

  const isOnline = navigator.onLine;

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await SettingServices.getStoreSetting();
        const themeColor = res?.theme_color || "store";
        const palette = getPalette(themeColor);

        const root = document.documentElement;
        Object.entries(palette).forEach(([shade, color]) => {
          root.style.setProperty(`--store-color-${shade}`, color);
        });
      } catch (err) {
        console.error("Error fetching theme:", err);
      }
    };
    fetchTheme();
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="flex justify-center bg-red-600 text-white">
          You are in offline mode!{" "}
        </div>
      )}
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen && "overflow-hidden"
        }`}
      >
        {navBar && <Sidebar />}

        <div className="flex flex-col flex-1 w-full">
          <Header />
          <Main>
            <Suspense fallback={<ThemeSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect exact from="/" to="/dashboard" />
                <Route component={Page404} />
              </Switch>
            </Suspense>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
