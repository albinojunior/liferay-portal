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

package com.liferay.portal.kernel.service;

import com.liferay.portal.kernel.bean.PortalBeanLocatorUtil;

/**
 * Provides the local service utility for LayoutSetBranch. This utility wraps
 * <code>com.liferay.portal.service.impl.LayoutSetBranchLocalServiceImpl</code> and
 * is an access point for service operations in application layer code running
 * on the local server. Methods of this service will not have security checks
 * based on the propagated JAAS credentials because this service can only be
 * accessed from within the same VM.
 *
 * @author Brian Wing Shun Chan
 * @see LayoutSetBranchLocalService
 * @generated
 */
public class LayoutSetBranchLocalServiceUtil {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this class directly. Add custom service methods to <code>com.liferay.portal.service.impl.LayoutSetBranchLocalServiceImpl</code> and rerun ServiceBuilder to regenerate this class.
	 */

	/**
	 * Adds the layout set branch to the database. Also notifies the appropriate model listeners.
	 *
	 * <p>
	 * <strong>Important:</strong> Inspect LayoutSetBranchLocalServiceImpl for overloaded versions of the method. If provided, use these entry points to the API, as the implementation logic may require the additional parameters defined there.
	 * </p>
	 *
	 * @param layoutSetBranch the layout set branch
	 * @return the layout set branch that was added
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
		addLayoutSetBranch(
			com.liferay.portal.kernel.model.LayoutSetBranch layoutSetBranch) {

		return getService().addLayoutSetBranch(layoutSetBranch);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			addLayoutSetBranch(
				long userId, long groupId, boolean privateLayout, String name,
				String description, boolean master, long copyLayoutSetBranchId,
				ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().addLayoutSetBranch(
			userId, groupId, privateLayout, name, description, master,
			copyLayoutSetBranchId, serviceContext);
	}

	/**
	 * Creates a new layout set branch with the primary key. Does not add the layout set branch to the database.
	 *
	 * @param layoutSetBranchId the primary key for the new layout set branch
	 * @return the new layout set branch
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
		createLayoutSetBranch(long layoutSetBranchId) {

		return getService().createLayoutSetBranch(layoutSetBranchId);
	}

	/**
	 * @throws PortalException
	 */
	public static com.liferay.portal.kernel.model.PersistedModel
			createPersistedModel(java.io.Serializable primaryKeyObj)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().createPersistedModel(primaryKeyObj);
	}

	/**
	 * Deletes the layout set branch from the database. Also notifies the appropriate model listeners.
	 *
	 * <p>
	 * <strong>Important:</strong> Inspect LayoutSetBranchLocalServiceImpl for overloaded versions of the method. If provided, use these entry points to the API, as the implementation logic may require the additional parameters defined there.
	 * </p>
	 *
	 * @param layoutSetBranch the layout set branch
	 * @return the layout set branch that was removed
	 * @throws PortalException
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
			deleteLayoutSetBranch(
				com.liferay.portal.kernel.model.LayoutSetBranch layoutSetBranch)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deleteLayoutSetBranch(layoutSetBranch);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			deleteLayoutSetBranch(
				com.liferay.portal.kernel.model.LayoutSetBranch layoutSetBranch,
				boolean includeMaster)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deleteLayoutSetBranch(
			layoutSetBranch, includeMaster);
	}

	/**
	 * Deletes the layout set branch with the primary key from the database. Also notifies the appropriate model listeners.
	 *
	 * <p>
	 * <strong>Important:</strong> Inspect LayoutSetBranchLocalServiceImpl for overloaded versions of the method. If provided, use these entry points to the API, as the implementation logic may require the additional parameters defined there.
	 * </p>
	 *
	 * @param layoutSetBranchId the primary key of the layout set branch
	 * @return the layout set branch that was removed
	 * @throws PortalException if a layout set branch with the primary key could not be found
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
			deleteLayoutSetBranch(long layoutSetBranchId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deleteLayoutSetBranch(layoutSetBranchId);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			deleteLayoutSetBranch(
				long currentLayoutPlid,
				com.liferay.portal.kernel.model.LayoutSetBranch layoutSetBranch,
				boolean includeMaster)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deleteLayoutSetBranch(
			currentLayoutPlid, layoutSetBranch, includeMaster);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			deleteLayoutSetBranch(
				long currentLayoutPlid, long layoutSetBranchId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deleteLayoutSetBranch(
			currentLayoutPlid, layoutSetBranchId);
	}

	public static void deleteLayoutSetBranches(
			long groupId, boolean privateLayout)
		throws com.liferay.portal.kernel.exception.PortalException {

		getService().deleteLayoutSetBranches(groupId, privateLayout);
	}

	public static void deleteLayoutSetBranches(
			long groupId, boolean privateLayout, boolean includeMaster)
		throws com.liferay.portal.kernel.exception.PortalException {

		getService().deleteLayoutSetBranches(
			groupId, privateLayout, includeMaster);
	}

	/**
	 * @throws PortalException
	 */
	public static com.liferay.portal.kernel.model.PersistedModel
			deletePersistedModel(
				com.liferay.portal.kernel.model.PersistedModel persistedModel)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().deletePersistedModel(persistedModel);
	}

	public static <T> T dslQuery(
		com.liferay.petra.sql.dsl.query.DSLQuery dslQuery) {

		return getService().dslQuery(dslQuery);
	}

	public static com.liferay.portal.kernel.dao.orm.DynamicQuery
		dynamicQuery() {

		return getService().dynamicQuery();
	}

	/**
	 * Performs a dynamic query on the database and returns the matching rows.
	 *
	 * @param dynamicQuery the dynamic query
	 * @return the matching rows
	 */
	public static <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery) {

		return getService().dynamicQuery(dynamicQuery);
	}

	/**
	 * Performs a dynamic query on the database and returns a range of the matching rows.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to <code>com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS</code> will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent, then the query will include the default ORDER BY logic from <code>com.liferay.portal.model.impl.LayoutSetBranchModelImpl</code>.
	 * </p>
	 *
	 * @param dynamicQuery the dynamic query
	 * @param start the lower bound of the range of model instances
	 * @param end the upper bound of the range of model instances (not inclusive)
	 * @return the range of matching rows
	 */
	public static <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end) {

		return getService().dynamicQuery(dynamicQuery, start, end);
	}

	/**
	 * Performs a dynamic query on the database and returns an ordered range of the matching rows.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to <code>com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS</code> will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent, then the query will include the default ORDER BY logic from <code>com.liferay.portal.model.impl.LayoutSetBranchModelImpl</code>.
	 * </p>
	 *
	 * @param dynamicQuery the dynamic query
	 * @param start the lower bound of the range of model instances
	 * @param end the upper bound of the range of model instances (not inclusive)
	 * @param orderByComparator the comparator to order the results by (optionally <code>null</code>)
	 * @return the ordered range of matching rows
	 */
	public static <T> java.util.List<T> dynamicQuery(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery, int start,
		int end,
		com.liferay.portal.kernel.util.OrderByComparator<T> orderByComparator) {

		return getService().dynamicQuery(
			dynamicQuery, start, end, orderByComparator);
	}

	/**
	 * Returns the number of rows matching the dynamic query.
	 *
	 * @param dynamicQuery the dynamic query
	 * @return the number of rows matching the dynamic query
	 */
	public static long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery) {

		return getService().dynamicQueryCount(dynamicQuery);
	}

	/**
	 * Returns the number of rows matching the dynamic query.
	 *
	 * @param dynamicQuery the dynamic query
	 * @param projection the projection to apply to the query
	 * @return the number of rows matching the dynamic query
	 */
	public static long dynamicQueryCount(
		com.liferay.portal.kernel.dao.orm.DynamicQuery dynamicQuery,
		com.liferay.portal.kernel.dao.orm.Projection projection) {

		return getService().dynamicQueryCount(dynamicQuery, projection);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
		fetchLayoutSetBranch(long layoutSetBranchId) {

		return getService().fetchLayoutSetBranch(layoutSetBranchId);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
		fetchLayoutSetBranch(long groupId, boolean privateLayout, String name) {

		return getService().fetchLayoutSetBranch(groupId, privateLayout, name);
	}

	public static com.liferay.portal.kernel.dao.orm.ActionableDynamicQuery
		getActionableDynamicQuery() {

		return getService().getActionableDynamicQuery();
	}

	public static
		com.liferay.portal.kernel.dao.orm.IndexableActionableDynamicQuery
			getIndexableActionableDynamicQuery() {

		return getService().getIndexableActionableDynamicQuery();
	}

	/**
	 * Returns the layout set branch with the primary key.
	 *
	 * @param layoutSetBranchId the primary key of the layout set branch
	 * @return the layout set branch
	 * @throws PortalException if a layout set branch with the primary key could not be found
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
			getLayoutSetBranch(long layoutSetBranchId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getLayoutSetBranch(layoutSetBranchId);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			getLayoutSetBranch(long groupId, boolean privateLayout, String name)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getLayoutSetBranch(groupId, privateLayout, name);
	}

	public static java.util.List
		<com.liferay.portal.kernel.model.LayoutSetBranch> getLayoutSetBranches(
			long groupId, boolean privateLayout) {

		return getService().getLayoutSetBranches(groupId, privateLayout);
	}

	/**
	 * Returns a range of all the layout set branches.
	 *
	 * <p>
	 * Useful when paginating results. Returns a maximum of <code>end - start</code> instances. <code>start</code> and <code>end</code> are not primary keys, they are indexes in the result set. Thus, <code>0</code> refers to the first result in the set. Setting both <code>start</code> and <code>end</code> to <code>com.liferay.portal.kernel.dao.orm.QueryUtil#ALL_POS</code> will return the full result set. If <code>orderByComparator</code> is specified, then the query will include the given ORDER BY logic. If <code>orderByComparator</code> is absent, then the query will include the default ORDER BY logic from <code>com.liferay.portal.model.impl.LayoutSetBranchModelImpl</code>.
	 * </p>
	 *
	 * @param start the lower bound of the range of layout set branches
	 * @param end the upper bound of the range of layout set branches (not inclusive)
	 * @return the range of layout set branches
	 */
	public static java.util.List
		<com.liferay.portal.kernel.model.LayoutSetBranch> getLayoutSetBranchs(
			int start, int end) {

		return getService().getLayoutSetBranchs(start, end);
	}

	/**
	 * Returns the number of layout set branches.
	 *
	 * @return the number of layout set branches
	 */
	public static int getLayoutSetBranchsCount() {
		return getService().getLayoutSetBranchsCount();
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			getMasterLayoutSetBranch(long groupId, boolean privateLayout)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getMasterLayoutSetBranch(groupId, privateLayout);
	}

	/**
	 * Returns the OSGi service identifier.
	 *
	 * @return the OSGi service identifier
	 */
	public static String getOSGiServiceIdentifier() {
		return getService().getOSGiServiceIdentifier();
	}

	/**
	 * @throws PortalException
	 */
	public static com.liferay.portal.kernel.model.PersistedModel
			getPersistedModel(java.io.Serializable primaryKeyObj)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getPersistedModel(primaryKeyObj);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			getUserLayoutSetBranch(
				long userId, long groupId, boolean privateLayout,
				long layoutSetId, long layoutSetBranchId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getUserLayoutSetBranch(
			userId, groupId, privateLayout, layoutSetId, layoutSetBranchId);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			mergeLayoutSetBranch(
				long layoutSetBranchId, long mergeLayoutSetBranchId,
				ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().mergeLayoutSetBranch(
			layoutSetBranchId, mergeLayoutSetBranchId, serviceContext);
	}

	/**
	 * Updates the layout set branch in the database or adds it if it does not yet exist. Also notifies the appropriate model listeners.
	 *
	 * <p>
	 * <strong>Important:</strong> Inspect LayoutSetBranchLocalServiceImpl for overloaded versions of the method. If provided, use these entry points to the API, as the implementation logic may require the additional parameters defined there.
	 * </p>
	 *
	 * @param layoutSetBranch the layout set branch
	 * @return the layout set branch that was updated
	 */
	public static com.liferay.portal.kernel.model.LayoutSetBranch
		updateLayoutSetBranch(
			com.liferay.portal.kernel.model.LayoutSetBranch layoutSetBranch) {

		return getService().updateLayoutSetBranch(layoutSetBranch);
	}

	public static com.liferay.portal.kernel.model.LayoutSetBranch
			updateLayoutSetBranch(
				long layoutSetBranchId, String name, String description,
				ServiceContext serviceContext)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().updateLayoutSetBranch(
			layoutSetBranchId, name, description, serviceContext);
	}

	public static LayoutSetBranchLocalService getService() {
		if (_service == null) {
			_service =
				(LayoutSetBranchLocalService)PortalBeanLocatorUtil.locate(
					LayoutSetBranchLocalService.class.getName());
		}

		return _service;
	}

	private static LayoutSetBranchLocalService _service;

}