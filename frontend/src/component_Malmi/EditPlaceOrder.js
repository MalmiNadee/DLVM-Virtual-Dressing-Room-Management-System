import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'


const EditPlaceOrder = () => {
  
  const { amount, deliveryId } = useParams(); 
  
  const location = useLocation(); // Get the passed state from the previous page
  
  // Extracting values passed via state
  const { deliveryName: initialDeliveryName ='', deliveryAddress: initialDeliveryAddress ='', zipCode: initialZipCode=0, deliveryPhone: initialDeliveryPhone='' } = location.state || {};

  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState(initialDeliveryName || ''); // Set initial state from passed values
  const [deliveryAddress, setDeliveryAddress] = useState(initialDeliveryAddress || '');
  const [zipCode, setZipCode] = useState(initialZipCode || '');
  const [deliveryPhone, setDeliveryPhone] = useState(initialDeliveryPhone || '');
  const [userEmail, setUserEmail] = useState('');
  

  const [deliveryNameError, setDeliveryNameError] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [deliveryPhoneError, setDeliveryPhoneError] = useState('');
  

  const navigate = useNavigate();

 useEffect(() => {
  const email = sessionStorage.getItem('userEmail');
  setUserEmail(email);
  DeliveryDetails();
}, [userEmail]);

  
  const DeliveryDetails = async () => {
    // const email = sessionStorage.getItem('userEmail');
    // setUserEmail('abc@gmail.com');
    try {
      const response = await Axios.get('http://localhost:3001/api/deliveries');
      console.log(response.data);
      const users = response.data.response;
      const user = users.filter((u) => u.deliveryEmail === userEmail);
      if (user) {
        setDeliveryId(user.deliveryId);
        setDeliveryName(user.deliveryName);
        setDeliveryAddress(user.deliveryAddress);
        setZipCode(user.zipCode);
        setDeliveryPhone(user.deliveryPhone);
      }

    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // console.log(DeliveryId)
    // console.log(deliveryName)
    // console.log(deliveryAddress)
    // console.log(zipCode)
    // console.log(deliveryPhone)

    if (validateForm()) {
    const payload = {
      deliveryId: deliveryId,
      deliveryName: deliveryName,
      deliveryAddress: deliveryAddress,
      zipCode: zipCode,
      deliveryPhone:deliveryPhone,
      amount:amount
      
    };
    console.log(payload);
    try {
       await Axios.post('http://localhost:3001/api/update-delivery', payload);
       console.log('Updated Response');  
      alert('Successfully Updated Delivery Details');
      navigate('/Orders');
    } catch (error) {
      console.error('Axios Error: ', error);
    }
  }
  };
  
  

  const validateForm = () => {
    let isValid = true;
  
    // Safeguard against undefined values with optional chaining (?.) or default values
    const deliveryNameTrimmed = deliveryName?.trim() || '';
    const deliveryAddressTrimmed = deliveryAddress?.trim() || '';
    const zipCodeTrimmed = zipCode?.toString().trim() || '';
    const deliveryPhoneTrimmed = deliveryPhone?.trim() || '';
  
    // Validate delivery name
    if (!deliveryNameTrimmed) {
      setDeliveryNameError('Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(deliveryNameTrimmed)) {
      setDeliveryNameError('Delivery Name must contain only letters');
      isValid = false;
    } else {
      setDeliveryNameError('');
    }
  
    // Validate delivery address
    if (!deliveryAddressTrimmed) {
      setDeliveryAddressError('Delivery Address is required');
      isValid = false;
    } else if (deliveryAddressTrimmed.length < 5) {
      setDeliveryAddressError('Please enter a valid Delivery Address');
      isValid = false;
    } else {
      setDeliveryAddressError('');
    }
  
    // Validate zip code
    if (!zipCodeTrimmed) {
      setZipCodeError('Zip Code is required');
      isValid = false;
    } else if (!/^\d{5}$/.test(zipCodeTrimmed)) {
      setZipCodeError('Zip Code should be 5 digits');
      isValid = false;
    } else {
      setZipCodeError('');
    }
  
    // Validate delivery phone
    if (!deliveryPhoneTrimmed) {
      setDeliveryPhoneError('Phone Number is required');
      isValid = false;
    } else if (!/^[0]\d{9}$/.test(deliveryPhoneTrimmed)) {
      setDeliveryPhoneError('Phone Number should be 10 digits and start with 0');
      isValid = false;
    } else {
      setDeliveryPhoneError('');
    }
  
    return isValid;
  };
  
  
   const handleDeliveryNameChange = (e) => {
    setDeliveryName(e.target.value);
    setDeliveryNameError(''); // Clear error when user starts typing
  };
  
  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
    setDeliveryAddressError(''); 
  };
  
  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
    setZipCodeError(''); 
  };
  
  const handleDeliveryPhoneChange = (e) => {
    setDeliveryPhone(e.target.value);
    setDeliveryPhoneError(''); 
  };
  

  return (
    <div>
    <Navi/>
  
    <div className='orderForm'>
          <form onSubmit={handleUpdate}>
          <div className='title'>Update Delivery Details</div>
          
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
              onChange={handleDeliveryNameChange} 
              required/>
                {deliveryNameError && <span className="error">{deliveryNameError}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
             onChange={handleDeliveryAddressChange}
              required/>
              {deliveryAddressError && <span className="error">{deliveryAddressError}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
             onChange={handleZipCodeChange}
              required/>
              {zipCodeError && <span className="error">{zipCodeError}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
            onChange={handleDeliveryPhoneChange}
            required/>
             {deliveryPhoneError && <span className="error">{deliveryPhoneError}</span>}
          </div>

          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg"> Update </button>
       
      </form>
  
        </div>

        <Foot/>
        </div>

  );
};

export default EditPlaceOrder;