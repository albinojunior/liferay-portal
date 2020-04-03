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

import {fireEvent, render} from '@testing-library/react';
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
		let baseElement, getByTestId;

		const data = {
			actions: {},
			items: [
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
			const renderResult = render(
				<MockRouter client={clientMock}>
					<ToasterProvider>
						<SLAListPage page="1" pageSize="1" processId="36001" />
					</ToasterProvider>
				</MockRouter>
			);

			baseElement = renderResult.baseElement;
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

		//checar link do edit '/sla/edit/processId'
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

			const dropDownItems = baseElement.querySelectorAll(
				'button.dropdown-item'
			);

			expect(dropDownItems[0]).toHaveTextContent('edit');
			//expect(dropDownItems[0].getAttribute('href')).toContain('/sla/edit/36001');
			expect(dropDownItems[1]).toHaveTextContent('delete');
		});

		xtest('Display modal after clicking on delete option of kebab menu', () => {
			getByTestId();
		});

		//checar close
		xtest('Display info alert after a SLA is created or updated', () => {
			getByTestId();
		});

		//checar close
		xtest('Display toast after a SLA is created or updated', () => {
			getByTestId();
		});
	});
});
