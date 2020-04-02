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

import {cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import SLAFormPage from '../../../../src/main/resources/META-INF/resources/js/components/sla/form-page/SLAFormPage.es';
import ToasterProvider from '../../../../src/main/resources/META-INF/resources/js/shared/components/toaster/ToasterProvider.es';
import {MockRouter} from '../../../mock/MockRouter.es';

describe('The SLAFormPage component should', () => {
	const nodes = [
		{
			id: 35903,
			initial: false,
			label: 'Approved',
			name: 'approved',
			terminal: true,
			type: 'STATE',
		},
		{
			id: 35905,
			initial: true,
			label: 'Created',
			name: 'created',
			terminal: false,
			type: 'STATE',
		},
		{
			id: 35911,
			initial: false,
			label: 'Review',
			name: 'review',
			terminal: false,
			type: 'TASK',
		},
		{
			id: 35927,
			initial: false,
			label: 'Update',
			name: 'update',
			terminal: false,
			type: 'TASK',
		},
	];

	describe('Create a new SLA', () => {
		let alertMessage,
			container,
			durationDaysField,
			durationHoursField,
			durationHoursInput,
			getAllByTestId,
			getByTestId,
			nameField,
			nameInput,
			renderResult,
			saveButton,
			startField,
			stopField;

		const data = {
			calendarKey: '',
			dateModified: '2020-04-01T02:36:00Z',
			description: '',
			duration: 300000,
			id: 38067,
			name: 'SLA',
			processId: 35901,
			startNodeKeys: {
				nodeKeys: [
					{
						executionType: 'begin',
						id: '37735',
					},
				],
				status: 0,
			},
			status: 0,
			stopNodeKeys: {
				nodeKeys: [
					{
						executionType: 'end',
						id: '37733',
					},
				],
				status: 0,
			},
		};

		const clientMock = {
			get: jest.fn().mockResolvedValue({data: {items: nodes}}),
			post: jest
				.fn()
				.mockRejectedValueOnce({})
				.mockRejectedValueOnce({
					response: {
						data: [
							{
								fieldName: 'name',
								message:
									'An SLA with the same name already exists.',
							},
						],
					},
				})
				.mockResolvedValue({data}),
		};

		const historyMock = {
			replace: jest.fn(),
		};

		beforeAll(() => {
			cleanup();

			renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAFormPage
							history={historyMock}
							processId="5678"
							query=""
						/>
					</ToasterProvider>
				</MockRouter>
			);

			container = renderResult.container;
			getAllByTestId = renderResult.getAllByTestId;
			getByTestId = renderResult.getByTestId;

			durationDaysField = getByTestId('daysField');
			durationHoursField = getByTestId('hoursField');
			durationHoursInput = container.querySelector('#sla_duration_hours');
			nameField = getByTestId('nameField');
			nameInput = container.querySelector('#sla_name');
			saveButton = getByTestId('saveButton');
			startField = getByTestId('startField');
			stopField = getByTestId('stopField');
		});

		test('Be rendered correctly', () => {
			const bodySheetTitle = getByTestId('sheetTitle');
			const cancelButton = getByTestId('cancelButton');
			const descriptionField = getByTestId('descriptionField');
			const descriptionInput = container.querySelector(
				'#sla_description'
			);
			const durationDaysDescription = getByTestId(
				'durationDaysDescription'
			);
			const durationDaysInput = container.querySelector(
				'#sla_duration_days'
			);
			const durationDescription = getByTestId('durationDescription');
			const durationLabel = getByTestId('duration');
			const pauseDescription = getByTestId('pauseDescription');
			const pauseField = getByTestId('pauseField');
			const startDescription = getByTestId('startDescription');
			const stopDescription = getByTestId('stopDescription');
			const timeFrameDescription = getByTestId('timeFrameDescription');
			const timeFrameLabel = getByTestId('timeFrame');

			expect(bodySheetTitle).toHaveTextContent('sla-definition');
			expect(nameField).toHaveTextContent('name');
			expect(nameInput.value).toBe('');
			expect(descriptionField).toHaveTextContent('description');
			expect(descriptionInput.value).toBe('');
			expect(timeFrameLabel).toHaveTextContent('TIME-FRAME');
			expect(timeFrameDescription).toHaveTextContent(
				'define-when-time-should-be-tracked-based-on-workflow-steps'
			);
			expect(startField).toHaveTextContent('start');
			expect(startDescription).toHaveTextContent(
				'time-will-begin-counting-when'
			);
			expect(pauseField).toHaveTextContent('pause');
			expect(pauseDescription).toHaveTextContent(
				'time-wont-be-considered-when'
			);
			expect(stopDescription).toHaveTextContent(
				'time-will-stop-counting-when'
			);
			expect(stopField).toHaveTextContent('stop');
			expect(durationLabel).toHaveTextContent('DURATION');
			expect(durationDaysField).toHaveTextContent('days');
			expect(durationDaysInput.value).toBe('');
			expect(durationDescription).toHaveTextContent(
				'define-the-sla-duration'
			);
			expect(durationDaysDescription).toHaveTextContent(
				'enter-a-whole-number'
			);
			expect(durationHoursField).toHaveTextContent('hours');
			expect(saveButton).toHaveTextContent('save');
			expect(cancelButton).toHaveTextContent('cancel');
			expect(nameField.classList).not.toContain('has-error');
			expect(startField.classList).not.toContain('has-error');
			expect(stopField.classList).not.toContain('has-error');
			expect(durationDaysField.classList).not.toContain('has-error');
			expect(durationHoursField.classList).not.toContain('has-error');
		});

		test('Display errors when submitting the form with empty values', () => {
			fireEvent.click(saveButton);

			alertMessage = getByTestId('alertMessage');

			expect(nameField).toHaveTextContent('a-name-is-required');
			expect(startField).toHaveTextContent(
				'at-least-one-parameter-is-required'
			);
			expect(stopField).toHaveTextContent(
				'at-least-one-parameter-is-required'
			);
			expect(durationDaysField).toHaveTextContent(
				'a-duration-time-is-required'
			);
			expect(durationHoursField).toHaveTextContent(
				'a-duration-time-is-required'
			);
			expect(alertMessage).toHaveTextContent(
				'please-fill-in-the-required-fields'
			);
		});

		test('Display a field error when the duration receives an invalid value', () => {
			fireEvent.change(durationHoursInput, {target: {value: '99:99'}});

			fireEvent.blur(durationHoursInput);

			expect(durationHoursField).toHaveTextContent(
				'value-must-be-an-hour-below'
			);

			fireEvent.change(durationHoursInput, {target: {value: '00:01'}});

			fireEvent.blur(durationHoursInput);

			expect(durationHoursField.classList).not.toContain('has-error');
		});

		test('Dismiss errors when the inputs receive valid values and submit', () => {
			const dropDownListItems = getAllByTestId('dropDownListItem');

			fireEvent.change(nameInput, {target: {value: 'SLA'}});

			fireEvent.blur(nameInput);
			fireEvent.mouseDown(dropDownListItems[0]);
			fireEvent.mouseDown(dropDownListItems[11]);

			fireEvent.change(durationHoursInput, {target: {value: '00:01'}});

			fireEvent.blur(durationHoursInput);

			expect(nameField.classList).not.toContain('has-error');
			expect(startField.classList).not.toContain('has-error');
			expect(stopField.classList).not.toContain('has-error');
			expect(durationDaysField.classList).not.toContain('has-error');
			expect(durationHoursField.classList).not.toContain('has-error');

			fireEvent.click(saveButton);
		});

		test('Display an error when a SLA submission failure happens and resubmit', async () => {
			const alertToast = await getByTestId('alertToast');
			const alertClose = alertToast.children[1];

			expect(alertToast).toHaveTextContent('your-request-has-failed');

			fireEvent.click(alertClose);

			const alertContainer = getByTestId('alertContainer');

			expect(alertContainer.children[0].children.length).toBe(0);

			fireEvent.click(saveButton);
		});

		test('Display an error when trying to submit a SLA with a name that already exists', () => {
			expect(nameField).toHaveTextContent(
				'An SLA with the same name already exists.'
			);

			fireEvent.click(saveButton);
		});

		test('Redirect to SLAListPage after successful submit', async () => {
			expect(historyMock.replace).toHaveBeenCalledWith({
				pathname: `/slas/5678/20/1`,
				search: '',
			});
		});
	});

	describe('Edit a SLA', () => {
		let container, getAllByTestId, getByTestId, renderResult;

		const data = {
			calendarKey: '',
			dateModified: '2020-03-31T19:22:35Z',
			description: '',
			duration: 60000,
			id: 37772,
			name: 'SLA',
			processId: 35901,
			startNodeKeys: {
				nodeKeys: [
					{
						executionType: 'begin',
						id: '35905',
					},
				],
				status: 0,
			},
			status: 0,
			stopNodeKeys: {
				nodeKeys: [
					{
						executionType: 'end',
						id: '35903',
					},
				],
				status: 0,
			},
		};

		const clientMock = {
			get: jest
				.fn()
				.mockResolvedValueOnce({data: {items: nodes}})
				.mockResolvedValue({data}),
			put: jest.fn().mockResolvedValue({}),
		};

		const historyMock = {
			goBack: jest.fn(),
		};

		beforeAll(() => {
			cleanup();

			renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAFormPage
							history={historyMock}
							id="1234"
							processId="5678"
						/>
					</ToasterProvider>
				</MockRouter>
			);

			container = renderResult.container;
			getAllByTestId = renderResult.getAllByTestId;
			getByTestId = renderResult.getByTestId;
		});

		test('Render form in edit mode with correct data', () => {
			const durationDaysField = getByTestId('daysField');
			const durationHoursField = getByTestId('hoursField');
			const durationHoursInput = container.querySelector(
				'#sla_duration_hours'
			);
			const multiSelectItems = getAllByTestId('multiSelectItem');
			const nameField = getByTestId('nameField');
			const nameInput = container.querySelector('#sla_name');
			const startField = getByTestId('startField');
			const stopField = getByTestId('stopField');
			const saveButton = getByTestId('saveButton');

			expect(nameInput.value).toBe('SLA');
			expect(saveButton).toHaveTextContent('update');
			expect(multiSelectItems[0]).toHaveTextContent('process-begins');
			expect(multiSelectItems[1]).toHaveTextContent('process-ends');
			expect(durationHoursInput.value).toBe('00:01');
			expect(nameField.classList).not.toContain('has-error');
			expect(startField.classList).not.toContain('has-error');
			expect(stopField.classList).not.toContain('has-error');
			expect(durationDaysField.classList).not.toContain('has-error');
			expect(durationHoursField.classList).not.toContain('has-error');

			fireEvent.click(saveButton);
		});

		test('Redirect to SLAListPage after successful submit', async () => {
			expect(historyMock.goBack).toHaveBeenCalled();
		});
	});

	describe('Edit a Blocked SLA', () => {
		let getByTestId, renderResult;

		const nodes = [
			{
				id: 37733,
				initial: false,
				label: 'Approved',
				name: 'approved',
				terminal: true,
				type: 'STATE',
			},
			{
				id: 37735,
				initial: true,
				label: 'Created',
				name: 'created',
				terminal: false,
				type: 'STATE',
			},
			{
				id: 37741,
				initial: false,
				label: 'Review',
				name: 'review',
				terminal: false,
				type: 'TASK',
			},
		];

		const data = {
			calendarKey: '',
			dateModified: '2020-03-31T15:56:06Z',
			description: '',
			duration: 60000,
			id: 37538,
			name: 'SLA',
			pauseNodeKeys: {
				nodeKeys: [
					{
						executionType: 'on',
						id: '37741',
					},
				],
				status: 0,
			},
			processId: 35901,
			status: 2,
		};

		const clientMock = {
			get: jest
				.fn()
				.mockResolvedValueOnce({data: {items: nodes}})
				.mockResolvedValueOnce({data}),
		};

		beforeAll(() => {
			cleanup();

			renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAFormPage id="37741" processId="35901" />
					</ToasterProvider>
				</MockRouter>
			);

			getByTestId = renderResult.getByTestId;
		});

		test('Handle errors at start and stop node keys', () => {
			const alertChange = getByTestId('alertChange');
			const startField = getByTestId('startField');
			const stopField = getByTestId('stopField');

			expect(alertChange).toHaveTextContent(
				'the-time-frame-options-changed-in-the-workflow-definition'
			);
			expect(startField).toHaveTextContent(
				'selected-option-is-no-longer-available'
			);
			expect(stopField).toHaveTextContent(
				'selected-option-is-no-longer-available'
			);
		});
	});
});
