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

import {useReducer, useMemo} from 'react';

import {useRouterParams} from './useRouterParams.es';

const buildFilterItem = data => {
	if (typeof data === 'string') {
		return {
			active: true,
			value: data
		};
	}

	return {
		...data,
		active: true
	};
};

const buildInitialState = (filterKeys, filters, prefixKeys) => {
	const initialState = {};

	filterKeys.forEach(filterKey => {
		prefixKeys.forEach(prefixKey => {
			const key = `${prefixKey}${filterKey}`;
			if (filters[key]) {
				initialState[key] = filters[key].map(buildFilterItem);
			}
		});
	});

	return initialState;
};

const reducer = (state, {filterKey, selectedItems}) => {
	return {
		...state,
		[filterKey]: selectedItems
	};
};

const useFiltersReducer = (filterKeys, prefixKeys = ['']) => {
	const {filters} = useRouterParams();

	const initialState = useMemo(
		() => buildInitialState(filterKeys, filters, prefixKeys),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	const [filterState, dispatch] = useReducer(reducer, initialState);

	const filterValues = Object.keys(filterState).map(filterKey =>
		filterState[filterKey].map(item => item.value)
	);

	return {dispatch, filterValues};
};

export {useFiltersReducer};
