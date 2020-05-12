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

import {sortByCount} from '../../../src/main/resources/META-INF/resources/js/utils/operations.es';

const mockData = [
	{count: 2, label: 'Label1'},
	{count: 4, label: 'Label2'},
];

describe('Operation of sort', () => {
	test('classifies the array from the highest to lower count values ', () => {
		const sortedData = sortByCount(mockData);

		expect(sortedData[0].count > sortedData[1].count).toEqual(true);
	});
});
