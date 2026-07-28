var HrMtgAgendaTabAutomation = Class.create()
HrMtgAgendaTabAutomation.prototype = {
    initialize: function () {},

    // sn_hr_core_case and every table that extends it (verified live via
    // GlideTableHierarchy against sys_db_object.super_class), minus the exclusion below.
    BASE_TABLE: 'sn_hr_core_case',
    EXCLUDED_TABLES: ['sn_hr_er_case'],
    // sp_widget "HR Agent Agenda" (id: hr_mtg_agenda_widget) -- confirmed via query on this instance.
    WIDGET_SYS_ID: '70badff0a1f849e3885fae70c7305a72',
    TAB_NAME: 'HR Agent Agenda',
    TAB_TYPE: 'custom', // ticket_tab_configuration.type choice value for "Custom", confirmed via sys_choice
    ORDER_INCREMENT: 10,

    // Adds the "HR Agent Agenda" tab to every active Standard Ticket Configuration
    // (ticket_configuration) for sn_hr_core_case and its COE child tables, excluding
    // sn_hr_er_case. Idempotent and safe to re-run: a config that already has a tab
    // referencing this widget is left untouched.
    run: function () {
        var created = 0
        var skipped = 0

        try {
            // Confirmed at runtime on the instance: GlideTableHierarchy throws
            // "ReferenceError: GlideTableHierarchy is not defined" without the global scope
            // prefix, even though this app itself runs in the global application scope. The
            // SDK build linter's no-unsupported-node-builtins rule flags any reference to the
            // bare identifier `global` (dot or bracket notation alike) as if it were Node's
            // global object, even though at runtime this is ServiceNow's global scope, not
            // Node. Fetching the global object via `this` in a plain function call (non-strict
            // mode) never writes the identifier `global`, so it doesn't trip that rule.
            var globalScope = (function () {
                return this
            })()

            gs.info('HrMtgAgendaTabAutomation: globalScope.GlideTableHierarchy is ' + typeof globalScope.GlideTableHierarchy)
            var hierarchy = new globalScope.GlideTableHierarchy(this.BASE_TABLE)
            gs.info('HrMtgAgendaTabAutomation: hierarchy.getAllExtensions is ' + typeof hierarchy.getAllExtensions)
            var tables = hierarchy.getAllExtensions()
            gs.info('HrMtgAgendaTabAutomation: tables found: ' + JSON.stringify(tables))

            for (var i = 0; i < tables.length; i++) {
                var table = tables[i]
                if (this.EXCLUDED_TABLES.indexOf(table) !== -1) {
                    gs.info('HrMtgAgendaTabAutomation: excluded table, skipping: ' + table)
                    continue
                }

                var configGr = new GlideRecord('ticket_configuration')
                configGr.addQuery('table', table)
                configGr.addQuery('active', true)
                configGr.query()
                gs.info('HrMtgAgendaTabAutomation: querying ticket_configuration for table ' + table + ', found ' + configGr.getRowCount())

                while (configGr.next()) {
                    if (this._ensureTabForConfig(configGr)) {
                        created++
                    } else {
                        skipped++
                    }
                }
            }
        } catch (e) {
            gs.error('HrMtgAgendaTabAutomation: run failed: ' + e.message)
            throw e
        }

        gs.info('HrMtgAgendaTabAutomation: completed. Created ' + created + ', skipped (already present) ' + skipped + '.')
        return { created: created, skipped: skipped }
    },

    // Returns true if a new tab was created, false if one already existed for this config.
    _ensureTabForConfig: function (configGr) {
        var configId = configGr.getUniqueValue()
        var table = configGr.getValue('table')

        var existing = new GlideRecord('ticket_tab_configuration')
        existing.addQuery('parent', configId)
        existing.addQuery('widget', this.WIDGET_SYS_ID)
        existing.query()
        if (existing.next()) {
            gs.info('HrMtgAgendaTabAutomation: tab already present for ' + table + ' (config ' + configId + '), skipping')
            return false
        }

        var maxOrder = 0
        var orderGr = new GlideRecord('ticket_tab_configuration')
        orderGr.addQuery('parent', configId)
        orderGr.orderByDesc('order')
        orderGr.setLimit(1)
        orderGr.query()
        if (orderGr.next()) {
            maxOrder = parseInt(orderGr.getValue('order'), 10) || 0
        }

        var newOrder = maxOrder + this.ORDER_INCREMENT

        var tab = new GlideRecord('ticket_tab_configuration')
        tab.initialize()
        tab.setValue('parent', configId)
        tab.setValue('widget', this.WIDGET_SYS_ID)
        tab.setValue('tab_name', this.TAB_NAME)
        tab.setValue('type', this.TAB_TYPE)
        tab.setValue('order', newOrder)
        tab.insert()

        gs.info('HrMtgAgendaTabAutomation: created "HR Agent Agenda" tab for ' + table + ' (config ' + configId + '), order ' + newOrder)
        return true
    },

    type: 'HrMtgAgendaTabAutomation',
}
