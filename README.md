• [ctrld-prom-exporter](https://github.com/k03mad/ctrld-prom-exporter) \
• [mik-prom-exporter](https://github.com/k03mad/mik-prom-exporter) \
• [mosobleirc-prom-exporter](https://github.com/k03mad/mosobleirc-prom-exporter) \
• [ping-prom-exporter](https://github.com/k03mad/ping-prom-exporter) \
• [sys-prom-exporter](https://github.com/k03mad/sys-prom-exporter) \
• [tin-invest-prom-exporter](https://github.com/k03mad/tin-invest-prom-exporter) \
• ya-iot-prom-exporter

# [Yandex IoT — Prometheus] exporter

— [Create new app](https://oauth.yandex.ru/client/new) with access `iot:view` \
— Get token: `https://oauth.yandex.ru/authorize?response_type=token&client_id=1234321&scope=iot:view` (replace `client_id` parameter with created app ID) \
— [Use correct Node.JS version](.nvmrc) \
— Start exporter:

```bash
# one time
npm run setup

# start
npm run start --token=y0_1234321 --port=11000
# or with envs
YA_IOT_API_TOKEN=y0_1234321 YA_IOT_EXPORTER_PORT=11000 npm run start
```

— Update Prometheus `scrape_configs` \
— [Import Grafana dashboard](grafana)
