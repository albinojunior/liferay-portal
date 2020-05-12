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

import {cleanup, render} from '@testing-library/react';
import React from 'react';

import App from '../../../../src/main/resources/META-INF/resources/js/App.es';

const props = {
	data: {
		field1: {
			type: 'radio',
			values: {
				option1: 2,
				option2: 1,
			},
		},
		field2: {
			type: 'radio',
			values: {
				option1: 2,
				option2: 1,
			},
		},
	},
	fields: [
		{name: 'field1', type: 'radio'},
		{name: 'field2', type: 'radio'},
		{name: 'field3', type: 'radio'},
	],
};

describe('App', () => {
	afterEach(cleanup);

	it('renders a card for each field', () => {
		const {container} = render(<App {...props} />);

		const totalCards = container.querySelectorAll('.card').length;
		expect(totalCards).toEqual(props.fields.length);
	});
});
