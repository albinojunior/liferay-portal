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

import ClayAlert from '@clayui/alert';
import React, {useContext, useEffect, useState} from 'react';

import {AppContext} from '../../AppContext.es';
import {ALERT_MESSAGE} from '../Constants.es';
import {Errors, useErrors} from '../store/ErrorsStore.es';
import {SLANodes, useSLANodes} from '../store/SLANodeStore.es';
import {SLA, useSLA} from '../store/SLAStore.es';
import {Body} from './SLAFormPageBody.es';

const SLAFormPage = ({id, processId, query}) => {
	const {client, setTitle} = useContext(AppContext);
	const errorsState = useErrors();

	useEffect(() => {
		setTitle(Liferay.Language.get('slas'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="sla-form">
			<Errors.Provider value={errorsState}>
				<SLANodes.Provider value={useSLANodes(processId, client)}>
					<SLA.Provider
						value={useSLA(client, id, processId, errorsState)}
					>
						<SLAFormPage.Body
							id={id}
							processId={processId}
							query={query}
						/>
					</SLA.Provider>
				</SLANodes.Provider>
			</Errors.Provider>
		</div>
	);
};

const AlertMessage = () => {
	const {errors} = useContext(Errors);

	return (
		<div className="alert-container">
			<ClayAlert
				displayType="danger"
				title={Liferay.Language.get('error')}
			>
				{errors[ALERT_MESSAGE]}
			</ClayAlert>
		</div>
	);
};

const AlertWorkflowDefinitionChange = () => {
	const [visible, setVisible] = useState(true);

	return (
		visible && (
			<div className="alert-container">
				<ClayAlert
					displayType="danger"
					onClose={() => {
						setVisible(false);
					}}
					title={Liferay.Language.get('error')}
				>
					{Liferay.Language.get(
						'the-time-frame-options-changed-in-the-workflow-definition'
					)}
				</ClayAlert>
			</div>
		)
	);
};

SLAFormPage.AlertMessage = AlertMessage;
SLAFormPage.AlertWorkflowDefinitionChange = AlertWorkflowDefinitionChange;
SLAFormPage.Body = Body;

export default SLAFormPage;
