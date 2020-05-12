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

import App from '../../../../src/main/resources/META-INF/resources/js/App.es';

const props = {
	data: {
		Field1: {
			type: 'radio',
			values: {
				op1: 2,
				op2: 1,
			},
		},
		Field2: {
			type: 'radio',
			values: {
				op1: 2,
				op2: 1,
			},
		},
	},
	fields: [
		{name: 'Field1', type: 'radio'},
		{name: 'Field2', type: 'radio'},
		{name: 'Field3', type: 'radio'},
	],
};

describe('App', () => {
	it('renders the cards quantity accordingly the numbers of fields', () => {
		const {container} = render(
			<>
				<App {...props} />
			</>
		);

		const totalCards = container.querySelectorAll('.card').length;

		expect(totalCards).toEqual(props.fields.length);
	});
});
