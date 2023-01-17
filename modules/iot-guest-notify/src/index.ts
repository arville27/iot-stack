// Import all dependencies, mostly using destructuring for better view.
import {
  Client,
  middleware,
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
} from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import { clientConfig, middlewareConfig } from './utils/config';
import { mqttClient } from './utils/mqtt';
import { BROKER_TOPIC } from './utils/config';

const PORT = process.env.PORT || 3500;

// Create a new LINE SDK client.
const client = new Client(clientConfig);

// Create a new Express application.
const app: Application = express();

// Function handler to receive the text.
const textEventHandler = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type === 'join') {
    console.log(event);
    return;
  }

  // Process all variables here.
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.
  const {
    replyToken,
    source: { userId },
  } = event;
  const { text } = event.message;

  if (!text.startsWith('/send ')) return;

  // Create a new message.
  console.log(`Received message from ${userId}: ${text}`);

  // batasin 80 character
  // buat prefix buat send command
  // pastiin ke publish dan kirim sebagai response ke user

  // Publish to broker mqtt
  const message = text.replace('/send ', '');

  if (message.length <= 80) {
    console.log(`Updating IoT device LCD screen with: ${message} `);
    mqttClient.publish(BROKER_TOPIC, message);
  }

  const response: TextMessage = {
    type: 'text',
    text:
      message.length > 80
        ? 'Message exceeds the maximum length (80 characters)'
        : 'Successfully send message to broker',
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get('/', async (_: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'success',
    message: 'Connected successfully!',
  });
});

// This route is used for the Webhook.
app.post(
  '/webhook',
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await textEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          // Return an error message.
          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    // Return a successfull message.
    return res.status(200).json({
      status: 'success',
      results,
    });
  }
);

// Create a server and listen to it.
app.listen(PORT, () => console.log(`Application is live and listening on port ${PORT}`));
