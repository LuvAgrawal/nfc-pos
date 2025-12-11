import { Route, Routes } from "react-router-dom"
import { DashboardLayout, RechargePage, ScanSearchPage } from './routes/element'
import { path } from "./routes/path"
function App() {

  return (
    <>
      <Routes>
        <Route path={path.HOME} element={<DashboardLayout />} >
          <Route index element={<ScanSearchPage />} />
          <Route path={path.RECHARGE} element={<RechargePage />} />
        </Route>
        <Route path="*" element={<h1 className="text-red-500">Error 404! not found!</h1>} />
      </Routes>
    </>
  )
}

export default App
