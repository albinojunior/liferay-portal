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

package com.liferay.redirect.model.impl;

import com.liferay.expando.kernel.model.ExpandoBridge;
import com.liferay.expando.kernel.util.ExpandoBridgeFactoryUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.bean.AutoEscapeBeanHandler;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.CacheModel;
import com.liferay.portal.kernel.model.ModelWrapper;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.impl.BaseModelImpl;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ProxyUtil;
import com.liferay.redirect.model.RedirectNotFoundEntry;
import com.liferay.redirect.model.RedirectNotFoundEntryModel;

import java.io.Serializable;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;

import java.sql.Types;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * The base model implementation for the RedirectNotFoundEntry service. Represents a row in the &quot;RedirectNotFoundEntry&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This implementation and its corresponding interface <code>RedirectNotFoundEntryModel</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in {@link RedirectNotFoundEntryImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see RedirectNotFoundEntryImpl
 * @generated
 */
public class RedirectNotFoundEntryModelImpl
	extends BaseModelImpl<RedirectNotFoundEntry>
	implements RedirectNotFoundEntryModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a redirect not found entry model instance should use the <code>RedirectNotFoundEntry</code> interface instead.
	 */
	public static final String TABLE_NAME = "RedirectNotFoundEntry";

	public static final Object[][] TABLE_COLUMNS = {
		{"mvccVersion", Types.BIGINT},
		{"redirectNotFoundEntryId", Types.BIGINT}, {"groupId", Types.BIGINT},
		{"companyId", Types.BIGINT}, {"userId", Types.BIGINT},
		{"userName", Types.VARCHAR}, {"createDate", Types.TIMESTAMP},
		{"modifiedDate", Types.TIMESTAMP}, {"ignored", Types.BOOLEAN},
		{"url", Types.VARCHAR}
	};

	public static final Map<String, Integer> TABLE_COLUMNS_MAP =
		new HashMap<String, Integer>();

	static {
		TABLE_COLUMNS_MAP.put("mvccVersion", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("redirectNotFoundEntryId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("groupId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("companyId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("userId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("userName", Types.VARCHAR);
		TABLE_COLUMNS_MAP.put("createDate", Types.TIMESTAMP);
		TABLE_COLUMNS_MAP.put("modifiedDate", Types.TIMESTAMP);
		TABLE_COLUMNS_MAP.put("ignored", Types.BOOLEAN);
		TABLE_COLUMNS_MAP.put("url", Types.VARCHAR);
	}

	public static final String TABLE_SQL_CREATE =
		"create table RedirectNotFoundEntry (mvccVersion LONG default 0 not null,redirectNotFoundEntryId LONG not null primary key,groupId LONG,companyId LONG,userId LONG,userName VARCHAR(75) null,createDate DATE null,modifiedDate DATE null,ignored BOOLEAN,url STRING null)";

	public static final String TABLE_SQL_DROP =
		"drop table RedirectNotFoundEntry";

	public static final String ORDER_BY_JPQL =
		" ORDER BY redirectNotFoundEntry.redirectNotFoundEntryId ASC";

	public static final String ORDER_BY_SQL =
		" ORDER BY RedirectNotFoundEntry.redirectNotFoundEntryId ASC";

	public static final String DATA_SOURCE = "liferayDataSource";

	public static final String SESSION_FACTORY = "liferaySessionFactory";

	public static final String TX_MANAGER = "liferayTransactionManager";

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long GROUPID_COLUMN_BITMASK = 1L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long URL_COLUMN_BITMASK = 2L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *		#getColumnBitmask(String)
	 */
	@Deprecated
	public static final long REDIRECTNOTFOUNDENTRYID_COLUMN_BITMASK = 4L;

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	public static void setEntityCacheEnabled(boolean entityCacheEnabled) {
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	public static void setFinderCacheEnabled(boolean finderCacheEnabled) {
	}

	public RedirectNotFoundEntryModelImpl() {
	}

	@Override
	public long getPrimaryKey() {
		return _redirectNotFoundEntryId;
	}

	@Override
	public void setPrimaryKey(long primaryKey) {
		setRedirectNotFoundEntryId(primaryKey);
	}

	@Override
	public Serializable getPrimaryKeyObj() {
		return _redirectNotFoundEntryId;
	}

	@Override
	public void setPrimaryKeyObj(Serializable primaryKeyObj) {
		setPrimaryKey(((Long)primaryKeyObj).longValue());
	}

	@Override
	public Class<?> getModelClass() {
		return RedirectNotFoundEntry.class;
	}

	@Override
	public String getModelClassName() {
		return RedirectNotFoundEntry.class.getName();
	}

	@Override
	public Map<String, Object> getModelAttributes() {
		Map<String, Object> attributes = new HashMap<String, Object>();

		Map<String, Function<RedirectNotFoundEntry, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		for (Map.Entry<String, Function<RedirectNotFoundEntry, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<RedirectNotFoundEntry, Object> attributeGetterFunction =
				entry.getValue();

			attributes.put(
				attributeName,
				attributeGetterFunction.apply((RedirectNotFoundEntry)this));
		}

		return attributes;
	}

	@Override
	public void setModelAttributes(Map<String, Object> attributes) {
		Map<String, BiConsumer<RedirectNotFoundEntry, Object>>
			attributeSetterBiConsumers = getAttributeSetterBiConsumers();

		for (Map.Entry<String, Object> entry : attributes.entrySet()) {
			String attributeName = entry.getKey();

			BiConsumer<RedirectNotFoundEntry, Object>
				attributeSetterBiConsumer = attributeSetterBiConsumers.get(
					attributeName);

			if (attributeSetterBiConsumer != null) {
				attributeSetterBiConsumer.accept(
					(RedirectNotFoundEntry)this, entry.getValue());
			}
		}
	}

	public Map<String, Function<RedirectNotFoundEntry, Object>>
		getAttributeGetterFunctions() {

		return _attributeGetterFunctions;
	}

	public Map<String, BiConsumer<RedirectNotFoundEntry, Object>>
		getAttributeSetterBiConsumers() {

		return _attributeSetterBiConsumers;
	}

	private static Function<InvocationHandler, RedirectNotFoundEntry>
		_getProxyProviderFunction() {

		Class<?> proxyClass = ProxyUtil.getProxyClass(
			RedirectNotFoundEntry.class.getClassLoader(),
			RedirectNotFoundEntry.class, ModelWrapper.class);

		try {
			Constructor<RedirectNotFoundEntry> constructor =
				(Constructor<RedirectNotFoundEntry>)proxyClass.getConstructor(
					InvocationHandler.class);

			return invocationHandler -> {
				try {
					return constructor.newInstance(invocationHandler);
				}
				catch (ReflectiveOperationException
							reflectiveOperationException) {

					throw new InternalError(reflectiveOperationException);
				}
			};
		}
		catch (NoSuchMethodException noSuchMethodException) {
			throw new InternalError(noSuchMethodException);
		}
	}

	private static final Map<String, Function<RedirectNotFoundEntry, Object>>
		_attributeGetterFunctions;
	private static final Map<String, BiConsumer<RedirectNotFoundEntry, Object>>
		_attributeSetterBiConsumers;

	static {
		Map<String, Function<RedirectNotFoundEntry, Object>>
			attributeGetterFunctions =
				new LinkedHashMap
					<String, Function<RedirectNotFoundEntry, Object>>();
		Map<String, BiConsumer<RedirectNotFoundEntry, ?>>
			attributeSetterBiConsumers =
				new LinkedHashMap
					<String, BiConsumer<RedirectNotFoundEntry, ?>>();

		attributeGetterFunctions.put(
			"mvccVersion", RedirectNotFoundEntry::getMvccVersion);
		attributeSetterBiConsumers.put(
			"mvccVersion",
			(BiConsumer<RedirectNotFoundEntry, Long>)
				RedirectNotFoundEntry::setMvccVersion);
		attributeGetterFunctions.put(
			"redirectNotFoundEntryId",
			RedirectNotFoundEntry::getRedirectNotFoundEntryId);
		attributeSetterBiConsumers.put(
			"redirectNotFoundEntryId",
			(BiConsumer<RedirectNotFoundEntry, Long>)
				RedirectNotFoundEntry::setRedirectNotFoundEntryId);
		attributeGetterFunctions.put(
			"groupId", RedirectNotFoundEntry::getGroupId);
		attributeSetterBiConsumers.put(
			"groupId",
			(BiConsumer<RedirectNotFoundEntry, Long>)
				RedirectNotFoundEntry::setGroupId);
		attributeGetterFunctions.put(
			"companyId", RedirectNotFoundEntry::getCompanyId);
		attributeSetterBiConsumers.put(
			"companyId",
			(BiConsumer<RedirectNotFoundEntry, Long>)
				RedirectNotFoundEntry::setCompanyId);
		attributeGetterFunctions.put(
			"userId", RedirectNotFoundEntry::getUserId);
		attributeSetterBiConsumers.put(
			"userId",
			(BiConsumer<RedirectNotFoundEntry, Long>)
				RedirectNotFoundEntry::setUserId);
		attributeGetterFunctions.put(
			"userName", RedirectNotFoundEntry::getUserName);
		attributeSetterBiConsumers.put(
			"userName",
			(BiConsumer<RedirectNotFoundEntry, String>)
				RedirectNotFoundEntry::setUserName);
		attributeGetterFunctions.put(
			"createDate", RedirectNotFoundEntry::getCreateDate);
		attributeSetterBiConsumers.put(
			"createDate",
			(BiConsumer<RedirectNotFoundEntry, Date>)
				RedirectNotFoundEntry::setCreateDate);
		attributeGetterFunctions.put(
			"modifiedDate", RedirectNotFoundEntry::getModifiedDate);
		attributeSetterBiConsumers.put(
			"modifiedDate",
			(BiConsumer<RedirectNotFoundEntry, Date>)
				RedirectNotFoundEntry::setModifiedDate);
		attributeGetterFunctions.put(
			"ignored", RedirectNotFoundEntry::getIgnored);
		attributeSetterBiConsumers.put(
			"ignored",
			(BiConsumer<RedirectNotFoundEntry, Boolean>)
				RedirectNotFoundEntry::setIgnored);
		attributeGetterFunctions.put("url", RedirectNotFoundEntry::getUrl);
		attributeSetterBiConsumers.put(
			"url",
			(BiConsumer<RedirectNotFoundEntry, String>)
				RedirectNotFoundEntry::setUrl);

		_attributeGetterFunctions = Collections.unmodifiableMap(
			attributeGetterFunctions);
		_attributeSetterBiConsumers = Collections.unmodifiableMap(
			(Map)attributeSetterBiConsumers);
	}

	@Override
	public long getMvccVersion() {
		return _mvccVersion;
	}

	@Override
	public void setMvccVersion(long mvccVersion) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_mvccVersion = mvccVersion;
	}

	@Override
	public long getRedirectNotFoundEntryId() {
		return _redirectNotFoundEntryId;
	}

	@Override
	public void setRedirectNotFoundEntryId(long redirectNotFoundEntryId) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_redirectNotFoundEntryId = redirectNotFoundEntryId;
	}

	@Override
	public long getGroupId() {
		return _groupId;
	}

	@Override
	public void setGroupId(long groupId) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_groupId = groupId;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public long getOriginalGroupId() {
		return GetterUtil.getLong(this.<Long>getColumnOriginalValue("groupId"));
	}

	@Override
	public long getCompanyId() {
		return _companyId;
	}

	@Override
	public void setCompanyId(long companyId) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_companyId = companyId;
	}

	@Override
	public long getUserId() {
		return _userId;
	}

	@Override
	public void setUserId(long userId) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_userId = userId;
	}

	@Override
	public String getUserUuid() {
		try {
			User user = UserLocalServiceUtil.getUserById(getUserId());

			return user.getUuid();
		}
		catch (PortalException portalException) {
			return "";
		}
	}

	@Override
	public void setUserUuid(String userUuid) {
	}

	@Override
	public String getUserName() {
		if (_userName == null) {
			return "";
		}
		else {
			return _userName;
		}
	}

	@Override
	public void setUserName(String userName) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_userName = userName;
	}

	@Override
	public Date getCreateDate() {
		return _createDate;
	}

	@Override
	public void setCreateDate(Date createDate) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_createDate = createDate;
	}

	@Override
	public Date getModifiedDate() {
		return _modifiedDate;
	}

	public boolean hasSetModifiedDate() {
		return _setModifiedDate;
	}

	@Override
	public void setModifiedDate(Date modifiedDate) {
		_setModifiedDate = true;

		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_modifiedDate = modifiedDate;
	}

	@Override
	public boolean getIgnored() {
		return _ignored;
	}

	@Override
	public boolean isIgnored() {
		return _ignored;
	}

	@Override
	public void setIgnored(boolean ignored) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_ignored = ignored;
	}

	@Override
	public String getUrl() {
		if (_url == null) {
			return "";
		}
		else {
			return _url;
		}
	}

	@Override
	public void setUrl(String url) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_url = url;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public String getOriginalUrl() {
		return getColumnOriginalValue("url");
	}

	public long getColumnBitmask() {
		if (_columnBitmask > 0) {
			return _columnBitmask;
		}

		if ((_columnOriginalValues == null) ||
			(_columnOriginalValues == Collections.EMPTY_MAP)) {

			return 0;
		}

		for (Map.Entry<String, Object> entry :
				_columnOriginalValues.entrySet()) {

			if (entry.getValue() != getColumnValue(entry.getKey())) {
				_columnBitmask |= _columnBitmasks.get(entry.getKey());
			}
		}

		return _columnBitmask;
	}

	@Override
	public ExpandoBridge getExpandoBridge() {
		return ExpandoBridgeFactoryUtil.getExpandoBridge(
			getCompanyId(), RedirectNotFoundEntry.class.getName(),
			getPrimaryKey());
	}

	@Override
	public void setExpandoBridgeAttributes(ServiceContext serviceContext) {
		ExpandoBridge expandoBridge = getExpandoBridge();

		expandoBridge.setAttributes(serviceContext);
	}

	@Override
	public RedirectNotFoundEntry toEscapedModel() {
		if (_escapedModel == null) {
			Function<InvocationHandler, RedirectNotFoundEntry>
				escapedModelProxyProviderFunction =
					EscapedModelProxyProviderFunctionHolder.
						_escapedModelProxyProviderFunction;

			_escapedModel = escapedModelProxyProviderFunction.apply(
				new AutoEscapeBeanHandler(this));
		}

		return _escapedModel;
	}

	@Override
	public Object clone() {
		RedirectNotFoundEntryImpl redirectNotFoundEntryImpl =
			new RedirectNotFoundEntryImpl();

		redirectNotFoundEntryImpl.setMvccVersion(getMvccVersion());
		redirectNotFoundEntryImpl.setRedirectNotFoundEntryId(
			getRedirectNotFoundEntryId());
		redirectNotFoundEntryImpl.setGroupId(getGroupId());
		redirectNotFoundEntryImpl.setCompanyId(getCompanyId());
		redirectNotFoundEntryImpl.setUserId(getUserId());
		redirectNotFoundEntryImpl.setUserName(getUserName());
		redirectNotFoundEntryImpl.setCreateDate(getCreateDate());
		redirectNotFoundEntryImpl.setModifiedDate(getModifiedDate());
		redirectNotFoundEntryImpl.setIgnored(isIgnored());
		redirectNotFoundEntryImpl.setUrl(getUrl());

		redirectNotFoundEntryImpl.resetOriginalValues();

		return redirectNotFoundEntryImpl;
	}

	@Override
	public int compareTo(RedirectNotFoundEntry redirectNotFoundEntry) {
		long primaryKey = redirectNotFoundEntry.getPrimaryKey();

		if (getPrimaryKey() < primaryKey) {
			return -1;
		}
		else if (getPrimaryKey() > primaryKey) {
			return 1;
		}
		else {
			return 0;
		}
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof RedirectNotFoundEntry)) {
			return false;
		}

		RedirectNotFoundEntry redirectNotFoundEntry =
			(RedirectNotFoundEntry)object;

		long primaryKey = redirectNotFoundEntry.getPrimaryKey();

		if (getPrimaryKey() == primaryKey) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public int hashCode() {
		return (int)getPrimaryKey();
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	@Override
	public boolean isEntityCacheEnabled() {
		return true;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	@Override
	public boolean isFinderCacheEnabled() {
		return true;
	}

	@Override
	public void resetOriginalValues() {
		_columnOriginalValues = Collections.emptyMap();

		_setModifiedDate = false;

		_columnBitmask = 0;
	}

	@Override
	public CacheModel<RedirectNotFoundEntry> toCacheModel() {
		RedirectNotFoundEntryCacheModel redirectNotFoundEntryCacheModel =
			new RedirectNotFoundEntryCacheModel();

		redirectNotFoundEntryCacheModel.mvccVersion = getMvccVersion();

		redirectNotFoundEntryCacheModel.redirectNotFoundEntryId =
			getRedirectNotFoundEntryId();

		redirectNotFoundEntryCacheModel.groupId = getGroupId();

		redirectNotFoundEntryCacheModel.companyId = getCompanyId();

		redirectNotFoundEntryCacheModel.userId = getUserId();

		redirectNotFoundEntryCacheModel.userName = getUserName();

		String userName = redirectNotFoundEntryCacheModel.userName;

		if ((userName != null) && (userName.length() == 0)) {
			redirectNotFoundEntryCacheModel.userName = null;
		}

		Date createDate = getCreateDate();

		if (createDate != null) {
			redirectNotFoundEntryCacheModel.createDate = createDate.getTime();
		}
		else {
			redirectNotFoundEntryCacheModel.createDate = Long.MIN_VALUE;
		}

		Date modifiedDate = getModifiedDate();

		if (modifiedDate != null) {
			redirectNotFoundEntryCacheModel.modifiedDate =
				modifiedDate.getTime();
		}
		else {
			redirectNotFoundEntryCacheModel.modifiedDate = Long.MIN_VALUE;
		}

		redirectNotFoundEntryCacheModel.ignored = isIgnored();

		redirectNotFoundEntryCacheModel.url = getUrl();

		String url = redirectNotFoundEntryCacheModel.url;

		if ((url != null) && (url.length() == 0)) {
			redirectNotFoundEntryCacheModel.url = null;
		}

		return redirectNotFoundEntryCacheModel;
	}

	@Override
	public String toString() {
		Map<String, Function<RedirectNotFoundEntry, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		StringBundler sb = new StringBundler(
			(4 * attributeGetterFunctions.size()) + 2);

		sb.append("{");

		for (Map.Entry<String, Function<RedirectNotFoundEntry, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<RedirectNotFoundEntry, Object> attributeGetterFunction =
				entry.getValue();

			sb.append(attributeName);
			sb.append("=");
			sb.append(
				attributeGetterFunction.apply((RedirectNotFoundEntry)this));
			sb.append(", ");
		}

		if (sb.index() > 1) {
			sb.setIndex(sb.index() - 1);
		}

		sb.append("}");

		return sb.toString();
	}

	@Override
	public String toXmlString() {
		Map<String, Function<RedirectNotFoundEntry, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		StringBundler sb = new StringBundler(
			(5 * attributeGetterFunctions.size()) + 4);

		sb.append("<model><model-name>");
		sb.append(getModelClassName());
		sb.append("</model-name>");

		for (Map.Entry<String, Function<RedirectNotFoundEntry, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<RedirectNotFoundEntry, Object> attributeGetterFunction =
				entry.getValue();

			sb.append("<column><column-name>");
			sb.append(attributeName);
			sb.append("</column-name><column-value><![CDATA[");
			sb.append(
				attributeGetterFunction.apply((RedirectNotFoundEntry)this));
			sb.append("]]></column-value></column>");
		}

		sb.append("</model>");

		return sb.toString();
	}

	private static class EscapedModelProxyProviderFunctionHolder {

		private static final Function<InvocationHandler, RedirectNotFoundEntry>
			_escapedModelProxyProviderFunction = _getProxyProviderFunction();

	}

	private long _mvccVersion;
	private long _redirectNotFoundEntryId;
	private long _groupId;
	private long _companyId;
	private long _userId;
	private String _userName;
	private Date _createDate;
	private Date _modifiedDate;
	private boolean _setModifiedDate;
	private boolean _ignored;
	private String _url;

	public <T> T getColumnValue(String columnName) {
		Function<RedirectNotFoundEntry, Object> function =
			_attributeGetterFunctions.get(columnName);

		if (function == null) {
			throw new IllegalArgumentException(
				"No attribute getter function found for " + columnName);
		}

		return (T)function.apply((RedirectNotFoundEntry)this);
	}

	public <T> T getColumnOriginalValue(String columnName) {
		if (_columnOriginalValues == null) {
			return null;
		}

		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		return (T)_columnOriginalValues.get(columnName);
	}

	private void _setColumnOriginalValues() {
		_columnOriginalValues = new HashMap<String, Object>();

		_columnOriginalValues.put("mvccVersion", _mvccVersion);
		_columnOriginalValues.put(
			"redirectNotFoundEntryId", _redirectNotFoundEntryId);
		_columnOriginalValues.put("groupId", _groupId);
		_columnOriginalValues.put("companyId", _companyId);
		_columnOriginalValues.put("userId", _userId);
		_columnOriginalValues.put("userName", _userName);
		_columnOriginalValues.put("createDate", _createDate);
		_columnOriginalValues.put("modifiedDate", _modifiedDate);
		_columnOriginalValues.put("ignored", _ignored);
		_columnOriginalValues.put("url", _url);
	}

	private transient Map<String, Object> _columnOriginalValues;

	public static long getColumnBitmask(String columnName) {
		return _columnBitmasks.get(columnName);
	}

	private static final Map<String, Long> _columnBitmasks;

	static {
		Map<String, Long> columnBitmasks = new HashMap<>();

		columnBitmasks.put("mvccVersion", 1L);

		columnBitmasks.put("redirectNotFoundEntryId", 2L);

		columnBitmasks.put("groupId", 4L);

		columnBitmasks.put("companyId", 8L);

		columnBitmasks.put("userId", 16L);

		columnBitmasks.put("userName", 32L);

		columnBitmasks.put("createDate", 64L);

		columnBitmasks.put("modifiedDate", 128L);

		columnBitmasks.put("ignored", 256L);

		columnBitmasks.put("url", 512L);

		_columnBitmasks = Collections.unmodifiableMap(columnBitmasks);
	}

	private long _columnBitmask;
	private RedirectNotFoundEntry _escapedModel;

}