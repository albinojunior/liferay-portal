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

import React from 'react';

import {removeUndefinedValues} from '../../util/object.es';

const withParams = (...components) => ({location: {search}, match: {params}}) =>
	injectRouterProps(components, params, search);

const withDefaultParams = defaultRouteParams => (...components) => ({
	location: {search},
	match: {params}
}) =>
	injectRouterProps(
		components,
		{...defaultRouteParams, ...removeUndefinedValues(params)},
		search
	);

const injectRouterProps = (components, params, search) => {
	return components.map((Component, index) => {
		if (params.sort) params.sort = decodeURIComponent(params.sort);

		return (
			<Component
				{...params}
				key={index}
				query={search}
				routeParams={params}
			/>
		);
	});
};

export {withParams, withDefaultParams};
