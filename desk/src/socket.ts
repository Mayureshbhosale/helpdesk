import { io } from "socket.io-client";
import { getCachedResource, getCachedListResource } from "frappe-ui";
import { createToast } from "./utils";
import { socketio_port } from "../../../../sites/common_site_config.json";

function init() {
  const host = window.location.hostname;
  const port = window.location.port ? `:${socketio_port}` : "";
  const protocol = port ? "http" : "https";
  const siteName = window["site_name"];
  const namespace = !siteName?.startsWith("{{") ? siteName : host;
  const url = `${protocol}://${host}${port}/${namespace}`;
  const socket = io(url, {
    withCredentials: true,
    reconnectionAttempts: 5,
  });

  socket.on("connect_error", (err) => {
    createToast({
      title: "Socket Connection Error",
      text: err.message,
      icon: "x",
      iconClasses: "text-red-500",
    });
  });

  socket.on("refetch_resource", (data) => {
    if (data.cache_key) {
      const resource =
        getCachedResource(data.cache_key) ||
        getCachedListResource(data.cache_key);
      if (resource) {
        resource.reload();
      }
    }
  });

  return socket;
}

export const socket = init();
