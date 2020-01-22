import Vue from 'vue'

/**
 * 0: Pending
 * 1: Success => [ACCEPTED]
 * 2: Rejected
 * 3: Published
 * 4: Suspend
 * 5: Accepted
 * 6: Failed
 */

const statuses = ['PENDING', 'SUCCESS', 'REJECTED', 'PUBLISHED', 'SUSPEND', 'ACCEPTED', 'FAILED'];

Vue.mixin({
    methods: {
        status_convertCodeToKey(code) {
            if (statuses.length > code)
                return statuses[code];
            else
                return null;
        }
    }
});
