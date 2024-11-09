import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'


const PlaceOrder = () => {
  const { amount } = useParams(); 

  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [deliveryNameError, setDeliveryNameError] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [deliveryPhoneError, setDeliveryPhoneError] = useState('');

 const navigate = useNavigate();

  useEffect(() => {
    fetchMaxIdAndSetId();
    const email = sessionStorage.getItem('userEmail');
    const userID = sessionStorage.getItem('userID');
    setDeliveryEmail(email);
    setUserId(userID)
  }, [deliveryEmail, userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(DeliveryId)
    // console.log(deliveryName)
    // console.log(deliveryAddress)
    // console.log(zipCode)
    // console.log(deliveryPhone)

    if (validateForm()) {
    const payload = {
      deliveryId: DeliveryId,
      deliveryName: deliveryName,
      deliveryAddress: deliveryAddress,
      zipCode: zipCode,
      deliveryPhone: deliveryPhone,
      deliveryEmail: deliveryEmail,
      amount:amount,
      dCid:userId,
    };

   try {
     await Axios.post('http://localhost:3001/api/create-delivery', payload);
    console.log('Done');
    alert('Successfully added Delivery Details');
    navigate(`/Orders`);
  } catch (error) {
    console.error('Axios Error: ', error);
  }
  }
};

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getdelivery-maxid');
      const maxId = response.data?.maxId || 0; 
      setDeliveryId(maxId+1);
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };


 const validateForm = () => {
  let isValid = true;

  if (!deliveryName.trim()) {
    setDeliveryNameError('Name is required');
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(deliveryName.trim())) {
    setDeliveryNameError('Delivery Name must contain only letters');
    isValid = false;
  } else {
    setDeliveryNameError('');
  }

  if (!deliveryAddress.trim()) {
    setDeliveryAddressError('Delivery Address is required');
    isValid = false;
  } else if (deliveryAddress.length < 5) {
    setDeliveryAddressError('Please enter a valid Delivery Address');
    isValid = false;
  } else {
    setDeliveryAddressError('');
  }

  if (!zipCode.trim()) {
    setZipCodeError('Zip Code is required');
    isValid = false;
  } else if (!/^\d{5}$/.test(zipCode.trim())) {
    setZipCodeError('Zip Code should be 5 digits');
    isValid = false;
  } else {
    setZipCodeError('');
  }

  if (!deliveryPhone.trim()) {
    setDeliveryPhoneError('Phone Number is required');
    isValid = false;
  } else if (!/^[0]\d{9}$/.test(deliveryPhone.trim())) {
    setDeliveryPhoneError('Phone Number should be 10 digits and starts with 0');
    isValid = false;
  }else {
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
         <div className="placeOrder-page">
          <Navi/>
         
    <div className='orderForm'>
          <form onSubmit={handleSubmit}>
          <h4 className='title'>Place Order</h4>
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
              onChange={handleDeliveryNameChange}  required/>
               {deliveryNameError && <span className="error">{deliveryNameError}</span>}
          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
              onChange={handleDeliveryAddressChange}  required/>
               {deliveryAddressError && <span className="error">{deliveryAddressError}</span>}
          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
              onChange={handleZipCodeChange}  required/>
               {zipCodeError && <span className="error">{zipCodeError}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
             onChange={handleDeliveryPhoneChange}   required/>
             {deliveryPhoneError && <span className="error">{deliveryPhoneError}</span>}
          </div>

          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg"> Submit </button>
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default PlaceOrder;