/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import React from 'react';

import colors from '../../utils/colors.es';

export default ({active, activeIndex, payload, totalEntries}) => {
	const getPercentage = (count) => (100 * count) / totalEntries;

	if (!active) {
		return null;
	}

	const {count, label} = payload[0].payload;

	return (
		<div className="custom-tooltip">
			<svg height="12" width="12">
				<circle
					cx="6"
					cy="6"
					fill={colors(activeIndex)}
					r="6"
					strokeWidth="0"
				/>
			</svg>

			<p className="tooltip-label">
				{`${label}: ${count} ${Liferay.Language.get(
					'entries'
				).toLowerCase()}`}{' '}
				<b>({getPercentage(count).toFixed(0)}%)</b>
			</p>
		</div>
	);
};
