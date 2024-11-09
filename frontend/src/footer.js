import React from 'react';
import './CSS_C/Footer.css';
import logo from './image/logo.jpg';

const footer = () => {

  return (
       <div>
        <footer>
       <div class="frow">

            <div class="fcol">
                <img src={logo} class="flogo" alt='company logo'/>
                <p> A Vertual dressing Shop is a retail establishment
					 that specialization is selling a variety of products related
					 to cloth needs. </p>
            </div>

            <div class="fcol"> 
				<h3>Office</h3>
				<p class="fp">Malabe </p>
				<p class="fp">Vertual sri lanka </p>
				<p class="fp">Sri Lanaka </p>
				<p class="email-id">virtualdressing@gmail.com </p>
				<h4>+94-704563227 </h4>
			</div>
            <div class="fcol"> 
				<h3>Links</h3>
				<ul>
					<li> <a href="#">Home </a></li>
					<li> <a href="#">Services </a></li>
					<li> <a href="#">About Us </a></li>
					<li> <a href="#">Features </a></li>
					<li> <a href="#">Contacts </a></li>
				</ul>

			</div>

            <div class="fcol"> 
				<h3>Newsletter</h3>
				<form>
					<i class="fa-regular fa-envelope fa-2xl"></i>
					<input type="email" placeholder="Enter your email id"/>
					<button type="submit"><i class="fa-solid fa-paper-plane fa-lg"></i></button>
				</form>

				

			</div>

            </div>
            </footer>
            </div>
       
  );
};

export default footer;
