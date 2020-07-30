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

import {TranslationManager} from 'data-engine-taglib';
import React, {useContext, useEffect} from 'react';

import {AppContext} from '../../../AppContext.es';
import {UpperToolbarInput} from '../../../components/upper-toolbar/UpperToolbar.es';
import EditAppContext, {UPDATE_NAME} from './EditAppContext.es';

export default ({
	availableLanguageIds,
	defaultLanguageId,
	editingLanguageId,
	setEditingLanguageId,
}) => {
	const {showTranslationManager} = useContext(AppContext);
	const {
		dispatch,
		state: {
			app: {name},
		},
	} = useContext(EditAppContext);

	const appName = name[editingLanguageId] || '';

	useEffect(() => {
		if (!editingLanguageId) {
			setEditingLanguageId(defaultLanguageId);
		}
	}, [defaultLanguageId, editingLanguageId, setEditingLanguageId]);

	const onAppNameChange = (event) => {
		const appName = event.target.value;

		dispatch({
			appName: {
				...name,
				[editingLanguageId]: appName,
			},
			type: UPDATE_NAME,
		});
	};

	const availableLanguages = availableLanguageIds.reduce((acc, cur) => {
		acc[cur] = cur;

		return acc;
	}, {});

	return (
		<>
			<div className="align-items-center bg-transparent card-header d-flex justify-content-between">
				{showTranslationManager && (
					<TranslationManager
						availableLanguageIds={availableLanguages}
						className="mr-1"
						defaultLanguageId={defaultLanguageId}
						editingLanguageId={editingLanguageId}
						onEditingLanguageIdChange={setEditingLanguageId}
						translatedLanguageIds={name}
					/>
				)}
				<UpperToolbarInput
					maxLength={30}
					onChange={onAppNameChange}
					placeholder={Liferay.Language.get('untitled-app')}
					value={appName}
				/>
			</div>

			<h4 className="card-divider mb-4"></h4>
		</>
	);
};
