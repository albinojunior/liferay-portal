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

package com.liferay.headless.admin.workflow.internal.resource.v1_0;

import com.liferay.headless.admin.workflow.dto.v1_0.Assignee;
import com.liferay.headless.admin.workflow.dto.v1_0.WorkflowTaskAssignableUser;
import com.liferay.headless.admin.workflow.dto.v1_0.WorkflowTaskAssignableUsersBag;
import com.liferay.headless.admin.workflow.internal.dto.v1_0.util.AssigneeUtil;
import com.liferay.headless.admin.workflow.resource.v1_0.WorkflowTaskAssignableUsersBagResource;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.kernel.workflow.WorkflowTaskManager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

/**
 * @author Javier Gamarra
 */
@Component(
	properties = "OSGI-INF/liferay/rest/v1_0/workflow-task-assignable-users-bag.properties",
	scope = ServiceScope.PROTOTYPE,
	service = WorkflowTaskAssignableUsersBagResource.class
)
public class WorkflowTaskAssignableUsersBagResourceImpl
	extends BaseWorkflowTaskAssignableUsersBagResourceImpl {

	@Override
	public WorkflowTaskAssignableUsersBag getWorkflowTaskAssignableUsersBag(
			Long[] workflowTaskIds)
		throws Exception {

		return new WorkflowTaskAssignableUsersBag() {
			{
				setWorkflowTaskAssignableUsers(
					() -> {
						List<WorkflowTaskAssignableUser>
							workflowTaskAssignableUsers = new ArrayList<>();

						Set<User> commonPooledActors = null;

						for (Long workflowTaskId : workflowTaskIds) {
							List<User> pooledActors =
								_workflowTaskManager.getPooledActors(
									contextUser.getCompanyId(), workflowTaskId);

							if (commonPooledActors == null) {
								commonPooledActors = new HashSet<>(
									pooledActors);
							}
							else {
								commonPooledActors.retainAll(pooledActors);
							}

							workflowTaskAssignableUsers.add(
								_createWorkflowTaskAssignableUser(
									pooledActors, workflowTaskId));
						}

						if (workflowTaskAssignableUsers.size() > 1) {
							workflowTaskAssignableUsers.add(
								_createWorkflowTaskAssignableUser(
									commonPooledActors, 0L));
						}

						return workflowTaskAssignableUsers.toArray(
							new WorkflowTaskAssignableUser[0]);
					});
			}
		};
	}

	private WorkflowTaskAssignableUser _createWorkflowTaskAssignableUser(
		Collection<User> users, Long workflowTaskId) {

		return new WorkflowTaskAssignableUser() {
			{
				assignableUsers = transformToArray(
					users, user -> AssigneeUtil.toAssignee(_portal, user),
					Assignee.class);
				taskId = workflowTaskId;
			}
		};
	}

	@Reference
	private Portal _portal;

	@Reference
	private WorkflowTaskManager _workflowTaskManager;

}