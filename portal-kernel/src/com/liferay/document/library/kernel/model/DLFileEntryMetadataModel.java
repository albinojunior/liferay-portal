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

package com.liferay.document.library.kernel.model;

import com.liferay.portal.kernel.bean.AutoEscape;
import com.liferay.portal.kernel.model.BaseModel;
import com.liferay.portal.kernel.model.MVCCModel;
import com.liferay.portal.kernel.model.ShardedModel;
import com.liferay.portal.kernel.model.change.tracking.CTModel;

import org.osgi.annotation.versioning.ProviderType;

/**
 * The base model interface for the DLFileEntryMetadata service. Represents a row in the &quot;DLFileEntryMetadata&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This interface and its corresponding implementation <code>com.liferay.portlet.documentlibrary.model.impl.DLFileEntryMetadataModelImpl</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in <code>com.liferay.portlet.documentlibrary.model.impl.DLFileEntryMetadataImpl</code>.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see DLFileEntryMetadata
 * @generated
 */
@ProviderType
public interface DLFileEntryMetadataModel
	extends BaseModel<DLFileEntryMetadata>, CTModel<DLFileEntryMetadata>,
			MVCCModel, ShardedModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. All methods that expect a document library file entry metadata model instance should use the {@link DLFileEntryMetadata} interface instead.
	 */

	/**
	 * Returns the primary key of this document library file entry metadata.
	 *
	 * @return the primary key of this document library file entry metadata
	 */
	@Override
	public long getPrimaryKey();

	/**
	 * Sets the primary key of this document library file entry metadata.
	 *
	 * @param primaryKey the primary key of this document library file entry metadata
	 */
	@Override
	public void setPrimaryKey(long primaryKey);

	/**
	 * Returns the mvcc version of this document library file entry metadata.
	 *
	 * @return the mvcc version of this document library file entry metadata
	 */
	@Override
	public long getMvccVersion();

	/**
	 * Sets the mvcc version of this document library file entry metadata.
	 *
	 * @param mvccVersion the mvcc version of this document library file entry metadata
	 */
	@Override
	public void setMvccVersion(long mvccVersion);

	/**
	 * Returns the ct collection ID of this document library file entry metadata.
	 *
	 * @return the ct collection ID of this document library file entry metadata
	 */
	@Override
	public long getCtCollectionId();

	/**
	 * Sets the ct collection ID of this document library file entry metadata.
	 *
	 * @param ctCollectionId the ct collection ID of this document library file entry metadata
	 */
	@Override
	public void setCtCollectionId(long ctCollectionId);

	/**
	 * Returns the uuid of this document library file entry metadata.
	 *
	 * @return the uuid of this document library file entry metadata
	 */
	@AutoEscape
	public String getUuid();

	/**
	 * Sets the uuid of this document library file entry metadata.
	 *
	 * @param uuid the uuid of this document library file entry metadata
	 */
	public void setUuid(String uuid);

	/**
	 * Returns the file entry metadata ID of this document library file entry metadata.
	 *
	 * @return the file entry metadata ID of this document library file entry metadata
	 */
	public long getFileEntryMetadataId();

	/**
	 * Sets the file entry metadata ID of this document library file entry metadata.
	 *
	 * @param fileEntryMetadataId the file entry metadata ID of this document library file entry metadata
	 */
	public void setFileEntryMetadataId(long fileEntryMetadataId);

	/**
	 * Returns the company ID of this document library file entry metadata.
	 *
	 * @return the company ID of this document library file entry metadata
	 */
	@Override
	public long getCompanyId();

	/**
	 * Sets the company ID of this document library file entry metadata.
	 *
	 * @param companyId the company ID of this document library file entry metadata
	 */
	@Override
	public void setCompanyId(long companyId);

	/**
	 * Returns the ddm storage ID of this document library file entry metadata.
	 *
	 * @return the ddm storage ID of this document library file entry metadata
	 */
	public long getDDMStorageId();

	/**
	 * Sets the ddm storage ID of this document library file entry metadata.
	 *
	 * @param DDMStorageId the ddm storage ID of this document library file entry metadata
	 */
	public void setDDMStorageId(long DDMStorageId);

	/**
	 * Returns the ddm structure ID of this document library file entry metadata.
	 *
	 * @return the ddm structure ID of this document library file entry metadata
	 */
	public long getDDMStructureId();

	/**
	 * Sets the ddm structure ID of this document library file entry metadata.
	 *
	 * @param DDMStructureId the ddm structure ID of this document library file entry metadata
	 */
	public void setDDMStructureId(long DDMStructureId);

	/**
	 * Returns the file entry ID of this document library file entry metadata.
	 *
	 * @return the file entry ID of this document library file entry metadata
	 */
	public long getFileEntryId();

	/**
	 * Sets the file entry ID of this document library file entry metadata.
	 *
	 * @param fileEntryId the file entry ID of this document library file entry metadata
	 */
	public void setFileEntryId(long fileEntryId);

	/**
	 * Returns the file version ID of this document library file entry metadata.
	 *
	 * @return the file version ID of this document library file entry metadata
	 */
	public long getFileVersionId();

	/**
	 * Sets the file version ID of this document library file entry metadata.
	 *
	 * @param fileVersionId the file version ID of this document library file entry metadata
	 */
	public void setFileVersionId(long fileVersionId);

}