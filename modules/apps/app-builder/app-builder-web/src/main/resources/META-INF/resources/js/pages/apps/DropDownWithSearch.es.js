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

import ClayDropDown, {Align} from '@clayui/drop-down';
import React, {createContext, useContext, useState} from 'react';

export const DropDownContext = createContext();

const DropDownWithSearch = ({
	hasError,
	items = [],
	isLoading,
	namePropertyKey = 'name',
	onSelect,
	stateProps: {emptyProps, errorProps, loadingProps},
	trigger,
	...restProps
}) => {
	const [active, setActive] = useState(false);
	const [query, setQuery] = useState('');

	const handleOnselect = (event, selectedValue) => {
		setActive(false);
		onSelect(event, selectedValue);
	};

	return (
		<DropDownContext.Provider value={{query, setQuery}}>
			<ClayDropDown
				{...restProps}
				active={active}
				alignmentPosition={Align.BottomLeft}
				menuElementAttrs={{
					className: 'select-dropdown-menu',
					onClick: (event) => {
						event.stopPropagation();
					},
				}}
				onActiveChange={setActive}
				trigger={trigger}
			>
				{<Search />}

				{isLoading && <LoadingState {...loadingProps} />}

				{hasError && (
					<EmptyState
						className="error-state-dropdown-menu"
						{...errorProps}
					/>
				)}

				{!isLoading && !hasError && items.length === 0 && (
					<EmptyState
						className="empty-state-dropdown-menu"
						{...emptyProps}
					/>
				)}

				<Items
					items={items}
					namePropertyKey={namePropertyKey}
					onSelect={handleOnselect}
					query={query}
				/>
			</ClayDropDown>
		</DropDownContext.Provider>
	);
};

const EmptyState = ({children, className, label}) => {
	return (
		<div className={className}>
			<label className="font-weight-light text-secondary">{label}</label>

			{children}
		</div>
	);
};

const Items = ({items, namePropertyKey, onSelect, query}) => {
	const treatedQuery = query.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

	const getTranslatedName = ({
		defaultLanguageId = themeDisplay.getLanguageId(),
		[namePropertyKey]: name,
	}) => {
		return typeof name === 'object'
			? name[themeDisplay.getLanguageId()] || name[defaultLanguageId]
			: name;
	};

	return (
		<ClayDropDown.ItemList>
			{items
				.filter((item) => getTranslatedName(item).match(treatedQuery))
				.map((item) => ({...item, name: getTranslatedName(item)}))
				.map(({id, name, ...otherProps}, index) => (
					<ClayDropDown.Item
						key={index}
						onClick={(event) =>
							onSelect(event, {
								id,
								name,
							})
						}
						{...otherProps}
					>
						{name}
					</ClayDropDown.Item>
				))}
		</ClayDropDown.ItemList>
	);
};

const LoadingState = ({label}) => (
	<div className="loading-state-dropdown-menu">
		<span aria-hidden="true" className="loading-animation" />

		<label className="font-weight-light text-secondary">{label}</label>
	</div>
);

const Search = () => {
	const {query, setQuery} = useContext(DropDownContext);

	return (
		<ClayDropDown.Search
			formProps={{onSubmit: (e) => e.preventDefault()}}
			onChange={(event) => setQuery(event.target.value)}
			placeholder={Liferay.Language.get('search')}
			value={query}
		/>
	);
};

export default (props) => {
	return <DropDownWithSearch {...props} />;
};
