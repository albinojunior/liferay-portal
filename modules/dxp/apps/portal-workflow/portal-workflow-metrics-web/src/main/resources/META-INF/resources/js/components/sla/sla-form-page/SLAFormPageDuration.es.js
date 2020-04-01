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

import ClayForm from '@clayui/form';
import React, {useContext} from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import FieldLabel from '../../../shared/components/form/FieldLabel.es';
import FormGroupWithStatus from '../../../shared/components/form/FormGroupWithStatus.es';
import {ALERT_MESSAGE, DAYS, DURATION, HOURS} from '../Constants.es';
import {Errors} from '../store/ErrorsStore.es';
import {SLA} from '../store/SLAStore.es';
import {validateDuration, validateHours} from '../util/slaFormUtil.es';

const Duration = ({showCalendar}) => {
	const {
		changeValue,
		sla: {days, hours},
	} = useContext(SLA);
	const {errors, setErrors} = useContext(Errors);

	const daysMask = createNumberMask({
		allowLeadingZeroes: true,
		includeThousandsSeparator: false,
		integerLimit: 4,
		prefix: '',
	});

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
		} else {
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

	return (
		<>
			<h3 className="sheet-subtitle">
				<FieldLabel
					data-testid="duration"
					required
					text={Liferay.Language.get('duration').toUpperCase()}
				/>
			</h3>

			<div className="sheet-text" data-testid="durationDescription">
				{showCalendar
					? Liferay.Language.get(
							'define-the-sla-duration-and-calendar-format'
					  )
					: Liferay.Language.get('define-the-sla-duration')}
			</div>

			<div className="row">
				<FormGroupWithStatus
					className="col col-sm-3 form-group"
					data-testid="daysField"
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
							<ClayForm.Text data-testid="durationDaysDescription">
								{Liferay.Language.get('enter-a-whole-number')}
							</ClayForm.Text>
						</ClayForm.FeedbackItem>
					</ClayForm.FeedbackGroup>
				</FormGroupWithStatus>

				<FormGroupWithStatus
					className="col col-sm-3 form-group"
					data-testid="hoursField"
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
		</>
	);
};

export {Duration};
