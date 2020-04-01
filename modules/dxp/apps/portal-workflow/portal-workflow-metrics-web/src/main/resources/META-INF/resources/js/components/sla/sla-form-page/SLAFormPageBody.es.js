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

import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import React, {useContext, useState} from 'react';

import FormGroupWithStatus from '../../../shared/components/form/FormGroupWithStatus.es';
import LoadingState from '../../../shared/components/loading/LoadingState.es';
import {useToaster} from '../../../shared/components/toaster/hooks/useToaster.es';
import {AppContext, AppStatus} from '../../AppContext.es';
import {
	ALERT_MESSAGE,
	CALENDAR_KEY,
	DURATION,
	HOURS,
	NAME,
	PAUSE_NODE_KEYS,
	START_NODE_KEYS,
	STOP_NODE_KEYS,
} from '../Constants.es';
import {Errors} from '../store/ErrorsStore.es';
import {SLANodes} from '../store/SLANodeStore.es';
import {SLA} from '../store/SLAStore.es';
import calendarStore from '../store/calendarStore.es';
import {
	hasErrors,
	validateDuration,
	validateHours,
	validateName,
	validateNodeKeys,
} from '../util/slaFormUtil.es';
import SLAFormPage from './SLAFormPage.es';
import {Duration} from './SLAFormPageDuration.es';
import {TimeFrame} from './SLAFormPageTimeFrame.es';

const Body = ({history, id, processId, query}) => {
	const {calendars} = calendarStore.getState();
	const {
		changeValue,
		sla: {
			calendarKey = calendarStore.defaultCalendar.key,
			description,
			name,
			status,
		},
	} = useContext(SLA);
	const {defaultDelta, setStatus} = useContext(AppContext);
	const {fetchNodes} = useContext(SLANodes);
	const {resetNodes, saveSLA, sla} = useContext(SLA);
	const {errors, setErrors} = useContext(Errors);
	const [loading, setLoading] = useState(false);
	const toaster = useToaster();

	const showCalendarField = calendars.length > 1;

	const handleErrors = responseErrors => {
		if (Array.isArray(responseErrors)) {
			responseErrors.forEach(error => {
				const errorKey = error.fieldName || ALERT_MESSAGE;

				errors[errorKey] = error.message;
			});

			const fieldNames = responseErrors.map(error => error.fieldName);

			if (
				fieldNames.includes(PAUSE_NODE_KEYS) ||
				fieldNames.includes(START_NODE_KEYS) ||
				fieldNames.includes(STOP_NODE_KEYS)
			) {
				resetNodes();
				setLoading(true);
				fetchNodes(processId).then(() => setLoading(false));
				setErrors({...errors});
			} else {
				setErrors({...errors});
			}
		} else {
			toaster.danger(Liferay.Language.get('your-request-has-failed'));
		}
	};

	const handleSubmit = (
		{days, hours, id, name, processId, startNodeKeys, stopNodeKeys},
		saveCallback
	) => () => {
		errors[ALERT_MESSAGE] = '';
		errors[DURATION] = validateDuration(days, hours);
		errors[HOURS] = validateHours(hours);
		errors[NAME] = validateName(name);
		errors[PAUSE_NODE_KEYS] = '';
		errors[START_NODE_KEYS] = validateNodeKeys(startNodeKeys.nodeKeys);
		errors[STOP_NODE_KEYS] = validateNodeKeys(stopNodeKeys.nodeKeys);

		if ((!hours || hours === '00:00') && days && Number(days) > 0) {
			errors[HOURS] = '';
		}

		if (hasErrors(errors)) {
			errors[ALERT_MESSAGE] = Liferay.Language.get(
				'please-fill-in-the-required-fields'
			);
			setErrors({...errors});
		} else {
			saveCallback(processId, id, calendarStore.defaultCalendar.key)
				.then(() => {
					const status = id
						? AppStatus.slaUpdated
						: AppStatus.slaSaved;

					setStatus(status);

					if (id) {
						history.goBack();
					} else {
						history.replace({
							pathname: `/slas/${processId}/${defaultDelta}/1`,
							search: query,
						});
					}
				})
				.catch(error => {
					const {data} = error.response || {};

					handleErrors(data);
				});
		}
	};

	const hideDropLists = () => () => {
		document.dispatchEvent(new Event('mousedown', {bubbles: true}));
	};

	const onChangeHandler = validationFunc => ({
		target: {name, value = ''},
	}) => {
		changeValue(name, value);
		if (typeof validationFunc === 'function') {
			validationFunc(value);
		}
	};

	const onNameChanged = name => {
		errors[ALERT_MESSAGE] = '';
		errors[NAME] = validateName(name);
		setErrors({...errors});
	};

	if (loading) {
		return <LoadingState className="" />;
	}

	return (
		<>
			{errors[ALERT_MESSAGE] && <SLAFormPage.AlertMessage />}

			{status === 2 && <SLAFormPage.AlertWorkflowDefinitionChange />}

			<ClayForm className="sheet sheet-lg">
				<div className="sheet-header">
					<h2 className="sheet-title" data-testid="sheetTitle">
						{Liferay.Language.get('sla-definition')}
					</h2>
				</div>

				<div className="sheet-section">
					<div className="row">
						<FormGroupWithStatus
							className="col col-sm-5 form-group"
							data-testid="nameField"
							error={errors[NAME]}
							htmlFor="sla_name"
							label={Liferay.Language.get('name')}
							requiredLabel
						>
							<ClayInput
								autoFocus
								className="form-control"
								id="sla_name"
								maxLength={75}
								name="name"
								onChange={onChangeHandler(onNameChanged)}
								type="text"
								value={name}
							/>
						</FormGroupWithStatus>

						<FormGroupWithStatus
							className="col col-sm-7 form-group"
							data-testid="descriptionField"
							htmlFor="sla_description"
							label={Liferay.Language.get('description')}
						>
							<ClayInput
								id="sla_description"
								name="description"
								onChange={onChangeHandler()}
								onFocus={hideDropLists()}
								type="text"
								value={description}
							/>
						</FormGroupWithStatus>
					</div>

					<Body.TimeFrame />

					<Body.Duration showCalendar={showCalendarField} />
				</div>

				{showCalendarField && (
					<FormGroupWithStatus
						className="col col-sm-6 form-group"
						htmlFor="sla_calendar_key"
						label={Liferay.Language.get('calendar')}
					>
						<select
							className="form-control"
							id="sla_calendar_key"
							name={CALENDAR_KEY}
							onChange={onChangeHandler()}
							value={calendarKey}
						>
							{calendars.map((calendar, index) => (
								<option key={index} value={calendar.key}>
									{calendar.title}

									{calendar.defaultCalendar &&
										` (${Liferay.Language.get(
											'system-default'
										)})`}
								</option>
							))}
						</select>
					</FormGroupWithStatus>
				)}

				<div className="sheet-footer sheet-footer-btn-block-sm-down">
					<ClayButton.Group spaced>
						<ClayButton
							data-testid="saveButton"
							onClick={handleSubmit(
								{...sla, ...{id, processId}},
								saveSLA
							)}
						>
							{id
								? Liferay.Language.get('update')
								: Liferay.Language.get('save')}
						</ClayButton>

						<ClayButton
							data-testid="cancelButton"
							displayType="secondary"
							onClick={() => history.goBack()}
						>
							{Liferay.Language.get('cancel')}
						</ClayButton>
					</ClayButton.Group>
				</div>
			</ClayForm>
		</>
	);
};

Body.Duration = Duration;
Body.TimeFrame = TimeFrame;

export {Body};
