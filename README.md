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

[grafana-dashboards](https://github.com/k03mad/grafana-dashboards/tree/master/export)
