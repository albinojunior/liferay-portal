/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import {useIsMounted} from 'frontend-js-react-web';
import {useCallback} from 'react';

const useInterval = cancelOnDestroy => {
	const isMounted = useIsMounted();

	return useCallback(
		(callback, ms) => {
			const interval = setInterval(() => {
				if (!cancelOnDestroy || isMounted()) {
					callback();
				} else {
					clearInterval(interval);
				}
			}, ms);

			return () => clearInterval(interval);
		},
		[cancelOnDestroy, isMounted]
	);
};

export {useInterval};
