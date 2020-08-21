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

import ClayButton from '@clayui/button';
import React, {useCallback, useContext, useState} from 'react';

import {AppContext} from '../../AppContext.es';
import Button from '../../components/button/Button.es';
import {ControlMenuBase} from '../../components/control-menu/ControlMenu.es';
import useDataDefinition from '../../hooks/useDataDefinition.es';
import withDDMForm, {
	useDDMFormSubmit,
	useDDMFormValidation,
} from '../../hooks/withDDMForm.es';
import {addItem, updateItem} from '../../utils/client.es';
import {successToast} from '../../utils/toast.es';

export const EditEntry = ({
	dataDefinitionId,
	dataRecordId,
	ddmForm,
	redirect,
	userLanguageId,
}) => {
	const {basePortletURL} = useContext(AppContext);
	const {availableLanguageIds, defaultLanguageId} = useDataDefinition(
		dataDefinitionId
	);
	const [submiting, setSubmiting] = useState(false);

	const onCancel = useCallback(() => {
		if (redirect) {
			Liferay.Util.navigate(redirect);
		} else {
			Liferay.Util.navigate(basePortletURL);
		}
	}, [basePortletURL, redirect]);

	const ddmReactForm = ddmForm.reactComponentRef.current;

	ddmReactForm.updateEditingLanguageId({
		editingLanguageId: userLanguageId,
		preserveValue: true,
	});

	const submitDDMForms = useDDMFormValidation(
		ddmForm,
		useCallback(
			(dataRecord) => {
				if (dataRecordId !== '0') {
					updateItem(
						`/o/data-engine/v2.0/data-records/${dataRecordId}`,
						dataRecord
					)
						.then(() => {
							successToast(
								Liferay.Language.get('an-entry-was-updated')
							);
							onCancel();
						})
						.catch(() => {
							setSubmiting(false);
						});
				} else {
					addItem(
						`/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records`,
						dataRecord
					)
						.then(() => {
							successToast(
								Liferay.Language.get('an-entry-was-added')
							);
							onCancel();
						})
						.catch(() => {
							setSubmiting(false);
						});
				}
			},
			[dataDefinitionId, dataRecordId, onCancel]
		),
		defaultLanguageId,
		availableLanguageIds
	);

	const onSubmit = (event) => {
		setSubmiting(true);
		submitDDMForms(event);
	};

	useDDMFormSubmit(ddmForm, submitDDMForms);

	return (
		<>
			<ControlMenuBase
				backURL={redirect ? redirect : `${basePortletURL}/#/`}
				title={
					dataRecordId !== '0'
						? Liferay.Language.get('edit-entry')
						: Liferay.Language.get('add-entry')
				}
				url={location.href}
			/>

			<ClayButton.Group className="app-builder-form-buttons" spaced>
				<Button disabled={submiting} onClick={onSubmit}>
					{Liferay.Language.get('save')}
				</Button>

				<Button displayType="secondary" onClick={onCancel}>
					{Liferay.Language.get('cancel')}
				</Button>
			</ClayButton.Group>
		</>
	);
};

export default withDDMForm(EditEntry);
