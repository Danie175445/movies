import { BrowserRouter,Routes,Route } from "react-router-dom";
import AllMovies from "./components/AllMovies";
import EditMovie from "./components/EditMovie";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllMovies/>}/>
          <Route path='/edit/:id' element={<EditMovie/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
