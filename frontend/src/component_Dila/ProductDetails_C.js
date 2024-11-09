import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import '../CSS_C/ProductDetailsCSS_C.css';
import 'tailwindcss/tailwind.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { FaShoppingCart } from 'react-icons/fa';
import StockUpdate_C from './StockUpdate_C';

import Navi from '../Navi';
import Foot from '../footer';
// import createCart from '../createCart';
import AddFeedback from '../component_Lima/addFeedback.js';


const ProductDetails_C = () => {
  const location = useLocation();
  const { row } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  //Getting Image in firebase storage using image id 
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getDownloadURL(ref(storage, `images/${row.imgId}`));
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image URL:', error);
        // Set a default image URL if fetching fails
        setImageUrl('https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg');
      }
    };

    fetchImageUrl();
  }, [row]);

  return (
    <div>
    <Navi/>
  
<div class="product-container1" className='flex' >
    
    {/* Display Product Data in Selected item */}
  <div class="product-image">
    {imageUrl && ( //Display image
      <img class="product-size" src={imageUrl} alt={`Photo-${row.id}`} />
    )}
  </div>
  <div class="product-detailss">

    {/* Display Other data in selected item */}
    <h2 class="product-name">{row.name}</h2>
    <p class="product-description">{row.sdes}</p>
    <p class="product-description">{row.des}</p>
    <p class="product-price">LKR. {row.price}</p>
    <div class="product-controls">
      <div class="quantity-controls">
          <button className="decrement" onClick={handleDecrement}>-</button>
           <input type="number" className="quantity-input" value={quantity} min="1" />
          <button className="increment" onClick={handleIncrement}>+</button>
      </div>
            <button 
                    className={`add-to-cart ${row.stock === 0 ? '' : 'disabled'}`}
                    onClick={() => {
                      if (row.stock === 0) {
                        alert("Stock is zero. Cannot add to cart.");
                      } else {
                        StockUpdate_C({ productId: row.id, qty: quantity, stk: row.stock, type: "add", name: row.name, sdes: row.sdes, price: row.price });
                        // createCart({ productId: row.id, qty: quantity, stk: row.stock });
                      }
                    }}
                  >
                    <span className="cart-icon">+</span>
                    <span className="add-text">Add</span>
           </button>
    </div>
    <div class="stock-info">
      <div class="stock-indicator"></div>
        <div className={`stock-text ${row.stock === 0 ? 'text-red-500' : ''}`}>
          {row.stock === 0 ? 'Out of stock' : `${row.stock} pcs. in stock`}
        </div>
    </div>
  </div>
</div>


<div>
  <AddFeedback productId={row.id}/>
</div>



</div>

  );
};

export default ProductDetails_C;
