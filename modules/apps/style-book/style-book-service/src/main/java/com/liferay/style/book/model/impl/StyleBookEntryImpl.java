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

package com.liferay.style.book.model.impl;

import com.liferay.document.library.kernel.util.DLUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portletfilerepository.PortletFileRepositoryUtil;
import com.liferay.portal.kernel.repository.model.FileEntry;
import com.liferay.portal.kernel.theme.ThemeDisplay;

/**
 * @author Eudaldo Alonso
 */
public class StyleBookEntryImpl extends StyleBookEntryBaseImpl {

	@Override
	public String getImagePreviewURL(ThemeDisplay themeDisplay) {
		if (getPreviewFileEntryId() <= 0) {
			return StringPool.BLANK;
		}

		try {
			FileEntry fileEntry = PortletFileRepositoryUtil.getPortletFileEntry(
				getPreviewFileEntryId());

			if (fileEntry == null) {
				return StringPool.BLANK;
			}

			return DLUtil.getImagePreviewURL(fileEntry, themeDisplay);
		}
		catch (Exception exception) {
			_log.error("Unable to get image preview URL", exception);
		}

		return StringPool.BLANK;
	}

	private static final Log _log = LogFactoryUtil.getLog(
		StyleBookEntryImpl.class);

}