const res_1 = {
	id: "WH-1V650937AC6101345-1KL08895AY018890D",
	event_version: "1.0",
	create_time: "2023-06-02T19:43:33.060Z",
	resource_type: "subscription",
	resource_version: "2.0",
	event_type: "BILLING.SUBSCRIPTION.CREATED",
	summary: "Subscription created",
	resource: {
		start_time: "2023-06-02T19:43:32Z",
		quantity: "1",
		create_time: "2023-06-02T19:43:32Z",
		links: [
			{
				href: "https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=BA-4F077282GF158021R",
				rel: "approve",
				method: "GET",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-W5KM7VHU8YL6",
				rel: "edit",
				method: "PATCH",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-W5KM7VHU8YL6",
				rel: "self",
				method: "GET",
			},
		],
		id: "I-W5KM7VHU8YL6",
		plan_overridden: False,
		plan_id: "P-5VG78264RK002353LMR47C7Q",
		status: "APPROVAL_PENDING",
	},
	links: [
		{
			href: "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-1V650937AC6101345-1KL08895AY018890D",
			rel: "self",
			method: "GET",
		},
		{
			href: "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-1V650937AC6101345-1KL08895AY018890D/resend",
			rel: "resend",
			method: "POST",
		},
	],
};

const res_2 = {
	id: "WH-54749131J59274935-6M002758L1754281U",
	event_version: "1.0",
	create_time: "2023-06-03T12:30:33.528Z",
	resource_type: "subscription",
	resource_version: "2.0",
	event_type: "BILLING.SUBSCRIPTION.ACTIVATED",
	summary: "Subscription activated",
	resource: {
		quantity: "1",
		subscriber: {
			email_address: "sb-zl9v120275707@personal.example.com",
			payer_id: "NC62UQERZ6XMJ",
			name: { given_name: "John", surname: "Doe" },
			shipping_address: {
				address: {
					address_line_1: "1 Main St",
					admin_area_2: "San Jose",
					admin_area_1: "CA",
					postal_code: "95131",
					country_code: "US",
				},
			},
		},
		create_time: "2023-06-03T12:30:27Z",
		custom_id: "bb0b341e-23b6-40f1-9ba0-f027fee423d6",
		plan_overridden: 'False',
		shipping_amount: { currency_code: "USD", value: "0.0" },
		start_time: "2023-06-03T12:29:54Z",
		update_time: "2023-06-03T12:30:28Z",
		billing_info: {
			outstanding_balance: { currency_code: "USD", value: "0.0" },
			cycle_executions: [
				{
					tenure_type: "REGULAR",
					sequence: 1,
					cycles_completed: 1,
					cycles_remaining: 0,
					current_pricing_scheme_version: 1,
					total_cycles: 0,
				},
			],
			last_payment: {
				amount: { currency_code: "USD", value: "47.0" },
				time: "2023-06-03T12:30:27Z",
			},
			next_billing_time: "2023-07-03T10:00:00Z",
			failed_payments_count: 0,
		},
		links: [
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-T1GR2JEW38VJ/cancel",
				rel: "cancel",
				method: "POST",
				encType: "application/json",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-T1GR2JEW38VJ",
				rel: "edit",
				method: "PATCH",
				encType: "application/json",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-T1GR2JEW38VJ",
				rel: "self",
				method: "GET",
				encType: "application/json",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-T1GR2JEW38VJ/suspend",
				rel: "suspend",
				method: "POST",
				encType: "application/json",
			},
			{
				href: "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-T1GR2JEW38VJ/capture",
				rel: "capture",
				method: "POST",
				encType: "application/json",
			},
		],
		id: "I-T1GR2JEW38VJ",
		plan_id: "P-5VG78264RK002353LMR47C7Q",
		status: "ACTIVE",
		status_update_time: "2023-06-03T12:30:28Z",
	},
	links: [
		{
			href: "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-54749131J59274935-6M002758L1754281U",
			rel: "self",
			method: "GET",
		},
		{
			href: "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-54749131J59274935-6M002758L1754281U/resend",
			rel: "resend",
			method: "POST",
		},
	],
};
