import React, { useEffect, useState } from 'react'

function Services({title}, ref) {
	const [services, setServices] = useState([])
	const token = localStorage.getItem('token')
	const [visibleServices, setVisibleServices] = useState(6);

	useEffect(()=>{
		fetch("/services", {
			method: "GET",
			headers: {
					"Content-type": "application/json",
					"Authorization" : "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(service_res => {
						let data = service_res.data
						setServices(data)
					});
				} else {
					return res.json().then(data => {
						console.log("Error! ", data);
					});
				}
		});
	}, [])

	const loadMore = () => {
		setVisibleServices(visibleServices + 3);
	};

  return (
	<div ref={ref} className='services bg-beige pb-5 pt-5'>
		<div className='container'>
			<div className='row'>
				<div className='col-12'>
					<h1 className='font-medium text-light-brown text-5xl mb-3'>{title}</h1>
					<div className='border-b-2 border-solid border-light-brown mb-5 pt-1'></div>
				</div>
				 {services.slice(0, visibleServices).map((service) => {
					return(
						<div key={service.id} className='col-6 col-lg-4'>
							<p className='text-3xl mb-1 text-light-brown'>{service.counter}</p>
							<div className='services-image h-32 md:h-56 relative'>
								<img className='h-full w-full object-cover' alt={service.category} src={require("../assets/images/" + service.image)} />
							</div>
							<p className='text-center text-light-brown mt-1 text-lg'>{service.category}</p>
						</div>
					)
				})}
				 {services.length === visibleServices || services.length < visibleServices ? (
						""
					) : (
						<div className="load-more text-center mb-6 mt-3">
						<button
							className="rounded border border-light-brown px-5 py-2 text-md font-medium text-light-brown hover:bg-beige hover:text-white transition ease-in duration-300 animate"
							onClick={loadMore}
						>
							Shiko më shumë
						</button>
						</div>
					)}
			</div>
		</div>
	</div>
  )
}

export default React.forwardRef(Services)