import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore } from "./redux/store";

import RouteComponent from "./routes";

const App = () => {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <RouteComponent />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
