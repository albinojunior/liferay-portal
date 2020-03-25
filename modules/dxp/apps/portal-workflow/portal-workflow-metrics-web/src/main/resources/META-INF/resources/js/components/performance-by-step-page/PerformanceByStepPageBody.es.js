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

import ReloadButton from '../../shared/components/list/ReloadButton.es';
import {PageBody} from '../../shared/components/page/PageBody.es';
import PaginationBar from '../../shared/components/pagination-bar/PaginationBar.es';
import {Table} from './PerformanceByStepPageTable.es';

const Body = ({data, filtered}) => {
	const {items, page, pageSize, totalCount} = data;

	const states = useMemo(
		() => ({
			emptyState: {
				emptyMessage: filtered
					? Liferay.Language.get('no-results-were-found')
					: Liferay.Language.get('there-is-no-data-at-the-moment'),
				emptyType: filtered ? 'not-found' : 'empty',
			},
			errorState: {
				actionButton: <ReloadButton />,
				hideAnimation: true,
				message: Liferay.Language.get(
					'there-was-a-problem-retrieving-data-please-try-reloading-the-page'
				),
			},
			loadingState: {className: 'border-0 pb-6 pt-6 sheet'},
		}),
		[filtered]
	);

	const bodyContent = useMemo(
		() =>
			items &&
			items.length > 0 && (
				<>
					<Body.Table items={items} />
					<PaginationBar
						page={page}
						pageBuffer={3}
						pageSize={pageSize}
						totalCount={totalCount}
					/>
				</>
			),
		[items, page, pageSize, totalCount]
	);

	return (
		<PageBody
			bodyContent={bodyContent}
			className="workflow-process-dashboard"
			data-testid="performanceByStepBody"
			states={states}
		/>
	);
};

Body.Table = Table;

export {Body};
