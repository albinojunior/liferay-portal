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

import PromisesResolver from '../../shared/components/promises-resolver/PromisesResolver.es';
import ActionsList from './ActionsList.es';

const Body = ({data: {items}}) => {
	return (
		<>
			<h1>{Liferay.Language.get('workflow-index-actions')}</h1>

			<Body.ReindexAll />

			<PromisesResolver.Resolved>
				{items.map((item, index) => (
					<Body.Actions key={index} {...item} />
				))}
			</PromisesResolver.Resolved>
		</>
	);
};

const ReindexAll = () => {
	return <div className="sheet sheet-lg"></div>;
};

Body.Actions = ActionsList;
Body.ReindexAll = ReindexAll;

export {Body};
