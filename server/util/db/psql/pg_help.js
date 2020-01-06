const pool = require('./pg');
const {parser} = require('../../helper/functions');
const EventEmitter = require('events');
const util = require('util');

class pg_help {
    constructor(table) {
        this.table = table;
        EventEmitter.call(this);
    }

    insert(keys, values, returning) {
        let query = `INSERT INTO ${this.table}`;
        if (Array.isArray(keys) && Array.isArray(values)) {
            query += '(';
            keys.forEach((key, index, array) => {
                query += `${key}`;
                if (index < array.length - 1) {
                    query += ', '
                }
            });
            query += ') VALUES( ';
            keys.forEach((key, index, array) => {
                query += `$${index + 1}`;
                if (index < array.length - 1) {
                    query += ', '
                }
            });

            query += `) RETURNING ${returning ? returning : 'id'} `;


            pool.query(query, values)
                .then(result => {
                    this.emit('insert', result.rows[0]);
                })
                .catch(err => {
                    this.emit('insert_error', err);
                })
        }
    }

    insertSync(keys, values, returning) {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.table}`;
            if (Array.isArray(keys) && Array.isArray(values)) {
                query += '(';
                keys.forEach((key, index, array) => {
                    query += `${key}`;
                    if (index < array.length - 1) {
                        query += ', '
                    }
                });
                query += ') VALUES(';
                keys.forEach((key, index, array) => {
                    query += `$${index + 1}`;
                    if (index < array.length - 1) {
                        query += ', '
                    }
                });

                query += `) RETURNING ${returning ? returning : 'id'} `;


                pool.query(query, values)
                    .then(result => {
                        resolve(result.rows[0])
                    })
                    .catch(reject)
            }
        });

    }

    async fetch_one(selector, where, where_value, where_value_operation, sortBy , relations) {
        return new Promise((resolve, reject) => {
            let query = `SELECT ${selector} FROM ${this.table}`;

            query += pg_methods.relationsQueryGenerate(relations , this.table);

            query += pg_methods.whereQueryGenerate(where, where_value, where_value_operation);

            query += pg_methods.sortByQueryGenerate(sortBy);

            pool.query(query, where_value)
                .then(result => {
                    this.emit('fetch_on', result.rows[0]);
                    return resolve(result.rows[0])
                })
                .catch(err => {
                    this.emit('fetch_on_error', err);
                    reject(err)
                })
        })
    }

    fetch_all(selector, where, where_value, where_value_operation, relations, page, itemsPerPage, sortBy , groupBy) {
        return new Promise(async (resolve, reject) => {
            let query = `SELECT ${selector} FROM ${this.table} `;

            query += pg_methods.relationsQueryGenerate(relations , this.table);
            query += pg_methods.whereQueryGenerate(where, where_value, where_value_operation);
            query += pg_methods.sortByQueryGenerate(sortBy);
            query += pg_methods.groupByQueryGenerate(groupBy);

            /* تنطیمات صفحه بندی */
            let total_row = null;
            if (page) {
                let result_total = await pool.query(query, where_value);
                total_row = result_total.rowCount;

                let offset = (page - 1) * itemsPerPage;
                query += ` LIMIT ${itemsPerPage} OFFSET ${offset} `
            }

            pool.query(query, where_value)
                .then(result => {
                    resolve({
                        result: result.rows,
                        total: total_row || result.rowCount
                    })
                })
                .catch(reject)
        });
    }

    fetch_all_custom(customQuery, page, itemsPerPage) {
        return new Promise(async (resolve, reject) => {
            let query = `${customQuery} `;

            /* تنطیمات صفحه بندی */
            let total_row = null;
            if (page) {
                let result_total = await pool.query(query);
                total_row = result_total.rowCount;

                let offset = (page - 1) * itemsPerPage;
                query += ` LIMIT ${itemsPerPage} OFFSET ${offset} `
            }

            pool.query(query)
                .then(result => {
                    resolve({
                        result: result.rows,
                        total: total_row || result.rowCount
                    })
                })
                .catch(reject)
        });
    }

    update(keys, values, where, where_value, where_value_operation, returning) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE ${this.table} SET `;
            if (Array.isArray(keys) && Array.isArray(values)) {
                query += ' ';
                let index_query_value = 0;
                keys.forEach((key, index, array) => {
                    if (typeof key === 'string') {
                        index_query_value++;
                        query += ` ${key} = $${index + 1} `;
                    } else if (typeof key === 'object') {
                        query += ` ${key.name} ${key.type} `;
                        if (key.sample) {
                            index_query_value++;
                            query += `${parser(key.sample, '$' + (index + 1))}`
                        }
                        // else {
                        //     query += `$${index + 1}`
                        // }
                    }
                    if (index < array.length - 1) {
                        query += ', '
                    }
                });

                query += ' WHERE ';

                where.forEach((key, index, array) => {
                    query += `${key} = $${index_query_value + 1}`;
                    if (index < array.length - 1) {
                        query += where_value_operation || ' AND ';
                        index_query_value++
                    }
                });

                query += ` RETURNING ${returning ? returning : 'id'} `;

                values.push(...where_value);

                pool.query(query, values)
                    .then(result => {
                        resolve(result.rows[0]);
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        });

    }

    updateEmit(keys, values, where, where_value, where_value_operation, returning) {
            let query = `UPDATE ${this.table} SET `;
            if (Array.isArray(keys) && Array.isArray(values)) {
                query += ' ';
                let index_query_value = 0;
                keys.forEach((key, index, array) => {
                    if (typeof key === 'string') {
                        index_query_value++;
                        query += ` ${key} = $${index + 1} `;
                    } else if (typeof key === 'object') {
                        query += ` ${key.name} ${key.type} `;
                        if (key.sample) {
                            index_query_value++;
                            query += `${parser(key.sample, '$' + (index + 1))}`
                        }
                        // else {
                        //     query += `$${index + 1}`
                        // }
                    }
                    if (index < array.length - 1) {
                        query += ', '
                    }
                });

                query += ' WHERE ';

                where.forEach((key, index, array) => {
                    query += `${key} = $${index_query_value + 1}`;
                    if (index < array.length - 1) {
                        query += where_value_operation || ' AND ';
                        index_query_value++
                    }
                });

                query += ` RETURNING ${returning ? returning : 'id'} `;

                values.push(...where_value);

                pool.query(query, values)
                    .then(result => {
                        this.emit('update', result.rows[0]);
                    })
                    .catch(err => {
                        this.emit('update_error', err);
                    })
            }

    }

    delete(keys, values) {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM ${this.table}`;
            if (Array.isArray(keys) && Array.isArray(values)) {
                query += ' WHERE ';

                keys.forEach((key, index, array) => {
                    if (typeof key === 'string') {
                        query += ` ${key} = $${index + 1} `;
                    } else if (typeof key === 'object') {
                        query += ` ${key.name} ${key.type} `;
                        if (key.sample) {
                            query += `${parser(key.sample, '$' + (index + 1))}`
                        } else {
                            query += `$${index + 1}`
                        }
                    }
                    if (index < array.length - 1) {
                        query += ' AND '
                    }
                });

                pool.query(query, values)
                    .then(result => {
                        resolve(result.rows[0])
                    })
                    .catch(reject)
            }
        });

    }

    rowCount(where, where_value, where_value_operation) {
        return new Promise((resolve, reject) => {
            let query = `SELECT id FROM ${this.table} `;

            if (Array.isArray(where) && Array.isArray(where_value)) {
                query += ' WHERE ';
                where.forEach((key, index, array) => {
                    if (typeof key === 'string') {
                        query += ` ${key} = $${index + 1} `;
                    } else if (typeof key === 'object') {
                        query += ` ${key.name} ${key.type} ${parser(key.sample, '$' + (index + 1))} `
                    }

                    if (index < array.length - 1) {
                        if (where_value_operation) {
                            query += ` ${where_value_operation} `
                        } else query += ' AND '
                    }
                });
            }

            pool.query(query, where_value)
                .then(result => {
                    resolve(result.rowCount)
                })
                .catch(reject)
        });
    }
}

class pg_methods {
    static whereQueryGenerate(where, where_value, where_value_operation) {
        let query = '';
        if (Array.isArray(where) && Array.isArray(where_value)) {
            query += ' WHERE ';
            where.forEach((key, index, array) => {
                if (typeof key === 'string') {
                    query += ` ${key} = $${index + 1} `;
                } else if (typeof key === 'object') {
                    query += ` ${key.name} ${key.type} `;
                    if (key.sample) {
                        query += `${parser(key.sample, '$' + (index + 1))}`
                    } else {
                        query += `$${index + 1}`
                    }

                }
                if (index < array.length - 1) {
                    if (where_value_operation) {
                        query += ` ${where_value_operation} `
                    } else query += ' AND '
                }
            });
        }
        return query;
    }

    static sortByQueryGenerate(sortBy) {
        let query = "";
        if (sortBy) {
            if (Array.isArray(sortBy) && sortBy.length > 0) {
                query += ` ORDER BY  `;
                sortBy.forEach((key, index, array) => {
                    query += ` ${key.column} ${key.sort} `;
                    if (index < array.length - 1) {
                        query += ' , '
                    }
                })
            }
        }
        return query;
    }

    static relationsQueryGenerate(relations , table) {
        let query = "";
        if (relations && Array.isArray(relations)) {
            relations.forEach((key) => {
                let child = key.child || 'id';
                query += ` LEFT JOIN ${key.table} ${key.alias} ON ${table}.${key.parent} = ${key.alias}.${child} `
            })
        }
        return query;
    }

    static groupByQueryGenerate(groupBy) {
        let query = "";

        if (groupBy && Array.isArray(groupBy)) {
            query += " GROUP BY";
            groupBy.forEach((group_item , group_key) => {
                query += ` ${group_item}`;
                if (group_key < groupBy.length - 1) {
                    query += ","
                }
            })
        }

        return query;
    }
}

util.inherits(pg_help, EventEmitter);

module.exports = pg_help;
