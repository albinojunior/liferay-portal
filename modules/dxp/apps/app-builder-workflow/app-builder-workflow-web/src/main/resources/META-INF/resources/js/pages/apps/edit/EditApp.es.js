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
import ClayIcon from '@clayui/icon';
import {ClayTooltipProvider} from '@clayui/tooltip';
import ControlMenu from 'app-builder-web/js/components/control-menu/ControlMenu.es';
import {Loading} from 'app-builder-web/js/components/loading/Loading.es';
import UpperToolbar from 'app-builder-web/js/components/upper-toolbar/UpperToolbar.es';
import SelectObjects from 'app-builder-web/js/pages/apps/SelectObjectsDropDown.es';
import EditAppContext, {
	UPDATE_APP,
	UPDATE_DATA_LAYOUT_ID,
	UPDATE_DATA_LIST_VIEW_ID,
	UPDATE_NAME,
	reducer,
} from 'app-builder-web/js/pages/apps/edit/EditAppContext.es';
import {getItem} from 'app-builder-web/js/utils/client.es';
import {Sidebar} from 'data-engine-taglib';
import React, {useEffect, useReducer, useState} from 'react';

import './EditApp.scss';
import {
	SelectFormView,
	SelectTableView,
} from '../../../components/select-dropdown/SelectDropdown.es';
import DeployAppModal from './DeployAppModal.es';

export default ({
	history,
	match: {
		params: {appId},
	},
	scope,
}) => {
	const [{app}, dispatch] = useReducer(reducer, {
		app: {
			active: true,
			appDeployments: [],
			dataLayoutId: null,
			dataListViewId: null,
			name: {
				en_US: '',
			},
			scope,
		},
	});

	const [isDataViewsOpen, setDataViewsOpen] = useState(false);
	const [isDeployAppVisible, setDeployAppVisible] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [selectedFormView, setSelectedFormView] = useState({});
	const [selectedObject, setSelectedObject] = useState({});
	const [selectedTableView, setSelectedTableView] = useState({});

	useEffect(() => {
		if (appId) {
			setLoading(true);

			getItem(`/o/app-builder/v1.0/apps/${appId}`)
				.then((app) => {
					dispatch({
						app,
						type: UPDATE_APP,
					});

					setLoading(false);
				})
				.catch((_) => setLoading(false));
		}
	}, [appId]);

	let title = Liferay.Language.get('new-workflow-powered-app');

	if (appId) {
		title = Liferay.Language.get('edit-workflow-powered-app');
	}

	const onCancel = () => {
		history.goBack();
	};

	const onChangeName = ({target}) => {
		dispatch({appName: target.value, type: UPDATE_NAME});
	};

	return (
		<div>
			<ControlMenu backURL="../../" title={title} />

			<Loading isLoading={isLoading}>
				<EditAppContext.Provider
					value={{
						dispatch,
						isDeployAppVisible,
						setDeployAppVisible,
						state: {app},
					}}
				>
					<UpperToolbar>
						<UpperToolbar.Input
							onChange={onChangeName}
							placeholder={Liferay.Language.get('untitled-app')}
							value={app.name.en_US}
						/>
						<UpperToolbar.Group>
							<UpperToolbar.Button
								displayType="secondary"
								onClick={onCancel}
							>
								{Liferay.Language.get('cancel')}
							</UpperToolbar.Button>

							<UpperToolbar.Button
								disabled={
									!selectedObject.id ||
									!selectedFormView.id ||
									!selectedTableView.id ||
									!app.name.en_US
								}
								onClick={() => setDeployAppVisible(true)}
							>
								{Liferay.Language.get('deploy')}
							</UpperToolbar.Button>
						</UpperToolbar.Group>
					</UpperToolbar>

					<Sidebar className="workflow-app-sidebar">
						<Sidebar.Header>
							{!isDataViewsOpen ? (
								<h3>{Liferay.Language.get('configuration')}</h3>
							) : (
								<div className="border-bottom pb-3 pl-0 pt-0 sidebar-header">
									<ClayButton
										className="clearfix mr-3"
										displayType="secondary"
										onClick={() => setDataViewsOpen(false)}
										small
									>
										<ClayIcon
											className="dropdown-button-asset mb-1"
											symbol="angle-left"
										/>
									</ClayButton>

									<h3 className="mt-1">
										{Liferay.Language.get('data-and-views')}
									</h3>
								</div>
							)}
						</Sidebar.Header>

						<Sidebar.Body>
							{!isDataViewsOpen ? (
								<ClayButton
									className="clearfix w-100"
									displayType="secondary"
									onClick={() => setDataViewsOpen(true)}
								>
									<span className="float-left">
										{Liferay.Language.get('data-and-views')}
									</span>

									<ClayIcon
										className="dropdown-button-asset float-right"
										symbol="angle-right"
									/>
								</ClayButton>
							) : (
								<>
									<div className="border-bottom pb-3">
										<div className="align-items-center d-flex">
											<label>
												{Liferay.Language.get(
													'main-data-object'
												)}
											</label>

											<ClayTooltipProvider>
												<ClayIcon
													className="ml-2 text-muted tooltip-icon"
													data-tooltip-align="top"
													data-tooltip-delay="0"
													symbol="question-circle-full"
													title={Liferay.Language.get(
														'a-data-object-stores-your-business-data-and-is-composed-by-data-fields'
													)}
												/>
											</ClayTooltipProvider>
										</div>

										<SelectObjects
											label={Liferay.Language.get(
												'select-data-object'
											)}
											onSelect={setSelectedObject}
											selectedValue={selectedObject}
										/>
									</div>

									{selectedObject.name ? (
										<div>
											<h5 className="mt-3 text-secondary text-uppercase">
												{Liferay.Language.get(
													'gather-data'
												)}
											</h5>

											<label>
												{Liferay.Language.get(
													'form-view'
												)}
											</label>

											<SelectFormView
												objectId={selectedObject.id}
												onSelect={(formView) => {
													setSelectedFormView(
														formView
													);

													dispatch({
														...formView,
														type: UPDATE_DATA_LAYOUT_ID,
													});
												}}
												selectedValue={
													selectedFormView.name
												}
											/>

											<h5 className="mt-4 text-secondary text-uppercase">
												{Liferay.Language.get(
													'display-data'
												)}
											</h5>

											<label>
												{Liferay.Language.get(
													'table-view'
												)}
											</label>

											<SelectTableView
												objectId={selectedObject.id}
												onSelect={(tableView) => {
													setSelectedTableView(
														tableView
													);

													dispatch({
														...tableView,
														type: UPDATE_DATA_LIST_VIEW_ID,
													});
												}}
												selectedValue={
													selectedTableView.name
												}
											/>
										</div>
									) : (
										<div className="text-center">
											<div className="taglib-empty-result-message">
												<div className="taglib-empty-result-message-header" />
											</div>
											<h3>
												{Liferay.Language.get(
													'no-object-selected'
												)}
											</h3>

											<span
												className="text-secondary"
												style={{fontSize: '16px'}}
											>
												{Liferay.Language.get(
													'select-a-data-object-to-start-gathering-business-data'
												)}
											</span>
										</div>
									)}
								</>
							)}
						</Sidebar.Body>
					</Sidebar>

					<DeployAppModal
						appId={appId}
						objectId={selectedObject.id}
						onCancel={onCancel}
					/>
				</EditAppContext.Provider>
			</Loading>
		</div>
	);
};
