import logo from './logo.svg';
import './App.css';
import Header from './Components/header/Header';
import Body from './Components/Body/Body';
import { Route, Routes } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import SingUp from './Components/LogIn/SingUp';
import UserHome from './Components/Pages/Users/UserHome';
import AdminHome from './Components/Pages/Admin/AdminHome';
import ProtectedRouteUser from './ProtectedRouteUser';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import NotFound from './Components/NotFound';
import ProfileAdmin from './Components/Pages/Admin/ProfileAdmin';
import ShowAgriculteur from './Components/Pages/Admin/ShowAgriculteur';
import DashboardUser from './Components/Pages/Users/DashboardUser';
import ProfileUser from './Components/Pages/Users/ProfileUser';
import ModifierUser from './Components/Pages/Admin/ModifierUser';
import AjouterAgr from './Components/Pages/Admin/AjouterAgr';
import AjouterDemande from './Components/Pages/Users/AjouterDemande';
import SuiviDemandes from './Components/Pages/Users/SuiviDemandes';
import Demandes from './Components/Pages/Admin/Demandes';
import Dossiers from './Components/Pages/Users/Dossiers';
import DetailsDossier from './Components/Pages/Users/DetailsDossier';
import DetailsDossierAdmin from './Components/Pages/Admin/DetailsDossierAdmin';
import DetailsClient from './Components/Pages/Admin/DetailsClient';
import Notifications from './Components/Pages/Users/Notifications';
import Statistiques from './Components/Pages/Users/Statistiques';
import AdminStatistiques from './Components/Pages/Admin/AdminStatistiques';

function App() {
  return (
        <>
        <Routes>
          <Route path='/' element={<><Header/><Body/></>}/>
          <Route path='/logIn' element={<><Header/><LogIn/></>}/>
          <Route path='/register' element={<><Header/> <SingUp/></>}/> 
            
            <Route path='/:cin' element={<ProtectedRouteUser><DashboardUser/></ProtectedRouteUser>}>
                  <Route path='AjouterDemande' element={<AjouterDemande/>}/>
                  <Route path='profile' element={<ProfileUser/>}/>
                  <Route path='SuiviDemandes' element={<SuiviDemandes/>}/>
                  <Route path='Dossiers' element={<Dossiers/>}/>
                  <Route path='DetailsDossier/:id_dossier' element={<DetailsDossier/>}/>
                  <Route path='Notifications' element={<Notifications/>}/>
                  <Route path='Statistique' element={<Statistiques/>}/>




            </Route>
          



          <Route path='/admin' element = {<ProtectedRouteAdmin><AdminHome/></ProtectedRouteAdmin>}>
                  <Route path='AgrModifier/:cin' element={<ModifierUser/>}/>
                  <Route path='profileAdmin' element={<ProfileAdmin/>}/>
                  <Route path='agriculteur' element={<ShowAgriculteur/>}/>
                  <Route path='Ajouter' element={<AjouterAgr/>}/>
                  <Route path='Demandes' element={<Demandes/>}/>
                  <Route path='Details_Dossier/:id_dossier' element={<DetailsDossierAdmin/>}/>
                  <Route path='agriculteur/detailsClient/:cin' element={<DetailsClient/>}/>
                  <Route path='Statistiques' element={<AdminStatistiques/>}/>






          </Route>



                <Route path='*' element={<NotFound/>} />
        </Routes>
            
            
        </>
  );
}

export default App;
