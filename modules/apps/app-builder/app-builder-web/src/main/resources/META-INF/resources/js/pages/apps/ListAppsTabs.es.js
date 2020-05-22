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
import React, {Suspense, lazy, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import {AppContext} from '../../AppContext.es';
import NavigationBar from '../../components/navigation-bar/NavigationBar.es';
import useLoader from '../../hooks/useLoader.es';

export default (props) => {
	const {appsTabs} = useContext(AppContext);

	const tabs = Object.keys(appsTabs).map((key) => ({
		...appsTabs[key],
		key,
	}));

	const loadModule = useLoader();

	const {tab} = props.match.params;

	if (!tab) {
		const initialTabKey = tabs[0] ? tabs[0].key : 'standard';

		return <Redirect to={`/${initialTabKey}`} />;
	}

	const TabContent = lazy(() => loadModule(tab, appsTabs[tab].entryPoint));

	return (
		<>
			<NavigationBar
				tabs={tabs.map(({key, label}) => ({
					active: tab === key,
					label,
					path: () => `/${key}`,
				}))}
			/>

			<Suspense fallback={<ClayLoadingIndicator />}>
				<TabContent {...{...props, ...appsTabs[tab]}} />
			</Suspense>
		</>
	);
};
