"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class AdminModel extends pg_helper {
    constructor() {
        super('admin.users')
    }

    getPermissions(userId) {
        return new Promise((resolve, reject) => {
            this.fetch_all_custom('SELECT admin.permissions.id, admin.permissions.name FROM admin.permission_user INNER JOIN admin.permissions ON (admin.permission_user.permission_id = admin.permissions.id) WHERE admin.permission_user.user_id = ' + userId).then(data => resolve(data)).catch(reject)
        })
    }
}

class PermissionModel extends pg_helper {
    constructor() {
        super('admin.permissions')
    }
}

class RoleModel extends pg_helper {
    constructor() {
        super('admin.roles')
    }
}


class PermissionRolePivot extends pg_helper {
    constructor() {
        super('admin.permission_role')
    }
}

class RoleUserPivot extends pg_helper {
    constructor() {
        super('admin.role_user')
    }
}

module.exports = {AdminModel, PermissionModel, RoleModel, PermissionRolePivot, RoleUserPivot};
