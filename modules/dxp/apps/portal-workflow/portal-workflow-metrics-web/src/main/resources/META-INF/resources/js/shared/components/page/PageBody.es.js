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

import EmptyState from '../empty-state/EmptyState.es';
import LoadingState from '../loading/LoadingState.es';
import PromisesResolver from '../promises-resolver/PromisesResolver.es';

const PageBody = ({bodyContent, states, ...otherProps}) => {
	const {emptyState, errorState, loadingState} = states;
	const {className, ...pageProps} = otherProps;
	const currentState = bodyContent || <PageBody.EmptyView {...emptyState} />;

	return (
		<div
			className={`container-fluid-1280 mt-4 ${className}`}
			{...pageProps}
		>
			<PromisesResolver.Pending>
				<PageBody.LoadingView {...loadingState} />
			</PromisesResolver.Pending>

			<PromisesResolver.Resolved>
				{currentState}
			</PromisesResolver.Resolved>

			<PromisesResolver.Rejected>
				<PageBody.ErrorView {...errorState} />
			</PromisesResolver.Rejected>
		</div>
	);
};

const EmptyView = ({emptyMessage, emptyType}) => {
	return <EmptyState message={emptyMessage} type={emptyType} />;
};

const ErrorView = ({actionButton, hideAnimation, message}) => {
	return (
		<EmptyState
			actionButton={actionButton}
			hideAnimation={hideAnimation}
			message={message}
		/>
	);
};

const LoadingView = ({className}) => {
	return <LoadingState className={className} />;
};

PageBody.EmptyView = EmptyView;
PageBody.ErrorView = ErrorView;
PageBody.LoadingView = LoadingView;

export {PageBody};
