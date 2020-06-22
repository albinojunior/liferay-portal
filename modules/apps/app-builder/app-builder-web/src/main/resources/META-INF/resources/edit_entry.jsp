<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
AppBuilderApp appBuilderApp = (AppBuilderApp)request.getAttribute(AppBuilderWebKeys.APP);
List<Long> dataLayoutIds = (List<Long>)request.getAttribute(AppBuilderWebKeys.DATA_LAYOUT_IDS);
%>

<div class="app-builder-root">
	<clay:container-fluid
		cssClass="edit-entry"
	>
		<div id="<%= liferayPortletResponse.getNamespace() %>-control-menu"></div>

		<clay:row
			cssClass="justify-content-center"
		>
			<clay:col
				lg="12"
			>
				<div class="card card-root mb-0 mt-4 shadowless-card">
					<div class="card-body px-0">
						<aui:form>

							<%
							for (Long dataLayoutId : dataLayoutIds) {
							%>

								<liferay-data-engine:data-layout-renderer
									containerId='<%= liferayPortletResponse.getNamespace() + "container" %>'
									dataLayoutId="<%= dataLayoutId %>"
									dataRecordId='<%= ParamUtil.getLong(request, "dataRecordId") %>'
									namespace="<%= liferayPortletResponse.getNamespace() %>"
								/>

							<%
							}
							%>

							<div id="<portlet:namespace />-edit-entry-app">
								<liferay-portlet:resourceURL copyCurrentRenderParameters="<%= false %>" id="/app_builder/add_data_record" var="addEntryURL" />

								<%
								Map<String, Object> data = HashMapBuilder.<String, Object>put(
									"addEntryURL", String.valueOf(addEntryURL)
								).put(
									"appDeploymentType", request.getAttribute(AppBuilderWebKeys.APP_DEPLOYMENT_TYPE)
								).put(
									"appId", appBuilderApp.getAppBuilderAppId()
								).put(
									"appTab", request.getAttribute(AppBuilderWebKeys.APP_TAB)
								).put(
									"basePortletURL", String.valueOf(renderResponse.createRenderURL())
								).put(
									"containerElementId", renderResponse.getNamespace() + "container"
								).put(
									"controlMenuElementId", liferayPortletResponse.getNamespace() + "-control-menu"
								).put(
									"dataDefinitionId", appBuilderApp.getDdmStructureId()
								).put(
									"dataLayoutId", appBuilderApp.getDdmStructureLayoutId()
								).put(
									"dataListViewId", appBuilderApp.getDeDataListViewId()
								).put(
									"dataRecordId", ParamUtil.getLong(request, "dataRecordId")
								).put(
									"namespace", liferayPortletResponse.getNamespace()
								).put(
									"redirect", ParamUtil.getString(request, "redirect")
								).put(
									"showFormView", request.getAttribute(AppBuilderWebKeys.SHOW_FORM_VIEW)
								).put(
									"showTableView", request.getAttribute(AppBuilderWebKeys.SHOW_TABLE_VIEW)
								).build();
								%>

								<react:component
									data="<%= data %>"
									module="js/pages/entry/EditEntryApp.es"
								/>
							</div>
						</aui:form>
					</div>
				</div>
			</clay:col>
		</clay:row>
	</clay:container-fluid>
</div>