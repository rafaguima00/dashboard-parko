import { RouterProvider } from "react-router-dom"
import { router } from "./routes/route"
import { InfoProvider } from "./context/globalContext"
import { ParkProvider } from "./context/parkingContext"

const App = () => {
  return (
    <InfoProvider>
      <ParkProvider>
        <RouterProvider router={router} />
      </ParkProvider>
    </InfoProvider>
  )
}

export default App