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

import ClayLabel from '@clayui/label';
import {ClayResultsBar} from '@clayui/management-toolbar';
import React, {useCallback, useContext} from 'react';

import lang from '../../utils/lang.es';
import Button from '../button/Button.es';
import SearchContext from './SearchContext.es';

const FilterItem = ({filterName, label, remove}) => {
	return (
		<ClayResultsBar.Item>
			<ClayLabel
				className="tbar-label"
				closeButtonProps={{onClick: remove}}
				displayType="unstyled"
			>
				<span className="label-section">
					{`${filterName}: `}
					<span className="font-weight-normal">{label}</span>
				</span>
			</ClayLabel>
		</ClayResultsBar.Item>
	);
};

const getFilterResults = (filterConfig, filters) => {
	const filterResults = [];

	Object.keys(filters).forEach((key) => {
		const {filterItems, ...restConfig} = filterConfig.find(
			({filterKey}) => filterKey === key
		);

		const pushItem = (value) => {
			const filter = filterItems.find((item) => item.value === value);

			filterResults.push({...filter, ...restConfig});
		};

		if (Array.isArray(filters[key])) {
			filters[key].forEach(pushItem);
		} else {
			pushItem(filters[key]);
		}
	});

	return filterResults;
};

export default ({filterConfig = [], isLoading, totalCount}) => {
	const [{filters = {}, keywords}, dispatch] = useContext(SearchContext);

	const filterResults = getFilterResults(filterConfig, filters);

	const clearAll = () => {
		dispatch({keywords: '', type: 'SEARCH'});
		dispatch({filters: {}, type: 'FILTER'});
	};

	const removeItem = useCallback(
		({filterKey, multiple, value}) => {
			const newValue = multiple
				? filters[filterKey].filter((item) => item !== value)
				: undefined;

			dispatch({
				filters: {...filters, [filterKey]: newValue},
				type: 'FILTER',
			});
		},
		[dispatch, filters]
	);

	return (
		<>
			{(keywords || filterResults.length > 0) && !isLoading && (
				<ClayResultsBar>
					<ClayResultsBar.Item>
						<span className="component-text text-truncate-inline">
							<span className="text-truncate">
								{lang.sub(
									Liferay.Language.get('x-results-for-x'),
									[totalCount, keywords]
								)}
							</span>
						</span>
					</ClayResultsBar.Item>

					{filterResults.map((filter, key) => (
						<FilterItem
							key={key}
							{...filter}
							remove={() => removeItem(filter)}
						/>
					))}

					<ClayResultsBar.Item expand>
						<Button
							className="component-link tbar-link"
							displayType="unstyled"
							onClick={clearAll}
						>
							Clear
						</Button>
					</ClayResultsBar.Item>
				</ClayResultsBar>
			)}
		</>
	);
};
