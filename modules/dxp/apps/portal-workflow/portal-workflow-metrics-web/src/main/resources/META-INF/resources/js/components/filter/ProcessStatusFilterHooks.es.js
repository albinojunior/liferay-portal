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

import Filter from '../../shared/components/filter/Filter.es';
import {useFilterName} from '../../shared/components/filter/hooks/useFilterName.es';
import {useFilterStatic} from '../../shared/components/filter/hooks/useFilterStatic.es';

const processStatuses = [
	{
		key: processStatusConstants.completed,
		name: Liferay.Language.get('completed')
	},
	{
		key: processStatusConstants.pending,
		name: Liferay.Language.get('pending')
	}
];

const ProcessStatusFilter = ({
	className,
	dispatch,
	filterKey = 'statuses',
	options: {
		hideControl = false,
		multiple = true,
		position = 'left',
		withSelectionTitle = false
	} = {}
}) => {
	const {items, selectedItems} = useFilterStatic(
		dispatch,
		filterKey,
		processStatuses
	);

	const filterName = useFilterName(
		multiple,
		selectedItems,
		Liferay.Language.get('process-status'),
		withSelectionTitle
	);

	return (
		<Filter
			defaultItem={items[0]}
			elementClasses={className}
			filterKey={filterKey}
			hideControl={hideControl}
			items={items}
			multiple={multiple}
			name={filterName}
			position={position}
		/>
	);
};

const processStatusConstants = {
	completed: 'Completed',
	pending: 'Pending'
};

export default ProcessStatusFilter;
export {processStatusConstants};
