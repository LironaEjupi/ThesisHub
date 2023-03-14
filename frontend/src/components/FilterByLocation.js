import React from "react";

function FilterByLocation(props) {
		const onFilter = (event) => {
				props.selectedLocation(event.target.value)
		}
	return (
		<select name="location" className="mb-5 font-bold text-md text-light-brown" onChange={onFilter}>
				<option value="Lokacioni">Në të gjithë Kosovën</option>
				<option value="Prishtine">Prishtinë</option>
				<option value="Ferizaj">Ferizaj</option>
				<option value="Gjilan">Gjilan</option>
				<option value="Gjakove">Gjakovë</option>
				<option value="Prizren">Prizren</option>
				<option value="Mitrovice">Mitrovicë</option>
				<option value="Peje">Pejë</option>
		</select>
	);
}

export default FilterByLocation;
