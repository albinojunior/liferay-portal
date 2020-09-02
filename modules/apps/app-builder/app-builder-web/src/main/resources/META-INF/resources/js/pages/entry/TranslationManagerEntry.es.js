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
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';

import {AppContext} from '../../AppContext.es';
import {getItem} from '../../utils/client.es';
import {getLocalizedUserPreferenceValue} from '../../utils/lang.es';

const STORAGE_KEY = '@app-builder/standalone/language';

const setStorageLanguageId = (appId, value) => {
	localStorage.setItem(`${STORAGE_KEY}/${appId}`, value);
};

export const getStorageLanguageId = (appId) => {
	return (
		localStorage.getItem(`${STORAGE_KEY}/${appId}`) ||
		themeDisplay.getLanguageId()
	);
};

export default ({
	dataDefinitionId,
	setUserLanguageId,
	showAppName,
	userLanguageId,
}) => {
	const {appId} = useContext(AppContext);
	const [{app, dataDefinition}, setState] = useState({
		app: {
			name: {},
		},
		dataDefinition: {
			availableLanguageIds: [],
			defaultLanguageId: '',
		},
	});

	const defaultLanguageId = dataDefinition.defaultLanguageId;

	const appName = useMemo(
		() =>
			getLocalizedUserPreferenceValue(
				app.name,
				userLanguageId,
				defaultLanguageId
			),
		[app.name, defaultLanguageId, userLanguageId]
	);

	const onEditingLanguageIdChange = (languageId) => {
		setStorageLanguageId(appId, languageId);
		setUserLanguageId(languageId);
	};

	useEffect(() => {
		getItem(`/o/app-builder/v1.0/apps/${appId}`).then((app) =>
			setState((prevState) => ({
				...prevState,
				app,
			}))
		);
	}, [appId, showAppName]);

	useEffect(() => {
		if (dataDefinitionId) {
			getItem(
				`/o/data-engine/v2.0/data-definitions/${dataDefinitionId}`
			).then((dataDefinition) =>
				setState((prevState) => ({
					...prevState,
					dataDefinition,
				}))
			);
		}
	}, [dataDefinitionId]);

	useEffect(() => {
		if (appName) {
			const titles = document.title.split(' - ');

			if (titles.length > 1) {
				titles[1] = `${appName}`;

				document.title = titles.join(' - ');
			}
		}
	}, [appName]);

	const availableLanguageIds = dataDefinition.availableLanguageIds.reduce(
		(acc, cur) => {
			acc[cur] = cur;

			return acc;
		},
		{}
	);

	const getEditingLanguageId = () => {
		if (availableLanguageIds[userLanguageId]) {
			return userLanguageId;
		}

		return defaultLanguageId;
	};

	const appStandaloneName = document.querySelector('#appStandaloneName');
	const appTranslationManager = document.querySelector(
		'#appTranslationManager'
	);

	return (
		<div>
			{showAppName &&
				appStandaloneName &&
				createPortal(appName, appStandaloneName)}

			{appTranslationManager &&
				createPortal(
					<TranslationManager
						availableLanguageIds={availableLanguageIds}
						editingLanguageId={getEditingLanguageId()}
						onEditingLanguageIdChange={onEditingLanguageIdChange}
						showUserView
					/>,
					appTranslationManager
				)}
		</div>
	);
};
