import React, { useContext } from "react";
import { URLContext } from "../contexts/URLContext";
import { ResultContext } from "../contexts/ResultsContext";
import Button from "react-bootstrap/Button";
import BoostWord from "./BoostWord";

function Boost() {
	const { URL } = useContext(URLContext);
	const { setResults } = useContext(ResultContext);

	const onClick = async () => {
		console.log(URL.query);
		console.log(URL.boost);
		console.log(URL.filter);

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
		<div className="boost col">
			<h4>Boost?</h4>
			{URL.query.map(term => (
				<BoostWord term={term} />
			))}
			<Button
				type="submit"
				className="btn btn-info col-2 mt-2"
				id="submitButton"
				onClick={onClick}>
				<i className="fas fa-search"></i>
			</Button>
		</div>
	);
}

export default Boost;
