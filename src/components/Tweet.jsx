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
					<span className="tweet-author-name mr-3">{tweet.name}</span>
					<span className="tweet-handle mr-3">@{tweet.handle}</span>
					<span className="tweet-date mr-3">
						{convertToDate(tweet.timestamp)}
					</span>
				</div>
				<span className="tweet-content">{tweet.content}</span>
				<b className=" mr-3 mt-2">Score: {tweet.score}</b>
				<span>
					Link to actual tweet: <a href={tweet.url}>{tweet.url}</a>
				</span>
			</div>
		</div>
	);
}

export default Tweet;
