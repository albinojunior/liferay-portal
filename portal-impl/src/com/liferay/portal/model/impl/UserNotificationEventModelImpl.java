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

package com.liferay.portal.model.impl;

import com.liferay.expando.kernel.model.ExpandoBridge;
import com.liferay.expando.kernel.util.ExpandoBridgeFactoryUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.bean.AutoEscapeBeanHandler;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.CacheModel;
import com.liferay.portal.kernel.model.ModelWrapper;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.UserNotificationEvent;
import com.liferay.portal.kernel.model.UserNotificationEventModel;
import com.liferay.portal.kernel.model.impl.BaseModelImpl;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ProxyUtil;

import java.io.Serializable;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;

import java.sql.Types;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * The base model implementation for the UserNotificationEvent service. Represents a row in the &quot;UserNotificationEvent&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This implementation and its corresponding interface <code>UserNotificationEventModel</code> exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in {@link UserNotificationEventImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see UserNotificationEventImpl
 * @generated
 */
public class UserNotificationEventModelImpl
	extends BaseModelImpl<UserNotificationEvent>
	implements UserNotificationEventModel {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a user notification event model instance should use the <code>UserNotificationEvent</code> interface instead.
	 */
	public static final String TABLE_NAME = "UserNotificationEvent";

	public static final Object[][] TABLE_COLUMNS = {
		{"mvccVersion", Types.BIGINT}, {"uuid_", Types.VARCHAR},
		{"userNotificationEventId", Types.BIGINT}, {"companyId", Types.BIGINT},
		{"userId", Types.BIGINT}, {"type_", Types.VARCHAR},
		{"timestamp", Types.BIGINT}, {"deliveryType", Types.INTEGER},
		{"deliverBy", Types.BIGINT}, {"delivered", Types.BOOLEAN},
		{"payload", Types.CLOB}, {"actionRequired", Types.BOOLEAN},
		{"archived", Types.BOOLEAN}
	};

	public static final Map<String, Integer> TABLE_COLUMNS_MAP =
		new HashMap<String, Integer>();

	static {
		TABLE_COLUMNS_MAP.put("mvccVersion", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("uuid_", Types.VARCHAR);
		TABLE_COLUMNS_MAP.put("userNotificationEventId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("companyId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("userId", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("type_", Types.VARCHAR);
		TABLE_COLUMNS_MAP.put("timestamp", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("deliveryType", Types.INTEGER);
		TABLE_COLUMNS_MAP.put("deliverBy", Types.BIGINT);
		TABLE_COLUMNS_MAP.put("delivered", Types.BOOLEAN);
		TABLE_COLUMNS_MAP.put("payload", Types.CLOB);
		TABLE_COLUMNS_MAP.put("actionRequired", Types.BOOLEAN);
		TABLE_COLUMNS_MAP.put("archived", Types.BOOLEAN);
	}

	public static final String TABLE_SQL_CREATE =
		"create table UserNotificationEvent (mvccVersion LONG default 0 not null,uuid_ VARCHAR(75) null,userNotificationEventId LONG not null primary key,companyId LONG,userId LONG,type_ VARCHAR(200) null,timestamp LONG,deliveryType INTEGER,deliverBy LONG,delivered BOOLEAN,payload TEXT null,actionRequired BOOLEAN,archived BOOLEAN)";

	public static final String TABLE_SQL_DROP =
		"drop table UserNotificationEvent";

	public static final String ORDER_BY_JPQL =
		" ORDER BY userNotificationEvent.timestamp DESC";

	public static final String ORDER_BY_SQL =
		" ORDER BY UserNotificationEvent.timestamp DESC";

	public static final String DATA_SOURCE = "liferayDataSource";

	public static final String SESSION_FACTORY = "liferaySessionFactory";

	public static final String TX_MANAGER = "liferayTransactionManager";

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	public static final boolean ENTITY_CACHE_ENABLED = true;

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	public static final boolean FINDER_CACHE_ENABLED = true;

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	public static final boolean COLUMN_BITMASK_ENABLED = true;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long ACTIONREQUIRED_COLUMN_BITMASK = 1L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long ARCHIVED_COLUMN_BITMASK = 2L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long COMPANYID_COLUMN_BITMASK = 4L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long DELIVERED_COLUMN_BITMASK = 8L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long DELIVERYTYPE_COLUMN_BITMASK = 16L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long TYPE_COLUMN_BITMASK = 32L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long USERID_COLUMN_BITMASK = 64L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link #getColumnBitmask(String)
	 */
	@Deprecated
	public static final long UUID_COLUMN_BITMASK = 128L;

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *		#getColumnBitmask(String)
	 */
	@Deprecated
	public static final long TIMESTAMP_COLUMN_BITMASK = 256L;

	public static final long LOCK_EXPIRATION_TIME = GetterUtil.getLong(
		com.liferay.portal.util.PropsUtil.get(
			"lock.expiration.time.com.liferay.portal.kernel.model.UserNotificationEvent"));

	public UserNotificationEventModelImpl() {
	}

	@Override
	public long getPrimaryKey() {
		return _userNotificationEventId;
	}

	@Override
	public void setPrimaryKey(long primaryKey) {
		setUserNotificationEventId(primaryKey);
	}

	@Override
	public Serializable getPrimaryKeyObj() {
		return _userNotificationEventId;
	}

	@Override
	public void setPrimaryKeyObj(Serializable primaryKeyObj) {
		setPrimaryKey(((Long)primaryKeyObj).longValue());
	}

	@Override
	public Class<?> getModelClass() {
		return UserNotificationEvent.class;
	}

	@Override
	public String getModelClassName() {
		return UserNotificationEvent.class.getName();
	}

	@Override
	public Map<String, Object> getModelAttributes() {
		Map<String, Object> attributes = new HashMap<String, Object>();

		Map<String, Function<UserNotificationEvent, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		for (Map.Entry<String, Function<UserNotificationEvent, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<UserNotificationEvent, Object> attributeGetterFunction =
				entry.getValue();

			attributes.put(
				attributeName,
				attributeGetterFunction.apply((UserNotificationEvent)this));
		}

		return attributes;
	}

	@Override
	public void setModelAttributes(Map<String, Object> attributes) {
		Map<String, BiConsumer<UserNotificationEvent, Object>>
			attributeSetterBiConsumers = getAttributeSetterBiConsumers();

		for (Map.Entry<String, Object> entry : attributes.entrySet()) {
			String attributeName = entry.getKey();

			BiConsumer<UserNotificationEvent, Object>
				attributeSetterBiConsumer = attributeSetterBiConsumers.get(
					attributeName);

			if (attributeSetterBiConsumer != null) {
				attributeSetterBiConsumer.accept(
					(UserNotificationEvent)this, entry.getValue());
			}
		}
	}

	public Map<String, Function<UserNotificationEvent, Object>>
		getAttributeGetterFunctions() {

		return _attributeGetterFunctions;
	}

	public Map<String, BiConsumer<UserNotificationEvent, Object>>
		getAttributeSetterBiConsumers() {

		return _attributeSetterBiConsumers;
	}

	private static Function<InvocationHandler, UserNotificationEvent>
		_getProxyProviderFunction() {

		Class<?> proxyClass = ProxyUtil.getProxyClass(
			UserNotificationEvent.class.getClassLoader(),
			UserNotificationEvent.class, ModelWrapper.class);

		try {
			Constructor<UserNotificationEvent> constructor =
				(Constructor<UserNotificationEvent>)proxyClass.getConstructor(
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

	private static final Map<String, Function<UserNotificationEvent, Object>>
		_attributeGetterFunctions;
	private static final Map<String, BiConsumer<UserNotificationEvent, Object>>
		_attributeSetterBiConsumers;

	static {
		Map<String, Function<UserNotificationEvent, Object>>
			attributeGetterFunctions =
				new LinkedHashMap
					<String, Function<UserNotificationEvent, Object>>();
		Map<String, BiConsumer<UserNotificationEvent, ?>>
			attributeSetterBiConsumers =
				new LinkedHashMap
					<String, BiConsumer<UserNotificationEvent, ?>>();

		attributeGetterFunctions.put(
			"mvccVersion", UserNotificationEvent::getMvccVersion);
		attributeSetterBiConsumers.put(
			"mvccVersion",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setMvccVersion);
		attributeGetterFunctions.put("uuid", UserNotificationEvent::getUuid);
		attributeSetterBiConsumers.put(
			"uuid",
			(BiConsumer<UserNotificationEvent, String>)
				UserNotificationEvent::setUuid);
		attributeGetterFunctions.put(
			"userNotificationEventId",
			UserNotificationEvent::getUserNotificationEventId);
		attributeSetterBiConsumers.put(
			"userNotificationEventId",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setUserNotificationEventId);
		attributeGetterFunctions.put(
			"companyId", UserNotificationEvent::getCompanyId);
		attributeSetterBiConsumers.put(
			"companyId",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setCompanyId);
		attributeGetterFunctions.put(
			"userId", UserNotificationEvent::getUserId);
		attributeSetterBiConsumers.put(
			"userId",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setUserId);
		attributeGetterFunctions.put("type", UserNotificationEvent::getType);
		attributeSetterBiConsumers.put(
			"type",
			(BiConsumer<UserNotificationEvent, String>)
				UserNotificationEvent::setType);
		attributeGetterFunctions.put(
			"timestamp", UserNotificationEvent::getTimestamp);
		attributeSetterBiConsumers.put(
			"timestamp",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setTimestamp);
		attributeGetterFunctions.put(
			"deliveryType", UserNotificationEvent::getDeliveryType);
		attributeSetterBiConsumers.put(
			"deliveryType",
			(BiConsumer<UserNotificationEvent, Integer>)
				UserNotificationEvent::setDeliveryType);
		attributeGetterFunctions.put(
			"deliverBy", UserNotificationEvent::getDeliverBy);
		attributeSetterBiConsumers.put(
			"deliverBy",
			(BiConsumer<UserNotificationEvent, Long>)
				UserNotificationEvent::setDeliverBy);
		attributeGetterFunctions.put(
			"delivered", UserNotificationEvent::getDelivered);
		attributeSetterBiConsumers.put(
			"delivered",
			(BiConsumer<UserNotificationEvent, Boolean>)
				UserNotificationEvent::setDelivered);
		attributeGetterFunctions.put(
			"payload", UserNotificationEvent::getPayload);
		attributeSetterBiConsumers.put(
			"payload",
			(BiConsumer<UserNotificationEvent, String>)
				UserNotificationEvent::setPayload);
		attributeGetterFunctions.put(
			"actionRequired", UserNotificationEvent::getActionRequired);
		attributeSetterBiConsumers.put(
			"actionRequired",
			(BiConsumer<UserNotificationEvent, Boolean>)
				UserNotificationEvent::setActionRequired);
		attributeGetterFunctions.put(
			"archived", UserNotificationEvent::getArchived);
		attributeSetterBiConsumers.put(
			"archived",
			(BiConsumer<UserNotificationEvent, Boolean>)
				UserNotificationEvent::setArchived);

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
	public String getUuid() {
		if (_uuid == null) {
			return "";
		}
		else {
			return _uuid;
		}
	}

	@Override
	public void setUuid(String uuid) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_uuid = uuid;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public String getOriginalUuid() {
		return getColumnOriginalValue("uuid_");
	}

	@Override
	public long getUserNotificationEventId() {
		return _userNotificationEventId;
	}

	@Override
	public void setUserNotificationEventId(long userNotificationEventId) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_userNotificationEventId = userNotificationEventId;
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

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public long getOriginalCompanyId() {
		return GetterUtil.getLong(
			this.<Long>getColumnOriginalValue("companyId"));
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

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public long getOriginalUserId() {
		return GetterUtil.getLong(this.<Long>getColumnOriginalValue("userId"));
	}

	@Override
	public String getType() {
		if (_type == null) {
			return "";
		}
		else {
			return _type;
		}
	}

	@Override
	public void setType(String type) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_type = type;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public String getOriginalType() {
		return getColumnOriginalValue("type_");
	}

	@Override
	public long getTimestamp() {
		return _timestamp;
	}

	@Override
	public void setTimestamp(long timestamp) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_timestamp = timestamp;
	}

	@Override
	public int getDeliveryType() {
		return _deliveryType;
	}

	@Override
	public void setDeliveryType(int deliveryType) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_deliveryType = deliveryType;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public int getOriginalDeliveryType() {
		return GetterUtil.getInteger(
			this.<Integer>getColumnOriginalValue("deliveryType"));
	}

	@Override
	public long getDeliverBy() {
		return _deliverBy;
	}

	@Override
	public void setDeliverBy(long deliverBy) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_deliverBy = deliverBy;
	}

	@Override
	public boolean getDelivered() {
		return _delivered;
	}

	@Override
	public boolean isDelivered() {
		return _delivered;
	}

	@Override
	public void setDelivered(boolean delivered) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_delivered = delivered;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public boolean getOriginalDelivered() {
		return GetterUtil.getBoolean(
			this.<Boolean>getColumnOriginalValue("delivered"));
	}

	@Override
	public String getPayload() {
		if (_payload == null) {
			return "";
		}
		else {
			return _payload;
		}
	}

	@Override
	public void setPayload(String payload) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_payload = payload;
	}

	@Override
	public boolean getActionRequired() {
		return _actionRequired;
	}

	@Override
	public boolean isActionRequired() {
		return _actionRequired;
	}

	@Override
	public void setActionRequired(boolean actionRequired) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_actionRequired = actionRequired;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public boolean getOriginalActionRequired() {
		return GetterUtil.getBoolean(
			this.<Boolean>getColumnOriginalValue("actionRequired"));
	}

	@Override
	public boolean getArchived() {
		return _archived;
	}

	@Override
	public boolean isArchived() {
		return _archived;
	}

	@Override
	public void setArchived(boolean archived) {
		if (_columnOriginalValues == Collections.EMPTY_MAP) {
			_setColumnOriginalValues();
		}

		_archived = archived;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), replaced by {@link
	 *             #getColumnOriginalValue(String)}
	 */
	@Deprecated
	public boolean getOriginalArchived() {
		return GetterUtil.getBoolean(
			this.<Boolean>getColumnOriginalValue("archived"));
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
			getCompanyId(), UserNotificationEvent.class.getName(),
			getPrimaryKey());
	}

	@Override
	public void setExpandoBridgeAttributes(ServiceContext serviceContext) {
		ExpandoBridge expandoBridge = getExpandoBridge();

		expandoBridge.setAttributes(serviceContext);
	}

	@Override
	public UserNotificationEvent toEscapedModel() {
		if (_escapedModel == null) {
			Function<InvocationHandler, UserNotificationEvent>
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
		UserNotificationEventImpl userNotificationEventImpl =
			new UserNotificationEventImpl();

		userNotificationEventImpl.setMvccVersion(getMvccVersion());
		userNotificationEventImpl.setUuid(getUuid());
		userNotificationEventImpl.setUserNotificationEventId(
			getUserNotificationEventId());
		userNotificationEventImpl.setCompanyId(getCompanyId());
		userNotificationEventImpl.setUserId(getUserId());
		userNotificationEventImpl.setType(getType());
		userNotificationEventImpl.setTimestamp(getTimestamp());
		userNotificationEventImpl.setDeliveryType(getDeliveryType());
		userNotificationEventImpl.setDeliverBy(getDeliverBy());
		userNotificationEventImpl.setDelivered(isDelivered());
		userNotificationEventImpl.setPayload(getPayload());
		userNotificationEventImpl.setActionRequired(isActionRequired());
		userNotificationEventImpl.setArchived(isArchived());

		userNotificationEventImpl.resetOriginalValues();

		return userNotificationEventImpl;
	}

	@Override
	public int compareTo(UserNotificationEvent userNotificationEvent) {
		int value = 0;

		if (getTimestamp() < userNotificationEvent.getTimestamp()) {
			value = -1;
		}
		else if (getTimestamp() > userNotificationEvent.getTimestamp()) {
			value = 1;
		}
		else {
			value = 0;
		}

		value = value * -1;

		if (value != 0) {
			return value;
		}

		return 0;
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof UserNotificationEvent)) {
			return false;
		}

		UserNotificationEvent userNotificationEvent =
			(UserNotificationEvent)object;

		long primaryKey = userNotificationEvent.getPrimaryKey();

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
		return ENTITY_CACHE_ENABLED;
	}

	/**
	 * @deprecated As of Athanasius (7.3.x), with no direct replacement
	 */
	@Deprecated
	@Override
	public boolean isFinderCacheEnabled() {
		return FINDER_CACHE_ENABLED;
	}

	@Override
	public void resetOriginalValues() {
		_columnOriginalValues = Collections.emptyMap();

		_columnBitmask = 0;
	}

	@Override
	public CacheModel<UserNotificationEvent> toCacheModel() {
		UserNotificationEventCacheModel userNotificationEventCacheModel =
			new UserNotificationEventCacheModel();

		userNotificationEventCacheModel.mvccVersion = getMvccVersion();

		userNotificationEventCacheModel.uuid = getUuid();

		String uuid = userNotificationEventCacheModel.uuid;

		if ((uuid != null) && (uuid.length() == 0)) {
			userNotificationEventCacheModel.uuid = null;
		}

		userNotificationEventCacheModel.userNotificationEventId =
			getUserNotificationEventId();

		userNotificationEventCacheModel.companyId = getCompanyId();

		userNotificationEventCacheModel.userId = getUserId();

		userNotificationEventCacheModel.type = getType();

		String type = userNotificationEventCacheModel.type;

		if ((type != null) && (type.length() == 0)) {
			userNotificationEventCacheModel.type = null;
		}

		userNotificationEventCacheModel.timestamp = getTimestamp();

		userNotificationEventCacheModel.deliveryType = getDeliveryType();

		userNotificationEventCacheModel.deliverBy = getDeliverBy();

		userNotificationEventCacheModel.delivered = isDelivered();

		userNotificationEventCacheModel.payload = getPayload();

		String payload = userNotificationEventCacheModel.payload;

		if ((payload != null) && (payload.length() == 0)) {
			userNotificationEventCacheModel.payload = null;
		}

		userNotificationEventCacheModel.actionRequired = isActionRequired();

		userNotificationEventCacheModel.archived = isArchived();

		return userNotificationEventCacheModel;
	}

	@Override
	public String toString() {
		Map<String, Function<UserNotificationEvent, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		StringBundler sb = new StringBundler(
			(4 * attributeGetterFunctions.size()) + 2);

		sb.append("{");

		for (Map.Entry<String, Function<UserNotificationEvent, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<UserNotificationEvent, Object> attributeGetterFunction =
				entry.getValue();

			sb.append(attributeName);
			sb.append("=");
			sb.append(
				attributeGetterFunction.apply((UserNotificationEvent)this));
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
		Map<String, Function<UserNotificationEvent, Object>>
			attributeGetterFunctions = getAttributeGetterFunctions();

		StringBundler sb = new StringBundler(
			(5 * attributeGetterFunctions.size()) + 4);

		sb.append("<model><model-name>");
		sb.append(getModelClassName());
		sb.append("</model-name>");

		for (Map.Entry<String, Function<UserNotificationEvent, Object>> entry :
				attributeGetterFunctions.entrySet()) {

			String attributeName = entry.getKey();
			Function<UserNotificationEvent, Object> attributeGetterFunction =
				entry.getValue();

			sb.append("<column><column-name>");
			sb.append(attributeName);
			sb.append("</column-name><column-value><![CDATA[");
			sb.append(
				attributeGetterFunction.apply((UserNotificationEvent)this));
			sb.append("]]></column-value></column>");
		}

		sb.append("</model>");

		return sb.toString();
	}

	private static class EscapedModelProxyProviderFunctionHolder {

		private static final Function<InvocationHandler, UserNotificationEvent>
			_escapedModelProxyProviderFunction = _getProxyProviderFunction();

	}

	private long _mvccVersion;
	private String _uuid;
	private long _userNotificationEventId;
	private long _companyId;
	private long _userId;
	private String _type;
	private long _timestamp;
	private int _deliveryType;
	private long _deliverBy;
	private boolean _delivered;
	private String _payload;
	private boolean _actionRequired;
	private boolean _archived;

	public <T> T getColumnValue(String columnName) {
		columnName = _attributeNames.getOrDefault(columnName, columnName);

		Function<UserNotificationEvent, Object> function =
			_attributeGetterFunctions.get(columnName);

		if (function == null) {
			throw new IllegalArgumentException(
				"No attribute getter function found for " + columnName);
		}

		return (T)function.apply((UserNotificationEvent)this);
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
		_columnOriginalValues.put("uuid_", _uuid);
		_columnOriginalValues.put(
			"userNotificationEventId", _userNotificationEventId);
		_columnOriginalValues.put("companyId", _companyId);
		_columnOriginalValues.put("userId", _userId);
		_columnOriginalValues.put("type_", _type);
		_columnOriginalValues.put("timestamp", _timestamp);
		_columnOriginalValues.put("deliveryType", _deliveryType);
		_columnOriginalValues.put("deliverBy", _deliverBy);
		_columnOriginalValues.put("delivered", _delivered);
		_columnOriginalValues.put("payload", _payload);
		_columnOriginalValues.put("actionRequired", _actionRequired);
		_columnOriginalValues.put("archived", _archived);
	}

	private static final Map<String, String> _attributeNames;

	static {
		Map<String, String> attributeNames = new HashMap<>();

		attributeNames.put("uuid_", "uuid");
		attributeNames.put("type_", "type");

		_attributeNames = Collections.unmodifiableMap(attributeNames);
	}

	private transient Map<String, Object> _columnOriginalValues;

	public static long getColumnBitmask(String columnName) {
		return _columnBitmasks.get(columnName);
	}

	private static final Map<String, Long> _columnBitmasks;

	static {
		Map<String, Long> columnBitmasks = new HashMap<>();

		columnBitmasks.put("mvccVersion", 1L);

		columnBitmasks.put("uuid_", 2L);

		columnBitmasks.put("userNotificationEventId", 4L);

		columnBitmasks.put("companyId", 8L);

		columnBitmasks.put("userId", 16L);

		columnBitmasks.put("type_", 32L);

		columnBitmasks.put("timestamp", 64L);

		columnBitmasks.put("deliveryType", 128L);

		columnBitmasks.put("deliverBy", 256L);

		columnBitmasks.put("delivered", 512L);

		columnBitmasks.put("payload", 1024L);

		columnBitmasks.put("actionRequired", 2048L);

		columnBitmasks.put("archived", 4096L);

		_columnBitmasks = Collections.unmodifiableMap(columnBitmasks);
	}

	private long _columnBitmask;
	private UserNotificationEvent _escapedModel;

}