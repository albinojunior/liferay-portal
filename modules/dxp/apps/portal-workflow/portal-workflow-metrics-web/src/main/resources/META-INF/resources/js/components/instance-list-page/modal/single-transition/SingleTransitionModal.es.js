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
import ClayButton from '@clayui/button';
import {ClayInput} from '@clayui/form';
import ClayModal, {useModal} from '@clayui/modal';
import React, {
	useCallback,
	useContext,
	useState,
	useEffect,
	useMemo
} from 'react';

import {useFetch} from '../../../../shared/hooks/useFetch.es';
import {usePost} from '../../../../shared/hooks/usePost.es';
import {ModalContext} from '../ModalContext.es';

const SingleTransitionModal = () => {
	const [comment, setComment] = useState('');
	const {setSingleTransitionModal, singleTransitionModal} = useContext(
		ModalContext
	);
	const {
		selectedItem = {},
		title,
		transitionName,
		visible
	} = singleTransitionModal;
	const [successToast, setSuccessToast] = useState(() => []);
	const [errorToast, setErrorToast] = useState(false);

	const {data, fetchData} = useFetch({
		admin: true,
		params: {completed: false, page: 1, pageSize: 1},
		url: `/workflow-instances/${selectedItem.id}/workflow-tasks`
	});

	const {observer, onClose} = useModal({
		onClose: () => {
			setSingleTransitionModal({
				selectedItem: {},
				title: '',
				transitionName: '',
				visible: false
			});
		}
	});

	useEffect(() => {
		if (selectedItem.id) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedItem.id]);

	const taskId = useMemo(() => (data && data.items ? data.items[0].id : {}), [
		data
	]);

	const {postData} = usePost({
		admin: true,
		body: {comment, transitionName, workflowTaskId: taskId},
		url: `/workflow-tasks/${taskId}/change-transition`
	});

	const handleDone = useCallback(() => {
		setErrorToast(false);
		postData()
			.then(() => {
				onClose();
				setSuccessToast([
					...successToast,
					Liferay.Language.get(
						'the-selected-step-has-transitioned-successfully'
					)
				]);
			})
			.catch(() => {
				setErrorToast(
					`${Liferay.Language.get(
						'your-request-has-failed'
					)} ${Liferay.Language.get('select-done-to-retry')}`
				);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postData]);

	return (
		<>
			<ClayAlert.ToastContainer data-testid="alertContainer">
				{successToast.map(value => (
					<ClayAlert
						autoClose={5000}
						data-testid="alertSuccess"
						displayType={'success'}
						key={value}
						onClose={() => {
							setSuccessToast(prevItems =>
								prevItems.filter(item => item !== value)
							);
						}}
						title={Liferay.Language.get('success')}
					>
						{value}
					</ClayAlert>
				))}
			</ClayAlert.ToastContainer>

			{visible && (
				<ClayModal
					data-testid="transitionModal"
					observer={observer}
					size="lg"
				>
					<ClayModal.Header>{title}</ClayModal.Header>

					{errorToast && (
						<ClayAlert
							className="mb-0"
							data-testid="alertError"
							displayType="danger"
							title={Liferay.Language.get('error')}
						>
							{errorToast}
						</ClayAlert>
					)}

					<ClayModal.Body>
						<label htmlFor="commentTextArea">
							{Liferay.Language.get('comment')}
						</label>
						<ClayInput
							component="textarea"
							id="commentTextArea"
							onChange={({target}) => setComment(target.value)}
							placeholder={Liferay.Language.get('comment')}
							type="text"
						/>
					</ClayModal.Body>

					<ClayModal.Footer
						last={
							<>
								<ClayButton
									className="mr-3"
									data-testid="cancelButton"
									displayType="secondary"
									onClick={onClose}
								>
									{Liferay.Language.get('cancel')}
								</ClayButton>

								<ClayButton
									data-testid="doneButton"
									onClick={handleDone}
								>
									{Liferay.Language.get('done')}
								</ClayButton>
							</>
						}
					/>
				</ClayModal>
			)}
		</>
	);
};

export default SingleTransitionModal;
