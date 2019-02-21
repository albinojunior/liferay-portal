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

package com.liferay.portal.workflow.task.web.internal.notifications;

import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.json.JSONFactoryImpl;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.model.UserNotificationEvent;
import com.liferay.portal.kernel.model.UserNotificationEventWrapper;
import com.liferay.portal.kernel.security.permission.PermissionChecker;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserNotificationEventLocalService;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.Html;
import com.liferay.portal.kernel.util.HtmlUtil;
import com.liferay.portal.kernel.util.ProxyFactory;
import com.liferay.portal.kernel.workflow.BaseWorkflowHandler;
import com.liferay.portal.kernel.workflow.DefaultWorkflowTask;
import com.liferay.portal.kernel.workflow.WorkflowHandler;
import com.liferay.portal.kernel.workflow.WorkflowTask;
import com.liferay.portal.kernel.workflow.WorkflowTaskManagerUtil;
import com.liferay.portal.workflow.task.web.internal.permission.WorkflowTaskPermissionChecker;
import com.liferay.registry.BasicRegistryImpl;
import com.liferay.registry.Registry;
import com.liferay.registry.RegistryUtil;
import com.liferay.registry.ServiceRegistration;

import java.io.Serializable;

import java.lang.reflect.Field;

import java.util.Collections;
import java.util.Locale;
import java.util.Map;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.core.classloader.annotations.SuppressStaticInitializationFor;
import org.powermock.modules.junit4.PowerMockRunner;

/**
 * @author Inácio Nery
 */
@PrepareForTest(WorkflowTaskManagerUtil.class)
@RunWith(PowerMockRunner.class)
@SuppressStaticInitializationFor(
	"com.liferay.portal.kernel.workflow.WorkflowTaskManagerUtil"
)
public class WorkflowTaskUserNotificationHandlerTest extends PowerMockito {

	@BeforeClass
	public static void setUpClass() {
		RegistryUtil.setRegistry(new BasicRegistryImpl());
	}

	@Before
	public void setUp() throws Exception {
		_serviceContext = new ServiceContext() {

			public ThemeDisplay getThemeDisplay() {
				ThemeDisplay themeDisplay = new ThemeDisplay();

				themeDisplay.setSiteGroupId(RandomTestUtil.randomLong());

				return themeDisplay;
			}

		};

		setUpHtmlUtil();
		setUpJSONFactoryUtil();
		setUpUserNotificationEventLocalService();
		setUpWorkflowTaskManagerUtil();
		setUpWorkflowTaskPermissionChecker();
		setUpWorkflowHandlerRegistryUtil();

		_notificationMessage = RandomTestUtil.randomString();
	}

	@After
	public void tearDown() {
		if (_serviceRegistration != null) {
			_serviceRegistration.unregister();
		}
	}

	@Test
	public void testInvalidWorkflowTaskIdShouldReturnBlankBody()
		throws Exception {

		Assert.assertEquals(
			StringPool.BLANK,
			_workflowTaskUserNotificationHandler.getBody(
				mockUserNotificationEvent(_INVALID_WORKFLOW_TASK_ID),
				_serviceContext));
	}

	@Test
	public void testInvalidWorkflowTaskIdShouldReturnLink() throws Exception {
		Assert.assertEquals(
			_VALID_LINK,
			_workflowTaskUserNotificationHandler.getLink(
				mockUserNotificationEvent(
					_VALID_ENTRY_CLASS_NAME, _INVALID_WORKFLOW_TASK_ID),
				_serviceContext));
	}

	@Test
	public void testNullWorkflowTaskIdShouldReturnBlankLink() throws Exception {
		Assert.assertEquals(
			StringPool.BLANK,
			_workflowTaskUserNotificationHandler.getLink(
				mockUserNotificationEvent(_VALID_ENTRY_CLASS_NAME, 0L),
				_serviceContext));
	}

	@Test
	public void testNullWorkflowTaskIdShouldReturnBody() throws Exception {
		Assert.assertEquals(
			_notificationMessage,
			_workflowTaskUserNotificationHandler.getBody(
				mockUserNotificationEvent(0), _serviceContext));
	}

	@Test
	public void testValidWorkflowTaskIdShouldReturnBody() throws Exception {
		Assert.assertEquals(
			_notificationMessage,
			_workflowTaskUserNotificationHandler.getBody(
				mockUserNotificationEvent(_VALID_WORKFLOW_TASK_ID),
				_serviceContext));
	}

	@Test
	public void testValidWorkflowTaskIdShouldReturnLink() throws Exception {
		Assert.assertEquals(
			_VALID_LINK,
			_workflowTaskUserNotificationHandler.getLink(
				mockUserNotificationEvent(
					_VALID_ENTRY_CLASS_NAME, _VALID_WORKFLOW_TASK_ID),
				_serviceContext));
	}

