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

import EmptyState from '../../../shared/components/empty-state/EmptyState.es';
import ReloadButton from '../../../shared/components/list/ReloadButton.es';
import LoadingState from '../../../shared/components/loading/LoadingState.es';
import PaginationBar from '../../../shared/components/pagination-bar/PaginationBar.es';
import PromisesResolver from '../../../shared/components/promises-resolver/PromisesResolver.es';
import {Table} from './SLAListPageTable.es';

const Body = ({items, page, pageSize, totalCount}) => {
	const emptyMessageText = Liferay.Language.get(
		'sla-allows-to-define-and-measure-process-performance'
	);
	const errorMessageText = Liferay.Language.get(
		'there-was-a-problem-retrieving-data-please-try-reloading-the-page'
	);

	return (
		<>
			<PromisesResolver.Pending>
				<LoadingState />
			</PromisesResolver.Pending>

			<PromisesResolver.Resolved>
				{totalCount ? (
					<>
						<Table items={items} />

						<PaginationBar
							page={page}
							pageSize={pageSize}
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
					hideAnimation={true}
					message={errorMessageText}
					messageClassName="small"
					type="error"
				/>
			</PromisesResolver.Rejected>
		</>
	);
};

export {Body};
