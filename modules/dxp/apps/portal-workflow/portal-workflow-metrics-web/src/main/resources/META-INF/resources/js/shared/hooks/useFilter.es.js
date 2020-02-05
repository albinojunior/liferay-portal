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

import {useMemo, useContext, useEffect} from 'react';

import {FilterContext} from '../components/filter/FilterContext.es';
import {useFiltersConstants} from '../components/filter/hooks/useFiltersConstants.es';
import {
	getFilterResults,
	getSelectedItems,
	getFilterKeys,
	buildFilterItem
} from '../components/filter/util/filterUtil.es';
import {useRouterParams} from './useRouterParams.es';

const buildRouterState = (prefixedKeys, filters) => {
	const initialState = {};

	prefixedKeys.forEach(key => {
		if (filters[key]) {
			initialState[key] = filters[key].map(buildFilterItem);
		}
	});

	return initialState;
};

const useFilter = (filterKeys = [], prefixKeys = [''], withoutRouteParams) => {
	const {
		dispatch,
		dispatchFilter,
		filterState,
		filterValues,
		setFilterValues
	} = useContext(FilterContext);
	const {filters} = useRouterParams();
	const {keys, pinnedValues, titles} = useFiltersConstants(filterKeys);

	const prefixedKeys = useMemo(() => {
		const newKeys = [];

		keys.forEach(key =>
			prefixKeys.forEach(prefix => {
				newKeys.push(`${prefix}${key}`);
			})
		);

		return newKeys;
	}, [keys, prefixKeys]);

	const filterResults = useMemo(
		() => getFilterResults(prefixedKeys, pinnedValues, titles, filterState),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterState, prefixedKeys]
	);

	const selectedFilters = useMemo(() => getSelectedItems(filterResults), [
		filterResults
	]);

	useEffect(() => {
		const values = {};

		Object.keys(filterState).forEach(key => {
			if (filterState[key]) {
				values[key] = getFilterKeys(filterState[key]);
			}
		});

		setFilterValues(values);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterState]);

	return {
		dispatch,
		dispatchFilter,
		filterState,
		filterValues: !withoutRouteParams ? filters : filterValues,
		prefixedKeys,
		selectedFilters
	};
};

export {useFilter};
