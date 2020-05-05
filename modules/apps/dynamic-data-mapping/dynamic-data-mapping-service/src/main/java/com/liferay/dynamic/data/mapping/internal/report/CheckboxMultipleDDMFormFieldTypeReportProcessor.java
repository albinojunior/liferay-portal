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

package com.liferay.dynamic.data.mapping.internal.report;

import com.liferay.dynamic.data.mapping.constants.DDMFormInstanceReportConstants;
import com.liferay.dynamic.data.mapping.model.Value;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;

import java.util.Iterator;

/**
 * @author Marcos Martins
 */
public class CheckboxMultipleDDMFormFieldTypeReportProcessor
	extends BaseDDMFormFieldTypeReportProcessor {

	@Override
	public JSONObject doProcess(
			DDMFormFieldValue ddmFormFieldValue,
			JSONObject formInstanceReportDataJSONObject,
			String formInstanceReportEvent)
		throws PortalException {

		Value value = ddmFormFieldValue.getValue();

		JSONArray keysJSONArray = JSONFactoryUtil.createJSONArray(
			value.getString(value.getDefaultLocale()));

		Iterator iterator = keysJSONArray.iterator();

		JSONObject fieldJSONObject =
			formInstanceReportDataJSONObject.getJSONObject(
				ddmFormFieldValue.getName());

		JSONObject valuesJSONObject = fieldJSONObject.getJSONObject("values");

		while (iterator.hasNext()) {
			String key = (String)iterator.next();

			int count = valuesJSONObject.getInt(key, 0);

			if (DDMFormInstanceReportConstants.EVENT_ADD_RECORD_VERSION.equals(
					formInstanceReportEvent)) {

				count = count + 1;
			}

			valuesJSONObject.put(key, count);
		}

		return formInstanceReportDataJSONObject;
	}

}