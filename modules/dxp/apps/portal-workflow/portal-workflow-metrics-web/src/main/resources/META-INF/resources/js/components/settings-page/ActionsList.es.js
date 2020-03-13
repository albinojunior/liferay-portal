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

import ClayButton from '@clayui/button';
import ClayList from '@clayui/list';
import React from 'react';

const ActionsList = ({actions = [], title, handleClick}) => {
	return (
		<ClayList>
			<ClayList.Header>{title}</ClayList.Header>
			{actions.map(({id, label, main}, index) => (
				<ClayList.Item flex key={index}>
					<ClayList.ItemField expand>{label}</ClayList.ItemField>

					<ClayList.ItemField>
						<ClayButton
							displayType="secondary"
							onClick={() => handleClick(id)}
						>
							{main
								? Liferay.Language.get('reindex-all')
								: Liferay.Language.get('reindex')}
						</ClayButton>
					</ClayList.ItemField>
				</ClayList.Item>
			))}
		</ClayList>
	);
};

export default ActionsList;
