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

import {cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';

import PieChart from '../../../../../src/main/resources/META-INF/resources/js/components/chart/pie/PieChart.es';

const mockData = [{count: 2, label: 'Label1'}];

const props = {
	data: mockData,
	height: 300,
	totalEntries: 2,
	width: 700,
};

describe('Pie Chart', () => {
	afterEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	test('renders properly the chart and the legend', () => {
		const {asFragment} = render(
			<>
				<PieChart {...props} />
			</>
		);

		expect(asFragment()).toMatchSnapshot();
	});

	test('expands a sector with the percentage label when mouse is over it', () => {
		const {container} = render(
			<>
				<PieChart {...props} />
			</>
		);

		const pieSector = container.querySelector('.recharts-pie-sector');

		fireEvent.mouseOver(pieSector);

		expect(
			container.querySelector('.recharts-pie-sector > g')
		).toBeTruthy();

		expect(
			container.querySelector('.recharts-layer > text').innerHTML
		).toBe('100%');
	});

	test('reset a sector when mouse out', () => {
		const {container} = render(
			<>
				<PieChart {...props} />
			</>
		);

		const pieSector = container.querySelector('.recharts-pie-sector');

		fireEvent.mouseOver(pieSector);

		const pieSectorOpened = container.querySelector(
			'.recharts-pie-sector g path'
		);

		fireEvent.mouseOut(pieSectorOpened);

		expect(
			container.querySelector('.recharts-pie-sector > path')
		).toBeTruthy();
	});
});
