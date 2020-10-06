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

package com.liferay.layout.page.template.validator;

import com.liferay.layout.page.template.exception.MasterPageValidatorException;
import com.liferay.petra.json.validator.JSONValidator;
import com.liferay.petra.json.validator.JSONValidatorException;
import com.liferay.portal.kernel.util.Validator;

/**
 * @author Rubén Pulido
 */
public class MasterPageValidator {

	public static void validateMasterPage(String masterPageJSON)
		throws MasterPageValidatorException {

		if (Validator.isNull(masterPageJSON)) {
			return;
		}

		try {
			JSONValidator.validate(
				masterPageJSON,
				MasterPageValidator.class.getResourceAsStream(
					"dependencies/master_page_json_schema.json"));
		}
		catch (JSONValidatorException jsonValidatorException) {
			throw new MasterPageValidatorException(
				jsonValidatorException.getMessage(), jsonValidatorException);
		}
	}

}