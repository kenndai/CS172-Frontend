import React, { useContext } from "react";
import { URLContext } from "../contexts/URLContext";
import { ResultContext } from "../contexts/ResultsContext";
import Button from "react-bootstrap/Button";

function Filter() {
	const { URL, setURL } = useContext(URLContext);
	const { name, page, startTime, endTime } = URL.filter;
	const { setResults } = useContext(ResultContext);

	const onChange = e => {
		setURL(prevState => ({
			...prevState,
			filter: {
				...prevState.filter,
				[e.target.name]: e.target.value,
			},
		}));
	};

	const onClick = async () => {
		let builtURL = `${URL.base}query=${encodeURIComponent(
			URL.query.join(" ")
		)}`;

		// if user entered a name
		if (URL.filter.name !== "")
			builtURL += `&user=${encodeURIComponent(URL.filter.name)}`;

		// if user entered a page
		if (URL.filter.page !== "") {
			builtURL += `&page=${URL.filter.page}`;
		}

		// if user entered both a start and end time
		if (URL.filter.startTime && URL.filter.endTime) {
			let unixStart = new Date(URL.filter.startTime).getTime() / 1000;
			let unixEnd = new Date(URL.filter.endTime).getTime() / 1000;
			builtURL += `&timerange=${unixStart},${unixEnd}`;
		}

		builtURL += `&maxresults=${URL.maxresults}&boost=${encodeURIComponent(
			JSON.stringify(URL.boost)
		)}`;

		console.log(builtURL);

		// fetch tweets from url
		try {
			const res = await fetch(builtURL);
			const tweets = res.data;
			// const tweets = await res.json();
			console.log(tweets);
			setResults([...tweets]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="filter col">
			<h4>Advanced Options?</h4>
			<form>
				<input
					type="text"
					name="name"
					value={name}
					placeholder="Filter by user"
					onChange={onChange}
					className="mb-2 rounded"
				/>
				<input
					type="number"
					name="page"
					value={page}
					placeholder="Which page? (Default is 0)"
					onChange={onChange}
					className="mb-2 rounded"
				/>
				<input
					type="date"
					name="startTime"
					value={startTime}
					placeholder="Enter a start time"
					onChange={onChange}
					className="mb-2 rounded"
				/>
				<input
					type="date"
					name="endTime"
					value={endTime}
					placeholder="Enter a end time"
					onChange={onChange}
					className=" rounded"
				/>
			</form>
			<Button
				type="submit"
				className="btn btn-warning col-2 mt-4"
				id="submitButton"
				onClick={onClick}>
				<i className="fas fa-search"></i>
			</Button>
		</div>
	);
}

export default Filter;
