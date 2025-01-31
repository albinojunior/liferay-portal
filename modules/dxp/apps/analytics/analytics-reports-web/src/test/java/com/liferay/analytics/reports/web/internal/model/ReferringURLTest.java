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

package com.liferay.analytics.reports.web.internal.model;

import com.liferay.portal.json.JSONFactoryImpl;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONUtil;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * @author David Arques
 */
public class ReferringURLTest {

	@BeforeClass
	public static void setUpClass() {
		JSONFactoryUtil jsonFactoryUtil = new JSONFactoryUtil();

		jsonFactoryUtil.setJSONFactory(new JSONFactoryImpl());
	}

	@Test
	public void testToJSONObject() {
		ReferringURL referringURL = new ReferringURL(
			5, "https://www.liferay.com/");

		Assert.assertEquals(
			JSONUtil.put(
				"trafficAmount", 5
			).put(
				"url", "https://www.liferay.com/"
			).toString(),
			String.valueOf(referringURL.toJSONObject()));
	}

}