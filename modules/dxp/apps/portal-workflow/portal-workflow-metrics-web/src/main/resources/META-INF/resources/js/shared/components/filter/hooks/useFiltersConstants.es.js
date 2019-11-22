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

import {useMemo} from 'react';

import filterConstants from '../util/filterConstants.es';

const useFiltersConstants = filterKeys => {
	const keys = [];
	const titles = [];

	useMemo(() => {
		filterKeys.forEach(filterKey => {
			if (filterConstants[filterKey]) {
				keys.push(filterConstants[filterKey].key);
				titles.push(filterConstants[filterKey].titles);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterKeys]);

	return {keys, titles};
};

export {useFiltersConstants};
