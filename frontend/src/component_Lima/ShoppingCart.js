import React, { useEffect, useState } from 'react';
import Navi from '../Navi';
import Axios from 'axios';
import '../CSS_C/ProductHomeCSS_C.css';
import './CSS/ShoppingCart.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import StockUpdate_C from '../component_Dila/StockUpdate_C';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Foot from '../footer';
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#def0f0',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

const BillGenerator = ({ items, total, carts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>DLVM SHOPPING CART BILL</Text>
        {items.map(item => {
          const filteredCart = carts.find(c => c.id === item.id);
          return (
            <View key={item.id} style={styles.item}>
              <Text>Name                     : {filteredCart ? filteredCart.name : 'Name not available'}</Text>
              <Text>Quantity                 : {item.quantity} qty.</Text>
              <Text>Price per one item : {filteredCart ? filteredCart.price  : 'Price not available'} /=</Text>
              <Text>sub total                 : {filteredCart ? filteredCart.price * item.quantity : 'Price not available'} /=</Text>
            </View>
          );
        })}
        <Text style={styles.total}>Total Amount :  LKR. {total} /=</Text>
      </View>
    </Page>
  </Document>
);

const ShoppingCart = () => {
  const [carts, setCarts] = useState([]); 
  const [carts2, setCarts2] = useState([]); 
  const [total, setTotal] = useState(0);     
  const [imageUrls, setImageUrls] = useState([]);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [billVisible, setBillVisible] = useState(false);

  const navigate = useNavigate();

  

  
  useEffect(() => {    
    getCartDetails();   
    getCart();          
  }, []);

  useEffect(() => {      
    const fetchImageUrls = async () => {      
      const urls = await Promise.all(carts.map(async (cart) => {   
        try {
          const filteredCart = carts.find(c => c.id === cart.id); 
          if (!filteredCart || !filteredCart.imgId) {               
            return null;
          }
          const url = await getDownloadURL(ref(storage, `images/${filteredCart.imgId}`));  
          return { id: cart.id, url };        
        } catch (error) {
          console.error('Error fetching image URL:', error);   
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));  
    };
    fetchImageUrls();   
  }, [carts]);

  useEffect(() => {       
    let calculatedTotal = 0;  
    carts2
      .filter(cart => cart.email === userEmail)   
      .forEach(cart => {             
        const filteredCart = carts.find(c => c.id === cart.id);  
        if (filteredCart) {      
          calculatedTotal += filteredCart.price * cart.quantity;
        }
      });
    
    setTotal(calculatedTotal);  
  }, [carts, carts2]);



  const handleButtonClick = (id, stock, quantity, name, sdes, price) => { 
    StockUpdate_C({ productId: id, qty: quantity , stk: stock, type: "remove", name: name, sdes: sdes, price: price }); 
    window.location.reload(); 
  };


  const getCartDetails = () => { 
    const FetchDetails = () => { 
      Axios.get('http://localhost:3001/api/cloths')
        .then((response) => {
          setCarts(response.data?.response || []); 
        })
        .catch((error) => {
          console.error('Axios Error: ', error); 
        });
    };

    FetchDetails(); 
    const intervalId = setInterval(FetchDetails, 1000); 
    return () => clearInterval(intervalId); 
  };



  const deleteCart = (id) => { 
    Axios.post('http://localhost:3001/api/deletecart', { id: id }) 
      .then((response) => {
        setCarts(prevCarts => prevCarts.filter(cart => cart.id !== id));  
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };



  const getCart = () => {  
    Axios.get(`http://localhost:3001/api/getcart`) 
      .then((response) => {
        setCarts2(response.data?.response || []);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };



  const userEmail = sessionStorage.getItem('userEmail');  
  console.log(userEmail)
  const filteredCarts = carts.filter(cart => cart.email === userEmail);  
  const filteredCartItems = carts2.filter(cart => cart.email === userEmail && 
    (carts.find(c => c.id === cart.id)?.name.toLowerCase().includes(searchQuery.toLowerCase())));  



    const updateCart = (id, quantity) => { 
     
      Axios.post('http://localhost:3001/api/updateCart', { id: id, quantity: quantity })  
        .then((response) => {
          
         
          setCarts2((prevCarts) =>
            prevCarts.map((cart) => (cart.id === id ? { ...cart, quantity: quantity } : cart))
          );
        })
        .catch((error) => {
          console.error('Axios Error: ', error);
        });
    };

    
  const handleIncrement = (id, stock, name, sdes, price) => { 
    const cartItem = filteredCartItems.find((cart) => cart.id === id); 

    if (cartItem) {
      const newQuantity = cartItem.quantity + 1;   
      if(stock >= cartItem.quantity -1 ){
        updateCart(id, newQuantity); 
        StockUpdate_C({ productId: id, qty: 1, stk: stock, type: "add", name: name, sdes: sdes, price: price }); 
      }
      else{
        alert("Stock is zero. Cannot add to cart."); 
      }
      
    }
  };

  const handleDecrement = (id, stock, name, sdes, price) => { 
    const cartItem = filteredCartItems.find((cart) => cart.id === id);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
        updateCart(id, newQuantity);
        StockUpdate_C({ productId: id, qty: 1 , stk: stock, type: "remove", name: name, sdes: sdes, price: price });
    }
  };
  
  const handlePayNow = (total) => {
    //navigate(`/EditPlaceOrder/${total}`)
    navigate(`/Payment/${total}`)
  };


  return (
    <div>
      <div>
        <Navi />
        
      </div>
      <div className='shopping-cart'>
        <h2 className='cart-title'>My Cart</h2>
        <div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}  
            className="search-input"
          />
        </div>

        {filteredCartItems.map((cart) => {
          const imageUrlObj = imageUrls.find(urlObj => urlObj.id === cart.id); 
          const imageUrl = imageUrlObj ? imageUrlObj.url : null;  
          const filteredCart = carts.find(c => c.id === cart.id); 
          return (  // Render the cart item
            <div className="cart-item" key={cart.id}>
              <div className="item-photo">
                {imageUrl ? (
                  <img src={imageUrl} alt={`Photo-${cart.id}`} />
                ) : (
                  <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" alt="Placeholder" />
                )}
              </div>
              <div className="item-details">
                
                <h3 className="item-name">Name : {filteredCart ? filteredCart.name : 'Name not available'}</h3>
                <h3 className="item-price">Quantity : {cart.quantity}</h3>
                <p className="item-price">Price : LKR. {filteredCart ? filteredCart.price * cart.quantity : 'Price not available'}/=</p>
                <div className={`stock-text ${filteredCart.stock === 0 ? 'text-red-500' : ''}`}>
                  <p className="item-price">Remaining stock : {filteredCart.stock === 0 ? 'The stock is over' : filteredCart.stock}</p>
                </div>
              </div>
              <div className="item-actions">
              <button className="action-button" onClick={() => handleDecrement(cart.id, filteredCart.stock, filteredCart.name, filteredCart.sdes, filteredCart.price)}>
                  -
                </button>
                <span className="item-quantity">{cart.quantity}</span>
                <button className="action-button" onClick={() => handleIncrement(cart.id, filteredCart.stock, filteredCart.name, filteredCart.sdes, filteredCart.price)}>
                  +
                </button>
                <button className="action-button delete-button" onClick={() => {deleteCart(cart.id); handleButtonClick(cart.id, filteredCart.stock, cart.quantity, filteredCart.name, filteredCart.sdes, filteredCart.price);}}>Delete</button>
              </div>
            </div>   
          );
        })}
       
        
        <div className="pdf-download-button">
          <PDFDownloadLink document={<BillGenerator items={filteredCartItems} total={total} carts={carts} />} fileName="bill.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Bill')}
          </PDFDownloadLink>
        </div>
       
       
        <div className="total-amount">Total : LKR.{total}</div>

        <div className="pay-now-button-container">
        <button className="pay-now-button" onClick={() => handlePayNow(total)}>
          Pay Now
        </button>
      </div>

      </div>
      <div>
      <Foot/>
      </div>
    
    </div>

    
  );
};

export default ShoppingCart;