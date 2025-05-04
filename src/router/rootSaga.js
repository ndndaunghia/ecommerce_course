import loadAuthSaga from "@/states/modules/auth/saga.js";
import courseSaga from "@/states/modules/courses/saga";
import homeSaga from "@/states/modules/home/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_COURSES_PAGE'] = courseSaga;
