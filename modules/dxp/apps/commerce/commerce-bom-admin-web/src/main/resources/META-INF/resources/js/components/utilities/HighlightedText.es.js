/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import React from 'react';

function processQuery(query, text = '') {
	const regex = new RegExp(`(.*?)(${query || ''})(.*)`, 'gmi');
	const results = regex.exec(text);

	return results
		? Array(3)
				.fill('')
				.map((_, i) => results[i + 1].toString())
		: [text, '', ''];
}

export default function HighlightedText(props) {
	const [firstPart, highlightedPart, thirdPart] = processQuery(
		props.query,
		props.text
	);

	return (
		<span className="autocomplete-item">
			{props.inverted ? (
				<>
					{firstPart}
					{highlightedPart && <strong>{highlightedPart}</strong>}
					{thirdPart}
				</>
			) : (
				<>
					<strong>{firstPart}</strong>
					{highlightedPart}
					<strong>{thirdPart}</strong>
				</>
			)}
		</span>
	);
}
