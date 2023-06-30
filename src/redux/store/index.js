import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import sessionStorage from "redux-persist/lib/storage/session";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

// const configHelper = config();

/**
 * Create Axios Client to communicate
 * with Virtual game night API's
 */
const axiosClient = axios.create({
  responseType: "json"
});

// Store instance
let store = null;
let persistor = null;

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["loginReducer"]
};

const options = {
  // not required, but use-full configuration option
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({ getState, dispatch }, config) => {
        // Request interception

        // dispatch(setIsLoading(true));
        return config;
      }
    ],
    response: [
      {
        // success: function ({getState, dispatch, getSourceAction}, response) {
        success: ({ dispatch }, response) => {
          // Response interception
          return response;
        },
        // error: function ({getState, dispatch, getSourceAction}, error) {
        error: ({ dispatch }, error) => {
          // Response Error Interception
          return Promise.reject(error);
        }
      }
    ]
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
/**
 * Create the Redux store
 */
export const configureStore = () => {
  let middleware = [];
  middleware = [...middleware, axiosMiddleware(axiosClient, options), logger];

  store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
    // applyMiddleware(reduxThunk, axiosMiddleware(axiosClient, options), logger)
  );
  const dispatch = (...args) => store.dispatch(...args);
  persistor = persistStore(store);
  return { store, persistor, dispatch };
};

/**
 * Get store
 */
export const getStore = () => store;

/**
 * Get persistor
 */
export const getPersistor = () => persistor;

/**
 * Dispatch an action
 */
export const dispatch = (...args) => store.dispatch(...args);

export default {
  dispatch,
  getStore,
  configureStore,
  persistor
};
