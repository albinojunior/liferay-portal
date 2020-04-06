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

import SLAListPage from '../../../../src/main/resources/META-INF/resources/js/components/sla/list-page/SLAListPage.es';
import ToasterProvider from '../../../../src/main/resources/META-INF/resources/js/shared/components/toaster/ToasterProvider.es';
import {MockRouter} from '../../../mock/MockRouter.es';

describe('The SLAListPage component should', () => {
	describe('Be rendered correctly with no items', () => {
		let getByTestId;

		const clientMock = {
			get: jest.fn().mockResolvedValue({data: {items: []}}),
		};

		beforeAll(() => {
			const renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAListPage page="1" pageSize="1" processId="36001" />
					</ToasterProvider>
				</MockRouter>
			);

			getByTestId = renderResult.getByTestId;
		});

		test('Show navbar with New SLA button with correct link', () => {
			const childLink = getByTestId('newSLALink');
			const newSLAButton = getByTestId('newSLA');

			expect(childLink.getAttribute('href')).toContain('/sla/new/36001');
			expect(newSLAButton.title).toBe('new-sla');
		});

		test('Display empty state', () => {
			const emptyStateMessage = getByTestId('emptyStateMsg');

			expect(emptyStateMessage).toHaveTextContent(
				'sla-allows-to-define-and-measure-process-performance'
			);
		});
	});

	describe('Be rendered correctly with items', () => {
		let getAllByTestId, getByTestId;

		const data = {
			actions: {},
			items: [
				{
					dateModified: '2020-04-03T18:01:07Z',
					description: '',
					duration: 60000,
					id: 37975,
					name: 'SLA',
					processId: 36001,
				},
			],
			totalCount: 1,
		};

		const clientMock = {
			delete: jest
				.fn()
				.mockRejectedValueOnce({})
				.mockResolvedValue({}),
			get: jest.fn().mockResolvedValue({data}),
		};

		beforeAll(() => {
			cleanup();

			const renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAListPage page="1" pageSize="1" processId="36001" />
					</ToasterProvider>
				</MockRouter>
			);

			getAllByTestId = renderResult.getAllByTestId;
			getByTestId = renderResult.getByTestId;
		});

		test('Show table columns', () => {
			const description = getByTestId('description');
			const duration = getByTestId('duration');
			const lastModified = getByTestId('lastModified');
			const slaName = getByTestId('slaName');
			const status = getByTestId('status');

			expect(slaName).toHaveTextContent('sla-name');
			expect(description).toHaveTextContent('description');
			expect(status).toHaveTextContent('status');
			expect(duration).toHaveTextContent('duration');
			expect(lastModified).toHaveTextContent('last-modified');
		});

		test('Show items info and kebab menu', () => {
			const kebab = getByTestId('kebab');
			const slaDateModified = getByTestId('SLADateModified');
			const slaDescription = getByTestId('SLADescription');
			const slaDuration = getByTestId('SLADuration');
			const slaName = getByTestId('SLAName');
			const slaStatus = getByTestId('SLAStatus');

			expect(slaName).toHaveTextContent('SLA');
			expect(slaDescription).toHaveTextContent('');
			expect(slaStatus).toHaveTextContent('running');
			expect(slaDuration).toHaveTextContent('1min');
			expect(slaDateModified).toHaveTextContent('Apr 03');
			fireEvent.click(kebab);

			const dropDownItems = getAllByTestId('kebabDropItems');

			expect(dropDownItems[0]).toHaveTextContent('edit');
			expect(dropDownItems[1]).toHaveTextContent('delete');

			fireEvent.click(dropDownItems[1]);

			jest.runAllTimers();
		});

		test('Display modal after clicking on delete option of kebab menu', () => {
			const cancelButton = getByTestId('cancelButton');
			const deleteButton = getByTestId('deleteButton');
			const deleteModal = getByTestId('deleteModal');

			expect(deleteModal).toHaveTextContent(
				'deleting-slas-will-reflect-on-report-data'
			);
			expect(cancelButton).toHaveTextContent('cancel');
			expect(deleteButton).toHaveTextContent('ok');

			fireEvent.click(deleteButton);
		});

		test('Display toast when failure occur while trying to confirm item delete', () => {
			const alertToast = getByTestId('alertToast');
			const alertClose = alertToast.children[1];
			const deleteButton = getByTestId('deleteButton');

			expect(alertToast).toHaveTextContent('your-request-has-failed');

			fireEvent.click(alertClose);

			const alertContainer = getByTestId('alertContainer');

			expect(alertContainer.children[0].children.length).toBe(0);

			fireEvent.click(deleteButton);
		});

		test('Display toast when confirm item delete', () => {
			const alertToast = getByTestId('alertToast');
			const alertClose = alertToast.children[1];

			expect(alertToast).toHaveTextContent('sla-was-deleted');

			fireEvent.click(alertClose);

			const alertContainer = getByTestId('alertContainer');

			expect(alertContainer.children[0].children.length).toBe(0);
		});

		//como mockar esse cenario?
		xtest('Display info alert and toast after a SLA is created or updated', () => {
			const updateAlert = getByTestId('updateAlert');

			expect(updateAlert).toHaveTextContent(
				'one-or-more-slas-are-being-updated'
			);

			const alertToast = getByTestId('alertToast');
			const alertClose = alertToast.children[1];

			expect(alertToast).toHaveTextContent('sla-was-updated');

			fireEvent.click(alertClose);

			const alertContainer = getByTestId('alertContainer');

			expect(alertContainer.children[0].children.length).toBe(0);
		});
	});

	describe('Be rendered correctly with blocked items', () => {
		let container, getAllByTestId, getByTestId;

		const data = {
			actions: {},
			items: [
				{
					calendarKey: '',
					dateModified: '2020-04-06T01:26:17Z',
					description: '',
					duration: 540000,
					id: 39409,
					name: 'SLAb',
					processId: 36001,
					status: 2,
					stopNodeKeys: {
						nodeKeys: [
							{
								executionType: 'end',
								id: '39522',
							},
						],
						status: 0,
					},
				},
				{
					calendarKey: '',
					dateModified: '2020-04-03T18:01:07Z',
					description: '',
					duration: 60000,
					id: 37975,
					name: 'SLA',
					processId: 36001,
					startNodeKeys: {
						nodeKeys: [
							{
								executionType: 'begin',
								id: '36005',
							},
						],
						status: 0,
					},
					status: 0,
					stopNodeKeys: {
						nodeKeys: [
							{
								executionType: 'end',
								id: '36003',
							},
						],
						status: 0,
					},
				},
			],
			lastPage: 1,
			page: 1,
			pageSize: 20,
			totalCount: 1,
		};

		const clientMock = {
			get: jest.fn().mockResolvedValue({data}),
		};

		beforeAll(() => {
			cleanup();

			const renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAListPage page="1" pageSize="1" processId="36001" />
					</ToasterProvider>
				</MockRouter>
			);

			container = renderResult.container;
			getAllByTestId = renderResult.getAllByTestId;
			getByTestId = renderResult.getByTestId;
		});

		test('Show alert error', () => {
			const alertError = getByTestId('alertError');

			expect(alertError).toHaveTextContent(
				'fix-blocked-slas-to-resume-accurate-reporting'
			);

			const alertClose = container.querySelector('button.close');

			fireEvent.click(alertClose);
		});

		test('Show dividers', () => {
			const blockedDivider = getByTestId('blockedDivider');
			const runningDivider = getByTestId('runningDivider');

			expect(blockedDivider).toHaveTextContent('BLOCKED');
			expect(runningDivider).toHaveTextContent('RUNNING');
		});

		test('Show blocked items info correctly', () => {
			const slaNames = getAllByTestId('SLAName');
			const slaStatus = getAllByTestId('SLAStatus');

			expect(slaNames[0].children[0].children.length).toBe(2);
			expect(slaStatus[0]).toHaveTextContent('blocked');
			expect(slaStatus[0].classList).toContain('text-danger');
		});
	});
});
