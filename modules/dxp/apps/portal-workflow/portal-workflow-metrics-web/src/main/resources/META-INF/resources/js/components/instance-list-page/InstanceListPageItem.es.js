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
import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import React, {useContext, useState, useCallback} from 'react';

import Icon from '../../shared/components/Icon.es';
import moment from '../../shared/util/moment.es';
import {ReassignTaskModalContext} from './InstanceListPage.es';
import {InstanceListContext} from './store/InstanceListPageStore.es';

const getStatusIcon = status => {
	if (status === 'OnTime') {
		return {
			bgColor: 'bg-success-light',
			iconColor: 'text-success',
			iconName: 'check-circle'
		};
	}

	if (status === 'Overdue') {
		return {
			bgColor: 'bg-danger-light',
			iconColor: 'text-danger',
			iconName: 'exclamation-circle'
		};
	}

	if (status === 'Untracked') {
		return {
			bgColor: 'bg-info-light',
			iconColor: 'text-info',
			iconName: 'hr'
		};
	}

	return null;
};

const Item = ({
	assetTitle,
	assetType,
	assigneeUsers,
	creatorUser,
	dateCreated,
	id,
	slaStatus,
	status,
	taskNames = []
}) => {
	const completed = status === 'Completed';
	const {setInstanceId} = useContext(InstanceListContext);
	const statusIcon = getStatusIcon(slaStatus);

	const taskItem = {
		assetTitle,
		assetType,
		assigneeUsers,
		creatorUser,
		dateCreated,
		id,
		slaStatus,
		status,
		taskNames
	};

	const updateInstanceId = () => setInstanceId(id);

	const formattedAssignees = !completed
		? assigneeUsers
			? assigneeUsers.map(assigneeUser => assigneeUser.name).join(', ')
			: Liferay.Language.get('unassigned')
		: Liferay.Language.get('not-available');

	return (
		<ClayTable.Row data-testid="instanceRow">
			<ClayTable.Cell>
				{statusIcon && (
					<span
						className={`sticker sticker-sm ${statusIcon.bgColor}`}
					>
						<span className="inline-item">
							<Icon
								elementClasses={statusIcon.iconColor}
								iconName={statusIcon.iconName}
							/>
						</span>
					</span>
				)}
			</ClayTable.Cell>

			<ClayTable.Cell>
				<span
					className="link-text"
					data-target="#instanceDetailModal"
					data-testid="instanceIdLink"
					data-toggle="modal"
					onClick={updateInstanceId}
					tabIndex="-1"
				>
					<strong>{id}</strong>
				</span>
			</ClayTable.Cell>

			<ClayTable.Cell data-testid="assetInfoCell">
				{`${assetType}: ${assetTitle}`}{' '}
			</ClayTable.Cell>

			<ClayTable.Cell data-testid="taskNamesCell">
				{!completed
					? taskNames.join(', ')
					: Liferay.Language.get('completed')}
			</ClayTable.Cell>

			<ClayTable.Cell data-testid="assigneesCell">
				{formattedAssignees}
			</ClayTable.Cell>

			<ClayTable.Cell data-testid="creatorUserCell">
				{creatorUser ? creatorUser.name : ''}
			</ClayTable.Cell>

			<ClayTable.Cell data-testid="dateCreatedCell">
				{moment
					.utc(dateCreated)
					.format(Liferay.Language.get('mmm-dd-yyyy-lt'))}
			</ClayTable.Cell>

			<ClayTable.Cell style={{paddingRight: '0rem'}}>
				<QuickActionMenu taskItem={taskItem} />
			</ClayTable.Cell>
		</ClayTable.Row>
	);
};

const QuickActionMenu = ({taskItem}) => {
	const [active, setActive] = useState(false);
	const spritemap = `${Liferay.ThemeDisplay.getPathThemeImages()}/lexicon/icons.svg`;
	const {setShowModal, showModal} = useContext(ReassignTaskModalContext);
	const handleClickReassigneeTask = useCallback(
		() => {
			setShowModal(() => ({
				selectedItem: taskItem,
				visible: !showModal.visible
			}));
			setActive(() => false);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[taskItem]
	);

	return (
		<div className="autofit-col">
			<div className="quick-action-menu">
				<button
					className="component-action quick-action-item"
					href="#1"
					onClick={handleClickReassigneeTask}
					role="button"
				>
					<ClayIcon spritemap={spritemap} symbol="change" />
				</button>
			</div>
			<ClayDropDown
				active={active}
				onActiveChange={setActive}
				trigger={
					<ClayButton
						className="component-action"
						displayType="unstyled"
						monospaced
					>
						<ClayIcon spritemap={spritemap} symbol="ellipsis-v" />
					</ClayButton>
				}
			>
				<ClayDropDown.ItemList>
					<li>
						<button
							className="dropdown-item"
							data-testid="reassignTaskButton"
							onClick={() => handleClickReassigneeTask()}
						>
							{Liferay.Language.get('reassign-task')}
						</button>
					</li>
				</ClayDropDown.ItemList>
			</ClayDropDown>
		</div>
	);
};

Item.QuickActionMenu = QuickActionMenu;

export {Item};