	protected UserNotificationEvent mockUserNotificationEvent(
		long workflowTaskId) {

		return mockUserNotificationEvent(null, workflowTaskId);
	}

	protected UserNotificationEvent mockUserNotificationEvent(
		String entryClassName, Long workflowTaskId) {

		JSONObject jsonObject = _jsonFactory.createJSONObject();

		jsonObject.put("entryClassName", entryClassName);
		jsonObject.put("notificationMessage", _notificationMessage);
		jsonObject.put("workflowTaskId", workflowTaskId);

		UserNotificationEvent userNotificationEvent =
			new UserNotificationEventWrapper(null) {

				@Override
				public String getPayload() {
					return jsonObject.toJSONString();
				}

				@Override
				public long getUserNotificationEventId() {
					return 0;
				}

			};

		return userNotificationEvent;
	}

	protected WorkflowHandler mockWorkflowHandler() {
		return new BaseWorkflowHandler() {

			@Override
			public String getClassName() {
				return _VALID_ENTRY_CLASS_NAME;
			}

			@Override
			public String getType(Locale locale) {
				return null;
			}

			@Override
			public String getURLEditWorkflowTask(
				long workflowTaskId, ServiceContext serviceContext) {

				if (_serviceContext == serviceContext) {
					return _VALID_LINK;
				}

				return null;
			}

			@Override
			public Object updateStatus(int status, Map workflowContext) {
				return null;
			}

		};
	}

	protected void setUpHtmlUtil() {
		HtmlUtil htmlUtil = new HtmlUtil();

		htmlUtil.setHtml(_html);

		when(
			_html.escape(Matchers.anyString())
		).then(
			new Answer<String>() {

				@Override
				public String answer(InvocationOnMock invocationOnMock)
					throws Throwable {

					return invocationOnMock.getArgumentAt(0, String.class);
				}

			}
		);
	}

	protected void setUpJSONFactoryUtil() {
		JSONFactoryUtil jsonFactoryUtil = new JSONFactoryUtil();

		jsonFactoryUtil.setJSONFactory(_jsonFactory);
	}

	protected void setUpUserNotificationEventLocalService() throws Exception {
		_workflowTaskUserNotificationHandler.
			setUserNotificationEventLocalService(
				ProxyFactory.newDummyInstance(
					UserNotificationEventLocalService.class));
	}

	protected void setUpWorkflowHandlerRegistryUtil() throws Exception {
		Registry registry = RegistryUtil.getRegistry();

		_serviceRegistration = registry.registerService(
			WorkflowHandler.class, mockWorkflowHandler());
	}

	protected void setUpWorkflowTaskManagerUtil() throws PortalException {
		mockStatic(WorkflowTaskManagerUtil.class);

		when(
			WorkflowTaskManagerUtil.fetchWorkflowTask(
				Matchers.anyLong(), Matchers.eq(_INVALID_WORKFLOW_TASK_ID))
		).thenReturn(
			null
		);

		when(
			WorkflowTaskManagerUtil.fetchWorkflowTask(
				Matchers.anyLong(), Matchers.eq(_VALID_WORKFLOW_TASK_ID))
		).thenReturn(
			new DefaultWorkflowTask() {

				@Override
				public Map<String, Serializable> getOptionalAttributes() {
					return Collections.emptyMap();
				}

			}
		);
	}

	protected void setUpWorkflowTaskPermissionChecker() throws Exception {
		WorkflowTaskPermissionChecker workflowTaskPermissionChecker =
			new WorkflowTaskPermissionChecker() {

				@Override
				public boolean hasPermission(
					long groupId, WorkflowTask workflowTask,
					PermissionChecker permissionChecker) {

					return true;
				}

			};

		Field field = ReflectionUtil.getDeclaredField(
			_workflowTaskUserNotificationHandler.getClass(),
			"_workflowTaskPermissionChecker");

		field.set(
			_workflowTaskUserNotificationHandler,
			workflowTaskPermissionChecker);
	}

	private static final Long _INVALID_WORKFLOW_TASK_ID =
		RandomTestUtil.randomLong();

	private static final String _VALID_ENTRY_CLASS_NAME =
		RandomTestUtil.randomString();

	private static final String _VALID_LINK = RandomTestUtil.randomString();

	private static final Long _VALID_WORKFLOW_TASK_ID =
		RandomTestUtil.randomLong();

	@Mock
	private Html _html;

	private final JSONFactory _jsonFactory = new JSONFactoryImpl();
	private String _notificationMessage;
	private ServiceContext _serviceContext;
	private ServiceRegistration<WorkflowHandler> _serviceRegistration;
	private final WorkflowTaskUserNotificationHandler
		_workflowTaskUserNotificationHandler =
			new WorkflowTaskUserNotificationHandler();

}