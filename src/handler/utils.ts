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
