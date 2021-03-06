import Webhook from "../webhook";
import { getTriggerConstructorParams } from "./trigger.util";
import { formatRequest, IWebhookRequest, AnyObject } from "actionsflow-core";

test("webhook trigger", async () => {
  const webhook = new Webhook(
    await getTriggerConstructorParams({ options: {}, name: "webhook" })
  );
  const requestPayload = formatRequest({
    path: "/",
    body: {
      id: "test123",
      title: "test webhook title",
    },
    method: "post",
    headers: {},
  });
  const request: IWebhookRequest = {
    ...requestPayload,
    params: {},
  };

  const triggerResults = (await webhook.webhooks[0].handler.bind(webhook)(
    request
  )) as AnyObject[];

  expect(triggerResults.length).toBe(1);
});
test("webhook trigger with path", async () => {
  const webhook = new Webhook(
    await getTriggerConstructorParams({ options: {}, name: "webhook" })
  );
  const requestPayload = formatRequest({
    path: "/",
    body: {
      id: "test123",
      title: "test webhook title",
    },
    method: "post",
    headers: {},
  });
  const request: IWebhookRequest = {
    ...requestPayload,
    params: {},
  };

  const triggerResults = (await webhook.webhooks[0].handler.bind(webhook)(
    request
  )) as AnyObject[];
  expect(triggerResults.length).toBe(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((triggerResults as any)[0].body.id).toBe("test123");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((triggerResults as any)[0].method).toBe("post");
});
