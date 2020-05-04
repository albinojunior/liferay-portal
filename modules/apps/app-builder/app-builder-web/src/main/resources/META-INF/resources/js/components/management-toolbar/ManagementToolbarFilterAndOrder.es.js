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
import {usePrevious} from 'frontend-js-react-web';
import React, {
	createRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import isClickOutside from '../../utils/clickOutside.es';
import Button from '../button/Button.es';
import DropDown, {CheckboxGroup, RadioGroup} from '../drop-down/DropDown.es';
import SearchContext from '../management-toolbar/SearchContext.es';

const getSortable = (columns, sort = '') => {
	if (sort.length) {
		const [column, order] = sort.split(':');

		return {asc: order === 'asc', column};
	} else if (columns.length) {
		const {asc = true, key: column} =
			columns.find(({asc}) => asc !== undefined) || columns[0];

		return {asc, column};
	}

	return {};
};

export default ({columns, disabled, filterConfig = []}) => {
	const [{filters, sort}, dispatch] = useContext(SearchContext);
	const [filtersValues, setFiltersValues] = useState(filters);
	const [active, setActive] = useState(false);
	const previousActive = usePrevious(active);
	const dropdownRef = createRef();

	const sortableColumns = useMemo(
		() => columns.filter(({sortable}) => sortable),
		[columns]
	);

	const {asc, column} = getSortable(sortableColumns, sort);
	const [sortColumn, setSortColumn] = useState(column);

	const filterItems = useMemo(() => {
		const options = [];

		filterConfig.forEach(
			({anyOption, filterItems, filterKey, filterName, multiple}) => {
				const items = [...filterItems];
				const filterValue = filtersValues[filterKey];

				if (anyOption) {
					items.unshift({label: Liferay.Language.get('any')});
				}

				options.push({
					item: multiple ? CheckboxGroup : RadioGroup,
					items,
					label: `${Liferay.Language.get('filter-by')} ${filterName}`,
					onChange: (value, checked) => {
						if (multiple) {
							if (checked) {
								value = filterValue
									? [...filterValue, value]
									: [value];
							} else {
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

	const enableDoneBtn = filterItems.length > 0;

	const handleDone = useCallback(() => {
		if (JSON.stringify(filters) !== JSON.stringify(filtersValues)) {
			dispatch({filters: filtersValues, type: 'FILTER'});
		}

		if (column !== sortColumn) {
			handleOrder(asc, sortColumn);
		}

		setActive(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [asc, column, filters, filtersValues, sortColumn]);

	const handleOrder = (asc, newColumn) => {
		dispatch({
			sort: `${newColumn}:${asc ? 'asc' : 'desc'}`,
			type: 'SORT',
		});
	};

	const sortableItems = useMemo(() => {
		const sortConfig = {
			item: RadioGroup,
			items: sortableColumns.map(({key, value}) => ({
				label: value,
				value: key,
			})),
			label: Liferay.Language.get('order-by'),
			onChange: (column) => {
				setSortColumn(column);

				if (!enableDoneBtn) {
					handleDone();
				}
			},
			selected: sortColumn,
		};

		return sortableColumns.length ? [sortConfig] : [];
	}, [enableDoneBtn, handleDone, sortColumn, sortableColumns]);

	const dropDownItems = [...filterItems, ...sortableItems];

	useEffect(() => {
		if (enableDoneBtn) {
			const onClickOutside = ({target}) => {
				const {id, offsetParent} = target;
				const triggerClicked =
					id === 'filter' ||
					(offsetParent && offsetParent.id === 'filter');

				if (
					(active && triggerClicked) ||
					(!triggerClicked &&
						previousActive &&
						isClickOutside(target, dropdownRef.current))
				) {
					handleDone();
				}
			};

			window.addEventListener('mousedown', onClickOutside);

			return () =>
				window.removeEventListener('mousedown', onClickOutside);
		}
	}, [active, dropdownRef, enableDoneBtn, handleDone, previousActive]);

	useEffect(() => {
		setFiltersValues(filters);
	}, [filters]);

	return (
		<>
			{(columns.length > 0 || filterConfig.length > 0) && (
				<ClayManagementToolbar.ItemList>
					<ClayManagementToolbar.Item>
						<DropDown
							active={active}
							footerContent={
								enableDoneBtn && (
									<ClayButton block onClick={handleDone}>
										{Liferay.Language.get('done')}
									</ClayButton>
								)
							}
							forwardRef={dropdownRef}
							onActiveChange={setActive}
							trigger={
								<ClayButton
									className="nav-link"
									disabled={disabled}
									displayType="unstyled"
									id="filter"
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
							{dropDownItems.map(({item, ...props}) =>
								item(props)
							)}
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
							onClick={() => handleOrder(!asc, column)}
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
