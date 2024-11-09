import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Dashboard from './Dashboard';

//Dilshan
import Users from './component_Dila/Users';
import AdminDisplay from './component_Dila/AdminDisplay';
import UserHome from './component_Dila/UserHome_C';
import ProductDetails from './component_Dila/ProductDetails_C';
import MenCloths from './component_Dila/MenCloths';
import WomenCloths from './component_Dila/WomenCloths';
import KidsCloths from './component_Dila/KidsCloths';
import TailoringUI from './component_Dila/TailoringUI';
import TailoringDisplay from './component_Dila/TailoringDisplay';
import TailoringMyOrders from './component_Dila/TailoringMyOrders';
import SkinColor from './component_Dila/skinColor'



//Limasha
import ShoppingCart from './component_Lima/ShoppingCart';
import AddFeedback from './component_Lima/addFeedback';
import AdminReview from './component_Lima/AdminReview';

//Vihanga
import Login from './component_vihanga/login';
import SignUp from './component_vihanga/signUp'
import ForgotPassword from './component_vihanga/forgotPassword'
import BodyMeasurement from './component_vihanga/BodyMeasurement'
import UserProfile from './component_vihanga/UserProfile';
import ResetPassword from './component_vihanga/ResetPassword';
import AllProfiles from './component_vihanga/AllProfiles';

//Malmi
import Payment from './component_Malmi/Payment';
import Orders from './component_Malmi/Orders';
import PlaceOrder from './component_Malmi/PlaceOrder';
import EditPlaceOrder from './component_Malmi/EditPlaceOrder';
import Recommend from './component_Malmi/Recommend';
import AdminOrders from './component_Malmi/AdminOrders';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
        
{/* Component Dilashan */}
        <Route path='/' element={<UserHome />} />
        <Route path='/Dashboard' element={<Dashboard />} />

        <Route path='/users' element={<Users />} />
        <Route path='/AdminDisplay' element={<AdminDisplay />} />
        <Route path='/UserHome_C' element={<UserHome />} />
        <Route path='/ProductDetails_C' element={<ProductDetails />} />
        <Route path='/MenCloths' element={<MenCloths />} />
        <Route path='/WomenCloths' element={<WomenCloths />} />
        <Route path='/KidsCloths' element={<KidsCloths />} />
        <Route path='/TailoringUI' element={<TailoringUI />} />
        <Route path='/TailoringDisplay' element={<TailoringDisplay />} />
        <Route path='/TailoringMyOrders' element={<TailoringMyOrders />} />
        <Route path='/skin' element={<SkinColor />} />

{/* Component Limasha */}
        <Route path='/ShoppingCart' element={<ShoppingCart />} />
        <Route path='/addFeedback' element={<AddFeedback />} />
        <Route path='/adminReview' element={<AdminReview />} />

{/* Component Vihanga */}
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/bodymeasurement' element={<BodyMeasurement />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/AllProfiles' element={<AllProfiles />} />


{/* Component Malmi */}
<Route path="/Payment/:amount" element={<Payment />} />
<Route path="/Orders" element={<Orders />} />
<Route path="/AdminOrders" element={<AdminOrders />} />
<Route path="/PlaceOrder/:amount" element={<PlaceOrder />} />
<Route path="/EditPlaceOrder/:amount/:deliveryId" element={<EditPlaceOrder />} />
<Route path="/Recommend" element={<Recommend />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
