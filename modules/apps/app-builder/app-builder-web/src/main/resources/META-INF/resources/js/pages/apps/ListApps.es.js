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
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import {AppContext} from '../../AppContext.es';
import Button from '../../components/button/Button.es';
import ListView from '../../components/list-view/ListView.es';
import useDeployApp from '../../hooks/useDeployApp.es';
import {confirmDelete} from '../../utils/client.es';
import {fromNow} from '../../utils/time.es';
import {
	DEPLOYMENT_ACTION,
	DEPLOYMENT_STATUS,
	DEPLOYMENT_TYPES,
} from './constants.es';
import {concatTypes, isDeployed} from './utils.es';

export default ({
	match: {
		params: {dataDefinitionId},
		url,
	},
}) => {
	const {getStandaloneURL, userId} = useContext(AppContext);
	const {deployApp, undeployApp} = useDeployApp();

	const ACTIONS = [
		{
			action: (item) => {
				return isDeployed(item.appStatusText)
					? undeployApp(item)
					: deployApp(item);
			},
			name: (item) =>
				isDeployed(item.appStatusText)
					? DEPLOYMENT_ACTION.undeploy
					: DEPLOYMENT_ACTION.deploy,
		},
		{
			action: (item) =>
				Promise.resolve(
					window.open(getStandaloneURL(item.id), '_blank')
				),
			name: Liferay.Language.get('open-standalone-app'),
			show: (item) =>
				item.appDeployments.some(
					(deployment) => deployment.type === 'standalone'
				),
		},
		{
			action: confirmDelete('/o/app-builder/v1.0/apps/'),
			name: Liferay.Language.get('delete'),
		},
	];

	let COLUMNS = [
		{
			key: 'name',
			sortable: true,
			value: Liferay.Language.get('name'),
		},
		{
			key: 'type',
			value: Liferay.Language.get('deployed-as'),
		},
		{
			key: 'dateCreated',
			sortable: true,
			value: Liferay.Language.get('create-date'),
		},
		{
			asc: false,
			key: 'dateModified',
			sortable: true,
			value: Liferay.Language.get('modified-date'),
		},
		{
			key: 'appStatus',
			value: Liferay.Language.get('status'),
		},
	];

	let EMPTY_STATE = {
		title: Liferay.Language.get('there-are-no-apps-yet'),
	};

	let ENDPOINT = `/o/app-builder/v1.0/apps`;

	const FILTER_CONFIG = [
		{
			filterItems: [
				{label: DEPLOYMENT_TYPES.productMenu, value: 'productMenu'},
				{label: DEPLOYMENT_TYPES.standalone, value: 'standalone'},
				{label: DEPLOYMENT_TYPES.widget, value: 'widget'},
			],
			filterKey: 'appDeploymentTypes',
			filterName: Liferay.Language.get('deployment-type'),
			multiple: true,
		},
		{
			filterItems: [
				{label: DEPLOYMENT_STATUS.deployed, value: 'true'},
				{label: DEPLOYMENT_STATUS.undeployed, value: 'false'},
			],
			filterKey: 'active',
			filterName: Liferay.Language.get('status'),
		},
		{
			filterItems: [{label: Liferay.Language.get('me'), value: userId}],
			filterKey: 'userIds',
			filterName: Liferay.Language.get('creator'),
			multiple: true,
		},
	];

	if (dataDefinitionId) {
		EMPTY_STATE = {
			...EMPTY_STATE,
			button: () => (
				<Button displayType="secondary" href={`${url}/deploy`}>
					{Liferay.Language.get('new-app')}
				</Button>
			),
			description: Liferay.Language.get(
				'select-the-form-and-table-view-you-want-and-deploy-your-app-as-a-widget-standalone-or-place-it-in-the-product-menu'
			),
		};

		ENDPOINT = `/o/app-builder/v1.0/data-definitions/${dataDefinitionId}/apps`;
	}
	else {
		const [firstColumn, ...otherColumns] = COLUMNS;

		COLUMNS = [
			firstColumn,
			{key: 'dataDefinitionName', value: Liferay.Language.get('object')},
			...otherColumns,
		];
	}

	return (
		<ListView
			actions={ACTIONS}
			addButton={
				dataDefinitionId &&
				(() => (
					<Button
						className="nav-btn nav-btn-monospaced"
						href={`${url}/deploy`}
						symbol="plus"
						tooltip={Liferay.Language.get('new-app')}
					/>
				))
			}
			columns={COLUMNS}
			emptyState={EMPTY_STATE}
			endpoint={ENDPOINT}
			filterConfig={!dataDefinitionId ? FILTER_CONFIG : []}
		>
			{(item) => ({
				...item,
				appStatus: (
					<ClayLabel
						displayType={
							isDeployed(item.appStatus.toLowerCase())
								? 'success'
								: 'secondary'
						}
					>
						{DEPLOYMENT_STATUS[item.appStatus.toLowerCase()]}
					</ClayLabel>
				),
				appStatusText: item.appStatus.toLowerCase(),
				dateCreated: fromNow(item.dateCreated),
				dateModified: fromNow(item.dateModified),
				name: dataDefinitionId ? (
					<Link
						to={`/custom-object/${dataDefinitionId}/apps/${item.id}`}
					>
						{item.name.en_US}
					</Link>
				) : (
					item.name.en_US
				),
				nameText: item.name.en_US,
				type: concatTypes(
					item.appDeployments.map((deployment) => deployment.type)
				),
			})}
		</ListView>
	);
};
