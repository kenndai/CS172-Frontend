import React from "react";

function Tweet({ tweet }) {
	const convertToDate = timestamp => {
		let date = new Date(timestamp * 1000);
		return date.toLocaleDateString("en-US");
	};

	return (
		<div className="tweet">
			<div className="tweet-text">
				<div className="tweet-author-wrapper">
					{/* <span className="tweet-author-name mr-3">Tweet Author</span> */}
					{/* <span className="tweet-date mr-3">Tweet Date</span> */}
					{/* <span className="tweet-date mr-3">Tweet Score</span> */}
					<span className="tweet-author-name mr-3">{tweet.name}</span>
					<span className="tweet-handle mr-3">@{tweet.handle}</span>
					<span className="tweet-date mr-3">
						{convertToDate(tweet.timestamp)}
					</span>
					<span className="tweet-author-name mr-3">
						{tweet.score}
					</span>
				</div>
				{/* <span className="tweet-content">{tweet}</span> */}
				<span className="tweet-content">{tweet.content}</span>
			</div>
		</div>
	);
}

export default Tweet;
