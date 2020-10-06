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

package com.liferay.commerce.bom.service;

import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.util.tracker.ServiceTracker;

/**
 * Provides the remote service utility for CommerceBOMFolder. This utility wraps
 * <code>com.liferay.commerce.bom.service.impl.CommerceBOMFolderServiceImpl</code> and is an
 * access point for service operations in application layer code running on a
 * remote server. Methods of this service are expected to have security checks
 * based on the propagated JAAS credentials because this service can be
 * accessed remotely.
 *
 * @author Luca Pellizzon
 * @see CommerceBOMFolderService
 * @generated
 */
public class CommerceBOMFolderServiceUtil {

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this class directly. Add custom service methods to <code>com.liferay.commerce.bom.service.impl.CommerceBOMFolderServiceImpl</code> and rerun ServiceBuilder to regenerate this class.
	 */
	public static com.liferay.commerce.bom.model.CommerceBOMFolder
			addCommerceBOMFolder(
				long userId, long parentCommerceBOMFolderId, String name,
				boolean logo, byte[] logoBytes)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().addCommerceBOMFolder(
			userId, parentCommerceBOMFolderId, name, logo, logoBytes);
	}

	public static void deleteCommerceBOMFolder(long commerceBOMFolderId)
		throws com.liferay.portal.kernel.exception.PortalException {

		getService().deleteCommerceBOMFolder(commerceBOMFolderId);
	}

	public static com.liferay.commerce.bom.model.CommerceBOMFolder
			getCommerceBOMFolder(long commerceBOMFolderId)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().getCommerceBOMFolder(commerceBOMFolderId);
	}

	public static java.util.List
		<com.liferay.commerce.bom.model.CommerceBOMFolder>
			getCommerceBOMFolders(long companyId, int start, int end) {

		return getService().getCommerceBOMFolders(companyId, start, end);
	}

	public static java.util.List
		<com.liferay.commerce.bom.model.CommerceBOMFolder>
			getCommerceBOMFolders(
				long companyId, long parentCommerceBOMFolderId, int start,
				int end) {

		return getService().getCommerceBOMFolders(
			companyId, parentCommerceBOMFolderId, start, end);
	}

	public static int getCommerceBOMFoldersCount(long companyId) {
		return getService().getCommerceBOMFoldersCount(companyId);
	}

	public static int getCommerceBOMFoldersCount(
		long companyId, long parentCommerceBOMFolderId) {

		return getService().getCommerceBOMFoldersCount(
			companyId, parentCommerceBOMFolderId);
	}

	/**
	 * Returns the OSGi service identifier.
	 *
	 * @return the OSGi service identifier
	 */
	public static String getOSGiServiceIdentifier() {
		return getService().getOSGiServiceIdentifier();
	}

	public static com.liferay.commerce.bom.model.CommerceBOMFolder
			updateCommerceBOMFolder(
				long commerceBOMFolderId, String name, boolean logo,
				byte[] logoBytes)
		throws com.liferay.portal.kernel.exception.PortalException {

		return getService().updateCommerceBOMFolder(
			commerceBOMFolderId, name, logo, logoBytes);
	}

	public static CommerceBOMFolderService getService() {
		return _serviceTracker.getService();
	}

	private static ServiceTracker
		<CommerceBOMFolderService, CommerceBOMFolderService> _serviceTracker;

	static {
		Bundle bundle = FrameworkUtil.getBundle(CommerceBOMFolderService.class);

		ServiceTracker<CommerceBOMFolderService, CommerceBOMFolderService>
			serviceTracker =
				new ServiceTracker
					<CommerceBOMFolderService, CommerceBOMFolderService>(
						bundle.getBundleContext(),
						CommerceBOMFolderService.class, null);

		serviceTracker.open();

		_serviceTracker = serviceTracker;
	}

}