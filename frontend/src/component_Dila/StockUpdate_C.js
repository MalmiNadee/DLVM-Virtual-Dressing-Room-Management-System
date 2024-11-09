import React from 'react';
import Axios from 'axios';

const StockUpdate_C = ({ productId, qty, stk, type, name, sdes, price }) => {  //Getting details in other page for update stock
    

    if(type=="add"){  // Add new product items in the cart then Decrease Product stock

        if(stk>qty){ 
            const newstk = stk - qty;

            //Create payload for update stock
            const payload = {
                id: productId,
                stock: newstk,
              };

              //Update Product stock using this url
              Axios.post('http://localhost:3001/api/updatecloth', payload)//http://localhost:3001/api/updateuser  https://book-shop-dep.vercel.app/api/updateuser
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });

              alert('The product cart successfully updated..!');
        }
        else if(stk==qty){ //Stock is 0

          const newstk = stk - qty;

          //Create payload for update stock
            const payload = {
                id: productId,
                stock: newstk,
              };

              //Update Product stock using this url
              Axios.post('http://localhost:3001/api/updatecloth', payload)//http://localhost:3001/api/updateuser https://book-shop-dep.vercel.app/api/updateuser
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });

              // Send email in product manager
            const emailPayload = {
              email: 'chamikamaths2002@gmail.com',
              subject: `${name} is Out of stock..!`,
              body: `This Product is out of stock..!, If there is new stock, please update it.

__________Product Details__________

Product id : ${productId}
Product Name : ${name}
Product Price : ${price}
Product Description : ${sdes}

___________________________________
Thank you..!`,
            };

            //Send email in Product manager using this url
            Axios.post('http://localhost:3001/api/send-email', emailPayload)//http://localhost:3001/api/send-email  https://book-shop-dep.vercel.app/api/send-email
                .then((response) => {
                    console.log('Email sent!');
                })
                .catch((error) => {
                    console.error('Axios Error: ', error);
                });


                alert('The product was successfully added to the cart..!');
                window.location.reload();
            }
        
    }
    else if(type=="remove"){  // Remove product items in the cart then Increase Product stock
        const newstk = stk + qty;

        //Create payload for update stock
            const payload = {
                id: productId,
                stock: newstk,
              };

               //Update Product stock using this url
              Axios.post('http://localhost:3001/api/updatecloth', payload)//http://localhost:3001/api/updateuser https://book-shop-dep.vercel.app/api/updateuser
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });

              alert('The product cart successfully updated..!');
    }
    else if(type=="admin"){ //Admin Update only stock

      //Create payload for update stock
          const payload = {
            id: productId,
            stock: stk,
          };

           //Update Product stock using this url
          Axios.post('http://localhost:3001/api/updatecloth', payload)//http://localhost:3001/api/updateuser https://book-shop-dep.vercel.app/api/updateuser
          .then((response) => {
          })
          .catch((error) => {
            console.error('Axios Error: ', error);
          });

          alert('Product Stock successfully updated..!');
    }

    return null;
};

export default StockUpdate_C;
