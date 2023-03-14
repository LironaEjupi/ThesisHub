import React from "react";

function FilterUser(props) {
	const onFilter = (event) => {
		props.selectedCategory(event.target.value)
	}
  return (
	<select name="isAvailable" className="mb-5 font-bold text-light-brown text-md" onChange={onFilter}>
		<option value="all">Të gjitha kategoritë</option>
		<option value="Mjekësi">Mjekësi</option>
		<option value="Ekonomi">Ekonomi</option>
		<option value="Bujqësi">Bujqësi</option>
		<option value="Teknologji">Teknologji</option>
		<option value="Edukim">Edukim</option>
		<option value="Juridik">Juridik</option>
		<option value="Arkitekturë">Arkitekturë</option>
		<option value="Call Center">Call Center</option>
		<option value="Ndërtimtari">Ndërtimtari</option>
		<option value="Pastrim">Pastrim</option>
		<option value="Dizajn i modës">Dizajn i modës</option>
		<option value="Parukeri">Parukeri</option>
		<option value="Tjera">Tjera</option>
	</select>
  );
}

export default FilterUser;
