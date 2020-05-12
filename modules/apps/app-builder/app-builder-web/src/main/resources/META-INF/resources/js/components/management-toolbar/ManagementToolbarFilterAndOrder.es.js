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

export default ({columns = [], disabled, filters = []}) => {
	const [{filters: appliedFilters = {}, sort}, dispatch] = useContext(
		SearchContext
	);
	const [localFilters, setLocalFilters] = useState(appliedFilters);
	const [isDropDownActive, setDropDownActive] = useState(false);

	const sortableColumns = useMemo(
		() => columns.filter(({sortable}) => sortable),
		[columns]
	);

	const {asc, column} = getSortable(sortableColumns, sort);
	const [sortColumn, setSortColumn] = useState(column);

	const filterItems = filters.map(({items, key, multiple, name}) => {
		const props = {
			checked: localFilters[key],
			items,
			label: FILTER_NAMES[name][1],
		};

		if (multiple) {
			return (
				<CheckboxGroup
					{...props}
					onAdd={(value) => {
						setLocalFilters((prevFilters) => {
							const values = prevFilters[key] || [];

							return {
								...prevFilters,
								[key]: values.concat(value),
							};
						});
					}}
					onRemove={(value) => {
						setLocalFilters((prevFilters) => ({
							...prevFilters,
							[key]: prevFilters[key].filter(
								(currentValue) => currentValue !== value
							),
						}));
					}}
				/>
			);
		}
		else {
			return (
				<RadioGroup
					{...props}
					items={[
						{label: Liferay.Language.get('any')},
						...props.items,
					]}
					onChange={(value) => {
						setLocalFilters((prevFilters) => ({
							...prevFilters,
							[key]: value,
						}));
					}}
				/>
			);
		}
	});

	const orderByItems = () => {
		if (sortableColumns.length === 0) {
			return null;
		}

		return (
			<RadioGroup
				checked={sortColumn}
				items={sortableColumns.map(({key, value}) => ({
					label: value,
					value: key,
				}))}
				label={Liferay.Language.get('order-by')}
				onChange={setSortColumn}
			/>
		);
	};

	const dropDownItems = [...filterItems, orderByItems()];

	const enableDoneButton = filterItems.length > 0;

	const onDropDownActiveChange = (active) => {
		setDropDownActive(active);
		setLocalFilters(appliedFilters);
	};

	const onDoneButtonClick = () => {
		dispatch({
			filters: localFilters,
			sort: `${sortColumn}:${asc ? 'asc' : 'desc'}`,
			type: 'UPDATE_FILTERS_AND_SORT',
		});

		setDropDownActive(false);
	};

	const onSortButtonClick = (asc, newColumn) => {
		dispatch({
			sort: `${newColumn}:${asc ? 'asc' : 'desc'}`,
			type: 'SORT',
		});
	};

	useEffect(() => {
		if (!enableDoneButton) {
			onDoneButtonClick();
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
										onClick={() => onDoneButtonClick()}
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
							{dropDownItems.map((item, index) => (
								<div key={index}>{item}</div>
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
							onClick={() => onSortButtonClick(!asc, column)}
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
