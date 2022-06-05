import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { ResultContext } from "../contexts/ResultsContext";
import { URLContext } from "../contexts/URLContext";

function SearchBar() {
	const [query, setQuery] = useState("");
	const { URL, setURL } = useContext(URLContext);
	const { results, setResults } = useContext(ResultContext);

	// // split query by white space and join by "+"

	const onChange = e => setQuery(e.target.value);

	// make fetch call to backend to retrieve first 10 tweets; save into "result" state
	const onSubmit = async e => {
		e.preventDefault();
		setResults([...results, query]);

		const queryTerms = query.trim().split(/[ ,]+/);

		// initialize every term with a boost value of 1
		const boostTerms = {};
		for (let term of queryTerms) boostTerms[term] = 1;

		setURL({
			...URL,
			query: queryTerms,
			boost: boostTerms,
		});

		const builtURL = `${URL.base}query=${encodeURIComponent(
			queryTerms.join(" ")
		)}&maxresults=${URL.maxresults}&boost=${encodeURIComponent(
			JSON.stringify(boostTerms)
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
		<>
			<h1 className="title">Twitter Search Engine</h1>
			<img
				src={require("../images/search_bar_picture.jpg")}
				alt="Search"
				className="center"
			/>
			<form id="search-form" className="form-inline" onSubmit={onSubmit}>
				<div className="container d-flex flex-row justify-content-center">
					<div className="row w-50">
						<input
							type="search"
							id="userQuery"
							name="query"
							value={query}
							className="col-10 rounded"
							placeholder="Enter your query"
							onChange={onChange}
							required="required"
						/>
						<Button
							type="submit"
							className="btn btn-primary col-2"
							id="submitButton">
							<i className="fas fa-search"></i>
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}

export default SearchBar;
