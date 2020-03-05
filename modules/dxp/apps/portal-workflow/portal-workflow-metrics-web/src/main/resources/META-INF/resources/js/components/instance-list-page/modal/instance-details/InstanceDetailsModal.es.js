/* eslint-disable react-hooks/exhaustive-deps */
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

import ClayIcon from '@clayui/icon';
import ClayModal, {useModal} from '@clayui/modal';
import React, {useContext, useMemo} from 'react';

import PromisesResolver from '../../../../shared/components/promises-resolver/PromisesResolver.es';
import {useFetch} from '../../../../shared/hooks/useFetch.es';
import {InstanceListContext} from '../../store/InstanceListPageStore.es';
import {ModalContext} from '../ModalContext.es';
import {Body} from './InstanceDetailsModalBody.es';

const Header = ({id, slaResults = [], slaStatus, status}) => {
	const empty = slaResults.length === 0;
	const overdue = slaStatus === 'Overdue';

	let styleName = 'text-danger';

	if (empty) {
		styleName = 'text-info';
	} else if (status === 'Completed') {
		styleName = 'text-secondary';
	} else if (status === 'Pending' && slaStatus === 'OnTime') {
		styleName = 'text-success';
	}

	let iconTitleName = 'check-circle';

	if (empty) {
		iconTitleName = 'hr';
	} else if (overdue) {
		iconTitleName = 'exclamation-circle';
	}

	return (
		<ClayModal.Header data-testid="instanceDetailsHeader">
			<div
				className="font-weight-medium"
				data-testid="instanceDetailsTitle"
			>
				<span className={`modal-title-indicator ${styleName}`}>
					<ClayIcon data-testid="iconTitle" symbol={iconTitleName} />
				</span>

				{`${Liferay.Language.get('item')} #${id}`}
			</div>
		</ClayModal.Header>
	);
};

const InstanceDetailsModal = () => {
	const {instanceId, setInstanceId} = useContext(InstanceListContext);
	const {
		instanceDetailsModal: {processId, visible},
		setInstanceDetailsModal,
	} = useContext(ModalContext);

	const url = useMemo(
		() => `/processes/${processId}/instances/${instanceId}`,
		[instanceId, processId]
	);

	const {data, fetchData} = useFetch({
		url,
	});

	const promises = useMemo(() => {
		if (instanceId) {
			return [fetchData()];
		}

		return [];
	}, [instanceId, fetchData]);

	const {observer} = useModal({
		onClose: () => {
			setInstanceId();

			setInstanceDetailsModal({
				visible: false,
			});
		},
	});

	return visible ? (
		<ClayModal
			className="instance-details-modal"
			observer={observer}
			size="lg"
		>
			<InstanceDetailsModal.Header {...data} />

			<PromisesResolver promises={promises}>
				<InstanceDetailsModal.Body {...data} />
			</PromisesResolver>
		</ClayModal>
	) : (
		<></>
	);
};

InstanceDetailsModal.Body = Body;
InstanceDetailsModal.Header = Header;

export {InstanceDetailsModal};
