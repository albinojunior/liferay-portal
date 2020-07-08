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

package com.liferay.style.book.service.impl;

import com.liferay.document.library.kernel.service.DLAppLocalService;
import com.liferay.petra.string.CharPool;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.aop.AopService;
import com.liferay.portal.dao.orm.custom.sql.CustomSQL;
import com.liferay.portal.kernel.dao.orm.WildcardMode;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.model.ModelHintsUtil;
import com.liferay.portal.kernel.model.Repository;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.portletfilerepository.PortletFileRepositoryUtil;
import com.liferay.portal.kernel.repository.model.FileEntry;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.OrderByComparator;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.style.book.constants.StyleBookPortletKeys;
import com.liferay.style.book.exception.DuplicateStyleBookEntryNameKeyException;
import com.liferay.style.book.exception.StyleBookEntryNameException;
import com.liferay.style.book.model.StyleBookEntry;
import com.liferay.style.book.service.base.StyleBookEntryLocalServiceBaseImpl;

import java.util.Date;
import java.util.List;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Eudaldo Alonso
 * @see StyleBookEntryLocalServiceBaseImpl
 */
@Component(
	property = "model.class.name=com.liferay.style.book.model.StyleBookEntry",
	service = AopService.class
)
public class StyleBookEntryLocalServiceImpl
	extends StyleBookEntryLocalServiceBaseImpl {

	@Override
	public StyleBookEntry addStyleBookEntry(
			long userId, long groupId, String name, String styleBookEntryKey,
			ServiceContext serviceContext)
		throws PortalException {

		User user = userLocalService.getUser(userId);

		long companyId = user.getCompanyId();

		if (serviceContext != null) {
			companyId = serviceContext.getCompanyId();
		}
		else {
			serviceContext = new ServiceContext();
		}

		validate(name);

		if (Validator.isNull(styleBookEntryKey)) {
			styleBookEntryKey = _generateStyleBookEntryKey(groupId, name);
		}

		styleBookEntryKey = _getStyleBookEntryKey(styleBookEntryKey);

		validateStyleBookEntryKey(groupId, styleBookEntryKey);

		long styleBookEntryId = counterLocalService.increment();

		StyleBookEntry styleBookEntry = styleBookEntryPersistence.create(
			styleBookEntryId);

		styleBookEntry.setGroupId(groupId);
		styleBookEntry.setCompanyId(companyId);
		styleBookEntry.setUserId(user.getUserId());
		styleBookEntry.setUserName(user.getFullName());
		styleBookEntry.setCreateDate(serviceContext.getCreateDate(new Date()));
		styleBookEntry.setName(name);
		styleBookEntry.setStyleBookEntryKey(styleBookEntryKey);

		return styleBookEntryPersistence.update(styleBookEntry);
	}

	@Override
	public StyleBookEntry copyStyleBookEntry(
			long userId, long groupId, long styleBookEntryId,
			ServiceContext serviceContext)
		throws PortalException {

		StyleBookEntry styleBookEntry = getStyleBookEntry(styleBookEntryId);

		StringBundler sb = new StringBundler(5);

		sb.append(styleBookEntry.getName());
		sb.append(StringPool.SPACE);
		sb.append(StringPool.OPEN_PARENTHESIS);
		sb.append(LanguageUtil.get(LocaleUtil.getMostRelevantLocale(), "copy"));
		sb.append(StringPool.CLOSE_PARENTHESIS);

		String name = sb.toString();

		StyleBookEntry copyStyleBookEntry = addStyleBookEntry(
			userId, groupId, name, StringPool.BLANK, serviceContext);

		_copyStyleBookEntryPreviewFileEntry(
			userId, groupId, styleBookEntry, copyStyleBookEntry);

		return copyStyleBookEntry;
	}

	@Override
	public StyleBookEntry deleteStyleBookEntry(long styleBookEntryId)
		throws PortalException {

		return deleteStyleBookEntry(getStyleBookEntry(styleBookEntryId));
	}

	@Override
	public StyleBookEntry deleteStyleBookEntry(StyleBookEntry styleBookEntry)
		throws PortalException {

		// Style book entry

		styleBookEntryPersistence.remove(styleBookEntry);

		// Portlet file entry

		if (styleBookEntry.getPreviewFileEntryId() > 0) {
			PortletFileRepositoryUtil.deletePortletFileEntry(
				styleBookEntry.getPreviewFileEntryId());
		}

		return styleBookEntry;
	}

	@Override
	public StyleBookEntry fetchStyleBookEntry(
		long groupId, String styleBookEntryKey) {

		return styleBookEntryPersistence.fetchByG_SBEK(
			groupId, _getStyleBookEntryKey(styleBookEntryKey));
	}

	@Override
	public List<StyleBookEntry> getStyleBookEntries(
		long groupId, int start, int end,
		OrderByComparator<StyleBookEntry> orderByComparator) {

		return styleBookEntryPersistence.findByGroupId(
			groupId, start, end, orderByComparator);
	}

	@Override
	public List<StyleBookEntry> getStyleBookEntries(
		long groupId, String name, int start, int end,
		OrderByComparator<StyleBookEntry> orderByComparator) {

		return styleBookEntryPersistence.findByG_LikeN(
			groupId, _customSQL.keywords(name, false, WildcardMode.SURROUND)[0],
			start, end, orderByComparator);
	}

	@Override
	public int getStyleBookEntriesCount(long groupId) {
		return styleBookEntryPersistence.countByGroupId(groupId);
	}

	@Override
	public int getStyleBookEntriesCount(long groupId, String name) {
		return styleBookEntryPersistence.countByG_LikeN(
			groupId,
			_customSQL.keywords(name, false, WildcardMode.SURROUND)[0]);
	}

	@Override
	public StyleBookEntry updateStyleBookEntry(
			long styleBookEntryId, long previewFileEntryId)
		throws PortalException {

		StyleBookEntry styleBookEntry =
			styleBookEntryPersistence.findByPrimaryKey(styleBookEntryId);

		styleBookEntry.setPreviewFileEntryId(previewFileEntryId);

		return styleBookEntryPersistence.update(styleBookEntry);
	}

	@Override
	public StyleBookEntry updateStyleBookEntry(
			long styleBookEntryId, String name)
		throws PortalException {

		StyleBookEntry styleBookEntry =
			styleBookEntryPersistence.findByPrimaryKey(styleBookEntryId);

		validate(name);

		styleBookEntry.setName(name);

		return styleBookEntryPersistence.update(styleBookEntry);
	}

	protected void validate(String name) throws PortalException {
		if (Validator.isNull(name)) {
			throw new StyleBookEntryNameException("Name must not be null");
		}

		if (name.contains(StringPool.PERIOD) ||
			name.contains(StringPool.SLASH)) {

			throw new StyleBookEntryNameException(
				"Name contains invalid characters");
		}

		int nameMaxLength = ModelHintsUtil.getMaxLength(
			StyleBookEntry.class.getName(), "name");

		if (name.length() > nameMaxLength) {
			throw new StyleBookEntryNameException(
				"Maximum length of name exceeded");
		}
	}

	protected void validateStyleBookEntryKey(
			long groupId, String styleBookEntryKey)
		throws PortalException {

		styleBookEntryKey = _getStyleBookEntryKey(styleBookEntryKey);

		StyleBookEntry styleBookEntry = styleBookEntryPersistence.fetchByG_SBEK(
			groupId, styleBookEntryKey);

		if (styleBookEntry != null) {
			throw new DuplicateStyleBookEntryNameKeyException();
		}
	}

	private void _copyStyleBookEntryPreviewFileEntry(
			long userId, long groupId, StyleBookEntry styleBookEntry,
			StyleBookEntry copyStyleBookEntry)
		throws PortalException {

		if (styleBookEntry.getPreviewFileEntryId() == 0) {
			return;
		}

		FileEntry fileEntry = _dlAppLocalService.getFileEntry(
			styleBookEntry.getPreviewFileEntryId());

		Repository repository =
			PortletFileRepositoryUtil.fetchPortletRepository(
				groupId, StyleBookPortletKeys.STYLE_BOOK);

		if (repository == null) {
			ServiceContext addPortletRepositoryServiceContext =
				new ServiceContext();

			addPortletRepositoryServiceContext.setAddGroupPermissions(true);
			addPortletRepositoryServiceContext.setAddGuestPermissions(true);

			repository = PortletFileRepositoryUtil.addPortletRepository(
				groupId, StyleBookPortletKeys.STYLE_BOOK,
				addPortletRepositoryServiceContext);
		}

		String fileName =
			copyStyleBookEntry.getStyleBookEntryId() + "_preview." +
				fileEntry.getExtension();

		fileEntry = PortletFileRepositoryUtil.addPortletFileEntry(
			groupId, userId, StyleBookEntry.class.getName(),
			copyStyleBookEntry.getStyleBookEntryId(),
			StyleBookPortletKeys.STYLE_BOOK, repository.getDlFolderId(),
			fileEntry.getContentStream(), fileName, fileEntry.getMimeType(),
			false);

		updateStyleBookEntry(
			copyStyleBookEntry.getStyleBookEntryId(),
			fileEntry.getFileEntryId());
	}

	private String _generateStyleBookEntryKey(long groupId, String name) {
		String styleBookEntryKey = _getStyleBookEntryKey(name);

		styleBookEntryKey = StringUtil.replace(
			styleBookEntryKey, CharPool.SPACE, CharPool.DASH);

		String curStyleBookEntryKey = styleBookEntryKey;

		int count = 0;

		while (true) {
			StyleBookEntry styleBookEntry =
				styleBookEntryPersistence.fetchByG_SBEK(
					groupId, curStyleBookEntryKey);

			if (styleBookEntry == null) {
				return curStyleBookEntryKey;
			}

			curStyleBookEntryKey = styleBookEntryKey + CharPool.DASH + count++;
		}
	}

	private String _getStyleBookEntryKey(String styleBookEntryKey) {
		if (styleBookEntryKey != null) {
			styleBookEntryKey = styleBookEntryKey.trim();

			return StringUtil.toLowerCase(styleBookEntryKey);
		}

		return StringPool.BLANK;
	}

	@Reference
	private CustomSQL _customSQL;

	@Reference
	private DLAppLocalService _dlAppLocalService;

}