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

import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';
import {ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayModal, {useModal} from '@clayui/modal';
import React, {useContext, useState} from 'react';

import {AppContext} from '../../AppContext.es';
import {addItem} from '../../utils/client.es';

export default function NewCustomObjectModal({onCloseModal}) {
	const {objectsPortletURL} = useContext(AppContext);

	const [hasError, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [objectName, setObjectName] = useState('');

	const {observer, onClose} = useModal({
		onClose: onCloseModal,
	});

	const onClickContinue = () => {
		const defaultLanguageId = themeDisplay.getDefaultLanguageId();

		setError(false);
		setLoading(true);

		addItem(
			`/o/data-engine/v2.0/data-definitions/by-content-type/app-builder`,
			{
				availableLanguageIds: [defaultLanguageId],
				dataDefinitionFields: [],
				defaultLanguageId,
				name: {[defaultLanguageId]: objectName},
			}
		)
			.then(({id}) => {
				onClose();

				window.open(
					Liferay.Util.PortletURL.createRenderURL(objectsPortletURL, {
						dataDefinitionId: id,
						mvcRenderCommandName: '/edit_form_view',
						newCustomObject: true,
					}),
					'_blank'
				);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	return (
		<ClayModal center observer={observer} size="sm">
			<ClayModal.Header className="border-0">
				{Liferay.Language.get('new-custom-object')}
			</ClayModal.Header>

			{hasError && (
				<ClayAlert
					displayType="danger"
					title={`${Liferay.Language.get('error')}:`}
				>
					{Liferay.Language.get('an-unexpected-error-occurred')}
				</ClayAlert>
			)}

			<div className="pb-4 px-4">
				<label>
					{Liferay.Language.get('name')}

					<span className="reference-mark">
						<ClayIcon symbol="asterisk" />
					</span>
				</label>

				<ClayInput
					onChange={({target}) => setObjectName(target.value)}
					value={objectName}
				/>
			</div>

			<ClayModal.Footer
				last={
					<>
						<ClayButton
							className="mr-3"
							displayType="secondary"
							onClick={onClose}
							small
						>
							{Liferay.Language.get('cancel')}
						</ClayButton>

						<ClayButton
							disabled={isLoading || !objectName?.trim().length}
							onClick={onClickContinue}
							small
						>
							{Liferay.Language.get('continue')}
						</ClayButton>
					</>
				}
			/>
		</ClayModal>
	);
}
