import { Collection } from 'discord.js';
import { Document, Model } from 'mongoose';

interface model {
	model: Model<any>;
	getBy: string;
}

interface models {
	cooldowns: model;
	prefixes: model;
	disabledCommands: model;
	allowedRoles: model;
	fights: model;
}

interface options {
	models: models;
	updateSpeed: number;
}

interface models2 {
	cooldowns: {
		uID: string;
		cmdName: string;
		cooldown: Date;
	};
	prefixes: {
		gID: string;
		prefixes: string[];
	};
	disabledCommands: {
		gID: string;
		disabled: string[];
	};
	allowedRoles: {
		gID: string;
		allowed: object[];
	};
	fights: {
		loser: string;
		channel: string;
		mutedUntil: Date;
	};
}

export default class Cache {
	_cache: Collection<string, Collection<string, any>> = new Collection();
	_updateSpeed: number;
	_options: options;
	_models: Collection<string, Model<any>> = new Collection();

	constructor(options: options) {
		this._options = options;
		this._updateSpeed = options.updateSpeed;

		for (const key of Object.keys(options.models))
			this._models.set(key, options.models[key].model);
		this._init();
	}

	async _init() {
		for (const [modelName, model] of this._models) {
			const data = await model.find();
			for (const doc of data) {
				if (!this._cache.get(modelName))
					this._cache.set(
						modelName,
						new Collection<string, Document<any>>().set(
							doc[this._options.models[modelName].getBy],
							doc
						)
					);
				else
					this._cache
						.get(modelName)
						.set(doc[this._options.models[modelName].getBy], doc);
			}
		}
		this._startUpdateCycle();
	}

	getDoc<T extends keyof models2>(type: T, findBy: string): models2[T] {
		if (!this._cache.get(type)) return undefined;
		else return this._cache.get(type).get(findBy);
	}

	insertDoc<T extends keyof models2>(type: T, doc: Document<models2[T]>) {
		if (!this._cache.get(type))
			this._cache.set(
				type,
				new Collection<string, Document<any>>().set(
					doc[this._options.models[type].getBy],
					doc
				)
			);
		else this._cache.get(type).set(doc[this._options.models[type].getBy], doc);
	}

	updateDoc<T extends keyof models2>(type: T, update: Document<models2[T]>) {
		this._cache.get(type).set(update[this._options.models[type].getBy], update);
	}

	async deleteDoc<T extends keyof models2>(type: T, findBy: string) {
		this._cache.get(type).delete(findBy);
		const query = {};
		query[this._options.models[type].getBy] = findBy;
		await this._models.get(type).findOneAndDelete(query);
	}

	_startUpdateCycle() {
		setInterval(async () => {
			for (const [docName, collection] of this._cache) {
				const model = this._models.get(docName);
				for (const [key, document] of collection) {
					const query = {};
					query[this._options.models[docName].getBy] = key;
					if (await model.findOne(query))
						await model.findOneAndUpdate(query, document);
					else await model.create(document);
				}
			}
		}, this._updateSpeed);
	}
}
