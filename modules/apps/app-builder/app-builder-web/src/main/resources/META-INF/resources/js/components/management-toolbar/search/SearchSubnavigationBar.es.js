/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {ClayResultsBar} from '@clayui/management-toolbar';
import React, {useContext} from 'react';

import lang from '../../../utils/lang.es';
import Button from '../../button/Button.es';
import SearchContext from './SearchContext.es';

export default ({isLoading, totalCount}) => {
	const [{keywords}, dispatch] = useContext(SearchContext);

	if (keywords && !isLoading) {
		return (
			<ClayResultsBar>
				<ClayResultsBar.Item expand>
					<span className="component-text text-truncate-inline">
						<span className="text-truncate">
							{lang.sub(Liferay.Language.get('x-results-for-x'), [
								totalCount,
								keywords,
							])}
						</span>
					</span>
				</ClayResultsBar.Item>
				<ClayResultsBar.Item>
					<Button
						className="component-link tbar-link"
						displayType="unstyled"
						onClick={() =>
							dispatch({
								keywords: '',
								type: 'SEARCH',
							})
						}
					>
						Clear
					</Button>
				</ClayResultsBar.Item>
			</ClayResultsBar>
		);
	}

	return <></>
};
