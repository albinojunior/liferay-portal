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

import React, {useContext} from 'react';

import {AppContext} from '../../AppContext.es';
import {Errors, useErrors} from '../store/ErrorsStore.es';
import {SLANodes, useSLANodes} from '../store/SLANodeStore.es';
import {SLA, useSLA} from '../store/SLAStore.es';

const SLAFormPageProvider = ({children, id, processId}) => {
	const {client} = useContext(AppContext);
	const errorsState = useErrors();

	return (
		<Errors.Provider value={errorsState}>
			<SLANodes.Provider value={useSLANodes(processId, client)}>
				<SLA.Provider
					value={useSLA(client, id, processId, errorsState)}
				>
					{children}
				</SLA.Provider>
			</SLANodes.Provider>
		</Errors.Provider>
	);
};

export default SLAFormPageProvider;
