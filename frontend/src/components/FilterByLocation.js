import React from "react";

function FilterByLocation(props) {
		const onFilter = (event) => {
				props.selectedLocation(event.target.value)
		}
	return (
		<select name="location" className="mb-5 font-bold text-md text-light-brown" onChange={onFilter}>
				<option value="Lokacioni">Në të gjithë Kosovën</option>
				<option value="Prishtinë">Prishtinë</option>
				<option value="Ferizaj">Ferizaj</option>
				<option value="Gjilan">Gjilan</option>
				<option value="Gjakovë">Gjakovë</option>
				<option value="Prizren">Prizren</option>
				<option value="Mitrovicë">Mitrovicë</option>
				<option value="Pejë">Pejë</option>
		</select>
	);
}

export default FilterByLocation;
