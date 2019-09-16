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

package com.liferay.account.model;

import com.liferay.portal.kernel.model.ModelWrapper;
import com.liferay.portal.kernel.model.wrapper.BaseModelWrapper;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * This class is a wrapper for {@link AccountEntryUserRel}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see AccountEntryUserRel
 * @generated
 */
public class AccountEntryUserRelWrapper
	extends BaseModelWrapper<AccountEntryUserRel>
	implements AccountEntryUserRel, ModelWrapper<AccountEntryUserRel> {

	public AccountEntryUserRelWrapper(AccountEntryUserRel accountEntryUserRel) {
		super(accountEntryUserRel);
	}

	@Override
	public Map<String, Object> getModelAttributes() {
		Map<String, Object> attributes = new HashMap<String, Object>();

		attributes.put("accountEntryUserRelId", getAccountEntryUserRelId());
		attributes.put("accountEntryId", getAccountEntryId());
		attributes.put("accountUserId", getAccountUserId());

		return attributes;
	}

	@Override
	public void setModelAttributes(Map<String, Object> attributes) {
		Long accountEntryUserRelId = (Long)attributes.get(
			"accountEntryUserRelId");

		if (accountEntryUserRelId != null) {
			setAccountEntryUserRelId(accountEntryUserRelId);
		}

		Long accountEntryId = (Long)attributes.get("accountEntryId");

		if (accountEntryId != null) {
			setAccountEntryId(accountEntryId);
		}

		Long accountUserId = (Long)attributes.get("accountUserId");

		if (accountUserId != null) {
			setAccountUserId(accountUserId);
		}
	}

	/**
	 * Returns the account entry ID of this account entry user rel.
	 *
	 * @return the account entry ID of this account entry user rel
	 */
	@Override
	public long getAccountEntryId() {
		return model.getAccountEntryId();
	}

	/**
	 * Returns the account entry user rel ID of this account entry user rel.
	 *
	 * @return the account entry user rel ID of this account entry user rel
	 */
	@Override
	public long getAccountEntryUserRelId() {
		return model.getAccountEntryUserRelId();
	}

	/**
	 * Returns the account user ID of this account entry user rel.
	 *
	 * @return the account user ID of this account entry user rel
	 */
	@Override
	public long getAccountUserId() {
		return model.getAccountUserId();
	}

	/**
	 * Returns the account user uuid of this account entry user rel.
	 *
	 * @return the account user uuid of this account entry user rel
	 */
	@Override
	public String getAccountUserUuid() {
		return model.getAccountUserUuid();
	}

	/**
	 * Returns the primary key of this account entry user rel.
	 *
	 * @return the primary key of this account entry user rel
	 */
	@Override
	public long getPrimaryKey() {
		return model.getPrimaryKey();
	}

	/**
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a account entry user rel model instance should use the <code>AccountEntryUserRel</code> interface instead.
	 */
	@Override
	public void persist() {
		model.persist();
	}

	/**
	 * Sets the account entry ID of this account entry user rel.
	 *
	 * @param accountEntryId the account entry ID of this account entry user rel
	 */
	@Override
	public void setAccountEntryId(long accountEntryId) {
		model.setAccountEntryId(accountEntryId);
	}

	/**
	 * Sets the account entry user rel ID of this account entry user rel.
	 *
	 * @param accountEntryUserRelId the account entry user rel ID of this account entry user rel
	 */
	@Override
	public void setAccountEntryUserRelId(long accountEntryUserRelId) {
		model.setAccountEntryUserRelId(accountEntryUserRelId);
	}

	/**
	 * Sets the account user ID of this account entry user rel.
	 *
	 * @param accountUserId the account user ID of this account entry user rel
	 */
	@Override
	public void setAccountUserId(long accountUserId) {
		model.setAccountUserId(accountUserId);
	}

	/**
	 * Sets the account user uuid of this account entry user rel.
	 *
	 * @param accountUserUuid the account user uuid of this account entry user rel
	 */
	@Override
	public void setAccountUserUuid(String accountUserUuid) {
		model.setAccountUserUuid(accountUserUuid);
	}

	/**
	 * Sets the primary key of this account entry user rel.
	 *
	 * @param primaryKey the primary key of this account entry user rel
	 */
	@Override
	public void setPrimaryKey(long primaryKey) {
		model.setPrimaryKey(primaryKey);
	}

	@Override
	protected AccountEntryUserRelWrapper wrap(
		AccountEntryUserRel accountEntryUserRel) {

		return new AccountEntryUserRelWrapper(accountEntryUserRel);
	}

}