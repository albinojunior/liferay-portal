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

package com.liferay.portal.workflow.kaleo.model;

import com.liferay.portal.kernel.bean.AutoEscape;
import com.liferay.portal.kernel.model.BaseModel;
import com.liferay.portal.kernel.model.GroupedModel;
import com.liferay.portal.kernel.model.MVCCModel;
import com.liferay.portal.kernel.model.ShardedModel;

import java.util.Date;

import org.osgi.annotation.versioning.ProviderType;

/**
 * The base model interface for the KaleoTaskAssignment service. Represents a row in the &quot;KaleoTaskAssignment&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This interface and its corresponding implementation <code>com.liferay.portal.workflow.kaleo.model.impl.KaleoTaskAssignmentModelImpl</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in <code>com.liferay.portal.workflow.kaleo.model.impl.KaleoTaskAssignmentImpl</code>.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see KaleoTaskAssignment
 * @generated
 */
@ProviderType
public interface KaleoTaskAssignmentModel
	extends BaseModel<KaleoTaskAssignment>, GroupedModel, MVCCModel,
			ShardedModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. All methods that expect a kaleo task assignment model instance should use the {@link KaleoTaskAssignment} interface instead.
	 */

	/**
	 * Returns the primary key of this kaleo task assignment.
	 *
	 * @return the primary key of this kaleo task assignment
	 */
	public long getPrimaryKey();

	/**
	 * Sets the primary key of this kaleo task assignment.
	 *
	 * @param primaryKey the primary key of this kaleo task assignment
	 */
	public void setPrimaryKey(long primaryKey);

	/**
	 * Returns the mvcc version of this kaleo task assignment.
	 *
	 * @return the mvcc version of this kaleo task assignment
	 */
	@Override
	public long getMvccVersion();

	/**
	 * Sets the mvcc version of this kaleo task assignment.
	 *
	 * @param mvccVersion the mvcc version of this kaleo task assignment
	 */
	@Override
	public void setMvccVersion(long mvccVersion);

	/**
	 * Returns the kaleo task assignment ID of this kaleo task assignment.
	 *
	 * @return the kaleo task assignment ID of this kaleo task assignment
	 */
	public long getKaleoTaskAssignmentId();

	/**
	 * Sets the kaleo task assignment ID of this kaleo task assignment.
	 *
	 * @param kaleoTaskAssignmentId the kaleo task assignment ID of this kaleo task assignment
	 */
	public void setKaleoTaskAssignmentId(long kaleoTaskAssignmentId);

	/**
	 * Returns the group ID of this kaleo task assignment.
	 *
	 * @return the group ID of this kaleo task assignment
	 */
	@Override
	public long getGroupId();

	/**
	 * Sets the group ID of this kaleo task assignment.
	 *
	 * @param groupId the group ID of this kaleo task assignment
	 */
	@Override
	public void setGroupId(long groupId);

	/**
	 * Returns the company ID of this kaleo task assignment.
	 *
	 * @return the company ID of this kaleo task assignment
	 */
	@Override
	public long getCompanyId();

	/**
	 * Sets the company ID of this kaleo task assignment.
	 *
	 * @param companyId the company ID of this kaleo task assignment
	 */
	@Override
	public void setCompanyId(long companyId);

	/**
	 * Returns the user ID of this kaleo task assignment.
	 *
	 * @return the user ID of this kaleo task assignment
	 */
	@Override
	public long getUserId();

	/**
	 * Sets the user ID of this kaleo task assignment.
	 *
	 * @param userId the user ID of this kaleo task assignment
	 */
	@Override
	public void setUserId(long userId);

	/**
	 * Returns the user uuid of this kaleo task assignment.
	 *
	 * @return the user uuid of this kaleo task assignment
	 */
	@Override
	public String getUserUuid();

	/**
	 * Sets the user uuid of this kaleo task assignment.
	 *
	 * @param userUuid the user uuid of this kaleo task assignment
	 */
	@Override
	public void setUserUuid(String userUuid);

	/**
	 * Returns the user name of this kaleo task assignment.
	 *
	 * @return the user name of this kaleo task assignment
	 */
	@AutoEscape
	@Override
	public String getUserName();

	/**
	 * Sets the user name of this kaleo task assignment.
	 *
	 * @param userName the user name of this kaleo task assignment
	 */
	@Override
	public void setUserName(String userName);

	/**
	 * Returns the create date of this kaleo task assignment.
	 *
	 * @return the create date of this kaleo task assignment
	 */
	@Override
	public Date getCreateDate();

	/**
	 * Sets the create date of this kaleo task assignment.
	 *
	 * @param createDate the create date of this kaleo task assignment
	 */
	@Override
	public void setCreateDate(Date createDate);

	/**
	 * Returns the modified date of this kaleo task assignment.
	 *
	 * @return the modified date of this kaleo task assignment
	 */
	@Override
	public Date getModifiedDate();

	/**
	 * Sets the modified date of this kaleo task assignment.
	 *
	 * @param modifiedDate the modified date of this kaleo task assignment
	 */
	@Override
	public void setModifiedDate(Date modifiedDate);

	/**
	 * Returns the kaleo class name of this kaleo task assignment.
	 *
	 * @return the kaleo class name of this kaleo task assignment
	 */
	@AutoEscape
	public String getKaleoClassName();

	/**
	 * Sets the kaleo class name of this kaleo task assignment.
	 *
	 * @param kaleoClassName the kaleo class name of this kaleo task assignment
	 */
	public void setKaleoClassName(String kaleoClassName);

	/**
	 * Returns the kaleo class pk of this kaleo task assignment.
	 *
	 * @return the kaleo class pk of this kaleo task assignment
	 */
	public long getKaleoClassPK();

	/**
	 * Sets the kaleo class pk of this kaleo task assignment.
	 *
	 * @param kaleoClassPK the kaleo class pk of this kaleo task assignment
	 */
	public void setKaleoClassPK(long kaleoClassPK);

	/**
	 * Returns the kaleo definition ID of this kaleo task assignment.
	 *
	 * @return the kaleo definition ID of this kaleo task assignment
	 */
	public long getKaleoDefinitionId();

	/**
	 * Sets the kaleo definition ID of this kaleo task assignment.
	 *
	 * @param kaleoDefinitionId the kaleo definition ID of this kaleo task assignment
	 */
	public void setKaleoDefinitionId(long kaleoDefinitionId);

	/**
	 * Returns the kaleo definition version ID of this kaleo task assignment.
	 *
	 * @return the kaleo definition version ID of this kaleo task assignment
	 */
	public long getKaleoDefinitionVersionId();

	/**
	 * Sets the kaleo definition version ID of this kaleo task assignment.
	 *
	 * @param kaleoDefinitionVersionId the kaleo definition version ID of this kaleo task assignment
	 */
	public void setKaleoDefinitionVersionId(long kaleoDefinitionVersionId);

	/**
	 * Returns the kaleo node ID of this kaleo task assignment.
	 *
	 * @return the kaleo node ID of this kaleo task assignment
	 */
	public long getKaleoNodeId();

	/**
	 * Sets the kaleo node ID of this kaleo task assignment.
	 *
	 * @param kaleoNodeId the kaleo node ID of this kaleo task assignment
	 */
	public void setKaleoNodeId(long kaleoNodeId);

	/**
	 * Returns the assignee class name of this kaleo task assignment.
	 *
	 * @return the assignee class name of this kaleo task assignment
	 */
	@AutoEscape
	public String getAssigneeClassName();

	/**
	 * Sets the assignee class name of this kaleo task assignment.
	 *
	 * @param assigneeClassName the assignee class name of this kaleo task assignment
	 */
	public void setAssigneeClassName(String assigneeClassName);

	/**
	 * Returns the assignee class pk of this kaleo task assignment.
	 *
	 * @return the assignee class pk of this kaleo task assignment
	 */
	public long getAssigneeClassPK();

	/**
	 * Sets the assignee class pk of this kaleo task assignment.
	 *
	 * @param assigneeClassPK the assignee class pk of this kaleo task assignment
	 */
	public void setAssigneeClassPK(long assigneeClassPK);

	/**
	 * Returns the assignee action ID of this kaleo task assignment.
	 *
	 * @return the assignee action ID of this kaleo task assignment
	 */
	@AutoEscape
	public String getAssigneeActionId();

	/**
	 * Sets the assignee action ID of this kaleo task assignment.
	 *
	 * @param assigneeActionId the assignee action ID of this kaleo task assignment
	 */
	public void setAssigneeActionId(String assigneeActionId);

	/**
	 * Returns the assignee script of this kaleo task assignment.
	 *
	 * @return the assignee script of this kaleo task assignment
	 */
	@AutoEscape
	public String getAssigneeScript();

	/**
	 * Sets the assignee script of this kaleo task assignment.
	 *
	 * @param assigneeScript the assignee script of this kaleo task assignment
	 */
	public void setAssigneeScript(String assigneeScript);

	/**
	 * Returns the assignee script language of this kaleo task assignment.
	 *
	 * @return the assignee script language of this kaleo task assignment
	 */
	@AutoEscape
	public String getAssigneeScriptLanguage();

	/**
	 * Sets the assignee script language of this kaleo task assignment.
	 *
	 * @param assigneeScriptLanguage the assignee script language of this kaleo task assignment
	 */
	public void setAssigneeScriptLanguage(String assigneeScriptLanguage);

	/**
	 * Returns the assignee script required contexts of this kaleo task assignment.
	 *
	 * @return the assignee script required contexts of this kaleo task assignment
	 */
	@AutoEscape
	public String getAssigneeScriptRequiredContexts();

	/**
	 * Sets the assignee script required contexts of this kaleo task assignment.
	 *
	 * @param assigneeScriptRequiredContexts the assignee script required contexts of this kaleo task assignment
	 */
	public void setAssigneeScriptRequiredContexts(
		String assigneeScriptRequiredContexts);

}