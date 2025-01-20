import loadAuthSaga from "@/states/modules/auth/saga.js";
import homeSaga from "@/states/modules/home/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
