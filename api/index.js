import "dotenv/config";
import crypto from "crypto";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(
  express.raw({
    type: "application/json",
  }),
);

app.get("/", (req, res) => res.send("Atlassian Webhook Endpoint"));

app.post("/", async (req, res) => {
  let notification = JSON.parse(req.body);
  console.log(JSON.stringify(notification, null, 4));
  if (notification.incident) {
    // Only handle POST requests that contain incident info
    let createdAt = notification.incident.created_at;
    let impact = notification.incident.impact;
    let impactOverride = notification.incident.impact_override;
    let monitoringAt = notification.incident.monitoring_at;
    let resolvedAt = notification.incident.resolved_at;
    let status = notification.incident.status;
    let updatedAt = notification.incident.updated_at;
    let id = notification.incident.id;
    let latestIncidentUpdateBody =
      notification.incident.incident_updates[0]?.body;
    let latestIncidentUpdateCreatedAt =
      notification.incident.incident_updates[0]?.created_at;
    let latestIncidentUpdateDisplayAt =
      notification.incident.incident_updates[0]?.display_at;
    let latestIncidentUpdateStatus =
      notification.incident.incident_updates[0]?.status;
    let latestIncidentUpdateUpdatedAt =
      notification.incident.incident_updates[0]?.updated_at;
    let latestIncidentUpdateId = notification.incident.incident_updates[0]?.id;
    let discordMessageContent = `Incident Created At: <t:${Math.floor(new Date(createdAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Incident Impact: \`${impact}\`\n`;
    discordMessageContent += `Incident Impact Override: \`${impactOverride}\`\n`;
    discordMessageContent += `Incident Monitoring At: ${Math.floor(new Date(monitoringAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Incident Resolved At: <t:${Math.floor(new Date(resolvedAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Incident Status: \`${status}\`\n`;
    discordMessageContent += `Incident Updated At: <t:${Math.floor(new Date(updatedAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Incident ID: \`${id}\`\n`;
    discordMessageContent += `Latest Incident Update Body: \`${latestIncidentUpdateBody}\`\n`;
    discordMessageContent += `Latest Incident Update Created At: <t:${Math.floor(new Date(latestIncidentUpdateCreatedAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Latest Incident Update Display At: <t:${Math.floor(new Date(latestIncidentUpdateDisplayAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Latest Incident Update Status: \`${latestIncidentUpdateStatus}\`\n`;
    discordMessageContent += `Latest Incident Update Updated At: <t:${Math.floor(new Date(latestIncidentUpdateUpdatedAt).getTime() / 1000)}>\n`;
    discordMessageContent += `Latest Incident Update ID: \`${latestIncidentUpdateId}\`\n`;
    res.sendStatus(204);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;
