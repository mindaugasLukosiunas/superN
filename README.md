** To run the project: **

1. Make sure Node.js is installed on your device / environment.
2. Clone git repository
3. Install dependencies: npm install
4. Generate prisma client: npx prisma generate
5. Run prisma migrations: npx prisma migrate dev --name init
6. Run dev environment: npm run dev
7. Post mock requests to url: localhost:{port_number}/api/webhooks

** Data structures and mock requests: **

You will find mock request payloads in /mocks folder. These payloads are based on stripe's subscription object and are a minified version of that.

Main data structures are defined in primsa/schema.prisma : Customer and Subscriptions table. A customer possibly might have multiple subscriptions and it's best to separate subscription and customer storage in DB and relate those with a foreign key in subscriptions table to reference the customer. Subscriptions does not track historical data, only represents the current subscription status. If you need to know historical data such as when a customer subscribed, paused, unpaused, cancelled, etc, would need a separate subscription events table.

** Webhook Events **

The webhook handles these stripe events:

customer.subscription.created
customer.subscription.paused
customer.subscription.resumed
customer.subscription.deleted

I chose these webhooks as they represent the full subscription lifecycle from creating to canceling. I skipped free trial events as the business might not even have those, but they can easily be added to a switch statment.

All events are handled by upserting values to a databse by subscription ID. Cancelation only updates by ID status and updated Date.
Default event throws an error atm.

** Asumptions/Limitations/Explanation **

I made an asumption that the customer is created before any subscription updates and might not have any subscription. I would asume that in real app I would not have to create a customer like I did in the webhook now. Limitation - does not track historical data, does not verify stripe signature (only mock function), database url is not in env varaible for simplicity. Could also handle errors with try catch and do something else if fails to upsert, but for now leave as is.
