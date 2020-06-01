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

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import DropDownWithSearch, {
	DropDownWithSearchItems,
} from 'app-builder-web/js/pages/apps/DropDownWithSearch.es';
import {request} from 'app-builder-web/js/utils/client.es';
import React, {useEffect, useRef, useState} from 'react';

export default ({customObjectId, label, onSelect, selectedValue}) => {
	const [dropDownWidth, setDropDownWidth] = useState('200px');
	const [fetchState, setFetchState] = useState({isLoading: true});
	const [items, setItems] = useState([]);

	const selectRef = useRef();

	const options = {
		endpoint: `/o/data-engine/v2.0/data-definitions/${customObjectId}/data-layouts`,
		params: {keywords: '', page: -1, pageSize: -1, sort: ''},
	};

	const doFetch = () => {
		setFetchState({
			hasError: null,
			isLoading: true,
		});

		request(options)
			.then((formViews) => {
				setItems(formViews.items);
				setFetchState({
					hasError: null,
					isLoading: false,
				});
			})
			.catch((hasError) => {
				setFetchState({
					hasError,
					isLoading: false,
				});
			});
	};

	useEffect(() => {
		doFetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnSelect = (event, newValue) => {
		event.stopPropagation();

		onSelect(newValue);
	};

	const stateProps = {
		emptyProps: {
			label: Liferay.Language.get('there-are-no-form-views-yet'),
		},
		errorProps: {
			children: (
				<ClayButton displayType="link" onClick={doFetch} small>
					{Liferay.Language.get('retry')}
				</ClayButton>
			),
			label: Liferay.Language.get('failed-to-retrieve-form-views'),
		},
		loadingProps: {
			label: Liferay.Language.get('retrieving-all-form-views'),
		},
	};

	return (
		<>
			<DropDownWithSearch
				dropDownWidth={dropDownWidth}
				{...fetchState}
				items={items}
				label={label}
				setDropDownWidth={setDropDownWidth}
				stateProps={stateProps}
				trigger={
					<ClayButton
						className="clearfix w-100"
						displayType="secondary"
						ref={(element) => {
							selectRef.current = element;
						}}
					>
						<span className="float-left">
							{selectedValue || label}
						</span>

						<ClayIcon
							className="dropdown-button-asset float-right"
							symbol="caret-bottom"
						/>
					</ClayButton>
				}
			>
				<DropDownWithSearchItems
					emptyResultMessage={Liferay.Language.get(
						'no-form-views-found-with-this-name-try-searching-again-with-a-different-name'
					)}
					onSelect={handleOnSelect}
				/>
			</DropDownWithSearch>
		</>
	);
};
