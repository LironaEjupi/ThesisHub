import React from 'react'
import Services from './Services'
import AboutUs from './AboutUs'
import Footer from './Footer'
import Landing from './Landing'
import Profile from './Profile'
import Companies from './Companies'
import LocateMe from './LocateMe'
function Jobseeker() {
	const ref = React.createRef();
	function handleClick () {
		ref.current.scrollIntoView({ behavior: "smooth" });
	}
  return (
	<div className='homee'>
		<Landing onclick={handleClick} title="Gej punëdhënësin tënd potencial"/>
		<Services ref={ref} title="Profilet në të cilat mund të shërbeni"/>
		<LocateMe />
		<Profile />
		<Companies />
		<AboutUs />
		<Footer cname="bg-beige" />
	</div>
  )
}

export default Jobseeker
