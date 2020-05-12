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

import {useContext} from 'react';

import {useFilter} from '../../../../../../shared/hooks/useFilter.es';
import {usePost} from '../../../../../../shared/hooks/usePost.es';
import {AppContext} from '../../../../../AppContext.es';
import {InstanceListContext} from '../../../../InstanceListPageProvider.es';
import {ModalContext} from '../../../ModalProvider.es';

const useFetchTasks = (options = {}) => {
	const {
		dispatch,
		filterValues: {bulkAssigneeIds: userIds = [], bulkTaskNames: taskNames},
	} = useFilter({withoutRouteParams: true});

	const {userId} = useContext(AppContext);
	const {selectAll, selectedItems} = useContext(InstanceListContext);
	const {processId} = useContext(ModalContext);

	const clearFilters = () => {
		dispatch({
			bulkAssigneeIds: [],
			bulkTaskNames: [],
		});
	};

	const unassigned = userIds.includes('-1');

	const assignees = !unassigned ? [userId] : [];
	const assigneeIds = userIds.length
		? userIds.filter((id) => id !== '-1')
		: assignees;

	const body = {
		assigneeIds,
		completed: false,
		processId,
		taskNames,
	};

	if (!selectAll) {
		body.instanceIds = selectedItems.map(({id}) => id);
	}

	const {page = 1, pageSize = -1} = options;

	const {data, postData: fetchTasks} = usePost({
		body,
		params: {
			page,
			pageSize,
			sort: 'instanceId:asc',
		},
		url: '/tasks',
	});

	return {clearFilters, data, fetchTasks};
};

export {useFetchTasks};
