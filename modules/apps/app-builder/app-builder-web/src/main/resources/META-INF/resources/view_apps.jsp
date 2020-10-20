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

<liferay-util:html-top>
	<link href="<%= PortalUtil.getStaticResourceURL(request, PortalUtil.getPathModule() + "/data-engine-taglib/data_layout_builder/css/main.css") %>" rel="stylesheet" />
</liferay-util:html-top>

<div id="<portlet:namespace />-app-builder-root">
	<liferay-portlet:resourceURL copyCurrentRenderParameters="<%= false %>" var="baseResourceURL" />

	<liferay-portlet:renderURL portletName="<%= AppBuilderPortletKeys.OBJECTS %>" var="objectsPortletURL" />

	<liferay-portlet:renderURL  portletName="<%= AppBuilderPortletKeys.OBJECTS %>" var="editKaleoDefinitionURL" windowState="<%= LiferayWindowState.POP_UP.toString() %>">
		<portlet:param name="mvcRenderCommandName" value="/edit_form_view" />
		<portlet:param name="dataDefinitionId" value="46116" />
	</liferay-portlet:renderURL>

	<%-- <liferay-portlet:renderURL  portletName="<%= KaleoDesignerPortletKeys.KALEO_DESIGNER %>" var="editKaleoDefinitionURL" windowState="<%= LiferayWindowState.POP_UP.toString() %>">
		<portlet:param name="mvcPath" value="/designer/edit_kaleo_definition_version.jsp" />
	</liferay-portlet:renderURL> --%>

	<react:component
		module="js/pages/apps/index.es"
		props='<%=
			HashMapBuilder.<String, Object>put(
				"appsTabs", request.getAttribute(AppBuilderWebKeys.APPS_TABS)
			).put(
				"basePortletURL", String.valueOf(renderResponse.createRenderURL())
			).put(
				"baseResourceURL", String.valueOf(baseResourceURL)
			).put(
				"defaultDelta", PropsValues.SEARCH_CONTAINER_PAGE_DEFAULT_DELTA
			).put(
				"deltaValues", PropsValues.SEARCH_CONTAINER_PAGE_DELTA_VALUES
			).put(
				"editKaleoDefinitionURL", String.valueOf(editKaleoDefinitionURL)
			).put(
				"objectsPortletURL", String.valueOf(objectsPortletURL)
			).put(
				"pathFriendlyURLPublic", PortalUtil.getPathFriendlyURLPublic()
			).put(
				"showTranslationManager", request.getAttribute(AppBuilderWebKeys.SHOW_TRANSLATION_MANAGER)
			).put(
				"userId", themeDisplay.getUserId()
			).build()
		%>'
	/>
</div>