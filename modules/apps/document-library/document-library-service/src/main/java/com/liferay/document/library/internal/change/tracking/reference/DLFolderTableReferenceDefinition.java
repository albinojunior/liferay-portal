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

package com.liferay.document.library.internal.change.tracking.reference;

import com.liferay.change.tracking.reference.TableReferenceDefinition;
import com.liferay.change.tracking.reference.builder.TableReferenceInfoBuilder;
import com.liferay.document.library.kernel.model.DLFileEntryTypeTable;
import com.liferay.document.library.kernel.model.DLFolder;
import com.liferay.document.library.kernel.model.DLFolderTable;
import com.liferay.document.library.kernel.service.persistence.DLFolderPersistence;
import com.liferay.portal.kernel.model.RepositoryTable;
import com.liferay.portal.kernel.model.UserTable;
import com.liferay.portal.kernel.service.persistence.BasePersistence;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Samuel Trong Tran
 */
@Component(service = TableReferenceDefinition.class)
public class DLFolderTableReferenceDefinition
	implements TableReferenceDefinition<DLFolderTable> {

	@Override
	public void defineTableReferences(
		TableReferenceInfoBuilder<DLFolderTable> tableReferenceInfoBuilder) {

		tableReferenceInfoBuilder.groupedModel(
			DLFolderTable.INSTANCE
		).nonreferenceColumn(
			DLFolderTable.INSTANCE.uuid
		).singleColumnReference(
			DLFolderTable.INSTANCE.repositoryId,
			RepositoryTable.INSTANCE.repositoryId
		).nonreferenceColumn(
			DLFolderTable.INSTANCE.mountPoint
		).parentColumnReference(
			DLFolderTable.INSTANCE.folderId,
			DLFolderTable.INSTANCE.parentFolderId
		).nonreferenceColumns(
			DLFolderTable.INSTANCE.treePath, DLFolderTable.INSTANCE.name,
			DLFolderTable.INSTANCE.description,
			DLFolderTable.INSTANCE.lastPostDate
		).singleColumnReference(
			DLFolderTable.INSTANCE.defaultFileEntryTypeId,
			DLFileEntryTypeTable.INSTANCE.fileEntryTypeId
		).nonreferenceColumns(
			DLFolderTable.INSTANCE.hidden,
			DLFolderTable.INSTANCE.restrictionType,
			DLFolderTable.INSTANCE.lastPublishDate,
			DLFolderTable.INSTANCE.status
		).singleColumnReference(
			DLFolderTable.INSTANCE.statusByUserId, UserTable.INSTANCE.userId
		).nonreferenceColumns(
			DLFolderTable.INSTANCE.statusByUserName,
			DLFolderTable.INSTANCE.statusDate
		).assetEntryReference(
			DLFolderTable.INSTANCE.folderId, DLFolder.class
		).resourcePermissionReference(
			DLFolderTable.INSTANCE.folderId, DLFolder.class
		);
	}

	@Override
	public BasePersistence<?> getBasePersistence() {
		return _dlFolderPersistence;
	}

	@Override
	public DLFolderTable getTable() {
		return DLFolderTable.INSTANCE;
	}

	@Reference
	private DLFolderPersistence _dlFolderPersistence;

}