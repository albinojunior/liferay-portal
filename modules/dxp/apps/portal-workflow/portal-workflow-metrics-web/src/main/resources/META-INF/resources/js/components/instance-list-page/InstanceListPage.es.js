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

import React, {useMemo, useState} from 'react';

import EmptyState from '../../shared/components/list/EmptyState.es';
import ReloadButton from '../../shared/components/list/ReloadButton.es';
import LoadingState from '../../shared/components/loading/LoadingState.es';
import PaginationBar from '../../shared/components/pagination/PaginationBar.es';
import PromisesResolver from '../../shared/components/promises-resolver/PromisesResolver.es';
import {parse} from '../../shared/components/router/queryString.es';
import {useFetch} from '../../shared/hooks/useFetch.es';
import {useFilter} from '../../shared/hooks/useFilter.es';
import {useProcessTitle} from '../../shared/hooks/useProcessTitle.es';
import {processStatusConstants} from '../filter/ProcessStatusFilter.es';
import {isValidDate} from '../filter/util/timeRangeUtil.es';
import {Filters} from './InstanceListPageFilters.es';
import {ItemDetail} from './InstanceListPageItemDetail.es';
import {Table} from './InstanceListPageTable.es';
import {ModalContext} from './modal/ModalContext.es';
import {SingleReassignModal} from './modal/single-reassign/SingleReassignModal.es';
import {InstanceListProvider} from './store/InstanceListPageStore.es';

const InstanceListPage = ({query, routeParams}) => {
	const {page, pageSize, processId} = routeParams;
	const [singleModal, setSingleModal] = useState({
		selectedItem: undefined,
		visible: false
	});

	useProcessTitle(processId, Liferay.Language.get('all-items'));

	const filterKeys = [
		'assignee',
		'processStep',
		'processStatus',
		'slaStatus',
		'timeRange'
	];

	const {
		dispatch,
		filterState: {timeRange},
		filterValues: {assigneeUserIds, slaStatuses, statuses = [], taskKeys},
		selectedFilters
	} = useFilter(filterKeys);

	const {dateEnd, dateStart} =
		timeRange && timeRange.length ? timeRange[0] : {};

	let timeRangeParams = {};

	if (
		statuses.some(status => status === processStatusConstants.completed) &&
		isValidDate(dateEnd) &&
		isValidDate(dateStart)
	) {
		timeRangeParams = {
			dateEnd: dateEnd.toISOString(),
			dateStart: dateStart.toISOString()
		};
	}
	const {search = null} = parse(query);
	const {data, fetchData} = useFetch({
		params: {
			assigneeUserIds,
			keywords: search,
			page,
			pageSize,
			slaStatuses,
			statuses,
			taskKeys,
			...timeRangeParams
		},
		url: `/processes/${processId}/instances`
	});

	return (
		<ModalContext.Provider value={{setSingleModal, singleModal}}>
			<InstanceListProvider>
				<InstanceListPage.Header
					dispatch={dispatch}
					filtered={search || selectedFilters.length > 0}
					processId={processId}
					routeParams={routeParams}
					selectedFilters={selectedFilters}
					totalCount={data.totalCount}
				/>

				<InstanceListPage.Body
					data={data}
					fetchData={fetchData}
					filtered={search || selectedFilters.length > 0}
					routeParams={routeParams}
					singleModal={singleModal}
				/>
			</InstanceListProvider>
		</ModalContext.Provider>
	);
};

const Body = ({data, fetchData, filtered, routeParams, singleModal}) => {
	const {items, processId, totalCount} = data;
	const emptyMessageText = filtered
		? Liferay.Language.get('no-results-were-found')
		: Liferay.Language.get(
				'once-there-are-active-processes-metrics-will-appear-here'
		  );
	const errorMessageText = Liferay.Language.get(
		'there-was-a-problem-retrieving-data-please-try-reloading-the-page'
	);

	const promises = useMemo(() => {
		if (!singleModal.visible) {
			return [fetchData()];
		}

		return [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchData, singleModal.visible]);

	return (
		<>
			<div className="container-fluid-1280 mt-4">
				<PromisesResolver promises={promises}>
					<PromisesResolver.Pending>
						<LoadingState />
					</PromisesResolver.Pending>

					<PromisesResolver.Resolved>
						{items && items.length ? (
							<>
								<InstanceListPage.Body.Table items={items} />

								<PaginationBar
									pageCount={items.length}
									{...routeParams}
									totalCount={totalCount}
								/>
							</>
						) : (
							<EmptyState
								className="border-1"
								hideAnimation={false}
								message={emptyMessageText}
								type="not-found"
							/>
						)}
					</PromisesResolver.Resolved>

					<PromisesResolver.Rejected>
						<EmptyState
							actionButton={<ReloadButton />}
							className="border-1"
							hideAnimation={true}
							message={errorMessageText}
							messageClassName="small"
							type="error"
						/>
					</PromisesResolver.Rejected>
				</PromisesResolver>
			</div>
			<InstanceListPage.SingleReassignModal />
			<ItemDetail processId={processId} />
		</>
	);
};

const Header = ({
	dispatch,
	filtered,
	routeParams,
	selectedFilters,
	totalCount
}) => {
	return (
		<Filters
			dispatch={dispatch}
			filtered={filtered}
			routeParams={routeParams}
			selectedFilters={selectedFilters}
			totalCount={totalCount}
		/>
	);
};

Body.Table = Table;
InstanceListPage.Body = Body;
InstanceListPage.Header = Header;
InstanceListPage.SingleReassignModal = SingleReassignModal;

export default InstanceListPage;
