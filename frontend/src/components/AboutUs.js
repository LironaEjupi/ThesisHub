import React from "react";

function Employers(props) {
	return (
		<div className={`about pb-5 pt-5 ${props.cname}`}>
			<div className="container">
				<div className="row items-center">
					<div className="col-md-6">
						<h1 className="font-medium text-light-brown text-5xl mb-5">
							Rreth nesh
						</h1>
						<p className="description text-brown md:text-lg mb-3">
							Kjo platformë është krijuar në mënyrë që punëdhënësit t'i
							lehtësojmë punën e gjetjes së punëtorit më të afërt varësisht prej
							lokacionit të tij, si dhe t'i japim mundësi më të mëdha promovimi
							individëve të papunë të cilët mund të regjistrohen në platformën
							tonë dhe të ndajnë detaje nga profili i tyre me punëdhënësit
							potencial.
						</p>
					</div>
					<div className="col-md-6">
						<img className="mb-2" src={require("../assets/images/startpage.jpg")} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Employers;
