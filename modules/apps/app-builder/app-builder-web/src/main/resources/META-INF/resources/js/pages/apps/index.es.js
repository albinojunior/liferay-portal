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

import ClayLoadingIndicator from '@clayui/loading-indicator';
import {ClayModalProvider} from '@clayui/modal';
import React, {Suspense, lazy} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {AppContextProvider} from '../../AppContext.es';
import useLoader from '../../hooks/useLoader.es';
import ListAppsTabs from './ListAppsTabs.es';

export default (props) => {
	const editRoutes = [];

	const loadModule = useLoader();

	Object.values(props.appsTabs).forEach(({editEntryPoint, scope}) => {
		editRoutes.push({
			component: (props) => {
				const Component = lazy(() => loadModule(scope, editEntryPoint));

				return (
					<Suspense fallback={<ClayLoadingIndicator />}>
						<Component {...props} />
					</Suspense>
				);
			},
			path: scope,
		});
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
