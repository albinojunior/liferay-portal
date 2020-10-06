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

package com.liferay.depot.model;

import com.liferay.portal.kernel.bean.AutoEscape;
import com.liferay.portal.kernel.model.BaseModel;
import com.liferay.portal.kernel.model.MVCCModel;
import com.liferay.portal.kernel.model.ShardedModel;
import com.liferay.portal.kernel.model.StagedModel;

import java.util.Date;

import org.osgi.annotation.versioning.ProviderType;

/**
 * The base model interface for the DepotEntryGroupRel service. Represents a row in the &quot;DepotEntryGroupRel&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This interface and its corresponding implementation <code>com.liferay.depot.model.impl.DepotEntryGroupRelModelImpl</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in <code>com.liferay.depot.model.impl.DepotEntryGroupRelImpl</code>.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see DepotEntryGroupRel
 * @generated
 */
@ProviderType
public interface DepotEntryGroupRelModel
	extends BaseModel<DepotEntryGroupRel>, MVCCModel, ShardedModel,
			StagedModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. All methods that expect a depot entry group rel model instance should use the {@link DepotEntryGroupRel} interface instead.
	 */

	/**
	 * Returns the primary key of this depot entry group rel.
	 *
	 * @return the primary key of this depot entry group rel
	 */
	public long getPrimaryKey();

	/**
	 * Sets the primary key of this depot entry group rel.
	 *
	 * @param primaryKey the primary key of this depot entry group rel
	 */
	public void setPrimaryKey(long primaryKey);

	/**
	 * Returns the mvcc version of this depot entry group rel.
	 *
	 * @return the mvcc version of this depot entry group rel
	 */
	@Override
	public long getMvccVersion();

	/**
	 * Sets the mvcc version of this depot entry group rel.
	 *
	 * @param mvccVersion the mvcc version of this depot entry group rel
	 */
	@Override
	public void setMvccVersion(long mvccVersion);

	/**
	 * Returns the uuid of this depot entry group rel.
	 *
	 * @return the uuid of this depot entry group rel
	 */
	@AutoEscape
	@Override
	public String getUuid();

	/**
	 * Sets the uuid of this depot entry group rel.
	 *
	 * @param uuid the uuid of this depot entry group rel
	 */
	@Override
	public void setUuid(String uuid);

	/**
	 * Returns the depot entry group rel ID of this depot entry group rel.
	 *
	 * @return the depot entry group rel ID of this depot entry group rel
	 */
	public long getDepotEntryGroupRelId();

	/**
	 * Sets the depot entry group rel ID of this depot entry group rel.
	 *
	 * @param depotEntryGroupRelId the depot entry group rel ID of this depot entry group rel
	 */
	public void setDepotEntryGroupRelId(long depotEntryGroupRelId);

	/**
	 * Returns the group ID of this depot entry group rel.
	 *
	 * @return the group ID of this depot entry group rel
	 */
	public long getGroupId();

	/**
	 * Sets the group ID of this depot entry group rel.
	 *
	 * @param groupId the group ID of this depot entry group rel
	 */
	public void setGroupId(long groupId);

	/**
	 * Returns the company ID of this depot entry group rel.
	 *
	 * @return the company ID of this depot entry group rel
	 */
	@Override
	public long getCompanyId();

	/**
	 * Sets the company ID of this depot entry group rel.
	 *
	 * @param companyId the company ID of this depot entry group rel
	 */
	@Override
	public void setCompanyId(long companyId);

	/**
	 * Returns the create date of this depot entry group rel.
	 *
	 * @return the create date of this depot entry group rel
	 */
	@Override
	public Date getCreateDate();

	/**
	 * Sets the create date of this depot entry group rel.
	 *
	 * @param createDate the create date of this depot entry group rel
	 */
	@Override
	public void setCreateDate(Date createDate);

	/**
	 * Returns the modified date of this depot entry group rel.
	 *
	 * @return the modified date of this depot entry group rel
	 */
	@Override
	public Date getModifiedDate();

	/**
	 * Sets the modified date of this depot entry group rel.
	 *
	 * @param modifiedDate the modified date of this depot entry group rel
	 */
	@Override
	public void setModifiedDate(Date modifiedDate);

	/**
	 * Returns the ddm structures available of this depot entry group rel.
	 *
	 * @return the ddm structures available of this depot entry group rel
	 */
	public boolean getDdmStructuresAvailable();

	/**
	 * Returns <code>true</code> if this depot entry group rel is ddm structures available.
	 *
	 * @return <code>true</code> if this depot entry group rel is ddm structures available; <code>false</code> otherwise
	 */
	public boolean isDdmStructuresAvailable();

	/**
	 * Sets whether this depot entry group rel is ddm structures available.
	 *
	 * @param ddmStructuresAvailable the ddm structures available of this depot entry group rel
	 */
	public void setDdmStructuresAvailable(boolean ddmStructuresAvailable);

	/**
	 * Returns the depot entry ID of this depot entry group rel.
	 *
	 * @return the depot entry ID of this depot entry group rel
	 */
	public long getDepotEntryId();

	/**
	 * Sets the depot entry ID of this depot entry group rel.
	 *
	 * @param depotEntryId the depot entry ID of this depot entry group rel
	 */
	public void setDepotEntryId(long depotEntryId);

	/**
	 * Returns the searchable of this depot entry group rel.
	 *
	 * @return the searchable of this depot entry group rel
	 */
	public boolean getSearchable();

	/**
	 * Returns <code>true</code> if this depot entry group rel is searchable.
	 *
	 * @return <code>true</code> if this depot entry group rel is searchable; <code>false</code> otherwise
	 */
	public boolean isSearchable();

	/**
	 * Sets whether this depot entry group rel is searchable.
	 *
	 * @param searchable the searchable of this depot entry group rel
	 */
	public void setSearchable(boolean searchable);

	/**
	 * Returns the to group ID of this depot entry group rel.
	 *
	 * @return the to group ID of this depot entry group rel
	 */
	public long getToGroupId();

	/**
	 * Sets the to group ID of this depot entry group rel.
	 *
	 * @param toGroupId the to group ID of this depot entry group rel
	 */
	public void setToGroupId(long toGroupId);

}