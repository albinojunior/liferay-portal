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

import Legend from '../../../../src/main/resources/META-INF/resources/js/components/chart/Legend.es';

const moreThan10 = [
	'Label1',
	'Label2',
	'Label3',
	'Label4',
	'Label5',
	'Label6',
	'Label7',
	'Label8',
	'Label9',
	'Label10',
	'Label11',
];

const props = {
	activeIndex: null,
	labels: ['Label1', 'Label2'],
};

describe('Legend', () => {
	beforeEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	test('adds opacity to all labels which are not being hovered and keep the color of the one hovered', () => {
		const {container} = render(
			<Legend {...props} activeIndex={0} />
		);

		expect(container.querySelectorAll('li')[0].className).toBe('');
		expect(container.querySelectorAll('li')[1].className).toBe('dim');
	});

	test('displays showAll button when there are more than 10 items', () => {
		const {getByText} = render(
			<Legend {...props} labels={moreThan10} />
		);

		expect(getByText('show-all')).not.toBe(null);
	});

	test('displays showLess button when showAll button is clicked', () => {
		const {getByText} = render(
			<Legend {...props} labels={moreThan10} />
		);

		const showAllButton = getByText('show-all');

		fireEvent.click(showAllButton);

		expect(getByText('show-less')).not.toBe(null);
	});
});
