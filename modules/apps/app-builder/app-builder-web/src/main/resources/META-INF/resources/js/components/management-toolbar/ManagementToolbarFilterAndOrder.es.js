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

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayManagementToolbar from '@clayui/management-toolbar';
import classNames from 'classnames';
import React, {useContext, useEffect, useMemo, useState} from 'react';

import {FILTER_NAMES} from '../../pages/apps/constants.es';
import Button from '../button/Button.es';
import SearchContext from '../management-toolbar/SearchContext.es';
import DropDown, {CheckboxGroup, RadioGroup} from './DropDown.es';

const getSortable = (columns, sort = '') => {
	if (sort.length) {
		const [column, order] = sort.split(':');

		return {asc: order === 'asc', column};
	}
	else if (columns.length) {
		const {asc = true, key: column} =
			columns.find(({asc}) => asc !== undefined) || columns[0];

		return {asc, column};
	}

	return {};
};

export default ({columns = [], disabled, filterConfig = []}) => {
	const [{filters = {}, sort}, dispatch] = useContext(SearchContext);
	const [filtersValues, setFiltersValues] = useState(filters);
	const [isDropDownActive, setDropDownActive] = useState(false);

	const sortableColumns = useMemo(
		() => columns.filter(({sortable}) => sortable),
		[columns]
	);

	const {asc, column} = getSortable(sortableColumns, sort);
	const [sortColumn, setSortColumn] = useState(column);

	const filterItems = useMemo(() => {
		const options = [];

		filterConfig.forEach(
			({filterItems, filterKey, filterName, multiple}) => {
				const filterValue = filtersValues[filterKey];
				const anyOption = {label: Liferay.Language.get('any')};

				options.push({
					Component: multiple ? CheckboxGroup : RadioGroup,
					items: multiple ? filterItems : [anyOption, ...filterItems],
					label: FILTER_NAMES[filterName][1],
					onChange: (value, checked) => {
						if (multiple) {
							if (checked) {
								value = filterValue
									? [...filterValue, value]
									: [value];
							}
							else {
								value = filterValue.filter(
									(filter) => filter !== value
								);
							}
						}

						setFiltersValues((prevValues) => ({
							...prevValues,
							[filterKey]: value,
						}));
					},
					selected: filterValue,
				});
			}
		);

		return options;
	}, [filterConfig, filtersValues]);

	const enableDoneButton = filterItems.length > 0;

	const onDropDownActiveChange = (active) => {
		setDropDownActive(active);
		setFiltersValues(filters);
	};

	const onDoneClick = () => {
		dispatch({
			filters: filtersValues,
			sort: `${sortColumn}:${asc ? 'asc' : 'desc'}`,
			type: 'UPDATE_FILTERS_AND_SORT',
		});

		setDropDownActive(false);
	};

	const handleSort = (asc, newColumn) => {
		dispatch({
			sort: `${newColumn}:${asc ? 'asc' : 'desc'}`,
			type: 'SORT',
		});
	};

	const sortableItems = useMemo(() => {
		const sortConfig = {
			Component: RadioGroup,
			items: sortableColumns.map(({key, value}) => ({
				label: value,
				value: key,
			})),
			label: Liferay.Language.get('order-by'),
			onChange: setSortColumn,
			selected: sortColumn,
		};

		return sortableColumns.length ? [sortConfig] : [];
	}, [sortColumn, sortableColumns]);

	const dropDownItems = [...filterItems, ...sortableItems];

	useEffect(() => {
		setFiltersValues(filters);
	}, [filters]);

	useEffect(() => {
		if (!enableDoneButton) {
			onDoneClick();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortColumn]);

	return (
		<>
			{(columns.length > 0 || filterConfig.length > 0) && (
				<ClayManagementToolbar.ItemList>
					<ClayManagementToolbar.Item>
						<DropDown
							active={isDropDownActive}
							footerContent={
								enableDoneButton && (
									<ClayButton
										block
										onClick={() => onDoneClick()}
									>
										{Liferay.Language.get('done')}
									</ClayButton>
								)
							}
							onActiveChange={onDropDownActiveChange}
							trigger={
								<ClayButton
									className="nav-link"
									disabled={disabled}
									displayType="unstyled"
									id="filter-and-order"
								>
									<span className="navbar-breakpoint-down-d-none">
										{Liferay.Language.get(
											'filter-and-order'
										)}

										<ClayIcon
											className="inline-item inline-item-after"
											symbol="caret-bottom"
										/>
									</span>
									<span className="navbar-breakpoint-d-none">
										<ClayIcon
											className="inline-item inline-item-after"
											symbol="filter"
										/>
									</span>
								</ClayButton>
							}
						>
							{dropDownItems.map(({Component, ...props}, key) => (
								<Component key={key} {...props} />
							))}
						</DropDown>
					</ClayManagementToolbar.Item>
					<ClayManagementToolbar.Item>
						<Button
							className={classNames(
								'nav-link',
								'nav-link-monospaced',
								{
									'order-arrow-down-active': !asc,
									'order-arrow-up-active': asc,
								}
							)}
							disabled={disabled}
							displayType="unstyled"
							onClick={() => handleSort(!asc, column)}
							symbol="order-arrow"
							tooltip={Liferay.Language.get(
								'reverse-sort-direction'
							)}
						/>
					</ClayManagementToolbar.Item>
				</ClayManagementToolbar.ItemList>
			)}
		</>
	);
};
