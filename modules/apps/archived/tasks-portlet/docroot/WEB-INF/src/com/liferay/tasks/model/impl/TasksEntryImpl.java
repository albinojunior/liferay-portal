/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This file is part of Liferay Social Office. Liferay Social Office is free
 * software: you can redistribute it and/or modify it under the terms of the GNU
 * Affero General Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later version.
 *
 * Liferay Social Office is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Liferay Social Office. If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */

package com.liferay.tasks.model.impl;

import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.tasks.model.TasksEntryConstants;

/**
 * @author Ryan Park
 */
public class TasksEntryImpl extends TasksEntryBaseImpl {

	public TasksEntryImpl() {
	}

	@Override
	public String getAssigneeFullName() {
		return getUserFullName(getAssigneeUserId());
	}

	@Override
	public String getPriorityLabel() {
		return TasksEntryConstants.getPriorityLabel(getPriority());
	}

	@Override
	public String getReporterFullName() {
		return getUserFullName(getUserId());
	}

	@Override
	public String getStatusLabel() {
		return TasksEntryConstants.getStatusLabel(getStatus());
	}

	protected String getUserFullName(long userId) {
		String fullName = StringPool.BLANK;

		try {
			User user = UserLocalServiceUtil.getUser(userId);

			fullName = user.getFullName();
		}
		catch (Exception exception) {
			if (_log.isDebugEnabled()) {
				_log.debug(exception, exception);
			}
		}

		return fullName;
	}

	private static final Log _log = LogFactoryUtil.getLog(TasksEntryImpl.class);

}