import { join } from 'path';
import fireClient from './fireClient';
import { readdirSync } from 'fs';
import Feature from './features';
import colors from 'colors';

export default class featureHandler {
	_client: fireClient;
	_dir: string;

	constructor(client: fireClient, dir: string) {
		this._client = client;
		this._dir = dir;

		if (dir && dir !== '') this._dir = join(require.main.path, dir);

		this._init();
	}

	_init() {
		const files = readdirSync(this._dir);
		for (const file of files) {
			if (file.endsWith('.map')) return;
			const feature: Feature = require(join(this._dir, file)).default;
			if (!(feature instanceof Feature)) {
				console.log(
					`[ERROR]`.red + ` invalid feature found at ${join(this._dir, file)}`
				);
				continue;
			}
			this._client.on('ready', () => {
				return;
			});

			feature.execute(this._client);
		}
	}
}
