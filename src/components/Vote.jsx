import React, { useContext, useState } from "react";
import { URLContext } from "../contexts/URLContext";

function Vote({ term }) {
	const { URL, setURL } = useContext(URLContext);
	const [votes, setVotes] = useState(URL.boost[term]);

	return (
		<>
			<div className="voting">
				<button
					className="up"
					onClick={() => {
						if (URL.boost[term] === 1) setVotes(2);
						else setVotes(votes + 1);
						setURL({
							...URL,
							boost: {
								...URL.boost,
								[term]: votes + 1,
							},
						});
					}}>
					Increase Relevance
				</button>
				<span>{URL.boost[term] === 1 ? 1 : votes}</span>
				<button
					className="down"
					onClick={() => {
						if (URL.boost[term] === 1) setVotes(0);
						else setVotes(votes - 1);
						setURL({
							...URL,
							boost: {
								...URL.boost,
								[term]: votes - 1,
							},
						});
					}}>
					Decrease Relevance
				</button>
			</div>
		</>
	);
}

export default Vote;
