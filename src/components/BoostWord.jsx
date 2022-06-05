import React from "react";
import Vote from "./Vote";

function BoostWord({ term }) {
	return (
		<div className="d-flex flex-direction-column mb-3">
			<div className="d-flex align-items-center justify-content-center boost-word">
				{term}
			</div>
			<Vote term={term} />
		</div>
	);
}

export default BoostWord;
