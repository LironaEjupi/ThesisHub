import React from 'react'

function Footer(props) {
  return (
	<div className={`footer pb-5 pt-5 ${props.cname}`}>
		<div className='container'>
			<div className='row'>
				<h1 className='footer-title font-medium text-light-brown text-5xl mb-3'>Kontakti</h1>
				<div className='border-b-2 border-solid border-light-brown mb-5 pt-1'></div>
				<div className='col-6 col-md-3 mb-2'>
					<h3 className='title uppercase text-brown font-bold'>Adresa</h3>
					<p>Prishtinë, Bregu i Diellit</p>
				</div>
				<div className='col-6 col-md-3 mb-2'>
					<h3 className='title uppercase text-brown font-bold'>Email</h3>
					<a href="mailto:info@findyourjob.com" className='hover:text-brown'>
						<p>info@findyourjob.com</p>
					</a>
				</div>
				<div className='col-6 col-md-3 mb-2'>
					<h3 className='title uppercase text-brown font-bold'>Telefoni</h3>
					<a href="tel:+38349800900" className='hover:text-brown'>
						<p>+38349800900</p>
					</a>
				</div>
				<div className='col-6 col-md-3 mb-2'>
					<h3 className='title uppercase text-brown font-bold'>Rrjetet sociale</h3>
					<a href="www.facebook.com" className='mr-5 hover:text-brown'>
						<i className='fa fa-facebook'></i>
					</a>
					<a href="www.twitter.com" className='mr-5 hover:text-brown'>
						<i className='fa fa-twitter'></i>
					</a>
					<a href="www.instagram.com" className='hover:text-brown'>
						<i className='fa fa-instagram'></i>
					</a>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Footer