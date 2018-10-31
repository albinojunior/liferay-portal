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

package com.liferay.bean.portlet.cdi.extension.internal;

import com.liferay.bean.portlet.cdi.extension.internal.scope.ScopedBeanManager;
import com.liferay.bean.portlet.cdi.extension.internal.scope.ScopedBeanManagerThreadLocal;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.async.PortletAsyncScopeManager;

import java.io.Closeable;
import java.io.IOException;

import java.util.Deque;

import javax.portlet.PortletConfig;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

/**
 * @author Neil Griffin
 */
public class PortletAsyncScopeManagerImpl implements PortletAsyncScopeManager {

	public PortletAsyncScopeManagerImpl(
		ResourceRequest resourceRequest, ResourceResponse resourceResponse,
		PortletConfig portletConfig,
		Deque<ScopedBeanManager> scopedBeanManagerStack) {

		_resourceRequest = resourceRequest;
		_resourceResponse = resourceResponse;
		_portletConfig = portletConfig;
		_scopedBeanManagerStack = scopedBeanManagerStack;
	}

	@Override
	public void activateScopeContexts() {
		if (_closeable != null) {
			throw new IllegalStateException(
				"Allready called activateScopeContexts()");
		}

		_closeable = ScopedBeanManagerThreadLocal.install(
			new ScopedBeanManager(
				_resourceRequest, _resourceResponse, _portletConfig));
	}

	@Override
	public void deactivateScopeContexts() {
		if (_closeable == null) {
			throw new IllegalStateException(
				"Call activateScopeContexts() first");
		}

		try {
			_closeable.close();
		}
		catch (IOException ioe) {
			_log.error(ioe, ioe);
		}
	}

	@Override
	public void setAsyncProcessingStarted() {
		ScopedBeanManagerThreadLocal.setCurrentStack(_scopedBeanManagerStack);
	}

	private static final Log _log = LogFactoryUtil.getLog(
		PortletAsyncScopeManagerImpl.class);

	private Closeable _closeable;
	private final PortletConfig _portletConfig;
	private final ResourceRequest _resourceRequest;
	private final ResourceResponse _resourceResponse;
	private final Deque<ScopedBeanManager> _scopedBeanManagerStack;

}