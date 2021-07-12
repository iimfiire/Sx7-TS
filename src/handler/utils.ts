import { GuildMember, PermissionResolvable, Role } from 'discord.js';

interface checkPermsReturn {
	missing: Array<PermissionResolvable> | null;
	length: number;
}

export const checkPerms = (
	member: GuildMember,
	reqPermissions: PermissionResolvable[]
): checkPermsReturn => {
	const memberPerms: PermissionResolvable = member.permissions.toArray();

	const missing: Array<PermissionResolvable> = [];

	for (const perm of reqPermissions) {
		if (!memberPerms.includes(perm)) missing.push(perm);
	}

	return {
		missing: missing.length > 0 ? missing : null,
		length: missing.length,
	};
};

export const checkRoles = (
	member: GuildMember,
	reqRoles: Array<Role>
): boolean => {
	const memberRoles = member.roles.cache.array();

	for (const role of reqRoles) {
		if (!memberRoles.includes(role)) return false;
	}

	return true;
};


export const properCase = (string: string) => {
  return string.toLowerCase().replace(/(\b\w)/gi, (w) => w.toUpperCase());
}

export const formatDate = (date: Date, format: number) => {
    let d = date instanceof Date ? date : new Date();
    let year = d.getFullYear().toString();
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
    let day = d.getDate();
    let hour = d.getHours().toString().padStart(2, '0');
    let minute = d.getMinutes().toString().padStart(2, '0');
    let second = d.getSeconds().toString().padStart(2, '0');
    let millisecond = d.getMilliseconds().toString().padStart(3, '0');
    let formats = [`${hour}:${minute}`, `${hour}:${minute}:${second}`, `${hour}:${minute}:${second}:${millisecond}`, `${day} ${month} ${year}, ${hour}:${minute}`, `${day} ${month} ${year}, ${hour}:${minute}:${second}`, `${day} ${month} ${year}, ${hour}:${minute}:${second}:${millisecond}`, `${month} ${day} ${year}`, `${day} ${month}`];
    let selection = formats[1];
    if (format && typeof format == 'number') {
        format = Math.floor(format);
        if (format > 7 || format < 0) throw RangeError('formatDate() function format index must be 0 - 7');
        selection = formats[format];
    }
    return selection;
}