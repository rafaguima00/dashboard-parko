import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { InfoProvider } from "./context/globalContext";

const App = () => {
  return (
    <InfoProvider>
      <RouterProvider router={router} />
    </InfoProvider>
  );
}

export default App;
