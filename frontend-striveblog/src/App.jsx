import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Backoffice from './pages/Backoffice';
import ArticlePage from './pages/ArticlePage';
import AuthorsPage from './pages/AuthorsPage';
import ProfilePage from './pages/ProfilePage';
import LoadingWelcome from './pages/LoadingWelcome';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AuthContextProvider from './context/AuthContext';
import ProtectedAuthRoute from './components/protection/ProtectedAuthRoute';

function App() {

  //UPLOAD FILE
  //token come parametro opzionale laddove richiesto dalla chiamata:
  const convertFileToUrl = async ({file, field}, urlEndpoint, token = "") => { 
    try {
      const formData = new FormData();
      formData.append(field, file);

      const options = {
        method: "POST",
        body: formData
      };

      if(token) {
        options.headers = {
          "Authorization": `Bearer ${token}`
        };
      }

      const response = await fetch(`${urlEndpoint}`, options);

      if(response.ok) {
        //se la risposta è ok ritorna l'url cloudinary:
        const url = await response.json();
        return url;
      } else {
        console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }       
}; 
  
  return (
    <AuthContextProvider>
      <div id='app'>
        <BrowserRouter>
          <Routes>       
            <Route path='/' element={<LoginPage convertFileToUrl={convertFileToUrl}/>}></Route>
            <Route path='/welcome' element={<LoadingWelcome />}></Route>
            <Route element={<ProtectedAuthRoute/>}>
              <Route path="/homepage" element={<Homepage/>}></Route>
              <Route path='/authors' element={<AuthorsPage/>}></Route>
              <Route path="/profile" element={<ProfilePage/>}></Route>
              <Route path="/details/:id" element={<ArticlePage/>}></Route>
              <Route path="/backoffice" element={<Backoffice convertFileToUrl={convertFileToUrl}/>}></Route>
            </Route>
            <Route path="*" element={<NotFound/>}></Route>     
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>      
  );
}

export default App;
