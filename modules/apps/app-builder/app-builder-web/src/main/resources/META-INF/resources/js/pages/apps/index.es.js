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

import {ClayModalProvider} from '@clayui/modal';
import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {AppContextProvider} from '../../AppContext.es';
import useLazy from '../../hooks/useLazy.es';
import ListAppsTabs from './ListAppsTabs.es';

export default (props) => {
	const EditPage = useLazy();

	const editRoutes = Object.keys(props.appsTabs).map((tab) => {
		props.appsTabs[tab] = {
			...props.appsTabs[tab],
			editPath: `/${tab}/:dataDefinitionId(\\d+)?/deploy/:appId(\\d+)?`,
		};

		const {editEntryPoint, editPath} = props.appsTabs[tab];

		return {
			component: (props) => (
				<EditPage module={editEntryPoint} props={props} />
			),
			path: editPath,
		};
	});

	return (
		<AppContextProvider {...props}>
			<ClayModalProvider>
				<Router>
					<Switch>
						{editRoutes.map((route, index) => (
							<Route key={index} {...route} />
						))}

						<Route component={ListAppsTabs} path="/:tab?" />
					</Switch>
				</Router>
			</ClayModalProvider>
		</AppContextProvider>
	);
};
