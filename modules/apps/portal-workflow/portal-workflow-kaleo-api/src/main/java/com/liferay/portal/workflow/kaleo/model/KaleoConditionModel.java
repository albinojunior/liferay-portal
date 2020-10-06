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
 * The base model interface for the KaleoCondition service. Represents a row in the &quot;KaleoCondition&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This interface and its corresponding implementation <code>com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionModelImpl</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in <code>com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionImpl</code>.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see KaleoCondition
 * @generated
 */
@ProviderType
public interface KaleoConditionModel
	extends BaseModel<KaleoCondition>, GroupedModel, MVCCModel, ShardedModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. All methods that expect a kaleo condition model instance should use the {@link KaleoCondition} interface instead.
	 */

	/**
	 * Returns the primary key of this kaleo condition.
	 *
	 * @return the primary key of this kaleo condition
	 */
	public long getPrimaryKey();

	/**
	 * Sets the primary key of this kaleo condition.
	 *
	 * @param primaryKey the primary key of this kaleo condition
	 */
	public void setPrimaryKey(long primaryKey);

	/**
	 * Returns the mvcc version of this kaleo condition.
	 *
	 * @return the mvcc version of this kaleo condition
	 */
	@Override
	public long getMvccVersion();

	/**
	 * Sets the mvcc version of this kaleo condition.
	 *
	 * @param mvccVersion the mvcc version of this kaleo condition
	 */
	@Override
	public void setMvccVersion(long mvccVersion);

	/**
	 * Returns the kaleo condition ID of this kaleo condition.
	 *
	 * @return the kaleo condition ID of this kaleo condition
	 */
	public long getKaleoConditionId();

	/**
	 * Sets the kaleo condition ID of this kaleo condition.
	 *
	 * @param kaleoConditionId the kaleo condition ID of this kaleo condition
	 */
	public void setKaleoConditionId(long kaleoConditionId);

	/**
	 * Returns the group ID of this kaleo condition.
	 *
	 * @return the group ID of this kaleo condition
	 */
	@Override
	public long getGroupId();

	/**
	 * Sets the group ID of this kaleo condition.
	 *
	 * @param groupId the group ID of this kaleo condition
	 */
	@Override
	public void setGroupId(long groupId);

	/**
	 * Returns the company ID of this kaleo condition.
	 *
	 * @return the company ID of this kaleo condition
	 */
	@Override
	public long getCompanyId();

	/**
	 * Sets the company ID of this kaleo condition.
	 *
	 * @param companyId the company ID of this kaleo condition
	 */
	@Override
	public void setCompanyId(long companyId);

	/**
	 * Returns the user ID of this kaleo condition.
	 *
	 * @return the user ID of this kaleo condition
	 */
	@Override
	public long getUserId();

	/**
	 * Sets the user ID of this kaleo condition.
	 *
	 * @param userId the user ID of this kaleo condition
	 */
	@Override
	public void setUserId(long userId);

	/**
	 * Returns the user uuid of this kaleo condition.
	 *
	 * @return the user uuid of this kaleo condition
	 */
	@Override
	public String getUserUuid();

	/**
	 * Sets the user uuid of this kaleo condition.
	 *
	 * @param userUuid the user uuid of this kaleo condition
	 */
	@Override
	public void setUserUuid(String userUuid);

	/**
	 * Returns the user name of this kaleo condition.
	 *
	 * @return the user name of this kaleo condition
	 */
	@AutoEscape
	@Override
	public String getUserName();

	/**
	 * Sets the user name of this kaleo condition.
	 *
	 * @param userName the user name of this kaleo condition
	 */
	@Override
	public void setUserName(String userName);

	/**
	 * Returns the create date of this kaleo condition.
	 *
	 * @return the create date of this kaleo condition
	 */
	@Override
	public Date getCreateDate();

	/**
	 * Sets the create date of this kaleo condition.
	 *
	 * @param createDate the create date of this kaleo condition
	 */
	@Override
	public void setCreateDate(Date createDate);

	/**
	 * Returns the modified date of this kaleo condition.
	 *
	 * @return the modified date of this kaleo condition
	 */
	@Override
	public Date getModifiedDate();

	/**
	 * Sets the modified date of this kaleo condition.
	 *
	 * @param modifiedDate the modified date of this kaleo condition
	 */
	@Override
	public void setModifiedDate(Date modifiedDate);

	/**
	 * Returns the kaleo definition ID of this kaleo condition.
	 *
	 * @return the kaleo definition ID of this kaleo condition
	 */
	public long getKaleoDefinitionId();

	/**
	 * Sets the kaleo definition ID of this kaleo condition.
	 *
	 * @param kaleoDefinitionId the kaleo definition ID of this kaleo condition
	 */
	public void setKaleoDefinitionId(long kaleoDefinitionId);

	/**
	 * Returns the kaleo definition version ID of this kaleo condition.
	 *
	 * @return the kaleo definition version ID of this kaleo condition
	 */
	public long getKaleoDefinitionVersionId();

	/**
	 * Sets the kaleo definition version ID of this kaleo condition.
	 *
	 * @param kaleoDefinitionVersionId the kaleo definition version ID of this kaleo condition
	 */
	public void setKaleoDefinitionVersionId(long kaleoDefinitionVersionId);

	/**
	 * Returns the kaleo node ID of this kaleo condition.
	 *
	 * @return the kaleo node ID of this kaleo condition
	 */
	public long getKaleoNodeId();

	/**
	 * Sets the kaleo node ID of this kaleo condition.
	 *
	 * @param kaleoNodeId the kaleo node ID of this kaleo condition
	 */
	public void setKaleoNodeId(long kaleoNodeId);

	/**
	 * Returns the script of this kaleo condition.
	 *
	 * @return the script of this kaleo condition
	 */
	@AutoEscape
	public String getScript();

	/**
	 * Sets the script of this kaleo condition.
	 *
	 * @param script the script of this kaleo condition
	 */
	public void setScript(String script);

	/**
	 * Returns the script language of this kaleo condition.
	 *
	 * @return the script language of this kaleo condition
	 */
	@AutoEscape
	public String getScriptLanguage();

	/**
	 * Sets the script language of this kaleo condition.
	 *
	 * @param scriptLanguage the script language of this kaleo condition
	 */
	public void setScriptLanguage(String scriptLanguage);

	/**
	 * Returns the script required contexts of this kaleo condition.
	 *
	 * @return the script required contexts of this kaleo condition
	 */
	@AutoEscape
	public String getScriptRequiredContexts();

	/**
	 * Sets the script required contexts of this kaleo condition.
	 *
	 * @param scriptRequiredContexts the script required contexts of this kaleo condition
	 */
	public void setScriptRequiredContexts(String scriptRequiredContexts);

}