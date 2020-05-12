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

import Card from '../../../../src/main/resources/META-INF/resources/js/components/card/Card.es';

const props = {
	fieldName: 'fieldName',
	totalEntries: 10,
	type: 'radio',
};

describe('Card', () => {
	test('show the number of entries on the header', () => {
		const {container} = render(
			<>
				<Card {...props} />
			</>
		);

		expect(container.querySelector('.card-text').title).toBe('10 entries');
	});

	test('show the number of entries on the header', () => {
		const {container} = render(
			<>
				<Card {...props} />
			</>
		);

		expect(container.querySelector('.card-text').title).toBe('10 entries');
	});

	test('show ta card with "No responses yet" status', () => {
		const {getByText} = render(
			<>
				<Card {...props} totalEntries={0} />
			</>
		);

		expect(getByText('no-entries-yet')).not.toBe(null);
	});
});
