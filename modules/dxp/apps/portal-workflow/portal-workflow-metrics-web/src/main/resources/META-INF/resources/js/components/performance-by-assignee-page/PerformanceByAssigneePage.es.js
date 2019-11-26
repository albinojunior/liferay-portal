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

import React, {useMemo} from 'react';

import PromisesResolver from '../../shared/components/request/PromisesResolver.es';
import {parse} from '../../shared/components/router/queryString.es';
import {useFetch} from '../../shared/hooks/useFetch.es';
import {useFilter} from '../../shared/hooks/useFilter.es';
import {useProcessTitle} from '../../shared/hooks/useProcessTitle.es';
import {Body} from './PerformanceByAssigneePageBody.es';
import {Header} from './PerformanceByAssigneePageHeader.es';

const PerformanceByAssigneePage = ({query, routeParams}) => {
	const {processId} = routeParams;
	useProcessTitle(processId, Liferay.Language.get('performance-by-assignee'));

	const {search = ''} = parse(query);
	const keywords = search.length ? search : null;

	const filterKeys = ['processStep', 'roles'];

	const {
		dispatch,
		filterValues: {roleIds, taskKeys},
		selectedFilters
	} = useFilter(filterKeys);

	const filtered = search.length > 0 || selectedFilters.length > 0;

	const {data, fetchData} = useFetch(
		`/processes/${processId}/assignee-users`,
		{
			completed: true,
			keywords,
			roleIds,
			taskKeys,
			...routeParams
		}
	);

	const promises = useMemo(() => [fetchData()], [fetchData]);

	return (
		<PromisesResolver promises={promises}>
			<PerformanceByAssigneePage.Header
				dispatch={dispatch}
				routeParams={{...routeParams, search: keywords}}
				selectedFilters={selectedFilters}
				totalCount={data.totalCount}
			/>
			<PerformanceByAssigneePage.Body data={data} filtered={filtered} />
		</PromisesResolver>
	);
};

PerformanceByAssigneePage.Body = Body;
PerformanceByAssigneePage.Header = Header;

export default PerformanceByAssigneePage;
