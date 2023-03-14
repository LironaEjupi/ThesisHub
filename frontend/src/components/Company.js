import React, {createRef, useRef, useEffect} from 'react'
import Services from './Services'
import Employers from './Employers'
import AboutUs from './AboutUs'
import Footer from './Footer'
import Landing from './Landing'
import UsersLocation from './UsersLocation'
function Company() {
		const ref = createRef()
		function handleClick () {
				ref.current.scrollIntoView({ behavior: "smooth" });
		}

	return (
		<div className='homee'>
				<Landing onclick={handleClick} title="Gjej punëtorin më të afërt"/>
				<Services ref={ref} title="Profilet e punëtorëve të regjistruar" />
				<UsersLocation />
				<Employers title="Lista e punëtorëve të regjistruar"/>
				<AboutUs cname="bg-beige" />
				<Footer cname="bg-white"/>
		</div>
	)
}

export default Company
