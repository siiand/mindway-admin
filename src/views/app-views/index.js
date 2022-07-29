import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/users`}
          component={lazy(() => import(`./users`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/doctor-category`}
          component={lazy(() => import(`./doctor-category`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/doctor-category`}
          component={lazy(() => import(`./doctor-category`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/user`}
          component={lazy(() => import(`./user`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/new-doctor-category/:id/:name`}
          component={lazy(() => import(`./new-doctor-category`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/new-doctor-category`}
          component={lazy(() => import(`./new-doctor-category`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/doctors`}
          component={lazy(() => import(`./doctors`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/withdra-request`}
          component={lazy(() => import(`./withdraw-request`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/transaction`}
          component={lazy(() => import(`./transaction`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/settings`}
          component={lazy(() => import(`./settings`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/new-image-carousel`}
          component={lazy(() => import(`./new-image-carousel`))}
        />
        {/*APPROUTE*/}
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
