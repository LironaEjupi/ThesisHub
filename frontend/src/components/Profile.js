import React, { useState, useEffect } from 'react'
import '../styles/sass/_animation.scss'
import CreateProfile from './CreateProfile';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
function Profile() {
	const navigate = useNavigate();
	const [profileData, setProfileData] = useState({})
	const [isOpen, setIsOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const token = localStorage.getItem('token')

	const fetchProfile = () => {
		fetch("/profile", {
			method: "GET",
			headers: {
					"Content-type": "application/json",
					"Authorization" : "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(profile => {
						let data = profile.data
						setProfileData(data)
					});
				} else {
					return res.json().then(data => {
						console.log("Something went wrong! ", data);
					});
				}
		});
	}

	useEffect(()=>{        
		fetchProfile() 
	}, [])
   
	const handleClick = () => {
		setIsOpen(true)
	}
	const removeAccount = () => {
		fetch("/delete_user", {
			method: "GET",
			headers: {
					"Content-type": "application/json",
					"Authorization" : "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(data => {
						setIsPopupOpen(false)
						localStorage.removeItem('token')
						navigate('/')
					}
					);
				} else {
					return res.json().then(data => {
						console.log("Error: ", data)
					});
				}
		});
	}
	if(!isOpen)
	return (
	<div>
	  <div className='profile mt-5 mb-10 bg-white'>
		<div className='container'>    
				<div className='row items-center'>
					<h1 className='uppercase font-semibold text-light-brown text-2xl mb-3'>Profili juaj</h1>
					<div className='border-b-2 border-solid border-light-brown mb-5 pt-1'></div>
					<div className='col-sm-4 offset-sm-1'>
						<div className='form-data animate text-center md:text-right p-1 text-lg font-medium italic text-light-brown'>
							<p>{profileData.name}</p>
							<p>{profileData.surname}</p>
							{
								profileData.phone ?
								<p>Tel: {profileData.phone}</p>
								: ""
							}
							{
								profileData.birthdate ?
								<p>Datëlindja: {profileData.birthdate}</p>
								: ""
							}
							<p>{profileData.title}</p>
							<p>{profileData.email}</p>
							<p>{profileData.address}</p>
							{
								profileData.availability === "employed" ?
									<p>Disponueshmëria: I/E punësuar</p>
								: <p>Disponueshmëria: I/E pa punë</p>
							}
							 {
							profileData.resume ? 
							<a className='underline hover:text-brown' href={"http://localhost:5000/storage/files/" + profileData.resume} target="_blank">CV</a>
							: ""
						}
					<div className='button mt-2'>
						<button type='submit' onClick={handleClick} className='border-2 rounded border-beige transition ease-in duration-300 hover:bg-light-brown hover:text-beige text-light-brown px-3 py-1 mb-2 text-sm'>Ndrysho Profilin</button>
					</div>
						</div>
					</div>
					<div className='col-sm-5'>
						{
							profileData.image ?
							<div className='h-80 md:h-96 relative'>
								<img src={"/storage/images/" + profileData.image}  alt="" className='mb-2 h-full w-full object-cover object-top'/>
							</div>
							: <img src={require("../assets/images/anonymous.jpg")} alt=""/>
						}
					</div>
				</div>
				<p className='text-sm flex justify-end font-medium italic text-light-brown mt-5 mb-1'>A dëshironi të çregjistroheni?</p>
				<button onClick={() => setIsPopupOpen(true)} className='border-2 float-right display-block rounded font-medium float-right border-beige transition ease-in duration-300 hover:bg-light-brown hover:text-beige text-light-brown px-3 py-1 mb-2 text-xs'>Çregjistrohu!</button>
				<Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} removeUser={removeAccount}/>
		</div>
	</div>
	</div>
  )
  else {
  return (
	  <CreateProfile open={isOpen} onClose={() => {setIsOpen(false)}} fetchProfile={fetchProfile}/>
  )
  }
}

export default Profile
