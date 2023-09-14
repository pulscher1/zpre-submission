import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import ViewAllInventory from './components/GuestInventory'
import ItemPage from './components/GuestItemPage'
import Navbar from './components/NavBar';
import CreateAccount from './components/CreateAccount';
import LogIn from './components/LogIn';
import TestInventory from './components/TestInventory'; 
import UserInventory from './unusedComponents/UserInventory';
import AddItem from './components/AddItem';
import Signin from './unusedComponents/SignUpTest';
import Signup from './unusedComponents/SignUpTest';
import InventoryByUser from './components/InventoryByUserId';
import NewUserItemPage from './components/UserItemPage';
import UserFullInventory from './components/UserFullInventory'; 
import Edit from './components/Edit';


const App = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/inventory" element={<ViewAllInventory />} />
            <Route path="/inventory/:id" element={<ItemPage />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/TestInventory" element={<TestInventory />} />
            <Route path="/:username/:user_id" element={<InventoryByUser />} />
            <Route path="/:username/:user_id/AddItem" element={<AddItem />} />
            <Route path="/SignUpTest" element={<Signin />} />
            <Route path="/SignUpTest" element={<Signup />} />
            <Route path="/:username/:user_id/:itemId" element={<NewUserItemPage />} />
            <Route path="/:username/:user_id/FullInventory" element={<UserFullInventory />} />
            <Route path="/:username/:user_id/:itemId/Edit" element={<Edit />} />
        </Routes>
        </>
    )    
}

export default App;