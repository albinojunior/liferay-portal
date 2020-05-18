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
import {useResource} from '@clayui/data-provider';
import ClayIcon from '@clayui/icon';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {AppContext} from '../../AppContext.es';
import Popover from '../../components/popover/Popover.es';
import isClickOutside from '../../utils/clickOutside.es';
import {addItem, getURL} from '../../utils/client.es';
import CustomObjectPopover from '../custom-object/CustomObjectPopover.es';
import DropDownWithSearch from './drop-down/DropDownWithSearch.es';

const EmptyState = ({customObjectButtonRef, handleOnClick}) => {
	return (
		<div className="empty-state-dropdown-menu">
			<label className="font-weight-light text-secondary">
				{Liferay.Language.get(
					'no-objects-yet-create-your-first-object'
				)}
			</label>

			<ClayButton
				className="emptyButton"
				displayType="secondary"
				onClick={handleOnClick}
				ref={customObjectButtonRef}
			>
				{Liferay.Language.get('new-custom-object')}
			</ClayButton>
		</div>
	);
};

const ListAppsPopover = ({
	alignElement,
	forwardRef,
	history,
	onCancel,
	setVisible,
	visible,
}) => {
	const {basePortletURL} = useContext(AppContext);
	const customObjectButtonRef = useRef();
	const popoverRef = useRef();
	const [fetchStatuses, setFetchStatuses] = useState([]);
	const [isPopoverVisible, setPopoverVisible] = useState(false);
	const [items, setItems] = useState([]);

	const [selectedValue, setSelectedValue] = useState({
		id: undefined,
		name: undefined,
	});
	const {id: customObjectId, name: customObjectName} = selectedValue;

	const onContinue = () => {
		history.push(`/standard/deploy/${customObjectId}`);
	};

	const ENDPOINT_APP_BUILDER =
		'/o/data-engine/v2.0/data-definitions/by-content-type/app-builder';
	const ENDPOINT_NATIVE_OBJECTS =
		'/o/data-engine/v2.0/data-definitions/by-content-type/native-object';

	const variables = {keywords: '', page: -1, pageSize: -1, sort: ''};

	const {
		refetch: refetchAppBuilder,
		resource: appBuilderResource = {items: []},
	} = useResource({
		fetchDelay: 0,
		fetchOptions: {
			credentials: 'same-origin',
			method: 'GET',
		},
		link: getURL(ENDPOINT_APP_BUILDER),
		onNetworkStatusChange: (status) =>
			setFetchStatuses(
				fetchStatuses[0] ? fetchStatuses.splice(0, 1, status) : [status]
			),
		variables,
	});

	const {
		refetch: refetchNative,
		resource: nativeObjectsResource = {items: []},
	} = useResource({
		fetchDelay: 0,
		fetchOptions: {
			credentials: 'same-origin',
			method: 'GET',
		},
		link: getURL(ENDPOINT_NATIVE_OBJECTS),
		onNetworkStatusChange: (status) =>
			setFetchStatuses(
				fetchStatuses[1]
					? fetchStatuses.splice(1, 1, status)
					: [...fetchStatuses, status]
			),
		variables,
	});

	const refetch = () => {
		refetchAppBuilder();
		refetchNative();
	};

	useEffect(() => {
		if (appBuilderResource && nativeObjectsResource) {
			setItems(
				[
					...appBuilderResource.items,
					...nativeObjectsResource.items,
				].sort((a, b) => a - b)
			);
		}
	}, [appBuilderResource, nativeObjectsResource]);

	const handleOnSelect = (event, selectedValue) => {
		event.stopPropagation();

		setSelectedValue(selectedValue);
	};

	const handleOnSubmit = ({isAddFormView, name}) => {
		const addURL = `/o/data-engine/v2.0/data-definitions/by-content-type/app-builder`;

		addItem(addURL, {
			availableLanguageIds: ['en_US'],
			dataDefinitionFields: [],
			name: {
				value: name,
			},
		}).then(({id}) => {
			if (isAddFormView) {
				Liferay.Util.navigate(
					Liferay.Util.PortletURL.createRenderURL(basePortletURL, {
						dataDefinitionId: id,
						isAppsPortlet: true,
						mvcRenderCommandName: '/edit_form_view',
						newCustomObject: true,
					})
				);
			}
		});
	};

	const emptyStateOnClick = () => {
		setVisible(false);
		setPopoverVisible(!isPopoverVisible);
	};

	useEffect(() => {
		const handler = ({target}) => {
			const isOutside = isClickOutside(
				target,
				customObjectButtonRef.current,
				popoverRef.current
			);

			if (isOutside) {
				setPopoverVisible(false);
			}
		};

		window.addEventListener('click', handler);

		return () => window.removeEventListener('click', handler);
	}, [popoverRef]);

	return (
		<>
			<Popover
				alignElement={alignElement}
				className="apps-popover mw-100"
				content={() => (
					<>
						<label>{Liferay.Language.get('object')}</label>

						<DropDownWithSearch
							dropDownStateProps={{
								empty: {
									emptyState: () => (
										<EmptyState
											customObjectButtonRef={
												customObjectButtonRef
											}
											handleOnClick={emptyStateOnClick}
										/>
									),
								},
								error: {
									errorLabel: Liferay.Language.get(
										'failed-to-retrieve-objects'
									),
									retryHandler: refetch,
								},
								loading: {
									loadingLabel: Liferay.Language.get(
										'retrieving-all-objects'
									),
								},
							}}
							fetchStatuses={fetchStatuses}
							items={items}
							label={Liferay.Language.get('select-object')}
							onSelect={handleOnSelect}
							trigger={
								<ClayButton
									className="clearfix w-100"
									displayType="secondary"
								>
									<span className="float-left">
										{customObjectName ||
											Liferay.Language.get(
												'select-object'
											)}
									</span>

									<ClayIcon
										className="float-right icon"
										symbol="caret-bottom"
									/>
								</ClayButton>
							}
						/>
					</>
				)}
				footer={() => (
					<div className="border-top mt-3 p-3" style={{width: 450}}>
						<div className="d-flex justify-content-end">
							<ClayButton
								className="mr-3"
								displayType="secondary"
								onClick={() => {
									setSelectedValue({});

									onCancel();
								}}
								small
							>
								{Liferay.Language.get('cancel')}
							</ClayButton>

							<ClayButton
								disabled={!customObjectId}
								onClick={() => {
									onContinue(customObjectId);
								}}
								small
							>
								{Liferay.Language.get('continue')}
							</ClayButton>
						</div>
					</div>
				)}
				ref={forwardRef}
				showArrow={false}
				title={() => (
					<>
						<h4 className="mb-3">
							{Liferay.Language.get('new-app')}
						</h4>

						<span className="font-weight-light text-secondary">
							{Liferay.Language.get(
								'create-an-app-to-manage-the-data-of-an-object'
							)}
						</span>
					</>
				)}
				visible={visible}
			/>

			<CustomObjectPopover
				alignElement={alignElement}
				onCancel={() => {
					setPopoverVisible(false);
				}}
				onSubmit={handleOnSubmit}
				ref={popoverRef}
				visible={isPopoverVisible}
			/>
		</>
	);
};

export default React.forwardRef((props, ref) => (
	<ListAppsPopover {...props} forwardRef={ref} />
));
