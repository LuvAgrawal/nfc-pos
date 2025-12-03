import { Route, Routes } from "react-router-dom"
import { ScanSearchPage } from './routes/element'
import { path } from "./routes/path"
function App() {

  return (
    <>
      <Routes>
        <Route path={path.HOME} element={<h1>Home Page</h1>} />
        <Route path={path.SEARCH} element={<ScanSearchPage />} />
      </Routes>
    </>
  )
}

export default App
