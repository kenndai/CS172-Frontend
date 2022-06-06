import "./App.css";
import { useState } from "react";
import { ResultContext } from "./contexts/ResultsContext";
import { URLContext } from "./contexts/URLContext";
import SearchBar from "./components/SearchBar";
import Tweet from "./components/Tweet";
import Boost from "./components/BoostSideBar";
import Filter from "./components/FilterSideBar";

function App() {
	const [results, setResults] = useState([]);
	const [URL, setURL] = useState({
		base: "https://dcadade00a9e76.lhrtunnel.link/api/search/?",
		query: [],
		boost: {},
		filter: {
			name: "",
			page: "",
			startTime: "",
			endTime: "",
		},
		maxresults: 10,
	});

	return (
		<>
			<URLContext.Provider value={{ URL, setURL }}>
				<ResultContext.Provider value={{ results, setResults }}>
					<SearchBar />
					<div className="container-fluid d-flex justify-content-center mb-4">
						{URL.query.length === 0 ? null : (
							<div className="row mt-4 pl-3">
								<Boost />
								<div className="tweet-container col-5">
									<h4>Tweets</h4>
									{results.map(tweet => (
										<Tweet tweet={tweet} />
									))}
								</div>
								<Filter />
							</div>
						)}
					</div>
				</ResultContext.Provider>
			</URLContext.Provider>
		</>
	);
}

export default App;
