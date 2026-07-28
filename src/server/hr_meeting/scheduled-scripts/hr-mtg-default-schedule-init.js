;(function () {
    var SCHEDULE_NAME = 'HR Agent Agenda Default Schedule'
    var SCHEDULE_DESC = 'Default fallback availability schedule used by HR Agent Agenda when an assigned HR agent has no explicit availability records.'
    var CONFIG_TABLE = 'u_hr_mtg_config'
    var SCHEDULE_TABLE = 'cmn_schedule'
    var SPAN_TABLE = 'cmn_schedule_span'
    var SPAN_NAME = 'HR Agent Agenda Weekday Availability'

    // -- Step 1: Create or find the cmn_schedule record --
    var schedGr = new GlideRecord(SCHEDULE_TABLE)
    schedGr.addQuery('name', SCHEDULE_NAME)
    schedGr.setLimit(1)
    schedGr.query()

    var scheduleSysId
    if (schedGr.next()) {
        scheduleSysId = schedGr.getUniqueValue()
        gs.info('HR Agent Agenda install: Schedule already exists (' + scheduleSysId + ')')
    } else {
        schedGr.initialize()
        schedGr.setValue('name', SCHEDULE_NAME)
        schedGr.setValue('description', SCHEDULE_DESC)
        scheduleSysId = schedGr.insert()
        gs.info('HR Agent Agenda install: Created schedule (' + scheduleSysId + ')')
    }

    if (!scheduleSysId) {
        gs.error('HR Agent Agenda install: Failed to create or find schedule. Aborting.')
        return
    }

    // -- Step 2: Create cmn_schedule_span if missing --
    var spanGr = new GlideRecord(SPAN_TABLE)
    spanGr.addQuery('schedule', scheduleSysId)
    spanGr.addQuery('name', SPAN_NAME)
    spanGr.setLimit(1)
    spanGr.query()

    if (spanGr.next()) {
        gs.info('HR Agent Agenda install: Schedule span already exists (' + spanGr.getUniqueValue() + ')')
    } else {
        spanGr.initialize()
        spanGr.setValue('name', SPAN_NAME)
        // schedule field references the parent schedule (cmn_schedule)
        spanGr.setValue('schedule', scheduleSysId)
        spanGr.setValue('all_day', false)
        spanGr.setValue('show_as', 'free')
        spanGr.setValue('type', 'exclude')
        spanGr.setValue('repeat_type', 'weekdays')
        // Anchor date: Mon 2000-01-03 with working hours 09:00-17:00
        spanGr.setValue('start_date_time', '2000-01-03 09:00:00')
        spanGr.setValue('end_date_time', '2000-01-03 17:00:00')
        // The mandatory start/end fields define the recurrence anchor
        spanGr.setValue('start', '2000-01-03 09:00:00')
        spanGr.setValue('end', '2000-01-03 17:00:00')
        var spanId = spanGr.insert()
        gs.info('HR Agent Agenda install: Created schedule span (' + spanId + ')')
    }

    // -- Step 3: Create or update u_hr_mtg_config --
    var configGr = new GlideRecord(CONFIG_TABLE)
    configGr.setLimit(1)
    configGr.query()

    if (configGr.next()) {
        // Config record exists — only update u_default_schedule if it is currently empty
        var currentSchedule = configGr.getValue('u_default_schedule')
        if (!currentSchedule) {
            configGr.setValue('u_default_schedule', scheduleSysId)
            configGr.update()
            gs.info('HR Agent Agenda install: Updated existing config with default schedule.')
        } else {
            gs.info('HR Agent Agenda install: Config already has a default schedule set; no change.')
        }
    } else {
        // Config record does not exist — create it
        configGr.initialize()
        configGr.setValue('u_default_schedule', scheduleSysId)
        configGr.insert()
        gs.info('HR Agent Agenda install: Created config record with default schedule.')
    }

    gs.info('HR Agent Agenda install: Default schedule initialization complete.')
})()
