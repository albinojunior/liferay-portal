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

import {useIsMounted} from 'frontend-js-react-web';
import {useCallback, useRef} from 'react';

const EmptyModule = {default: () => null};

export default () => {
	const modules = useRef(new Map());
	const isMounted = useIsMounted();

	return useCallback(
		(key, moduleName) => {
			if (!modules.current.has(key)) {
				modules.current.set(
					key,
					new Promise((resolve) => {
						Liferay.Loader.require(
							[moduleName],
							(Module) => {
								if (isMounted()) {
									resolve(Module ? Module : EmptyModule);
								}
							},
							(error) => {
								if (process.env.NODE_ENV === 'development') {
									console.error(error);
								}

								if (isMounted()) {
									resolve(EmptyModule);
								}
							}
						);
					})
				);
			}

			return modules.current.get(key);
		},
		[isMounted]
	);
};
