import { Provider } from "react-redux";

import { Provider as AtomProvider } from "jotai";

import "./App.css";
import { store } from "./redux/store";
import Layout from "./layout";
function App() {
  return (
    <>
      <AtomProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </AtomProvider>
    </>
  );
}

export default App;
