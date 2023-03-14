import React, { useEffect, useState } from 'react'

function CreateProfile({open, onClose, fetchProfile}) {
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem('token')
	const[path, setPath] = useState("/storage/images/")
	const [errorMessage, setErrorMessage] = useState();
	const [profileData, setProfileData] = useState({})
	const[pdfFile, setSelectedFile] = useState()
	const [image, setImage] = useState()
	const [img, setImg] = useState()
	const formData = new FormData();
	
	useEffect(()=>{
		fetch("/profile", {
			method: "GET",
			headers: {
					"Content-type": "multipart/form-data",
					"Authorization" : "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(profile => {
						let data = profile.data
						setImg(data.image)
						setProfileData(data)
					});
				} else {
					return res.json().then(data => {
						console.log("Something went wrong!");
					});
				}
		});
		 
	}, [])
	const handleChange = (e) => {
		setProfileData(profileData => ({ ...profileData, [e.target.name]: e.target.value }))
	}
	
	function getBase64(file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
			setImg(base64String)
		};
		reader.onerror = function (error) {
		  console.log('Error: ', error);
		};
	 }
	function showImage(e) {
		setImage(e.target.files[0])
		getBase64(e.target.files[0]);
		setPath("data:image/png;base64,")
	}
  
	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	  };

	formData.append("json_data", JSON.stringify(profileData))
	formData.append("pdf_file", pdfFile)
	formData.append("image", image)

	function handleSubmit(e) {
		e.preventDefault()
		fetch("/update_profile", {
			method: "POST",
			headers: {
				"Authorization" : "Bearer " + token
			},
			body: 
				formData,
			
		}).then(res => {
			if (res.ok) {
				res.json().then(data => {
					if(data.error !== undefined) {
						setErrorMessage(data.error);
					}
					else {
						fetchProfile()
						onClose()
						setIsOpen(true)
					}
				});
			} else {
				return res.json().then(data => {
					console.log("Error: ", data.error)
					setErrorMessage(data.error);
				});
			}
		});
		
	}

if(!open) return null
  return (
	<div className='profile mt-5 bg-white'>
		<div className='container'>
			<form onSubmit={handleSubmit} className="text-brown">
				<div className='row'>
					<h1 className='uppercase font-semibold text-light-brown text-2xl mb-3'>Krijo profilin tënd</h1>
					<div className='border-b-2 border-solid border-light-brown mb-5 pt-1'></div>
					<div className='col-sm-4'>
						<div className='form-data animate'>
							<input type="text" className='border p-1 mb-2 w-full' name='name' placeholder="Emri" value={profileData['name']} onChange={handleChange} required></input>
							<input type="text" className='border p-1 mb-2 w-full' name='surname' placeholder="Mbiemri" value={profileData['surname']} onChange={handleChange} required/>
							<input type="text" className='border p-1 mb-2 w-full' name='phone' placeholder="Numri kontaktues" value={profileData['phone']} onChange={handleChange} />
							<input type="email" className='border p-1 mb-2 w-full' name='email' placeholder="Adresa elektronike" value={profileData['email']} />
							<select name="address" className='block border p-1 mb-2 w-full' id="address" value={profileData['address']} onChange={(e) => setProfileData({...profileData, 'address': e.target.value})} required>
								<option value="Lokacioni">Lokacioni</option>
								<option value="Prishtinë">Prishtinë</option>
								<option value="Ferizaj">Ferizaj</option>
								<option value="Gjilan">Gjilan</option>
								<option value="Gjakovë">Gjakovë</option>
								<option value="Prizren">Prizren</option>
								<option value="Mitrovicë">Mitrovicë</option>
								<option value="Pejë">Pejë</option>
							</select>
							<p>Ditëlindja:</p>
							<input type="date" className='block border p-1 mb-2 w-full' name='birthdate' placeholder="Ditelindja" value={profileData['birthdate']} onChange={handleChange} />
							<p>Kategoria:</p>
							<select name="categories" className='block border p-1 mb-2 w-full' id="categories" value={profileData['category']} onChange={(e) => setProfileData({...profileData, 'category': e.target.value})} required>
							<option value="Mjekesi">Mjekësi</option>
							<option value="Ekonomi">Ekonomi</option>
							<option value="Bujqesi">Bujqësi</option>
							<option value="Teknologji">Teknologji</option>
							<option value="Edukim">Edukim</option>
							<option value="Juridik">Juridik</option>
							<option value="Arkitekture">Arkitekturë</option>
							<option value="Call Center">Call Center</option>
							<option value="Ndertimtari">Ndërtimtari</option>
							<option value="Pastrim">Pastrim</option>
							<option value="Dizajn i modes">Dizajn i modës</option>
							<option value="Parukeri">Parukeri</option>
							<option value="Tjera">Tjera</option>
							</select>
							<input type="text" className='border p-1 mb-2 w-full' name='title' placeholder="Titulli" value={profileData['title']} onChange={handleChange}/>   
							<label className="radio text-start text-brown text-sm font-medium mb-1">
								<input
									type="radio"
									name="name"
									value="employed"
									checked={profileData['availability'] === "employed"}
									onChange={e => setProfileData({...profileData ,  "availability" :  e.target.value})}
								/>
								<span>I/E punësuar</span>
							</label>
							<label className="radio text-start text-brown text-sm font-medium">
								<input
									type="radio"
									name="name"
									value="unemployed"
									checked={profileData['availability'] === "unemployed"}
									onChange={e => setProfileData({...profileData ,  "availability" :  e.target.value})}
								/>
								<span>I/E pa punë</span>
							</label>
						</div>
					</div>
					<div className='col-sm-4 offset-md-1'>
						<h4 className='mb-2'>Ngarkojeni foton tuaj:</h4>
						<input type="file" name="" accept="image/jpeg,image/gif,image/png" onChange={showImage} className="mb-2"/>
						{img ?
							<div className='h-32 md:h-80 relative'>
								<img src={path + img} className="h-full w-full object-cover object-top" alt=""/>
							</div>
							: ""}
						<h4 className='mb-2'>Ngarkojeni CV-në tuaj:</h4>
						<input type="file" accept="application/pdf" onChange={handleFileInputChange} />  
					</div>
					{errorMessage ? 
					<span className="error_msg font-medium text-sm text-red mt-1">
						  <i
							className="fa fa-exclamation-circle mr-1"
						  ></i>
						  {errorMessage}
						</span>
						: "" }
					<div className='button '>
						<button type='submit' className='border px-3 py-1 mb-2 md:float-right'>Ruaj Profilin</button>
					</div>
				</div>
			</form>
		</div>
	</div>
  )
}

export default CreateProfile
