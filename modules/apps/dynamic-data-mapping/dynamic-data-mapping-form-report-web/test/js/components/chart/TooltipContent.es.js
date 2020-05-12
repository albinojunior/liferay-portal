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

import {render} from '@testing-library/react';
import React from 'react';

import TooltipContent from '../../../../src/main/resources/META-INF/resources/js/components/chart/TooltipContent.es';

const payload = [{payload: {count: 2, label: 'Label1'}}];

const props = {
	active: true,
	activeIndex: 0,
	payload,
	totalEntries: 2,
};

describe('Tooltip', () => {
	test('renders how many picks and the percentage an option of the Single Selection Field has', () => {
		const {container} = render(
			<>
				<TooltipContent {...props} />
			</>
		);

		const tooltipLabel = container.querySelector('.tooltip-label')
			.innerHTML;
		expect(tooltipLabel).toBe('Label1: 2 entries <b>(100%)</b>');
	});
});
