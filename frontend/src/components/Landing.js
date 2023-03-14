import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Landing(props) {
	const token = localStorage.getItem('token')
	const navigate = useNavigate();
	const logOut = () => {
		localStorage.removeItem("token")
		navigate("/")
	}
	useEffect(() => {
		if (token == null) {
			navigate("/");
		}
	});
  return (
	<div className='home-inner mb-32 mt-16'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-10'>
						<h1 className='uppercase font-semibold text-light-brown text-2xl mb-3'>{props.title}</h1>
					</div>
					<div className='col-md-2'>
						<button onClick={logOut} className='button uppercase rounded-none border px-5 py-2 text-md font-medium text-light-brown md:float-right'>Shkyçu!</button> 
					</div>
				<div/>
				<div className='border-b-2 border-solid border-light-brown mb-5 pt-1'></div>
				<div className='row items-center text-center'> 
					<div className='col-md-6'>
						<div className='image h-full'>
							<img className='h-full object-cover' src={require("../assets/images/connect.jpg")} alt="" />
						</div>
					</div>
					<div className='col-md-6'>
						<h2 className='title text-5xl lg:text-7xl mb-5 text-light-brown'>Mirë se erdhët në platformën<br/>"e-Punëtori"</h2>
						<button onClick={props.onclick} className='button uppercase submit rounded-none border px-5 py-2 text-md font-medium text-light-brown mt-3 scroll-smooth'>Shiko më shumë</button>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Landing
