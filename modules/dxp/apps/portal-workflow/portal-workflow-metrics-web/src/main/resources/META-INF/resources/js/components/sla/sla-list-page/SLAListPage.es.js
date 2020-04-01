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
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {useToaster} from '../../../shared/components/toaster/hooks/useToaster.es';
import {useFetch} from '../../../shared/hooks/useFetch.es';
import {AppContext, AppStatus} from '../../AppContext.es';
import BlockedSLAInfo from '../BlockedSLAInfo.es';
import {Body} from './SLAListPageBody.es';
import SLAListPageDeleteModal from './SLAListPageDeleteModal.es';
import {Header} from './SLAListPageHeader.es';

const SLAListPage = ({page, pageSize, processId}) => {
	const {setStatus, setTitle, status} = useContext(AppContext);

	const [itemToRemove, setItemToRemove] = useState(null);
	const [showSLAsUpdatingAlert, setShowSLAsUpdatingAlert] = useState(false);
	const [visible, setVisible] = useState(false);

	const toaster = useToaster();

	const {data, fetchData} = useFetch({
		params: {page, pageSize},
		url: `/processes/${processId}/slas`,
	});

	useEffect(() => {
		setTitle(Liferay.Language.get('slas'));
		showStatusMessage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showStatusMessage = () => {
		if (status === AppStatus.slaUpdated || status === AppStatus.slaSaved) {
			if (status === AppStatus.slaUpdated) {
				toaster.success(Liferay.Language.get('sla-was-updated'));
			}
			else {
				toaster.success(Liferay.Language.get('sla-was-saved'));
			}

			setShowSLAsUpdatingAlert(true);
			setStatus(null);
		}
	};

	const slaContextState = {
		itemToRemove,
		setVisible,
		showDeleteModal: id => {
			setVisible(true);
			setItemToRemove(id);
		},
		visible,
	};

	const promises = useMemo(() => {
		if (!visible) {
			return [fetchData()];
		}

		return [];
	}, [fetchData, visible]);

	return (
		<SLAListPageContext.Provider value={slaContextState}>
			<SLAListPage.Header processId={processId} />

			<div className="container-fluid-1280">
				<BlockedSLAInfo processId={processId} />

				{showSLAsUpdatingAlert && (
					<ClayAlert
						displayType="info"
						onClose={() => {
							setShowSLAsUpdatingAlert(false);
						}}
						title={Liferay.Language.get('info')}
					>
						<span>
							{`${Liferay.Language.get(
								'one-or-more-slas-are-being-updated'
							)} ${Liferay.Language.get(
								'there-may-be-a-delay-before-sla-changes-are-fully-propagated'
							)}`}
						</span>
					</ClayAlert>
				)}

				<SLAListPage.Body
					data={data}
					page={page}
					pageSize={pageSize}
					promises={promises}
				/>

				<SLAListPageDeleteModal />
			</div>
		</SLAListPageContext.Provider>
	);
};

const SLAListPageContext = createContext();

SLAListPage.Body = Body;
SLAListPage.Header = Header;

export {SLAListPageContext};
export default SLAListPage;
