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
    let incidentName = notification.incident.name;
    let discordMessageContent = `Incident \`${incidentName}\`\n`;
    discordMessageContent += `Incident Created At: <t:${Math.floor(new Date(createdAt).getTime() / 1000)}>\n`;
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
    await fetch(`${process.env.DISCORD_WEBHOOK_URL}?wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Discord Status Update",
        avatar_url:
          "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
        content: discordMessageContent,
        allowed_mentions: { parse: [] }, // Avoid accidental pings
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    res.sendStatus(204);
  } else {
    res.sendStatus(204); // doesn't include incident data. Can be an error or an unhandled event
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;
