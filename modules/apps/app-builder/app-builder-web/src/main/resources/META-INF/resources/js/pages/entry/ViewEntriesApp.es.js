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

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {AppContextProvider} from '../../AppContext.es';
import useLazy from '../../hooks/useLazy.es';
import {PermissionsContextProvider} from './PermissionsContext.es';

export default function (props) {
	const {appTab} = props;
	const {listEntryPoint, viewEntryPoint} = appTab;

	const ListPage = useLazy();
	const ViewPage = useLazy();

	return (
		<div className="app-builder-root">
			<AppContextProvider {...props}>
				<PermissionsContextProvider
					dataDefinitionId={props.dataDefinitionId}
				>
					<Router>
						<Switch>
							<Route
								component={(props) => (
									<ListPage
										module={listEntryPoint}
										props={props}
									/>
								)}
								exact
								path="/"
							/>
							<Route
								component={(props) => (
									<ViewPage
										module={viewEntryPoint}
										props={props}
									/>
								)}
								path="/entries/:entryIndex(\d+)"
							/>
						</Switch>
					</Router>
				</PermissionsContextProvider>
			</AppContextProvider>
		</div>
	);
}
