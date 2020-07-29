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

package com.liferay.app.builder.workflow.rest.internal.resource.v1_0;

import com.liferay.app.builder.model.AppBuilderAppDataRecordLink;
import com.liferay.app.builder.model.AppBuilderAppVersion;
import com.liferay.app.builder.service.AppBuilderAppDataRecordLinkLocalService;
import com.liferay.app.builder.service.AppBuilderAppVersionLocalService;
import com.liferay.app.builder.workflow.rest.dto.v1_0.AppWorkflowDataRecordLink;
import com.liferay.app.builder.workflow.rest.dto.v1_0.DataRecordIds;
import com.liferay.app.builder.workflow.rest.internal.dto.v1_0.util.AppWorkflowUtil;
import com.liferay.app.builder.workflow.rest.resource.v1_0.AppWorkflowDataRecordLinkResource;
import com.liferay.app.builder.workflow.service.AppBuilderWorkflowTaskLinkLocalService;
import com.liferay.portal.kernel.service.RoleLocalService;
import com.liferay.portal.kernel.workflow.WorkflowDefinition;
import com.liferay.portal.kernel.workflow.WorkflowDefinitionManager;
import com.liferay.portal.kernel.workflow.WorkflowInstance;
import com.liferay.portal.kernel.workflow.WorkflowInstanceManager;
import com.liferay.portal.vulcan.pagination.Page;
import com.liferay.portal.workflow.kaleo.definition.export.builder.DefinitionBuilder;

import java.util.Collections;
import java.util.List;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

/**
 * @author Rafael Praxedes
 */
@Component(
	properties = "OSGI-INF/liferay/rest/v1_0/app-workflow-data-record-link.properties",
	scope = ServiceScope.PROTOTYPE,
	service = AppWorkflowDataRecordLinkResource.class
)
public class AppWorkflowDataRecordLinkResourceImpl
	extends BaseAppWorkflowDataRecordLinkResourceImpl {

	@Override
	public Page<AppWorkflowDataRecordLink> postAppAppWorkflowDataRecordLinksPage(
		Long appId, DataRecordIds dataRecordIds) throws Exception {

		if (dataRecordIds == null || dataRecordIds.getDataRecordIds() == null) {
			return Page.of(Collections.emptyList());
		}

		return Page.of(
			transform(
				_appBuilderAppDataRecordLinkLocalService.
					getAppBuilderAppDataRecordLinks(
						appId,
						_toLongArray(dataRecordIds.getDataRecordIds())),
				this::_toAppWorkflowDataRecordLink));
	}

	private AppWorkflowDataRecordLink _toAppWorkflowDataRecordLink(
			AppBuilderAppDataRecordLink appBuilderAppDataRecordLink)
		throws Exception {

		List<WorkflowInstance> workflowInstances =
			_workflowInstanceManager.getWorkflowInstances(
				contextCompany.getCompanyId(), null, null,
				appBuilderAppDataRecordLink.getDdlRecordId(), false, 0, 1,
				null);

		WorkflowInstance workflowInstance = workflowInstances.get(0);

		WorkflowDefinition workflowDefinition =
			_workflowDefinitionManager.getWorkflowDefinition(
				contextCompany.getCompanyId(),
				workflowInstance.getWorkflowDefinitionName(),
				workflowInstance.getWorkflowDefinitionVersion());

		AppBuilderAppVersion appBuilderAppVersion =
			_appBuilderAppVersionLocalService.getAppBuilderAppVersion(
				appBuilderAppDataRecordLink.getAppBuilderAppVersionId());

		return new AppWorkflowDataRecordLink() {
			{
				appWorkflow = AppWorkflowUtil.toAppWorkflow(
					appBuilderAppVersion,
					_appBuilderWorkflowTaskLinkLocalService.
						getAppBuilderWorkflowTaskLinks(
							appBuilderAppDataRecordLink.getAppBuilderAppId(),
							appBuilderAppVersion.getAppBuilderAppVersionId()),
					appBuilderAppDataRecordLink.getAppBuilderAppId(),
					_definitionBuilder.buildDefinition(
						contextCompany.getCompanyId(),
						workflowInstance.getWorkflowDefinitionName(),
						workflowInstance.getWorkflowDefinitionVersion()),
					_roleLocalService::fetchRole,
					workflowDefinition.getWorkflowDefinitionId());
				dataRecordId = appBuilderAppDataRecordLink.getDdlRecordId();
			}
		};
	}

	private long[] _toLongArray(Long[] dataRecordIds) {
		long[] newArray = new long[dataRecordIds.length];

		for (int i = 0; i < dataRecordIds.length; i++) {
			Long dataRecordId = dataRecordIds[i];

			newArray[i] = dataRecordId.longValue();
		}

		return newArray;
	}


	@Reference
	private DefinitionBuilder _definitionBuilder;

	@Reference
	private AppBuilderWorkflowTaskLinkLocalService
		_appBuilderWorkflowTaskLinkLocalService;

	@Reference
	private AppBuilderAppDataRecordLinkLocalService _appBuilderAppDataRecordLinkLocalService;

	@Reference
	private AppBuilderAppVersionLocalService
		_appBuilderAppVersionLocalService;

	@Reference
	private WorkflowInstanceManager _workflowInstanceManager;

	@Reference
	private WorkflowDefinitionManager _workflowDefinitionManager;

	@Reference
	private RoleLocalService _roleLocalService;
}