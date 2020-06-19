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

import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {AppContext} from '../../AppContext.es';
import Button from '../../components/button/Button.es';
import ListView from '../../components/list-view/ListView.es';
import {Loading} from '../../components/loading/Loading.es';
import useDataListView from '../../hooks/useDataListView.es';
import usePermissions from '../../hooks/usePermissions.es';
import {toQuery, toQueryString} from '../../hooks/useQuery.es';
import {confirmDelete} from '../../utils/client.es';
import {successToast} from '../../utils/toast.es';
import {FieldValuePreview} from './FieldPreview.es';

const ListEntries = withRouter(({history, location}) => {
	const {
		basePortletURL,
		dataDefinitionId,
		dataListViewId,
		showFormView,
	} = useContext(AppContext);

	const {
		columns,
		dataDefinition,
		dataListView: {fieldNames},
		isLoading,
	} = useDataListView(dataListViewId, dataDefinitionId);

	const permissions = usePermissions();

	const getEditURL = (dataRecordId = 0) =>
		Liferay.Util.PortletURL.createRenderURL(basePortletURL, {
			dataRecordId,
			mvcPath: '/edit_entry.jsp',
		});

	const handleEditItem = (dataRecordId) => {
		Liferay.Util.navigate(getEditURL(dataRecordId));
	};

	const actions = [];

	if (showFormView) {
		if (permissions.view) {
			actions.push({
				action: ({viewURL}) => Promise.resolve(history.push(viewURL)),
				name: Liferay.Language.get('view'),
			});
		}

		if (permissions.update) {
			actions.push({
				action: ({id}) => Promise.resolve(handleEditItem(id)),
				name: Liferay.Language.get('edit'),
			});
		}

		if (permissions.delete) {
			actions.push({
				action: (item) =>
					confirmDelete('/o/data-engine/v2.0/data-records/')(
						item
					).then((confirmed) => {
						if (confirmed) {
							successToast(
								Liferay.Language.get('an-entry-was-deleted')
							);
						}

						return Promise.resolve(confirmed);
					}),
				name: Liferay.Language.get('delete'),
			});
		}
	}

	return (
		<Loading isLoading={isLoading}>
			<ListView
				actions={actions}
				addButton={() =>
					showFormView &&
					permissions.add && (
						<Button
							className="nav-btn nav-btn-monospaced"
							onClick={() => handleEditItem(0)}
							symbol="plus"
							tooltip={Liferay.Language.get('new-entry')}
						/>
					)
				}
				columns={columns}
				emptyState={{
					button: () =>
						showFormView &&
						permissions.add && (
							<Button
								displayType="secondary"
								onClick={() => handleEditItem(0)}
							>
								{Liferay.Language.get('new-entry')}
							</Button>
						),
					title: Liferay.Language.get('there-are-no-entries-yet'),
				}}
				endpoint={`/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records`}
				queryParams={{dataListViewId}}
			>
				{(item, index) => {
					const {dataRecordValues = {}, id} = item;
					const query = toQuery(location.search, {
						keywords: '',
						page: 1,
						pageSize: 20,
						sort: '',
					});

					const entryIndex =
						query.pageSize * (query.page - 1) + index + 1;

					const viewURL = `/entries/${entryIndex}?${toQueryString(
						query
					)}`;

					const displayedDataRecordValues = {};

					fieldNames.forEach((fieldName, columnIndex) => {
						let fieldValuePreview = (
							<FieldValuePreview
								dataDefinition={dataDefinition}
								dataRecordValues={dataRecordValues}
								displayType="list"
								fieldName={fieldName}
							/>
						);

						if (columnIndex === 0 && permissions.view) {
							fieldValuePreview = (
								<Link to={viewURL}>{fieldValuePreview}</Link>
							);
						}

						displayedDataRecordValues[
							'dataRecordValues/' + fieldName
						] = fieldValuePreview;
					});

					return {
						...displayedDataRecordValues,
						id,
						viewURL,
					};
				}}
			</ListView>
		</Loading>
	);
});

export default ListEntries;
