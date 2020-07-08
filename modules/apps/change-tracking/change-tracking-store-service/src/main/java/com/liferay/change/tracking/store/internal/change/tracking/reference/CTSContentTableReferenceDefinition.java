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

package com.liferay.change.tracking.store.internal.change.tracking.reference;

import com.liferay.change.tracking.reference.TableReferenceDefinition;
import com.liferay.change.tracking.reference.builder.TableReferenceInfoBuilder;
import com.liferay.change.tracking.store.model.CTSContentTable;
import com.liferay.change.tracking.store.service.persistence.CTSContentPersistence;
import com.liferay.portal.kernel.model.CompanyTable;
import com.liferay.portal.kernel.model.RepositoryTable;
import com.liferay.portal.kernel.service.persistence.BasePersistence;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Samuel Trong Tran
 */
@Component(service = TableReferenceDefinition.class)
public class CTSContentTableReferenceDefinition
	implements TableReferenceDefinition<CTSContentTable> {

	@Override
	public void defineTableReferences(
		TableReferenceInfoBuilder<CTSContentTable> tableReferenceInfoBuilder) {

		tableReferenceInfoBuilder.singleColumnReference(
			CTSContentTable.INSTANCE.companyId, CompanyTable.INSTANCE.companyId
		).singleColumnReference(
			CTSContentTable.INSTANCE.repositoryId,
			RepositoryTable.INSTANCE.repositoryId
		).nonreferenceColumns(
			CTSContentTable.INSTANCE.path, CTSContentTable.INSTANCE.version,
			CTSContentTable.INSTANCE.data, CTSContentTable.INSTANCE.size,
			CTSContentTable.INSTANCE.storeType
		);
	}

	@Override
	public BasePersistence<?> getBasePersistence() {
		return _ctsContentPersistence;
	}

	@Override
	public CTSContentTable getTable() {
		return CTSContentTable.INSTANCE;
	}

	@Reference
	private CTSContentPersistence _ctsContentPersistence;

}