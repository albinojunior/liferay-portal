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

import filterConstants from '../../shared/components/filter/util/filterConstants.es';
import ResultsBar from '../../shared/components/results-bar/ResultsBar.es';
import AssigneeFilter from '../filter/AssigneeFilter.es';
import ProcessStatusFilter, {
	processStatusConstants
} from '../filter/ProcessStatusFilter.es';
import ProcessStepFilter from '../filter/ProcessStepFilter.es';
import SLAStatusFilter from '../filter/SLAStatusFilter.es';
import TimeRangeFilter from '../filter/TimeRangeFilter.es';

const Filters = ({
	dispatch,
	filtered,
	routeParams,
	selectedFilters,
	totalCount
}) => {
	const statusesFilterItem = useMemo(
		() => selectedFilters.find(filter => filter.key === 'statuses'),
		[selectedFilters]
	);
	const {name} = statusesFilterItem ? statusesFilterItem.items[0] : {};
	const completedStatusSelected = useMemo(
		() =>
			selectedFilters.length > 0 && statusesFilterItem
				? name === processStatusConstants.completed
				: false,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[name]
	);

	const selectedFilterItems = useMemo(
		() =>
			selectedFilters.filter(
				filter =>
					completedStatusSelected ||
					filter.key !== filterConstants.timeRange.key
			),
		[completedStatusSelected, selectedFilters]
	);

	return (
		<>
			<nav className="management-bar management-bar-light navbar navbar-expand-md">
				<div className="container-fluid container-fluid-max-xl">
					<ul className="navbar-nav">
						<li className="nav-item">
							<strong className="ml-0 mr-0 navbar-text">
								{Liferay.Language.get('filter-by')}
							</strong>
						</li>

						<SLAStatusFilter
							dispatch={dispatch}
							processId={routeParams.processId}
						/>

						<ProcessStatusFilter
							dispatch={dispatch}
							processId={routeParams.processId}
						/>

						<TimeRangeFilter
							dispatch={dispatch}
							options={{
								withSelectionTitle: false
							}}
							processId={routeParams.processId}
							style={
								completedStatusSelected
									? {display: 'inherit'}
									: {display: 'none'}
							}
						/>

						<ProcessStepFilter
							dispatch={dispatch}
							processId={routeParams.processId}
						/>

						<AssigneeFilter
							dispatch={dispatch}
							processId={routeParams.processId}
						/>
					</ul>
				</div>
			</nav>

			{filtered && statusesFilterItem && (
				<ResultsBar>
					<ResultsBar.TotalCount
						search={routeParams.search}
						totalCount={totalCount}
					/>

					<ResultsBar.FilterItems
						filters={selectedFilterItems}
						{...routeParams}
					/>

					<ResultsBar.Clear
						filters={selectedFilters}
						{...routeParams}
					/>
				</ResultsBar>
			)}
		</>
	);
};

export {Filters};
