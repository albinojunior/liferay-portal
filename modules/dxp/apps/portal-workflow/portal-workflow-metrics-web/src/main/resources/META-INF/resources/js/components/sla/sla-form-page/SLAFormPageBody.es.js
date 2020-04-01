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
import {Redirect} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {AutocompleteMultiSelect} from '../../../shared/components/autocomplete/AutocompleteMultiSelect.es';
import FieldLabel from '../../../shared/components/form/FieldLabel.es';
import FormGroupWithStatus from '../../../shared/components/form/FormGroupWithStatus.es';
import LoadingState from '../../../shared/components/loading/LoadingState.es';
import {
	BackLink,
	BackRedirect,
} from '../../../shared/components/router/routerWrapper.es';
import {useToaster} from '../../../shared/components/toaster/hooks/useToaster.es';
import {AppContext, AppStatus} from '../../AppContext.es';
import {
	ALERT_MESSAGE,
	CALENDAR_KEY,
	DAYS,
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

const Body = ({id, processId, query}) => {
	const {calendars} = calendarStore.getState();
	const {
		changeNodesKeys,
		changePauseNodes,
		changeValue,
		getNodeTags,
		getPauseNodeTags,
		sla: {
			calendarKey = calendarStore.defaultCalendar.key,
			days,
			description,
			hours,
			name,
			pauseNodeKeys: {nodeKeys: pauseNodeKeys},
			startNodeKeys: {nodeKeys: startNodeKeys},
			status,
			stopNodeKeys: {nodeKeys: stopNodeKeys},
		},
	} = useContext(SLA);
	const {errors, setErrors} = useContext(Errors);
	const {getPauseNodes, getStartNodes, getStopNodes, nodes} = useContext(
		SLANodes
	);
	const [loading, setLoading] = useState(false);
	const toaster = useToaster();

	const showCalendarField = calendars.length > 1;

	const daysMask = createNumberMask({
		allowLeadingZeroes: true,
		includeThousandsSeparator: false,
		integerLimit: 4,
		prefix: '',
	});

	const checkNodeErrors = type => filteredNodeKeys => {
		if (type !== PAUSE_NODE_KEYS) {
			errors[type] = validateNodeKeys(filteredNodeKeys);
		}
		errors[ALERT_MESSAGE] = '';
		setErrors({...errors});
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

	const onDurationChanged = (oldDays, oldHours) => days => {
		errors[ALERT_MESSAGE] = '';
		errors[DURATION] = validateDuration(days, oldHours);
		errors[HOURS] = '';

		setErrors({...errors});
	};

	const onHoursBlurred = (days, hours) => () => {
		if (days && Number(days) > 0 && (!hours || hours === '00:00')) {
			errors[ALERT_MESSAGE] = '';
			errors[HOURS] = '';
			setErrors({...errors});
		}
		else {
			const beforeHoursError = errors[HOURS];

			errors[ALERT_MESSAGE] = '';
			errors[HOURS] = validateHours(hours);

			if (hours && hours === '00:00') {
				errors[HOURS] = Liferay.Language.get(
					'value-must-be-an-hour-below'
				);
			}

			if (beforeHoursError !== errors[HOURS]) {
				setErrors({...errors});
			}
		}
	};

	const onNameChanged = name => {
		errors[ALERT_MESSAGE] = '';
		errors[NAME] = validateName(name);
		setErrors({...errors});
	};

	const {defaultDelta, setStatus} = useContext(AppContext);
	const {fetchNodes} = useContext(SLANodes);
	const [redirectToSLAList, setRedirectToSLAList] = useState(false);
	const {resetNodes, saveSLA, sla} = useContext(SLA);

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
			}
			else {
				setErrors({...errors});
			}
		}
		else {
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
		}
		else {
			saveCallback(processId, id, calendarStore.defaultCalendar.key)
				.then(() => {
					const status = id
						? AppStatus.slaUpdated
						: AppStatus.slaSaved;

					setStatus(status);
					setRedirectToSLAList(true);
				})
				.catch(error => {
					const {data} = error.response || {};

					handleErrors(data);
				});
		}
	};

	let calendarString = Liferay.Language.get(
		'define-the-sla-duration-and-calendar-format'
	);

	if (!showCalendarField) {
		calendarString = Liferay.Language.get('define-the-sla-duration');
	}

	if (loading) {
		return <LoadingState className="" />;
	}

	return (
		<>
			{errors[ALERT_MESSAGE] && <SLAFormPage.AlertMessage />}

			{status === 2 && <SLAFormPage.AlertWorkflowDefinitionChange />}

			<ClayForm className="sheet sheet-lg">
				<div className="sheet-header">
					<h2 className="sheet-title">
						{Liferay.Language.get('sla-definition')}
					</h2>
				</div>

				<div className="sheet-section">
					<div className="row">
						<FormGroupWithStatus
							className="col col-sm-5 form-group"
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

					<h3 className="sheet-subtitle">
						<FieldLabel
							htmlFor="sla_time_start"
							text={Liferay.Language.get(
								'time-frame'
							).toUpperCase()}
						/>
					</h3>

					<div className="sheet-text">
						{Liferay.Language.get(
							'define-when-time-should-be-tracked-based-on-workflow-steps'
						)}
					</div>

					<FormGroupWithStatus
						className="col col-sm-12 form-group"
						error={errors[START_NODE_KEYS]}
						htmlFor="sla_time_start"
						label={Liferay.Language.get('start')}
						requiredLabel
					>
						<div className="form-text">
							{Liferay.Language.get(
								'time-will-begin-counting-when'
							)}
						</div>

						<AutocompleteMultiSelect
							fieldId="compositeId"
							fieldName="desc"
							id="start"
							items={getStartNodes(pauseNodeKeys, stopNodeKeys)}
							onChange={changeNodesKeys(
								START_NODE_KEYS,
								nodes,
								checkNodeErrors(START_NODE_KEYS)
							)}
							selectedItems={getNodeTags(
								getStartNodes(pauseNodeKeys, stopNodeKeys),
								startNodeKeys
							)}
						/>
					</FormGroupWithStatus>

					<FormGroupWithStatus
						className="col col-sm-12 form-group"
						htmlFor="sla_time_pause"
						label={Liferay.Language.get('pause')}
					>
						<div className="form-text">
							{Liferay.Language.get(
								'time-wont-be-considered-when'
							)}
						</div>

						<AutocompleteMultiSelect
							fieldId="compositeId"
							fieldName="desc"
							id="pause"
							items={getPauseNodes(startNodeKeys, stopNodeKeys)}
							onChange={changePauseNodes(
								getPauseNodes(startNodeKeys, stopNodeKeys),
								checkNodeErrors(PAUSE_NODE_KEYS)
							)}
							selectedItems={getPauseNodeTags(
								getPauseNodes(startNodeKeys, stopNodeKeys),
								pauseNodeKeys
							)}
						/>
					</FormGroupWithStatus>

					<FormGroupWithStatus
						className="col col-sm-12 form-group"
						error={errors[STOP_NODE_KEYS]}
						htmlFor="sla_time_stop"
						label={Liferay.Language.get('stop')}
						requiredLabel
					>
						<div className="form-text">
							{Liferay.Language.get(
								'time-will-stop-counting-when'
							)}
						</div>

						<AutocompleteMultiSelect
							fieldId="compositeId"
							fieldName="desc"
							id="stop"
							items={getStopNodes(pauseNodeKeys, startNodeKeys)}
							onChange={changeNodesKeys(
								STOP_NODE_KEYS,
								nodes,
								checkNodeErrors(STOP_NODE_KEYS)
							)}
							selectedItems={getNodeTags(
								getStopNodes(pauseNodeKeys, startNodeKeys),
								stopNodeKeys
							)}
						/>
					</FormGroupWithStatus>

					<h3 className="sheet-subtitle">
						<FieldLabel
							required
							text={Liferay.Language.get(
								'duration'
							).toUpperCase()}
						/>
					</h3>

					<div className="sheet-text">{calendarString}</div>

					<div className="row">
						<FormGroupWithStatus
							className="col col-sm-3 form-group"
							error={errors[DURATION]}
							htmlFor="sla_duration_days"
							label={Liferay.Language.get('days')}
						>
							<MaskedInput
								className="form-control"
								id="sla_duration_days"
								mask={daysMask}
								maxLength={4}
								name={DAYS}
								onChange={onChangeHandler(
									onDurationChanged(days, hours)
								)}
								onFocus={hideDropLists()}
								value={days}
							/>

							<ClayForm.FeedbackGroup>
								<ClayForm.FeedbackItem>
									<ClayForm.Text>
										{Liferay.Language.get(
											'enter-a-whole-number'
										)}
									</ClayForm.Text>
								</ClayForm.FeedbackItem>
							</ClayForm.FeedbackGroup>
						</FormGroupWithStatus>

						<FormGroupWithStatus
							className="col col-sm-3 form-group"
							error={errors[DURATION] || errors[HOURS]}
							htmlFor="sla_duration_hours"
							label={Liferay.Language.get('hours')}
						>
							<MaskedInput
								className="form-control"
								id="sla_duration_hours"
								mask={[/\d/, /\d/, ':', /\d/, /\d/]}
								name={HOURS}
								onBlur={onHoursBlurred(days, hours)}
								onChange={onChangeHandler(
									onDurationChanged(days, hours)
								)}
								placeholder="00:00"
								value={hours}
							/>
						</FormGroupWithStatus>
					</div>
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

				<>
					{redirectToSLAList && id ? (
						<BackRedirect />
					) : redirectToSLAList ? (
						<Redirect
							to={{
								pathname: `/slas/${processId}/${defaultDelta}/1`,
								search: query,
							}}
						/>
					) : null}

					<div className="sheet-footer sheet-footer-btn-block-sm-down">
						<ClayButton.Group spaced>
							<ClayButton
								onClick={handleSubmit(
									{...sla, ...{id, processId}},
									saveSLA
								)}
							>
								{id
									? Liferay.Language.get('update')
									: Liferay.Language.get('save')}
							</ClayButton>

							<BackLink className="btn btn-secondary">
								{Liferay.Language.get('cancel')}
							</BackLink>
						</ClayButton.Group>
					</div>
				</>
			</ClayForm>
		</>
	);
};

export {Body};
