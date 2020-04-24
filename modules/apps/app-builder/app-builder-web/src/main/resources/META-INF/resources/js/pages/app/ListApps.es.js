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
import {confirmDelete} from '../../utils/client.es';
import {fromNow} from '../../utils/time.es';
import {DEPLOYMENT_ACTION, DEPLOYMENT_STATUS} from './DeploymentConstants.es';
import useDeploymentActions from './hooks/useDeploymentActions.es';
import {concatTypes, isDeployed} from './util/appUtil.es';

const COLUMNS = [
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
		key: 'status',
		value: Liferay.Language.get('status'),
	},
];

export default ({
	match: {
		params: {dataDefinitionId},
		url,
	},
}) => {
	const {getStandaloneURL} = useContext(AppContext);
	const {deployApp, openUndeployAppModal} = useDeploymentActions();

	const ACTIONS = [
		{
			action: item => {
				return isDeployed(item.statusText)
					? openUndeployAppModal(item)
					: deployApp(item);
			},
			name: item =>
				isDeployed(item.statusText)
					? DEPLOYMENT_ACTION.undeploy
					: DEPLOYMENT_ACTION.deploy,
		},
		{
			action: item =>
				Promise.resolve(
					window.open(getStandaloneURL(item.id), '_blank')
				),
			name: Liferay.Language.get('open-standalone-app'),
			show: item =>
				item.appDeployments.some(
					deployment => deployment.type === 'standalone'
				),
		},
		{
			action: confirmDelete('/o/app-builder/v1.0/apps/'),
			name: Liferay.Language.get('delete'),
		},
	];

	const EMPTY_STATE = {
		button: () => (
			<Button displayType="secondary" href={`${url}/deploy`}>
				{Liferay.Language.get('new-app')}
			</Button>
		),
		description: Liferay.Language.get(
			'select-the-form-and-table-view-you-want-and-deploy-your-app-as-a-widget-standalone-or-place-it-in-the-product-menu'
		),
		title: Liferay.Language.get('there-are-no-apps-yet'),
	};

	return (
		<ListView
			actions={ACTIONS}
			addButton={() => (
				<Button
					className="nav-btn nav-btn-monospaced"
					href={`${url}/deploy`}
					symbol="plus"
					tooltip={Liferay.Language.get('new-app')}
				/>
			)}
			columns={COLUMNS}
			emptyState={EMPTY_STATE}
			endpoint={`/o/app-builder/v1.0/data-definitions/${dataDefinitionId}/apps`}
		>
			{item => ({
				...item,
				dateCreated: fromNow(item.dateCreated),
				dateModified: fromNow(item.dateModified),
				name: (
					<Link
						to={`/custom-object/${dataDefinitionId}/apps/${item.id}`}
					>
						{item.name.en_US}
					</Link>
				),
				nameText: item.name.en_US,
				status: (
					<ClayLabel
						displayType={
							isDeployed(item.status.toLowerCase())
								? 'success'
								: 'secondary'
						}
					>
						{DEPLOYMENT_STATUS[item.status.toLowerCase()]}
					</ClayLabel>
				),
				statusText: item.status.toLowerCase(),
				type: concatTypes(
					item.appDeployments.map(deployment => deployment.type)
				),
			})}
		</ListView>
	);
};
