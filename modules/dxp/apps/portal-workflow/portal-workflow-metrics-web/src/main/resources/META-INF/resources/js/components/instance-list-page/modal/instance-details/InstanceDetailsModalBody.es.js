/* eslint-disable react-hooks/exhaustive-deps */
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

import ClayIcon from '@clayui/icon';
import ClayModal from '@clayui/modal';
import React from 'react';

import EmptyState from '../../../../shared/components/empty-state/EmptyState.es';
import ReloadButton from '../../../../shared/components/list/ReloadButton.es';
import LoadingState from '../../../../shared/components/loading/LoadingState.es';
import PromisesResolver from '../../../../shared/components/promises-resolver/PromisesResolver.es';
import moment from '../../../../shared/util/moment.es';
import {Item} from './InstanceDetailsModalItem.es';

const Body = ({
	assetTitle,
	assetType,
	assigneeUsers,
	creatorUser,
	dateCompletion,
	dateCreated,
	id,
	slaResults = [],
	status,
	taskNames = [],
}) => {
	const completed = status === 'Completed';
	const slaOpen = slaResults.filter(({status}) =>
		['Running', 'Paused'].includes(status)
	);
	const slaResolved = slaResults.filter(({status}) => status === 'Stopped');

	return (
		<ClayModal.Body>
			<PromisesResolver.Pending>
				<Body.Loading />
			</PromisesResolver.Pending>

			<PromisesResolver.Resolved>
				<Body.SectionTitle>
					{Liferay.Language.get('due-date-by-sla')}
				</Body.SectionTitle>

				{slaResults.length === 0 && (
					<p>
						<span className="font-weight-medium text-muted">
							{Liferay.Language.get(
								'no-sla-records-for-this-item'
							)}
						</span>
					</p>
				)}

				{!!slaOpen.length && (
					<Body.SectionSubTitle>
						{`${Liferay.Language.get('open').toUpperCase()} (${
							slaOpen.length
						})`}
					</Body.SectionSubTitle>
				)}

				{slaOpen.map(item => (
					<Body.Item key={item.id} {...item} />
				))}

				{!!slaResolved.length && (
					<Body.SectionSubTitle>
						{`${Liferay.Language.get('resolved').toUpperCase()} (${
							slaResolved.length
						})`}
					</Body.SectionSubTitle>
				)}

				{slaResolved.map(item => (
					<Body.Item key={item.id} {...item} />
				))}

				<Body.SectionTitle className="mt-5">
					{Liferay.Language.get('process-details')}
				</Body.SectionTitle>

				<Body.SectionAttribute
					description={Liferay.Language.get('process-status')}
					detail={status}
				/>

				<Body.SectionAttribute
					description={Liferay.Language.get('created-by')}
					detail={creatorUser ? creatorUser.name : ''}
				/>

				{!!dateCreated && (
					<Body.SectionAttribute
						description={Liferay.Language.get('creation-date')}
						detail={moment
							.utc(dateCreated)
							.format(Liferay.Language.get('mmm-dd-yyyy-lt'))}
					/>
				)}

				<Body.SectionAttribute
					description={Liferay.Language.get('asset-type')}
					detail={assetType}
				/>

				<Body.SectionAttribute
					description={Liferay.Language.get('asset-title')}
					detail={assetTitle}
				/>

				{!completed && (
					<Body.SectionAttribute
						description={Liferay.Language.get('current-step')}
						detail={taskNames.join(', ')}
					/>
				)}

				{completed && !!dateCompletion && (
					<Body.SectionAttribute
						description={Liferay.Language.get('end-date')}
						detail={moment
							.utc(dateCompletion)
							.format(Liferay.Language.get('mmm-dd-yyyy-lt'))}
					/>
				)}

				{!completed && (
					<Body.SectionAttribute
						description={Liferay.Language.get('current-assignee')}
						detail={
							assigneeUsers && assigneeUsers.length
								? assigneeUsers
										.map(user => user.name)
										.join(', ')
								: Liferay.Language.get('unassigned')
						}
					/>
				)}

				<a
					className="btn btn-secondary btn-sm font-weight-medium mb-1 mt-3"
					data-testid="submissionPageButton"
					href={`/group/control_panel/manage/-/workflow_instance/view/${id}`}
					target="_blank"
				>
					{Liferay.Language.get('go-to-submission-page')}

					<span className="inline-item inline-item-after">
						<ClayIcon symbol="shortcut" />
					</span>
				</a>
			</PromisesResolver.Resolved>

			<PromisesResolver.Rejected>
				<Body.Error />
			</PromisesResolver.Rejected>
		</ClayModal.Body>
	);
};

const ErrorView = () => {
	return (
		<EmptyState
			actionButton={<ReloadButton />}
			className="border-0 mb-5"
			hideAnimation={true}
			message={Liferay.Language.get(
				'there-was-a-problem-retrieving-data-please-try-reloading-the-page'
			)}
			messageClassName="small"
		/>
	);
};

const LoadingView = () => {
	return <LoadingState className="border-0 mt-8 pb-5 pt-5 sheet" />;
};

const SectionTitle = ({children, className = ''}) => {
	const classNames = `${className} font-weight-medium mb-4`;

	return <h4 className={classNames}>{children}</h4>;
};

const SectionSubTitle = ({children}) => {
	return (
		<h5
			className="font-weight-medium mb-4 mt-4 text-secondary"
			data-testid="instanceSectionSubTitle"
		>
			{children}
		</h5>
	);
};

const SectionAttribute = ({description, detail}) => {
	return (
		<p className="row">
			<span className="col-2 font-weight-medium small text-secondary">
				{`${description} `}
			</span>

			<span className="col small" data-testid="instanceDetailSpan">
				{detail}
			</span>
		</p>
	);
};

Body.Error = ErrorView;
Body.Item = Item;
Body.Loading = LoadingView;
Body.SectionTitle = SectionTitle;
Body.SectionSubTitle = SectionSubTitle;
Body.SectionAttribute = SectionAttribute;

export {Body};
