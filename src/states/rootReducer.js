import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import proFileReducer from './modules/profile/index.js';
import homeReducer from './modules/home/index.js';

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: proFileReducer,
  home: homeReducer
}

export default rootReducer
