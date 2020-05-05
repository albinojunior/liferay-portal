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
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.Validator;

/**
 * @author Marcos Martins
 */
public class RadioDDMFormFieldTypeReportProcessor
	extends BaseDDMFormFieldTypeReportProcessor {

	@Override
	public JSONObject doProcess(
		DDMFormFieldValue ddmFormFieldValue,
		JSONObject formInstanceReportDataJSONObject,
		String formInstanceReportEvent) {

		Value value = ddmFormFieldValue.getValue();

		String key = value.getString(value.getDefaultLocale());

		JSONObject fieldJSONObject =
			formInstanceReportDataJSONObject.getJSONObject(
				ddmFormFieldValue.getName());

		if (Validator.isNotNull(key)) {
			JSONObject valuesJSONObject = fieldJSONObject.getJSONObject(
				"values");

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