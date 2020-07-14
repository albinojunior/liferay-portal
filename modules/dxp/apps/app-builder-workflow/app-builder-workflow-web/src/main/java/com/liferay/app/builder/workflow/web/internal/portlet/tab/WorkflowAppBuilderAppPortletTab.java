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

package com.liferay.app.builder.workflow.web.internal.portlet.tab;

import com.liferay.app.builder.model.AppBuilderApp;
import com.liferay.app.builder.portlet.tab.AppBuilderAppPortletTab;
import com.liferay.app.builder.workflow.model.AppBuilderWorkflowTaskLink;
import com.liferay.app.builder.workflow.service.AppBuilderWorkflowTaskLinkLocalService;
import com.liferay.dynamic.data.lists.model.DDLRecord;
import com.liferay.dynamic.data.mapping.model.DDMStructureLayout;
import com.liferay.dynamic.data.mapping.service.DDMStructureLayoutService;
import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.WorkflowInstanceLink;
import com.liferay.portal.kernel.security.permission.ResourceActionsUtil;
import com.liferay.portal.kernel.service.WorkflowInstanceLinkLocalService;

import java.util.AbstractMap;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Inácio Nery
 */
@Component(
	immediate = true, property = "app.builder.app.tab.name=workflow",
	service = AppBuilderAppPortletTab.class
)
public class WorkflowAppBuilderAppPortletTab
	implements AppBuilderAppPortletTab {

	@Override
	public List<Long> getDataLayoutIds(
		AppBuilderApp appBuilderApp, long dataRecordId) {

		WorkflowInstanceLink workflowInstanceLink =
			_workflowInstanceLinkLocalService.fetchWorkflowInstanceLink(
				appBuilderApp.getCompanyId(), appBuilderApp.getGroupId(),
				ResourceActionsUtil.getCompositeModelName(
					AppBuilderApp.class.getName(), DDLRecord.class.getName()),
				dataRecordId);

		if (workflowInstanceLink == null) {
			return Collections.singletonList(
				appBuilderApp.getDdmStructureLayoutId());
		}

		return Stream.of(
			_appBuilderWorkflowTaskLinkLocalService.
				getAppBuilderWorkflowTaskLinks(
					appBuilderApp.getAppBuilderAppId())
		).flatMap(
			List::stream
		).map(
			AppBuilderWorkflowTaskLink::getDdmStructureLayoutId
		).collect(
			Collectors.toList()
		);
	}

	@Override
	public Map<DDMStructureLayout, Boolean> getDataLayouts(
			AppBuilderApp appBuilderApp, long dataRecordId)
		throws PortalException {

		WorkflowInstanceLink workflowInstanceLink =
			_workflowInstanceLinkLocalService.fetchWorkflowInstanceLink(
				appBuilderApp.getCompanyId(), appBuilderApp.getGroupId(),
				ResourceActionsUtil.getCompositeModelName(
					AppBuilderApp.class.getName(), DDLRecord.class.getName()),
				dataRecordId);

		if (workflowInstanceLink == null) {
			return Collections.singletonMap(
				_ddmStructureLayoutService.getDDMStructureLayout(
					appBuilderApp.getDdmStructureLayoutId()),
				false);
		}

		return Stream.of(
			_appBuilderWorkflowTaskLinkLocalService.
				getAppBuilderWorkflowTaskLinks(
					appBuilderApp.getAppBuilderAppId())
		).flatMap(
			List::stream
		).map(
			appBuilderWorkflowTask -> {
				DDMStructureLayout ddmStructureLayout;

				try {
					ddmStructureLayout =
						_ddmStructureLayoutService.getDDMStructureLayout(
							appBuilderApp.getDdmStructureLayoutId());
				}
				catch (PortalException portalException) {
					if (_log.isDebugEnabled()) {
						_log.debug(portalException, portalException);
					}

					return null;
				}

				return new AbstractMap.SimpleEntry<>(
					ddmStructureLayout, appBuilderWorkflowTask.getReadOnly());
			}
		).filter(
			Objects::nonNull
		).collect(
			LinkedHashMap::new,
			(map, entry) -> map.put(entry.getKey(), entry.getValue()),
			Map::putAll
		);
	}

	@Override
	public String getEditEntryPoint() {
		return _npmResolver.resolveModuleName(
			"app-builder-workflow-web/js/pages/entry/EditEntry.es");
	}

	@Override
	public String getListEntryPoint() {
		return _npmResolver.resolveModuleName(
			"app-builder-workflow-web/js/pages/entry/ListEntries.es");
	}

	@Override
	public String getViewEntryPoint() {
		return _npmResolver.resolveModuleName(
			"app-builder-workflow-web/js/pages/entry/ViewEntry.es");
	}

	@Reference
	private AppBuilderWorkflowTaskLinkLocalService
		_appBuilderWorkflowTaskLinkLocalService;

	@Reference
	private DDMStructureLayoutService _ddmStructureLayoutService;

	@Reference
	private NPMResolver _npmResolver;

	@Reference
	private WorkflowInstanceLinkLocalService _workflowInstanceLinkLocalService;

	private static final Log _log = LogFactoryUtil.getLog(
		WorkflowAppBuilderAppPortletTab.class);

}