/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 *
 *
 *
 */

package com.liferay.app.builder.workflow.web.internal.portlet.action;

import com.liferay.app.builder.rest.dto.v1_0.App;
import com.liferay.app.builder.workflow.rest.dto.v1_0.AppWorkflow;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.transaction.Propagation;
import com.liferay.portal.kernel.transaction.TransactionConfig;
import com.liferay.portal.kernel.transaction.TransactionInvokerUtil;
import com.liferay.portal.kernel.util.Portal;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import javax.servlet.http.HttpServletResponse;

import org.osgi.service.component.annotations.Reference;

/**
 * @author Rafael Praxedes
 */
public abstract class BaseAppBuilderAppMVCResourceCommand
	extends BaseMVCResourceCommand {

	@Override
	protected void doServeResource(
			ResourceRequest resourceRequest, ResourceResponse resourceResponse)
		throws Exception {

		try {
			TransactionInvokerUtil.invoke(
				_transactionConfig,
				() -> {
					App app = saveApp(resourceRequest);

					AppWorkflow appWorkflow = saveAppWorkflow(
						app, resourceRequest);

					JSONPortletResponseUtil.writeJSON(
						resourceRequest, resourceResponse,
						JSONUtil.put(
							"app", jsonFactory.createJSONObject(app.toString())
						).put(
							"appWorkflow",
							jsonFactory.createJSONObject(appWorkflow.toString())
						));

					return null;
				});
		}
		catch (Throwable throwable) {
			if (_log.isDebugEnabled()) {
				_log.debug(throwable, throwable);
			}

			HttpServletResponse httpServletResponse =
				portal.getHttpServletResponse(resourceResponse);

			httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			JSONPortletResponseUtil.writeJSON(
				resourceRequest, resourceResponse,
				JSONUtil.put(
					"errorMessage",
					language.get(
						portal.getHttpServletRequest(resourceRequest),
						"your-request-failed-to-complete")));
		}
	}

	protected abstract App saveApp(ResourceRequest resourceRequest)
		throws Exception;

	protected abstract AppWorkflow saveAppWorkflow(
			App app, ResourceRequest resourceRequest)
		throws Exception;

	@Reference
	protected JSONFactory jsonFactory;

	@Reference
	protected Language language;

	@Reference
	protected Portal portal;

	private static final Log _log = LogFactoryUtil.getLog(
		BaseAppBuilderAppMVCResourceCommand.class);

	private static final TransactionConfig _transactionConfig;

	static {
		TransactionConfig.Builder builder = new TransactionConfig.Builder();

		builder.setPropagation(Propagation.REQUIRES_NEW);
		builder.setRollbackForClasses(Exception.class);

		_transactionConfig = builder.build();
	}

}