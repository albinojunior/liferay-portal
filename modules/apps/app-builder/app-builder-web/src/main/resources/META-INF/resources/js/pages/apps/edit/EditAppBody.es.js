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

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import React, {useContext} from 'react';

import {AppContext} from '../../../AppContext.es';
import MultiStepNav from '../../../components/multi-step-nav/MultiStepNav.es';
import DeployApp from './DeployApp.es';
import EditAppContext, {
	UPDATE_DATA_LAYOUT_ID,
	UPDATE_DATA_LIST_VIEW_ID,
	UPDATE_WORKFLOW_PROCESS_ID,
} from './EditAppContext.es';
import EditAppStepContent from './EditAppStepContent.es';

const EditAppBody = ({currentStep, dataDefinitionId, defaultLanguageId}) => {
	const {workflowProcessBuilderPortletURL} = useContext(AppContext);
	const {
		dispatch,
		state: {
			app: {dataLayoutId, dataListViewId, workflowDefinitionName},
		},
	} = useContext(EditAppContext);

	const dispatchSelection = (type) => (item) => {
		dispatch({
			...item,
			type,
		});
	};

	const stepProps = [
		{
			emptyState: {
				description: Liferay.Language.get(
					'create-one-or-more-forms-to-display-the-data-held-in-your-data-object'
				),
				title: Liferay.Language.get('there-are-no-form-views-yet'),
			},
			endpoint: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts`,
			itemId: dataLayoutId,
			onSelect: dispatchSelection(UPDATE_DATA_LAYOUT_ID),
			stepHeader: {
				title: Liferay.Language.get('select-a-form-view'),
			},
		},
		{
			emptyState: {
				description: Liferay.Language.get(
					'create-one-or-more-tables-to-display-the-data-held-in-your-data-object'
				),
				title: Liferay.Language.get('there-are-no-table-views-yet'),
			},
			endpoint: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views`,
			itemId: dataListViewId,
			onSelect: dispatchSelection(UPDATE_DATA_LIST_VIEW_ID),
			stepHeader: {
				title: Liferay.Language.get('select-a-table-view'),
			},
		},
		{
			emptyState: {
				search: {
					className: 'taglib-search-state',
					title: Liferay.Language.get('no-results-were-found'),
				},
			},
			endpoint: `/o/headless-admin-workflow/v1.0/workflow-definitions?active=true&page=-1&pageSize=-1`,
			itemId: workflowDefinitionName ?? '',
			onSelect: dispatchSelection(UPDATE_WORKFLOW_PROCESS_ID),
			shortCutButton: (
				<ClayButton
					displayType="secondary"
					onClick={() => {
						window.open(workflowProcessBuilderPortletURL, '_blank');
					}}
				>
					{Liferay.Language.get('manage-workflows')}
					<ClayIcon className="ml-2" symbol="shortcut" />
				</ClayButton>
			),
			parseItems: (items) =>
				items.map(({name, title, ...restProps}) => ({
					...restProps,
					id: name,
					name: {[defaultLanguageId]: title},
				})),

			staticItems: [
				{
					dateCreated: null,
					dateModified: null,
					id: '',
					name: {
						[defaultLanguageId]: Liferay.Language.get(
							'no-workflow'
						),
					},
				},
			],
			stepHeader: {
				description: (
					<span className="text-secondary">
						{Liferay.Language.get(
							'enable-app-submissions-to-flow-through-a-workflow-process'
						)}
					</span>
				),
				label: (
					<span className="text-secondary">
						{` (${Liferay.Language.get('optional')})`}
					</span>
				),
				title: Liferay.Language.get('connect-a-workflow'),
			},
		},
	];

	return (
		<div className="card-body p-0 shadowless-card-body">
			<ClayLayout.Row>
				<ClayLayout.Col>
					<MultiStepNav
						currentStep={currentStep}
						steps={['1', '2', '3', '4']}
					/>
				</ClayLayout.Col>
			</ClayLayout.Row>

			{currentStep < 3 && (
				<EditAppBody.StepContent
					defaultLanguageId={defaultLanguageId}
					{...stepProps[currentStep]}
				/>
			)}

			{currentStep == 3 && <DeployApp />}
		</div>
	);
};

EditAppBody.StepContent = EditAppStepContent;
export default EditAppBody;
