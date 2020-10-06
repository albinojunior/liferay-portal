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

package com.liferay.portal.tools.service.builder.test.model;

import com.liferay.portal.kernel.bean.AutoEscape;
import com.liferay.portal.kernel.model.BaseModel;

import java.sql.Blob;

import org.osgi.annotation.versioning.ProviderType;

/**
 * The base model interface for the LazyBlobEntry service. Represents a row in the &quot;LazyBlobEntry&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This interface and its corresponding implementation <code>com.liferay.portal.tools.service.builder.test.model.impl.LazyBlobEntryModelImpl</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in <code>com.liferay.portal.tools.service.builder.test.model.impl.LazyBlobEntryImpl</code>.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see LazyBlobEntry
 * @generated
 */
@ProviderType
public interface LazyBlobEntryModel extends BaseModel<LazyBlobEntry> {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this interface directly. All methods that expect a lazy blob entry model instance should use the {@link LazyBlobEntry} interface instead.
	 */

	/**
	 * Returns the primary key of this lazy blob entry.
	 *
	 * @return the primary key of this lazy blob entry
	 */
	public long getPrimaryKey();

	/**
	 * Sets the primary key of this lazy blob entry.
	 *
	 * @param primaryKey the primary key of this lazy blob entry
	 */
	public void setPrimaryKey(long primaryKey);

	/**
	 * Returns the uuid of this lazy blob entry.
	 *
	 * @return the uuid of this lazy blob entry
	 */
	@AutoEscape
	public String getUuid();

	/**
	 * Sets the uuid of this lazy blob entry.
	 *
	 * @param uuid the uuid of this lazy blob entry
	 */
	public void setUuid(String uuid);

	/**
	 * Returns the lazy blob entry ID of this lazy blob entry.
	 *
	 * @return the lazy blob entry ID of this lazy blob entry
	 */
	public long getLazyBlobEntryId();

	/**
	 * Sets the lazy blob entry ID of this lazy blob entry.
	 *
	 * @param lazyBlobEntryId the lazy blob entry ID of this lazy blob entry
	 */
	public void setLazyBlobEntryId(long lazyBlobEntryId);

	/**
	 * Returns the group ID of this lazy blob entry.
	 *
	 * @return the group ID of this lazy blob entry
	 */
	public long getGroupId();

	/**
	 * Sets the group ID of this lazy blob entry.
	 *
	 * @param groupId the group ID of this lazy blob entry
	 */
	public void setGroupId(long groupId);

	/**
	 * Returns the blob1 of this lazy blob entry.
	 *
	 * @return the blob1 of this lazy blob entry
	 */
	public Blob getBlob1();

	/**
	 * Sets the blob1 of this lazy blob entry.
	 *
	 * @param blob1 the blob1 of this lazy blob entry
	 */
	public void setBlob1(Blob blob1);

	/**
	 * Returns the blob2 of this lazy blob entry.
	 *
	 * @return the blob2 of this lazy blob entry
	 */
	public Blob getBlob2();

	/**
	 * Sets the blob2 of this lazy blob entry.
	 *
	 * @param blob2 the blob2 of this lazy blob entry
	 */
	public void setBlob2(Blob blob2);

}