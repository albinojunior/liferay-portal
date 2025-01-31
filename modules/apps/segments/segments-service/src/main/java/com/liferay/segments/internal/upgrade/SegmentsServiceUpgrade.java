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

package com.liferay.segments.internal.upgrade;

import com.liferay.counter.kernel.service.CounterLocalService;
import com.liferay.portal.kernel.upgrade.UpgradeCTModel;
import com.liferay.portal.kernel.upgrade.UpgradeMVCCVersion;
import com.liferay.portal.upgrade.registry.UpgradeStepRegistrator;
import com.liferay.segments.internal.upgrade.v2_0_0.UpgradeSchema;
import com.liferay.segments.internal.upgrade.v2_0_0.UpgradeSegmentsExperience;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author David Arques
 */
@Component(immediate = true, service = UpgradeStepRegistrator.class)
public class SegmentsServiceUpgrade implements UpgradeStepRegistrator {

	@Override
	public void register(Registry registry) {
		registry.register("1.0.0", "1.0.1", new UpgradeSchema());

		registry.register(
			"1.0.1", "2.0.0",
			new UpgradeSegmentsExperience(_counterLocalService));

		registry.register(
			"2.0.0", "2.1.0",
			new UpgradeMVCCVersion() {

				@Override
				protected String[] getModuleTableNames() {
					return new String[] {
						"SegmentsEntry", "SegmentsEntryRel",
						"SegmentsExperience", "SegmentsExperiment",
						"SegmentsExperimentRel"
					};
				}

			});

		registry.register(
			"2.1.0", "2.2.0",
			new com.liferay.segments.internal.upgrade.v2_2_0.UpgradeSchema());

		registry.register(
			"2.2.0", "2.3.0",
			new UpgradeCTModel(
				"SegmentsEntry", "SegmentsEntryRel", "SegmentsEntryRole",
				"SegmentsExperience", "SegmentsExperiment",
				"SegmentsExperimentRel"));

		registry.register(
			"2.3.0", "2.4.0",
			new com.liferay.segments.internal.upgrade.v2_4_0.UpgradeSchema());
	}

	@Reference
	private CounterLocalService _counterLocalService;

}