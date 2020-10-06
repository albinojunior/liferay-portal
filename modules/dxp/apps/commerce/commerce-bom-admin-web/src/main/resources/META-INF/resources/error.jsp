<%--
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
--%>

<%@ include file="/init.jsp" %>

<liferay-ui:error-header />

<liferay-ui:error exception="<%= NoSuchBOMDefinitionException.class %>" message="the-definition-could-not-be-found" />
<liferay-ui:error exception="<%= NoSuchBOMFolderApplicationRelException.class %>" message="the-model-could-not-be-found" />
<liferay-ui:error exception="<%= NoSuchBOMFolderException.class %>" message="the-folder-could-not-be-found" />

<liferay-ui:error-principal />