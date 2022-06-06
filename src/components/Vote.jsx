import React, { useContext, useState } from "react";
import { URLContext } from "../contexts/URLContext";
import Button from "react-bootstrap/Button";

function Vote({ term }) {
	const { URL, setURL } = useContext(URLContext);
	const [votes, setVotes] = useState(URL.boost[term]);

	return (
		<div className="d-flex">
			<Button
				className="btn btn-sm"
				onClick={() => {
					if (URL.boost[term] === 1) setVotes(1.25);
					else setVotes(votes + 0.25);
					setURL({
						...URL,
						boost: {
							...URL.boost,
							[term]: votes + 0.25,
						},
					});
				}}>
				<i class="fa fa-plus" aria-hidden="true"></i>
			</Button>
			<span className="boost-value">
				{URL.boost[term] === 1 ? 1 : votes}
			</span>
			<Button
				className="btn btn-sm "
				onClick={() => {
					if (URL.boost[term] === 1) setVotes(0.75);
					else setVotes(votes - 0.25);
					setURL({
						...URL,
						boost: {
							...URL.boost,
							[term]: votes - 0.25,
						},
					});
				}}>
				<i class="fa fa-minus" aria-hidden="true"></i>
			</Button>
		</div>
	);
}

export default Vote;
